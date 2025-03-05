import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TOption } from '@/utils/types';

type SelectProps<T> = {
  title: string;
  placeholder: string;
  options: TOption<T>[];
  value?: T;
  onChange: (value: TOption<T>) => void;
  onClear: () => void;
};

const SelectComponent = <T extends string | number>({
  title,
  placeholder,
  options,
  value,
  onChange,
  onClear,
}: SelectProps<T>) => {
  const handleValueChange = (newValue: string) => {
    if (newValue === '') {
      onClear();
      return;
    }
    const selectedOption = options.find(
      (option) => option.value.toString() === newValue
    );
    if (selectedOption) {
      onChange(selectedOption);
    }
  };

  return (
    <Select
      value={value ? value.toString() : ''}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option.value.toString()}
              value={option.value.toString()}
            >
              <div className="flex items-center justify-between w-full">
                <span>{option.label}</span>
                {/* {value && option.value.toString() === value.toString() && (
                  <Check className="w-4 h-4" />
                )} */}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
