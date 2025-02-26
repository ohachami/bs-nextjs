import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from './textarea';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  description?: string;
  label?: string;
  control?: Control<any, any>;
  limit?: number;
}

export default function FormTextarea({
  name,
  label,
  defaultValue,
  className,
  description,
  control,
  disabled,
  limit = 250,
  ...props
}: TextareaProps) {
  return (
    <FormField
      control={control}
      name={name || 'textarea'}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between">
            {label && <FormLabel>{label}</FormLabel>}
            <p className="text-muted-foreground text-xs">
              {`${field.value?.length || 0}/${limit}`}
            </p>
          </div>
          <FormControl>
            <Textarea
              className={cn('resize-none', className)}
              disabled={disabled}
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
