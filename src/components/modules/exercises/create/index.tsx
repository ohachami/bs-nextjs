'use client';
import FormStepper from '@/components/common/FormStepper';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { withGuard } from '@/hoc/withGuard';
import { toast } from '@/hooks/use-toast';
import { useCreateExercise } from '@/services/exercises.service';
import {
  ExerciseCreationFormData,
  useExerciseCreationStore,
} from '@/store/exercises/create';
import { Step } from '@/types/common/FormStepperTypes';
import { ExercisePayload } from '@/types/exercises/createExercise';
import { EXERCISE_STATUS, STEP_STATUS } from '@/utils/constants';
import { PlusIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import DeadlinesForm from './DeadlinesForm';
import ExerciseSuccess from './ExerciseSuccess';
import HorizonForm from './HorizonForm';
import ObjectifsForm from './ObjectifsForms';

const steps: Step[] = [
  {
    id: 'horizon',
    label: 'Informations générales',
    component: <HorizonForm />,
  },
  {
    id: 'objectifs',
    label: 'Objectifs',
    component: <ObjectifsForm />,
  },
  {
    id: 'deadlines',
    label: 'Deadlines',
    component: <DeadlinesForm />,
  },
];

function CreateNewExercise() {
  const [open, setOpen] = useState(false);

  const [stepsComplete, setStepsComplete] = useState(false);
  const { data, nextStep, prevStep, step } = useExerciseCreationStore();
  const createExerciseMutation = useCreateExercise();

  // on last step action detected
  const onLastStepAction = () => {
    submitFormData();
  };

  // submit form data
  const submitFormData = () => {
    // Call the mutation
    createExerciseMutation.mutate(preprocessData(data), {
      onSuccess: () => {
        // close modal
        setOpen(false);
        // show success toast
        toast({
          title: 'Success',
          description: 'Exercise created successfully',
        });
        //Reset form and navigate away
        setStepsComplete(true);
      },
    });
  };

  /**
   * Preparing data from state form payload to backend
   * respected format
   * @param data: state form data
   * @returns STATUS CODE Example: 200OK
   */
  function preprocessData(data: ExerciseCreationFormData): ExercisePayload {
    return {
      name: null,
      year: +data.periodConfig[0].split(';')[0],
      status: EXERCISE_STATUS.IN_PROGRESS,
      description: null,
      exerciseTypeId: data.exerciceType.split(';')[0],
      parentPeriodId: data.periodConfig[0].split(';')[1],
      periods: data.periodConfig,
      steps: data.steps.map((step) => ({
        status:
          step.sortedBy === 1 ? STEP_STATUS.IN_PROGRESS : STEP_STATUS.INACTIVE,
        deadlineAt: step.deadlineAt ? step.deadlineAt?.toISOString() : null,
        stepConfigId: step.stepConfigId,
      })),
    };
  }

  return (
    <React.Fragment>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" onClick={() => setOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" /> Démarrer un exercice
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px] md:max-w-[612px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
        >
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Créer un nouvel exercice</DialogTitle>
            <DialogDescription>
              Vous pouvez créer votre exercice en remplissant le formulaire
              suivant
            </DialogDescription>
          </DialogHeader>
          {/* Adding the Form Stepper */}
          <FormStepper
            // Definning steps for the Dynamic "create exercise" step form.
            steps={steps}
            currentStep={step}
            isFirstStep={step === 0}
            isLastStep={step === steps.length - 1}
            nextStep={nextStep}
            previousStep={prevStep}
            lastStepAction={onLastStepAction}
          />
        </DialogContent>
      </Dialog>
      {stepsComplete && <ExerciseSuccess />}
    </React.Fragment>
  );
}

const GuardedCreateNewExercise = withGuard(['ROLE_EXERCISE_W'])(
  CreateNewExercise
);

export default GuardedCreateNewExercise;
