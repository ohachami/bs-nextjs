'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  TreeComboboxProps,
  TreeItem,
} from '@/types/common/TreeComboboxFilterTypes';
import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  ListFilter,
} from 'lucide-react';
import * as React from 'react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import TreeCheckbox from './TreeCheckbox';

function getAllChildIds(items: TreeItem[]): string[] {
  let ids: string[] = [];

  for (const item of items) {
    // If the item has children, process them
    if (item.children && item.children.length > 0) {
      // Add the id of each child
      for (const child of item.children) {
        ids.push(child.id);
        // Recursively get ids from deeper children, if any
        if (child.children) {
          ids.push(...getAllChildIds(child.children));
        }
      }
    }
  }

  return ids;
}
const isAllChildrenSelected = (
  item: TreeItem,
  selected: TreeItem[]
): boolean => {
  if (!item.children || item.children.length === 0) {
    return selected.some((selectedItem) => selectedItem.id === item.id);
  }
  return item.children.every((child) => isAllChildrenSelected(child, selected));
};

const isAnyChildSelected = (item: TreeItem, selected: TreeItem[]): boolean => {
  if (!item.children || item.children.length === 0) {
    return selected.some((selectedItem) => selectedItem.id === item.id);
  }
  return (
    item.children.some((child) => isAnyChildSelected(child, selected)) ||
    selected.some((selectedItem) => selectedItem.id === item.id)
  );
};

const collectChildItems = (node: TreeItem) => {
  let items = [node];

  if (node.children) {
    node.children.forEach((child) => {
      items = items.concat(collectChildItems(child));
    });
  }

  return items;
};

const TreeCombobox: React.FC<TreeComboboxProps> = ({
  buttonVariant,
  items,
  multiSelect,
  defaultValues,
  values = [],
  title,
  placeholder,
  selectChildren,
  selectParent,
  onSelectionChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [expanded, setExpanded] = React.useState<TreeItem[]>([]);

  const handleSelect = (item: TreeItem) => {
    if (multiSelect) {
      let newSelected: TreeItem[] = [];
      const isSelected = values.some(
        (selectedItem) => selectedItem.id === item.id
      );

      if (isSelected) {
        // Deselect the item and its children if applicable
        let toRemove: string[] = [item.id];
        if (selectChildren && item.children) {
          const childIds = item.children
            .flatMap((node) => collectChildItems(node))
            .map((n) => n.id);
          toRemove = [...toRemove, ...childIds];
        }
        newSelected = values.filter((node) => !toRemove.includes(node.id));
      } else {
        // Select the item and its children if applicable
        let toAdd = [item];
        if (selectChildren && item.children) {
          const children = item.children.flatMap((node) =>
            collectChildItems(node)
          );
          toAdd = [...toAdd, ...children];
        }
        newSelected = [...values, ...toAdd];
      }

      onSelectionChange(newSelected.map((e) => e.id));
    } else {
      // Single select mode
      if (values.some((selectedItem) => selectedItem.id === item.id)) {
        onSelectionChange([]);
      } else {
        onSelectionChange([item.id]);
      }
    }
  };

  const toggleExpand = (item: TreeItem) => {
    setExpanded((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const renderTreeItems = (items: TreeItem[], level = 0) => {
    return items.map((item) => {
      const hasChildren = !!item.children;
      const paddingLeft = hasChildren ? level * 4 : level * 4 + 6; // Add more padding if no children

      return (
        <React.Fragment key={item.id}>
          <CommandItem
            value={item.id}
            onSelect={() => {
              if (hasChildren && !selectParent) {
                toggleExpand(item);
              } else {
                handleSelect(item);
              }
            }}
            className={cn('flex items-center gap-2')}
            style={{ paddingLeft: `${paddingLeft * 4}px` }} // Tailwind spacing units
          >
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(item);
                }}
                className="mr-1"
              >
                {expanded.some((i) => i.id === item.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}

            <TreeCheckbox
              selected={values.some(
                (selectedItem) => selectedItem.id === item.id
              )}
              indeterminate={
                (hasChildren &&
                  item.children?.some((child) =>
                    isAnyChildSelected(child, values)
                  ) &&
                  !item.children.every((child) =>
                    isAllChildrenSelected(child, values)
                  )) ||
                false
              }
            />

            <p className="text-balance">{item.label}</p>
          </CommandItem>

          {item.children &&
            expanded.some((i) => i.id === item.id) &&
            renderTreeItems(item.children, level + 1)}
        </React.Fragment>
      );
    });
  };

  const clearSelection = () => {
    onSelectionChange([]);
  };

  const filteredItems = React.useMemo(() => {
    const filterItems = (items: TreeItem[]): TreeItem[] => {
      return items.reduce((acc: TreeItem[], item) => {
        if (item.label.toLowerCase().includes(search.toLowerCase())) {
          acc.push(item);
        } else if (item.children) {
          const filteredChildren = filterItems(item.children);
          if (filteredChildren.length > 0) {
            acc.push({ ...item, children: filteredChildren });
          }
        }
        return acc;
      }, []);
    };

    return filterItems(items);
  }, [items, search]);

  let button = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="w-full justify-between"
    >
      {!title && <ListFilter />}
      {values.length > 0
        ? `${values.length} selected`
        : title
          ? title
          : 'Filtre'}
      {!title ? (
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      ) : (
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      )}
    </Button>
  );

  if (buttonVariant === 'with-badges') {
    button = (
      <Button variant="outline" size="sm" className="h-9">
        <ListFilter className="mr-2 h-4 w-4" />
        {title}
        {values.length > 0 ? (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Badge
              variant="muted"
              className="rounded-sm px-1 font-normal hover:bg-[#274754]/10 lg:hidden"
            >
              {values.length}
            </Badge>
            <div className="hidden space-x-1 lg:flex">
              {values.slice(0, 4).map((item) => (
                <Badge
                  key={item.id}
                  variant="muted"
                  className="rounded-sm px-1 font-normal max-w-28 hover:bg-[#274754]/10"
                >
                  <p className="truncate">{item.label}</p>
                </Badge>
              ))}

              {values.length > 4 && (
                <Badge
                  variant="muted"
                  className="rounded-sm px-1 font-normal hover:bg-[#274754]/10"
                >
                  +{values.length - 4} selected
                </Badge>
              )}
            </div>
          </>
        ) : (
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        )}
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>{button}</PopoverTrigger>
      <PopoverContent className="w-auto max-w-80 p-0">
        <Command>
          <CommandInput
            placeholder={placeholder || 'Horizon...'}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-fit">
            <CommandEmpty>Aucun élément.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-60">
                {renderTreeItems(filteredItems)}
              </ScrollArea>
            </CommandGroup>
            {values.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={clearSelection}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TreeCombobox;
