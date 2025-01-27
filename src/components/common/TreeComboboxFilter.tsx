'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { ChevronRight, ChevronDown, Check, ChevronsUpDown } from 'lucide-react';
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

function filterTreeData(searchQuery: string, treeData: TreeNode[]): TreeNode[] {
  const lowerSearchQuery = searchQuery.toLowerCase();

  // Function to filter the nodes
  function filterNode(node: TreeNode): TreeNode | null {
    // Check if the current node or its children match the search query
    const isMatch = node.label.toLowerCase().includes(lowerSearchQuery);

    // If the node label matches the search query, return only the parent node without children
    if (isMatch) {
      return { id: node.id, label: node.label };
    }

    // If the node has children, check each child
    if (node.children) {
      // Check if any child matches the search query
      const hasMatchingChild = node.children.some((child) =>
        child.label.toLowerCase().includes(lowerSearchQuery)
      );

      // If any child matches, return the parent node without its children
      if (hasMatchingChild) {
        return { id: node.id, label: node.label };
      }
    }

    // Return null if no match
    return null;
  }

  // Apply filter to each top-level node and collect the valid ones
  const filteredTree = treeData.map((node) => filterNode(node)).filter(Boolean);

  // Return the filtered tree or an empty array if no matches
  return filteredTree.length > 0 ? filteredTree : [];
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNodes = useMemo(() => {
    if (searchQuery === '') return [];
    return filterTreeData(searchQuery, data);
  }, [searchQuery, data]);

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

  const renderTreeNodes = (nodes: TreeNode[], level = 0) => {
    return nodes.map((node) => (
      <React.Fragment key={node.id}>
        <CommandItem
          onSelect={() => toggleSelect(node)}
          className={cn(
            'flex items-center space-x-2 cursor-pointer',
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
          <Checkbox
            checked={selectedNodes.has(node.id)}
            onCheckedChange={() => toggleSelect(node)}
            onClick={() => toggleSelect(node)}
          />
          <span className="flex-grow">{node.label}</span>
          {selectedNodes.has(node.id) && <Check className="h-4 w-4" />}
        </CommandItem>
        {node.children &&
          node.children.length > 0 &&
          expandedNodes.has(node.id) && (
            <CommandGroup>
              {renderTreeNodes(node.children, level + 1)}
            </CommandGroup>
          )}
      </React.Fragment>
    ));
  };

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
          {selectedNodes.size > 0
            ? `${selectedNodes.size} selected`
            : 'Select filters'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search tree..."
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredNodes.length > 0
                ? renderTreeNodes(filteredNodes)
                : renderTreeNodes(data)}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TreeComboboxFilter;
