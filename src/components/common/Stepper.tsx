import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { defineStepper } from '@stepperize/react';
import { Check, Circle, Dot, MoveLeft, MoveRight } from 'lucide-react';

const { useStepper, steps, utils } = defineStepper(
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'complete', label: 'Complete' }
);

function Stepper() {
  
  const stepper = useStepper();

  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <React.Fragment>
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Checkout</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Step {currentIndex + 1} of {steps.length}
          </span>
        </div>
      </div>
      <nav aria-label="Checkout Steps" className="group my-4">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-between">
            {stepper.all.map((step, index, array) => (
              <div key={step.id} className="flex-1 flex flex-col items-center">
                <div className="relative w-full">
                  <div className="flex items-center justify-center">
                    <Button
                      type="button"
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
                      className="flex size-10 items-center justify-center rounded-full z-10"
                      onClick={() => stepper.goTo(step.id)}
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
      </nav>
      <div className="space-y-4">
        {stepper.switch({
          shipping: () => <Stp1 />,
          payment: () => <Stp2 />,
          complete: () => <Stp3 />,
        })}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={stepper.prev}
            disabled={stepper.isFirst}
          >
           <MoveLeft /> Précédent
          </Button>
          {!stepper.isLast?
            <Button type="submit" onClick={() => stepper.next()}>
              Suivant <MoveRight />
            </Button> :
            <Button type="submit" onClick={() => alert("validated!")}>
              Terminer <MoveRight />
            </Button>
          }
        </div>
      </div>
    </React.Fragment>
  );
}

function Stp1() {
  return <div className="text-center">1</div>;
}
function Stp2() {
  return <div className="text-center">2</div>;
}

function Stp3() {
  return <div className="text-center">3</div>;
}

export default Stepper;
