"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { defineStepper } from '@stepperize/react';
import { Check, Circle, Dot, MoveLeft, MoveRight } from 'lucide-react';
import HorizonForm from '../modules/exercises/create/HorizonForm';
import ObjectifsForm from '../modules/exercises/create/ObjectifsForms';
import DeadlinesForm from '../modules/exercises/create/DeadlinesForm';
import ExerciseSuccess from '../modules/exercises/create/ExerciseSuccess';

const { useStepper, steps, utils } = defineStepper(
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'complete', label: 'Complete' }
);

function FormStepper() {
  const stepper = useStepper();

  const currentIndex = utils.getIndex(stepper.current.id);

  const [success, setSucess] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col gap-5">
      {/* Stepper header (cicrled steps) */}
      <div className="w-full mx-auto my-4">
        <div className="flex items-center justify-between">
          {stepper.all.map((step, index, array) => (
            <div key={step.id} className="flex-1 flex flex-col items-center">
              <div className="relative w-full">
                <div className="flex items-center justify-center">
                  <Button
                    role="tab"
                    variant={
                      index === currentIndex
                        ? 'secondary'
                        : currentIndex < index
                          ? 'outline'
                          : 'default'
                    }
                    aria-current={
                      stepper.current.id === step.id ? 'step' : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className="flex size-10 items-center justify-center rounded-full z-10 cursor-default"
                  >
                    {index < currentIndex ? (
                      <Check className="h-5 w-5" color="white" />
                    ) : index === currentIndex ? (
                      <Circle className="h-5 w-5" color="white" />
                    ) : (
                      <Dot
                        className="h-5 w-5"
                        color={currentIndex < index ? 'black' : ''}
                      />
                    )}
                  </Button>
                </div>
                {index < array.length - 1 && (
                  <Separator
                    className={`absolute top-1/2 left-1/2 w-full -translate-y-1/2 ${
                      index < currentIndex ? 'bg-primary' : 'bg-gray-200'
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
      <div className="space-y-4">
        {stepper.switch({
          shipping: () => <HorizonForm />,
          payment: () => <ObjectifsForm />,
          complete: () => <DeadlinesForm />,
        })}
      </div>
      {/* Stepper footer (actions buttons) */}
      <div className="flex justify-between gap-4 mt-5">
        <Button
          variant="outline"
          onClick={stepper.prev}
          disabled={stepper.isFirst}
        >
          <MoveLeft /> Précédent
        </Button>
        {!stepper.isLast ? (
          <Button type="submit" onClick={() => stepper.next()}>
            Suivant <MoveRight />
          </Button>
        ) : (
          <Button type="submit" onClick={() => setSucess(true)}>
            Terminer <MoveRight />
          </Button>
        )}
      </div>
      {success && <ExerciseSuccess/>}
    </div>
  );
}


export default FormStepper;
