import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './input';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  label?: string;
  control?: Control<any, any>;
}
export default function FormInput({
  name,
  label,
  type,
  defaultValue,
  className,
  description,
  control,
  disabled,
  ...props
}: InputProps) {
  return (
    <FormField
      control={control}
      name={name || 'input'}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              className={cn(className)}
              placeholder=""
              disabled={disabled}
              type={type || 'text'}
              defaultValue={defaultValue}
              {...props}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
