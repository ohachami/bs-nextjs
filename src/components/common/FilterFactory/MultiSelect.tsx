import { cn } from '@/lib/utils';
import { TOption } from '@/utils/types';
import { CheckIcon, ChevronsUpDownIcon, ListFilterIcon } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Separator } from '../../ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type MultiSelectProps<T> = {
  title: string;
  placeholder: string;
  options: TOption<T>[];
  values: TOption<T>[];
  onChange: (value: TOption<T>) => void;
  onClear: () => void;
};

const MultiSelect = <T extends number | string>({
  title,
  placeholder,
  values,
  options,
  onChange,
  onClear,
}: MultiSelectProps<T>) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" size="sm" className="h-9">
        <ListFilterIcon className="mr-2 size-4" />
        {title}
        {values.length > 0 ? (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Badge
              variant="default"
              className="rounded-sm px-1 font-normal lg:hidden"
            >
              {values.length}
            </Badge>
            <div className="hidden space-x-1 lg:flex">
              {values.length > 3 ? (
                <Badge
                  variant="muted"
                  className="rounded-sm px-1 font-normal hover:bg-[#274754]/10"
                >
                  {values.length} selected
                </Badge>
              ) : (
                values.map((o) => (
                  <Badge
                    key={o.value}
                    variant="muted"
                    className="rounded-sm px-1 font-normal max-w-28 hover:bg-[#274754]/10"
                  >
                    <p className="truncate">{o.label}</p>
                  </Badge>
                ))
              )}
            </div>
          </>
        ) : (
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        )}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto max-w-80 p-0" align="start">
      <Command>
        <CommandInput placeholder={placeholder} />
        <ScrollArea>
          <ScrollBar />
          <CommandList className="max-h-fit">
            <CommandEmpty>Aucun résultat.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-60">
                {options
                  .sort((a, b) => {
                    if (a.label < b.label) return -1;
                    if (a.label > b.label) return 1;
                    return 0;
                  })
                  .map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        onChange(option);
                      }}
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          values.some((o) => o.value === option.value)
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <CheckIcon className={cn('h-4 w-4')} />
                      </div>
                      <span>{option.label}</span>
                    </CommandItem>
                  ))}
              </ScrollArea>
            </CommandGroup>
            {values.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={onClear}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </ScrollArea>
      </Command>
    </PopoverContent>
  </Popover>
);

export default MultiSelect;
