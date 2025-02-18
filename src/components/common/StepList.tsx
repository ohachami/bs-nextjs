import { STEP_CODES, STEP_STATUS } from '@/utils/constants';
import Step from './Step';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface StepProps {
  label: string;
  iconKey: React.ComponentType<{ color?: string }>;
  status: string;
  code: string;
  sortedBy: number;
  redirectUrl: string;
}

interface StepListProps {
  steps: StepProps[];
}

function StepList({ steps }: StepListProps) { 
  const pathname = usePathname();
  const [hypSales, setHypSales] = useState<StepProps>()
  
  useEffect(() => {
    setHypSales(steps.find(s => s.code === STEP_CODES.HYP_SALES))
  }, [steps])

  return (
    <div className="flex justify-between flex-wrap items-center border border-gray-300 bg-white rounded-lg relative">
      {steps.map((item, key) => {
          const isEnabled = item.status !== STEP_STATUS.INACTIVE || 
            STEP_CODES.HYP_SALES === item.code ||
            STEP_CODES.HYP_MANU_ADJ === item.code && hypSales?.status === STEP_STATUS.DONE
          
          const isSelected = pathname.endsWith(item.code);
          return (
            <Step
            key={key}
            label={item.label}
            iconKey={item.iconKey}
            status={item.status}
            code={item.code}
            redirectUrl={item.redirectUrl}
            stepNumber={key + 1}
            isActive={isSelected}
            isDisabled={!isEnabled}
            isFirst={key === 0}
            isLast={key === steps.length - 1}
          />
          )
      })}
    </div>
  );
}

export default StepList;
