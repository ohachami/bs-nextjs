'use client';
import FormStepper from '@/components/common/FormStepper';
import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import HorizonForm from './HorizonForm';
import ObjectifsForm from './ObjectifsForms';
import DeadlinesForm from './DeadlinesForm';
import { Step } from '@/types/common/FormStepperTypes';

/**
 * Definning steps for the Dynamic "create exercise" step form.
 */
const steps: Step[] = [
  {
    id: 'horizon',
    label: 'Informations générales',
    component: <HorizonForm/>,
    // onNext: async () => {
    //   // Validate form or perform any action
    //   const isValid = await validateHorizonForm();
    //   return isValid;
    // }
  },
  {
    id: 'objectifs',
    label: 'Objectifs',
    component: <ObjectifsForm/>,
    // onNext: () => {
    //   // Synchronous validation is also supported
    //   return validateObjectifs();
    // }
  },
  {
    id: 'deadlines',
    label: 'Deadlines',
    component: <DeadlinesForm/>
  }
]

function CreateNewExercise() {
  const [open, setOpen] = useState(false);

  return (
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
          steps={steps}
          onComplete={() => {
            // Handle form completion
            console.log('Form completed!');
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewExercise;
