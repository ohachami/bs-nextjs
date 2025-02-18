import ProcessStep from './ProcessStep';
import { Fragment } from 'react';
import { SubSteps } from '@/types/exercise';

interface ProcessStepWrapperProps {
  steps: SubSteps[];
  onSelect: (code: string) => void;
  isDisabled?: boolean;
}

function ProcessStepWrapper({
  steps,
  onSelect,
  isDisabled = false,
}: ProcessStepWrapperProps) {
  return (
    <div className="flex justify-center items-center border border-gray-300 bg-white rounded-lg">
      {steps.map((step: SubSteps, key: number) => (
        <Fragment key={key}>
          <ProcessStep
            {...step}
            onClick={() => onSelect(step.code)}
            disabled={isDisabled}
          />
          {steps.length !== key + 1 && (
            <div className="w-[200px] h-[1px] bg-gray-300 mx-2" />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default ProcessStepWrapper;
