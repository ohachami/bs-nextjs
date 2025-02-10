import { ProcessStepColors as pc } from '@/utils/colors';
import { STEP_STATUS } from '@/utils/constants';
import clsx from 'clsx';

export interface ProcessStepProps {
  title: string;
  description: string;
  code: string;
  icon: React.ComponentType<{ color?: string }>;
  status: string;
}

function ProcessStep({
  title,
  description,
  icon: Icon,
  status
}: ProcessStepProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-3">
      <div className={`flex gap-3 items-center`}>
        <div
          className={clsx('border-2 p-3 rounded-full w-14 h-14 flex items-center justify-center',
            status === STEP_STATUS.IN_PROGRESS && `bg-[#e6f2ff] border-[#007BFF]`,
            status === STEP_STATUS.DONE && `bg-[${pc.DONE_BG}] border-[${pc.DONE_BORDER}]`,
            status === STEP_STATUS.INACTIVE && `bg-[${pc.INACTIVE_BG}] border-[${pc.INACTIVE_BORDER}]`
          )}
        >
          <Icon 
            color={
              status === STEP_STATUS.DONE
                ? pc.DONE_BORDER
                : status === STEP_STATUS.IN_PROGRESS
                  ? pc.IN_PROGRESS_BORDER
                  : pc.INACTIVE_BORDER
            }
          />
        </div>
        <div className={`flex flex-col justify-start items-start`}>
          <p className="text-md font-medium text-black uppercase">{title}</p>
          <p className="text-sm text-gray-400 font-normal capitalize">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProcessStep;
