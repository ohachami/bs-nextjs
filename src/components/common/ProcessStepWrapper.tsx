import { Fragment } from "react";
import ProcessStep, { ProcessStepProps } from "./ProcessStep";

interface ProcessStepWrapperProps {
  steps: ProcessStepProps[];
}

function ProcessStepWrapper({ steps }: ProcessStepWrapperProps) {
  return (
    <div className="flex justify-center items-center gap-4 border border-gray-300 bg-white rounded-lg">
      {steps.map((step: ProcessStepProps, key: number) => (
        <Fragment key={key}>
          <ProcessStep
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
