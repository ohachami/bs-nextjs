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
import { collapsibleSelectColors } from '@/utils/colors';
import { useComparaisonVersionIds } from '@/store/consolidation/comparaisonVersionIds';

interface CollapsibleSelectProps {
  collapsibleItems: NestedOption[];
  selectIndex: number;
  onCompare: (selectedItem: string, selectIndex: number) => void;
  disabled?: boolean;
}

function findLabelById(data: NestedOption[], id: string): string {
  for (const item of data) {
    if (item.value === id) {
      return item.label;
    }
    if (item.children) {
      const label = findLabelById(item.children, id);
      if (label) return label;
    }
  }
  return '';
}

export function CollapsibleSelect({
  collapsibleItems: nestedOptions,
  selectIndex,
  onCompare,
  disabled,
}: CollapsibleSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<{
    value: string;
    label: string;
  }>({ value: '', label: '' });
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const { versionIds } = useComparaisonVersionIds();

  const toggleItem = (depth: number, value: string, label: string) => {
    // selecting only the items of depth 1 (données consolidées)
    if (depth === 1) {
      setSelected((p) => {
        if (p.value === value)
          return {
            value: '',
            label: '',
          };
        return {
          value,
          label,
        };
      });
    }
  };

  React.useEffect(() => {
    // reset selected item when selectIndex changes
    if (Array.isArray(versionIds) && versionIds.length > 0)
      setSelected({
        value: versionIds[0],
        label: findLabelById(nestedOptions, versionIds[0]),
      });
  }, [versionIds]);

  const toggleExpand = (value: string) => {
    setExpandedItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const renderTreeItems = (items: NestedOption[], depth = 0) => {
    return items.map((item) => {
      const isExpanded = expandedItems.includes(item.value);
      const hasChildren = item.children && item.children.length > 0;
      const isSelected = selected.value === item.value;

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
            onSelect={() => toggleItem(depth, item.value, item.label)}
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
    // close select Popover first
    setOpen(false);
    // send compare event to parent component
    if (selected.value.length > 0 && selectIndex !== undefined) {
      onCompare(selected.value, selectIndex);
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
          disabled={disabled}
        >
          <div
            className={'h-full w-2 rounded-lg'}
            style={{
              backgroundColor:
                selectIndex !== undefined
                  ? collapsibleSelectColors[
                      selectIndex % collapsibleSelectColors.length
                    ]
                  : 'rgba(59, 130, 246, 1)',
            }}
          ></div>
          {selected.value.length > 0
            ? `${selected.label}`
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
              {nestedOptions.length === 0 ? (
                <div className="h-40 w-full flex flex-col items-center justify-center">
                  <p className="text-sm text-gray-400">Aucun élement trouvé.</p>
                </div>
              ) : (
                <ScrollArea className="h-60">
                  {renderTreeItems(filteredItems)}
                </ScrollArea>
              )}
            </CommandGroup>
            <CommandSeparator />
            <CommandItem
              disabled={selected.value.length === 0 || disabled}
              onSelect={onCompareHanlder}
              className="justify-center py-2 text-center cursor-pointer"
            >
              <p className="flex gap-3 items-center font-bold text-xs">
                {selectIndex === 0 ? "Visualiser" : "Comparer"} <ChevronRight />
              </p>
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
