import ProcessStep, { ProcessStepProps } from './ProcessStep';
import { Button } from '../ui/button';

interface ProcessStepWrapperProps {
  steps: ProcessStepProps[];
  onSelect: (code: string) => void;
}

function ProcessStepWrapper({ steps, onSelect }: ProcessStepWrapperProps) {
  return (
    <div className="flex   items-center border border-gray-300 bg-white rounded-lg">
      {steps.map((step: ProcessStepProps, key: number) => (
        <Button
          className="w-1/3 bg-transparent h-auto border-0"
          key={key}
          onClick={() => onSelect(step.code)}
        >
          <ProcessStep
            code={step.code}
            title={step.title}
            description={step.description}
            icon={step.icon}
            status={step.status}
          />
          {steps.length !== key + 1 && (
            <div className="w-[200px] h-[1px] bg-gray-300 mx-2" />
          )}
        </Button>
      ))}
    </div>
  );
}

export default ProcessStepWrapper;
