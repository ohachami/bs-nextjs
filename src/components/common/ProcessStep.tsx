import { SubSteps } from '@/types/exercise';
import { ProcessStepColors as pc } from '@/utils/colors';
import { STEP_STATUS } from '@/utils/constants';
import clsx from 'clsx';
import { DynamicIcon } from './DynamicIcon';
import { cn } from '@/lib/utils';

export type ProcessStepProps = SubSteps & {
  onClick: () => void;
  disabled: boolean;
};

function ProcessStep({
  name,
  description,
  icon,
  status,
  onClick,
  disabled = false,
}: ProcessStepProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 p-3 ',
        !disabled && 'cursor-pointer active:scale-95 transition-transform'
      )}
      onClick={!disabled ? onClick : undefined}
      role="button"
    >
      <div className={`flex gap-3 items-center`}>
        <div
          className={clsx(
            'border-2 p-1 rounded-full w-10 h-10 flex items-center justify-center',
            status === STEP_STATUS.IN_PROGRESS &&
              `bg-[#e6f2ff] border-[#007BFF]`,
            status === STEP_STATUS.DONE &&
              `bg-[${pc.DONE_BG}] border-[${pc.DONE_BORDER}]`,
            status === STEP_STATUS.INACTIVE &&
              `bg-[${pc.INACTIVE_BG}] border-[${pc.INACTIVE_BORDER}]`
          )}
        >
          {icon && (
            <DynamicIcon
              name={icon}
              color={
                status === STEP_STATUS.DONE
                  ? pc.DONE_BORDER
                  : status === STEP_STATUS.IN_PROGRESS
                    ? pc.IN_PROGRESS_BORDER
                    : pc.INACTIVE_BORDER
              }
            />
          )}
        </div>
        <div className={`flex flex-col justify-start items-start`}>
          <p className="text-sm font-medium text-black uppercase">{name}</p>
          <p className="text-xs text-gray-400 font-normal">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProcessStep;
