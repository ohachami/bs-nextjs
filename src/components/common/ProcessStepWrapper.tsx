import ProcessStep, { ProcessStepProps } from "./ProcessStep";
import { Button } from "../ui/button";
import { Fragment } from "react";

interface ProcessStepWrapperProps {
  steps: ProcessStepProps[];
  onSelect: (code: string) => void
}

function ProcessStepWrapper({ steps, onSelect }: ProcessStepWrapperProps) {
  return (
    <div className="flex justify-center items-center gap-4 border border-gray-300 bg-white rounded-lg">
      {steps.map((step: ProcessStepProps, key: number) => (
        <Fragment key={key}>
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
        </Fragment>
      ))}
    </div>
  );
}

export default ProcessStepWrapper;
