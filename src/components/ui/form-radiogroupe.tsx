import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';

export interface RadioGroupProps {
  name: string;
  label?: string;
  control: Control<any, any>;
  options: { value: string; label: string }[];
  description?: string;
  disabled?: boolean;
  className?: string;
}

export default function FormRadioGroup({
  name,
  label,
  control,
  options,
  description,
  disabled,
  className,
}: RadioGroupProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn('flex mt-3', className)}
              disabled={disabled}
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className="flex flex-1 items-center space-x-2 space-y-0"
                >
                  <RadioGroupItem value={option.value} />
                  <FormLabel>{option.label}</FormLabel>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
