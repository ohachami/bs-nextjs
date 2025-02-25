'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Check, PlusIcon, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { useExerciseConsolidationVersions } from '@/services/consolidation.service';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
// import Loading from '@/app/loading';
import { useUser } from '@/services/users.service';
import { useExercises } from '@/services/exercises.service';

//TODO:  handel errors and loadig state of queries
function CreateSenario() {
  const [open, setOpen] = useState(true); // false
  const [senarioName, setSenarioName] = useState('');
  //   const { currentExercise } = useExerciseStore();
  //   const { data: userData } = useUser();
  const { data: consoData } = useExerciseConsolidationVersions(
    '0a218efb-87e8-4bfc-aad9-d195a4e29d43',
    'f45a1c0b-af91-413d-98cd-0ae5d849d179'
  );

  //   console.log({ userData });
  //   console.log({ currentExercise });
  //   const { data: exercises, isLoading, isError, isSuccess } = useExercises();

  //   console.log({ currentExercise });

  return (
    <React.Fragment>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            onClick={() => {
              setOpen(true);
            }}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Ajouter un scénario
          </Button>
        </DialogTrigger>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
          }}
        >
          {}
          <DialogHeader>
            <DialogTitle>Nommer votre scénario</DialogTitle>
            <DialogDescription>
              Le nom de votre version de scénario vous aidera à la distinguer
              facilement
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-between gap-y-4">
            {/* Type */}
            <div>
              <Label>Type</Label>
              <RadioGroup
                className="flex mt-3"
                defaultValue="2"
                onValueChange={(value) => {
                  console.log({ value });
                }}
              >
                <div className="flex flex-1 items-center space-x-2 space-y-0">
                  <RadioGroupItem value="1" />
                  <Label>Exploration</Label>
                </div>
                <div className="flex  flex-1 items-center space-x-2 space-y-0">
                  <RadioGroupItem value="2" />
                  <Label>Exploitation</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Nom du scénario</Label>
              <Input
                className=""
                placeholder=""
                value={senarioName}
                onChange={(e) => setSenarioName(e.target.value)}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Description de scénario vous aidera à la distinguer facilement.."
                id="description"
              />
            </div>

            {/* Inputs */}
            <div>
              <Label>Inputs</Label>
              <RadioGroup
                className="flex mt-3"
                defaultValue="1"
                onValueChange={(value) => {
                  console.log({ value });
                }}
              >
                <div className="flex flex-1 items-center space-x-2 space-y-0">
                  <RadioGroupItem value="1" />
                  <Label>Données consolidées</Label>
                </div>
                <div className="flex  flex-1 items-center space-x-2 space-y-0">
                  <RadioGroupItem value="2" />
                  <Label>Scénario existant</Label>
                </div>
              </RadioGroup>
            </div>
            <Input />
          </div>
          {/* dialog actions */}
          <div className="flex justify-between">
            <Button
              variant={'outline'}
              className="h-12 rounded-lg"
              onClick={() => {
                console.log('valider button clicked');
              }}
            >
              <X />
              <p className="text-sm font-medium">Annuler</p>
            </Button>

            <Button
              className="h-12 rounded-lg"
              onClick={() => {
                console.log('valider button clicked');
              }}
            >
              <p className="text-sm font-medium">Valider</p>
              <Check />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default CreateSenario;
