import { EXERCISE_STATUS } from '@/utils/constants';
import Step from './Step';

interface StepListProps {
  steps: {
    label: string;
    iconKey: React.ComponentType<{ color?: string }>;
    status: string;
    code: string;
    sortedBy: number;
    redirectUrl: string;
  }[];
}

function StepList({ steps }: StepListProps) { 
  return (
    <div className="flex justify-between gap-4 flex-wrap items-center border border-gray-300 bg-white rounded-lg relative">
      {steps.map((item, key) => (
        <Step
          key={key}
          label={item.label}
          iconKey={item.iconKey}
          status={item.status}
          code={item.code}
          redirectUrl={item.redirectUrl}
          stepNumber={key + 1}
          isActive={item.status === EXERCISE_STATUS.IN_PROGRESS}
          isDisabled={item.status === EXERCISE_STATUS.INACTIVE}
          isFirst={key === 0}
          isLast={key === steps.length - 1}
        />
      ))}
    </div>
  );
}

export default StepList;
