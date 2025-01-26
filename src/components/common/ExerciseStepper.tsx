import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Nullable } from '@/utils/types';
import { FC } from 'react';
import { Progress } from '../ui/progress';

type StepProgressProps = {
  steps: Array<{
    id: Nullable<string>;
    name: Nullable<string>;
    status: Nullable<string>;
    deadline: Nullable<Date>;
    order: number;
  }>;
};

type StepProps = {
  name: Nullable<string>;
  actif: boolean;
  done: boolean;
  last: boolean;
};

const Step: FC<StepProps> = ({ actif, done, name, last }) => {
  return (
    <div className={cn('-m-1 flex items-center w-full', last && 'w-auto')}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn('z-10 bg-white rounded-full border-2', {
                'size-3.5 border-primary': done,
                'size-5 border-blue': actif,
                'size-3.5 ': !actif && !done,
              })}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-muted text-muted-foreground shadow-md">
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {!last && (
        <div className="grow -ml-1">
          <Progress
            className={cn('bg-black/5', last && 'w-0')}
            indicatorClassName={cn({
              'rounded-full': true,
              'bg-blue': actif,
              'bg-primary': done,
              'bg-none': !actif && !done,
            })}
            value={done ? 100 : actif ? 40 : 0}
          />
        </div>
      )}
    </div>
  );
};

const StepProgress: FC<StepProgressProps> = ({ steps }) => (
  <div className="flex flex-nowrap justify-between w-full h-5">
    {steps
      .sort((a, b) => (a.order < b.order ? -1 : 1))
      .map((step, index) => (
        <Step
          key={step.id}
          name={step.name}
          actif={step.status === 'IN_PROGRESS'}
          done={step.status === 'DONE'}
          last={index === steps.length - 1}
        />
      ))}
  </div>
);

export default StepProgress;
