'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, Circle, Dot, MoveLeft, MoveRight } from 'lucide-react';
import { Step } from '@/types/common/FormStepperTypes';

// Form stepper Props Definition
interface FormStepperProps {
  steps: Step[];
  isLastStep: boolean;
  currentStep: number;
  isFirstStep: boolean;
  nextStep: () => void;
  previousStep: () => void;
  lastStepAction?: () => void;
  submitButtonText?: string;
  previousButtonText?: string;
  nextButtonText?: string;
  className?: string;
}

function FormStepper({
  steps,
  isLastStep,
  currentStep,
  isFirstStep,
  nextStep,
  previousStep,
  lastStepAction,
  submitButtonText = 'Terminer',
  previousButtonText = 'Précédent',
  nextButtonText = 'Suivant',
  className = '',
}: FormStepperProps) {
  // Convert steps array to format required by defineStepper

  const onPreviousStep = () => {
    previousStep();
  };

  const onNextStep = () => {
    // if ot's the last step execute onComplete function
    if (isLastStep && lastStepAction) {
      lastStepAction();
    } else {
      nextStep();
    }
  };

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {/* Stepper header (circled steps) */}
      <div className="w-full mx-auto my-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index, array) => (
            <div key={step.id} className="flex-1 flex flex-col items-center">
              <div className="relative w-full">
                <div className="flex items-center justify-center">
                  <Button
                    className="flex size-10 items-center justify-center rounded-full z-10 cursor-default"
                    role="tab"
                    variant={
                      index === currentStep
                        ? 'secondary'
                        : currentStep < index
                          ? 'outline'
                          : 'default'
                    }
                  >
                    {index < currentStep ? (
                      <Check className="h-5 w-5" color="white" />
                    ) : index === currentStep ? (
                      <Circle className="h-5 w-5" color="white" />
                    ) : (
                      <Dot
                        className="h-5 w-5"
                        color={currentStep < index ? 'black' : ''}
                      />
                    )}
                  </Button>
                </div>
                {index < array.length - 1 && (
                  <Separator
                    className={`absolute top-1/2 left-1/2 w-full -translate-y-1/2 ${
                      index < currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
              <span className="mt-2 text-sm font-medium">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stepper content */}
      {currentStep < steps.length && (
        <div className="space-y-4">{steps[currentStep].component}</div>
      )}

      {/* Stepper footer (actions buttons) */}
      <div className="flex justify-between gap-4 mt-5">
        <Button
          variant="outline"
          onClick={onPreviousStep}
          disabled={isFirstStep}
        >
          <MoveLeft /> {previousButtonText}
        </Button>
        <Button type="submit" onClick={onNextStep}>
          {isLastStep ? submitButtonText : nextButtonText}
          <MoveRight />
        </Button>
      </div>
    </div>
  );
}

export default FormStepper;
