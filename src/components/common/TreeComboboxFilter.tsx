'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Check,
  ChevronsUpDown,
  ListFilter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  TreeFilterDropdownProps,
  TreeNode,
} from '@/types/TreeComboboxFilterTypes';

/**
 * Filtering the tree of nodes based on the search query
 * returning the whole tree structure from the root node
 * @param tree: tree of nodes
 * @param searchTerm: search query for tree filter
 * @returns a new tree of nodes based on the serach query
 */
function filterTreeData(tree: TreeNode[], searchTerm: string): TreeNode[] {
  const searchLower = searchTerm.toLowerCase();

  // Helper function to check if node matches search
  const isMatch = (node: TreeNode) =>
    node.label.toLowerCase().includes(searchLower);

  // Helper function to clone node with specific children
  const cloneWithChildren = (
    node: TreeNode,
    children?: TreeNode[]
  ): TreeNode => ({
    ...node,
    children: children?.length ? children : undefined,
  });

  // Main filter function that preserves paths to matching nodes
  const filterNode = (node: TreeNode): TreeNode | null => {
    // Check if current node matches
    const nodeMatches = isMatch(node);

    // If node has children, recursively filter them
    let matchingChildren: TreeNode[] = [];
    if (node.children?.length) {
      matchingChildren = node.children
        .map((child) => filterNode(child))
        .filter((n): n is TreeNode => n !== null);
    }

    // Return cases:
    // 1. If current node matches, return it with all its children
    if (nodeMatches) {
      return cloneWithChildren(node, node.children);
    }
    // 2. If any children match, return current node with only matching children
    if (matchingChildren.length > 0) {
      return cloneWithChildren(node, matchingChildren);
    }
    // 3. If neither current node nor children match, return null
    return null;
  };

  // Apply filter to each root node
  return tree
    .map((node) => filterNode(node))
    .filter((n): n is TreeNode => n !== null);
}

const TreeComboboxFilter: React.FC<TreeFilterDropdownProps> = ({
  data,
  onSelectionChange,
}) => {
  // controlling popover toggle
  const [open, setOpen] = useState(false);
  // list of expanded nodes
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  // list of selected (checked) nodes
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  // search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // on expand button: we expand tree children
  const toggleExpand = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  // on select node: we toggle Selection to children
  const toggleSelect = useCallback((node: TreeNode) => {
    setSelectedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(node.id)) {
        newSet.delete(node.id);
        // Deselect all children
        const deselect = (n: TreeNode) => {
          newSet.delete(n.id);
          n.children?.forEach(deselect);
        };
        node.children?.forEach(deselect);
      } else {
        newSet.add(node.id);
        // Select all children
        const select = (n: TreeNode) => {
          newSet.add(n.id);
          n.children?.forEach(select);
        };
        node.children?.forEach(select);
      }
      return newSet;
    });
  }, []);

  // expand all nodes at onces
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const expandAllNodes = () => {
    // Helper function to collect all node IDs recursively
    const collectNodeIds = (nodes: TreeNode[], ids: Set<string>) => {
      nodes.forEach((node) => {
        ids.add(node.id); // Add the current node's ID
        if (node.children) {
          collectNodeIds(node.children, ids); // Recursively add child node IDs
        }
      });
    };
    // Create a new Set to hold all the node IDs
    const allNodeIds = new Set<string>();
    collectNodeIds(data, allNodeIds); // Collect all node IDs from the tree
    // Update the expandedNodes state to include all node IDs
    setExpandedNodes(allNodeIds);
  };

  // filtered nodes after entering a search query
  const filteredNodes = useMemo(() => {
    if (searchQuery === '') return data;
    return filterTreeData(data, searchQuery);
  }, [data, searchQuery]);

  // clearing the search query
  const onTreeSearchClear = () => {
    setSearchQuery('');
    setSelectedNodes(new Set());
    setExpandedNodes(new Set());
  };

  // recurssive nodes tree rendrering
  const renderTreeNodes = (nodes: TreeNode[], level = 0) => {    
    return nodes.map((node) => (
      <React.Fragment key={node.id}>
        <CommandItem
          key={`command-item-${node.id}`}
          onSelect={() => toggleSelect(node)}
          className={cn(
            'flex items-center space-x-2',
            level > 0 && `pl-${level * 4}`
          )}
        >
          {node.children && node.children.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0"
              onClick={(e) => toggleExpand(e, node.id)}
            >
              {expandedNodes.has(node.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
          {!node.children && <div className="pl-4"></div>}
          <Checkbox checked={selectedNodes.has(node.id)} />
          <span className="flex-grow">{node.label}</span>
          {selectedNodes.has(node.id) && <Check className="h-4 w-4" />}
        </CommandItem>
        {node.children &&
          node.children.length > 0 &&
          expandedNodes.has(node.id) && (
            <CommandGroup key={`group-${level}-${node.id}`}>
              {renderTreeNodes(node.children, level + 1)}
            </CommandGroup>
          )}
      </React.Fragment>
    ));
  };

  // on node selection sending event to the parent 
  // with a list of selected IDs
  React.useEffect(() => {
    onSelectionChange(Array.from(selectedNodes));
  }, [selectedNodes, onSelectionChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <ListFilter />
          {selectedNodes.size > 0
            ? `${selectedNodes.size} selected`
            : 'Filtres'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Horizon"
            onValueChange={setSearchQuery}
            value={searchQuery}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {searchQuery===''? renderTreeNodes(data): renderTreeNodes(filteredNodes)}
            </CommandGroup>
          </CommandList>
        </Command>
        {/* Clear filters */}
        <div
          onClick={onTreeSearchClear}
          className="flex justify-center border-t-2 cursor-pointer py-2 px-2 rounded-md hover:bg-gray-50"
        >
          <p className="text-sm">Clear filters</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TreeComboboxFilter;
