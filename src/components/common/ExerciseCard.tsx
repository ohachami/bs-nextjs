'use client';

import { cn } from '@/lib/utils';
import { requiredPermissions } from '@/utils/constants';
import { formatDate } from '@/utils/functions';
import { Nullable } from '@/utils/types';
import { differenceInDays, isValid } from 'date-fns';
import { ArrowRightIcon, EyeIcon, MousePointerClick } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import ExerciseStatus from './ExerciseStatus';
import StepProgress from './ExerciseStepper';
import { Guard } from './Guard';

type Props = {
  creator: Nullable<string>;
  creationDate: Nullable<Date>;
  name: Nullable<string>;
  status: Nullable<string>;
  period: Nullable<string>;
  steps: {
    id: Nullable<string>;
    name: Nullable<string>;
    status: Nullable<string>;
    deadline: Nullable<Date>;
    order: number;
  }[];
  onDetailsView: () => void;
  onOpenClick: () => void;
};

const ExerciceCard: React.FC<Props> = (props) => {
  const actifStep = props.steps.find((s) => s.status === 'IN_PROGRESS');

  const isDeadlineClose =
    actifStep?.deadline && isValid(new Date(actifStep.deadline))
      ? differenceInDays(new Date(actifStep.deadline), new Date()) < 2
      : false;

  return (
    <div
      className={cn(' border-l-4 p-6 rounded-lg flex flex-col gap-3 shadow', {
        'bg-white border-l-blue-500': !isDeadlineClose,
        'bg-rose-100 border-l-red-500': isDeadlineClose,
      })}
    >
      <div className="flex items-center gap-3">
        <MousePointerClick
          className={cn('size-6', {
            'text-blue-500': !isDeadlineClose,
            'text-red-500': isDeadlineClose,
          })}
        />

        <div className="grow flex flex-col">
          <p className="font-geist text-foreground leading-5 text-xs font-semibold">
            {props.creator}
          </p>
          {props.creationDate && (
            <p className="font-geist text-muted-foreground leading-5 text-[10px] font-normal">
              crée le {formatDate(props.creationDate)}
            </p>
          )}
        </div>

        <ExerciseStatus
          status={isDeadlineClose ? 'DEADLINE_CLOSE' : 'IN_PROGRESS'}
        />
      </div>

      <h3 className="font-geist font-semibold text-xl">{props.name}</h3>

      <div>
        <Badge
          variant="outline"
          className="bg-muted rounded-full font-medium text-xs leading-4 text-foreground"
        >
          {props.period}
        </Badge>
      </div>

      <StepProgress steps={props.steps} />

      <div
        className={cn('grow flex items-center', {
          'justify-between': actifStep,
          'justify-end': !actifStep,
        })}
      >
        {actifStep && (
          <div className="flex flex-col font-geist">
            <p
              title={actifStep.name || undefined}
              className="font-semibold text-sm text-foreground truncate max-w-32"
            >
              {actifStep.name}
            </p>
            <p
              className={cn('text-xs', {
                'text-card-foreground': !isDeadlineClose,
                'text-red-500': isDeadlineClose,
              })}
            >
              {actifStep.deadline && formatDate(new Date(actifStep.deadline))}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Guard permissions={requiredPermissions.VIEW_EXERCISE_SHEET_DETAILS}>
            <Button
              variant="ghost"
              className="px-2 border-0 shadow-none hover:bg-white"
              onClick={props.onDetailsView}
            >
              <EyeIcon />
            </Button>
          </Guard>

          <Button
            variant="ghost"
            className="px-2 hover:bg-white"
            onClick={props.onOpenClick}
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExerciceCard;
