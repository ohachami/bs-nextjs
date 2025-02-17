'use client';

import { CheckIcon, MinusIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const TreeCheckbox: React.FC<{
  selected: boolean;
  indeterminate: boolean;
}> = ({ indeterminate, selected }) => {
  return (
    <div
      className={cn(
        'size-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        (indeterminate || selected) && 'bg-primary text-primary-foreground'
      )}
    >
      {selected ? (
        <CheckIcon className="w-2 h-2" />
      ) : indeterminate ? (
        <MinusIcon className="w-2 h-2" />
      ) : undefined}
    </div>
  );
};

export default TreeCheckbox;
