'use client';

import * as React from 'react';
import {
  ChevronsUpDown,
  ChevronRight,
  ChevronDown,
  CircleCheck,
} from 'lucide-react';

import { cn } from '@/lib/utils';
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
import clsx from 'clsx';
import { NestedOption } from '@/types/common/CollapsibleSelectTypes';

interface CollapsibleSelectProps {
  collapsibleItems: NestedOption[];
  tagColor?: string;
  onSelect?: (selectedItem: string) => void;
}

export function CollapsibleSelect({
  collapsibleItems: nestedOptions,
  tagColor,
  onSelect,
}: CollapsibleSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string>('');
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleItem = (depth: number, value: string) => {
    // selecting only the items of depth 1 (données consolidées)
    if (depth === 1) {
      // updating the selected item
      setSelected(value);
      // sending selected item to parent component
      if (onSelect) {
        onSelect(value);
      }
    }
  };

  const toggleExpand = (value: string) => {
    setExpandedItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const clearSelection = () => {
    setSelected('');
  };

  const renderTreeItems = (items: NestedOption[], depth = 0) => {
    return items.map((item) => {
      const isExpanded = expandedItems.includes(item.value);
      const hasChildren = item.children && item.children.length > 0;
      const isSelected = selected === item.value;

      if (
        search &&
        !item.label.toLowerCase().includes(search.toLowerCase()) &&
        !hasChildren
      ) {
        return null;
      }

      return (
        <React.Fragment key={item.value}>
          <CommandItem
            onSelect={() => toggleItem(depth, item.value)}
            className={cn('flex items-center gap-2', depth > 0 && 'ml-4')}
          >
            {hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-4 w-4"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(item.value);
                }}
              >
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </Button>
            )}

            {hasChildren ? (
              <p
                className={clsx('font-medium', depth === 1 && 'cursor-pointer')}
              >
                {item.label}
              </p>
            ) : (
              <p className="font-light text-gray-500 text-xs ml-7">
                {item.label}
              </p>
            )}

            <CircleCheck
              color="green"
              className={cn(
                'mr-2 h-4 w-4',
                isSelected ? 'opacity-100' : 'opacity-0'
              )}
            />
          </CommandItem>
          {hasChildren &&
            isExpanded &&
            renderTreeItems(item.children!, depth + 1)}
        </React.Fragment>
      );
    });
  };

  /**
   * used when "comaparer" button is clicked
   */
  const onCompareHanlder = () => {
    if (onSelect) {
      onSelect(selected);
    }
  };

  const filteredItems = React.useMemo(() => {
    if (!search) return nestedOptions;
    // TODO: Implement a more advanced filtering logic if needed
    return nestedOptions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          <div
            className={'h-full w-2 rounded-lg'}
            style={{
              backgroundColor: tagColor ? tagColor : 'rgba(59, 130, 246, 1)',
            }}
          ></div>
          {selected.length > 0
            ? `${selected}`
            : 'Selectionner une donnée consolidée...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto min-w-[310px] p-0">
        <Command>
          <CommandInput
            placeholder="Exercices, version, budget..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-fit">
            <CommandEmpty>Aucun élement trouvé.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-60">
                {renderTreeItems(filteredItems)}
              </ScrollArea>
            </CommandGroup>
            <CommandSeparator />
            <CommandItem
              onSelect={onCompareHanlder}
              className="justify-center text-center cursor-pointer"
            >
              <p className="flex gap-3 items-center font-bold text-xs">
                Comparer <ChevronRight />
              </p>
            </CommandItem>
            {selected.length > 0 && (
              <>
                <CommandSeparator />
                <CommandItem
                  onSelect={clearSelection}
                  className="justify-center text-center"
                >
                  <p>Clear selection</p>
                </CommandItem>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
