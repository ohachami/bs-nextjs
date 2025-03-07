'use client';
import React, { FC, useEffect, useState } from 'react';
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
import { useExerciseConsolidationVersions } from '@/services/consolidation.service';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import { useUser } from '@/services/users.service';
import { ExerciseConsolidationVersionsIF } from '@/types/consolidation';
import { SENARIO_INPUTS_TYPE, SENARIO_TYPE } from '@/utils/constants';
import FormInput from '../ui/formInput';
import { FormSelect } from '../ui/formSelect';
import FormTextarea from '../ui/form-texarea';
import FormRadioGroup from '../ui/form-radiogroupe';
import { useScenarisationStore } from '@/store/exercises/scenarisation';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/validations/schemas/scenario.schemas';

interface PropsIF {
  form: UseFormReturn<FormValues>;
}

const CreateSenario: FC<PropsIF> = ({ form }) => {
  const [open, setOpen] = useState(false);
  const { currentExercise } = useExerciseStore();
  const { data: userData } = useUser();
  const { setlistScenarios } = useScenarisationStore();

  const { data: consoData, isLoading: isConsoDataLoading } =
    useExerciseConsolidationVersions(
      userData?.sbu ? userData.sbu.id : '',
      currentExercise?.id
    );

  const onValidate = () => {
    setlistScenarios();
    form.reset();
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
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
        <DialogHeader>
          <DialogTitle>Nommer votre scénario</DialogTitle>
          <DialogDescription className="">
            Le nom de votre version de scénario vous aidera à la distinguer
            facilement
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-between gap-y-4">
          {/* Type */}
          <FormRadioGroup
            name="type"
            label="Type"
            control={form.control}
            options={[
              {
                value: SENARIO_TYPE.EXPLORATION,
                label: 'Exploration',
              },
              {
                value: SENARIO_TYPE.EXPLOITATION,
                label: 'Exploitation',
              },
            ]}
          />

          {/* senario name */}
          <div>
            <FormInput
              className="text-sm"
              control={form.control}
              name="name"
              label="Nom du scénario"
              placeholder="Nom du scénario"
            />
          </div>

          {/* senario description */}
          <div>
            <FormTextarea
              limit={250}
              className="text-sm"
              control={form.control}
              name="description"
              label="Description"
              placeholder="Description de scénario vous aidera à la distinguer facilement.."
            />
          </div>

          {/* Inputs */}
          <div>
            <FormRadioGroup
              name="input"
              label="Inputs"
              control={form.control}
              options={[
                {
                  value: SENARIO_INPUTS_TYPE.DONNEES_CONSOLIDEES,
                  label: 'Données consolidées',
                },
                {
                  value: SENARIO_INPUTS_TYPE.SCENARIOS_EXISTANTS,
                  label: 'Scénario existant',
                },
              ]}
            />
          </div>

          {/* select */}
          <div>
            <FormSelect
              name="consolidated_data_id"
              label=""
              placeholder={isConsoDataLoading ? 'Loading...' : 'Sélectionner'}
              options={
                consoData?.map((item: ExerciseConsolidationVersionsIF) => ({
                  value: item.id,
                  label: item.name,
                })) ?? []
              }
            />
          </div>
        </div>

        {/* dialog actions */}
        <div className="flex justify-between">
          <Button
            variant={'outline'}
            className="h-9 rounded-lg"
            onClick={() => {
              setOpen(false);
            }}
          >
            <X className="w-4 h-4" />
            <p className="text-sm font-medium">Annuler</p>
          </Button>

          <Button
            className="h-9 rounded-lg"
            onClick={onValidate}
            // disabled={!form.formState.isValid}
          >
            <p className="text-sm font-medium">Scénarisation</p> <Check />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSenario;
