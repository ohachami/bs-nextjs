'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarDays, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

function DatePicker(props: {
  placeholder?: string;
  withClearBtn?: boolean;
  onSelectedDate: (date: Date) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  const onDateSelected = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      props.onSelectedDate(selectedDate);
      setOpen(false);
    }
  };

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDate(undefined);
  };

  return (
    <Popover 
      open={open} 
      onOpenChange={setOpen} 
      modal={true}
    >
      <PopoverTrigger asChild>
        <div className="flex justify-start gap-2">
          <Button
            type="button"
            variant="outline"
            className={cn(
              'w-full justify-between text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            {date ? (
              format(date, 'PPP')
            ) : (
              <span>{props.placeholder ?? 'Sélectionner une date...'}</span>
            )}
            <CalendarDays className="ml-2 h-4 w-4" />
          </Button>
          {props.withClearBtn && date && (
            <div
              onClick={clearDate}
              className="border-gray-300 border rounded-md px-2 flex items-center cursor-pointer hover:bg-gray-100"
            >
              <X size={20} color="gray" />
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 z-[9999]" 
        align="end"
        side="bottom"
        sideOffset={4}
        onInteractOutside={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateSelected}
          initialFocus
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;