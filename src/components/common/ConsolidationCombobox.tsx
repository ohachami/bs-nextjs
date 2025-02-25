'use client';
import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
import { useConsolidationVersions } from '@/services/consolidation.service';
import { ConsolidationVersionsIF } from '@/types/consolidation';
import { useSbus } from '@/services/referential.Service';

interface ConsolidationComboboxProps {
  onSelect: (selectedValue: string) => void;
}

function ConsolidationCombobox({ onSelect }: ConsolidationComboboxProps) {
  const {
    data: sbus,
    isLoading: isLoadingSbu,
    isError: isErrorSbu,
  } = useSbus();
  const sbuId = React.useMemo(() => {
    if (sbus && sbus.length > 0) {
      return sbus[0].id;
    }
    return undefined;
  }, [sbus]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  // fetching consolidated versions by SbuID
  const { data, isLoading, isError } = useConsolidationVersions(sbuId);

  /**
   * Handling combobox value selection
   * @param currentValue: newly selected value
   */
  const onSelectHanlder = (currentValue: string) => {
    setValue(currentValue === value ? '' : currentValue);
    setOpen(false);
    // disptach event to parent
    onSelect(currentValue);
  };

  if (isLoading || isLoadingSbu) return <p>Loading...</p>;

  if (isError || !data || !sbus) return <p>Error...</p>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between"
        >
          {value
            ? data.find((item) => item.name === value)?.name
            : 'Selectionné une donnée consolidée'}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput
            placeholder="Rechercher une donnée consolidée..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>Acune donnée consolidée trouvée</CommandEmpty>
            <CommandGroup>
              {data &&
                Array.isArray(data) &&
                data.map((item: ConsolidationVersionsIF, key: number) => (
                  <CommandItem
                    key={key}
                    value={item.name}
                    onSelect={onSelectHanlder}
                  >
                    {item.name}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === item.name ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ConsolidationCombobox;
