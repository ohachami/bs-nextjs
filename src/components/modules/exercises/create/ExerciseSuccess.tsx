'use client';

import { useState } from 'react';
import { Check, CircleCheck } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useExerciseCreationStore } from '@/store/exercises/create';

function ExerciseSuccess() {
  const [open, setOpen] = useState(true);

  const { clearState } = useExerciseCreationStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px] md:max-w-[612px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
      >
        <DialogTitle></DialogTitle>
        <DialogClose onClick={clearState} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
        </DialogClose>
        <DialogDescription className="flex flex-col items-center justify-between text-center gap-4">
          <CircleCheck size={64} color="#57D762" />
          <div className="space-y-2">
            <span className="text-xl font-bold text-black">
              L&apos;exercice a été créé avec succès!
            </span>
            <br />
            <span className="text-lg">
              Votre exercice a été créé avec succès, vous pouvez maintenant
              fermer cette fenêtre contextuelle
            </span>
          </div>
          <Button
            className="h-12 rounded-lg"
            onClick={() => {
              clearState();
              setOpen(false);
            }}
          >
            <p className="text-lg font-medium">Terminer</p>
            <Check />
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default ExerciseSuccess;
