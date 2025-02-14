import { cn } from '@/lib/utils';
import { useProductTypes, useRegions } from '@/services/referential.Service';
import { TOption } from '@/utils/types';
import { CheckIcon, ListFilterIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import PeriodFilter from './PeriodFilter';

type MultiSelectFilterProps<T> = {
  title: string;
  placeholder: string;
  options: TOption<T>[];
  values: T[];
  onChange: (value: T) => void;
  onClear: () => void;
};

const MultiSelectFilter = <T extends number | string>({
  title,
  placeholder,
  values,
  options,
  onChange,
  onClear,
}: MultiSelectFilterProps<T>) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" size="sm" className="h-9 border-dashed">
        <ListFilterIcon className="mr-2 h-4 w-4" />
        {title}
        {values.length > 0 && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Badge
              variant="default"
              className="rounded-sm px-1 font-normal lg:hidden"
            >
              {values.length}
            </Badge>
            <div className="hidden space-x-1 lg:flex">
              {values.map((value) => {
                const option = options.find((o) => o.value === value);
                return (
                  option && (
                    <Badge
                      variant="muted"
                      key={value}
                      className="rounded-sm px-1 font-normal hover:bg-[#274754]/10"
                    >
                      {option.label}
                    </Badge>
                  )
                );
              })}
            </div>
          </>
        )}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[200px] p-0" align="start">
      <Command>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>Aucun résultat.</CommandEmpty>
          <CommandGroup>
            {options
              .sort((a, b) => {
                if (a.label < b.label) return -1;
                if (a.label > b.label) return 1;
                return 0;
              })
              .map((option) => {
                const isSelected =
                  values.findIndex((val) => option.value === val) !== -1;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onChange(option.value);
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
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
      </Command>
    </PopoverContent>
  </Popover>
);

type DynamicFilterProps<T> = {
  title: string;
  placeholder: string;
  useFetchHook: () => {
    data: T[] | undefined;
    status: 'pending' | 'success' | 'error';
  };
  onChange: (values: string[]) => void;
  mapOptions: (data: T) => TOption<string>;
};

const DynamicFilter = <T,>({
  title,
  placeholder,
  useFetchHook,
  onChange,
  mapOptions,
}: DynamicFilterProps<T>) => {
  const [values, setValues] = useState<string[]>([]);

  const handleChange = (value: string) => {
    setValues((prevValues) =>
      prevValues.includes(value)
        ? prevValues.filter((v) => v !== value)
        : [...prevValues, value]
    );
  };

  useEffect(() => {
    onChange(values);
  }, [onChange, values]);

  const { data, status } = useFetchHook();

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>Error fetching data</span>;
  }

  const options = data?.map(mapOptions) || [];

  return (
    <MultiSelectFilter
      options={options}
      title={title}
      placeholder={placeholder}
      values={values}
      onChange={handleChange}
      onClear={() => setValues([])}
    />
  );
};

type Props = {
  module: 'product' | 'region' | 'period';
  onChange: () => void;
};

const FilterFactory: React.FC<Props> = ({ module }) => {
  switch (module) {
    case 'product':
      return (
        <DynamicFilter
          title="Types de Produit"
          placeholder="Chercher"
          useFetchHook={useProductTypes}
          mapOptions={(type) => ({ label: type.name, value: type.id })}
          onChange={(values) => console.log('Product Types:', values)}
        />
      );
    case 'region':
      return (
        <DynamicFilter
          title="Régions"
          placeholder="Chercher"
          useFetchHook={useRegions}
          mapOptions={(region) => ({ label: region.name, value: region.id })}
          onChange={(values) => console.log('Regions:', values)}
        />
      );
    default:
      return (
        <PeriodFilter
          years={[2024]}
          defaultSelectedPeriods={[]}
          onSelectionChange={(values) => console.log('Periods:', values)}
        />
      );
  }
};

export default FilterFactory;
