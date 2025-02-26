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
import { useUser } from '@/services/users.service';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ExerciseConsolidationVersionsIF } from '@/types/consolidation';
import { useSenarioCreateStore } from '@/store/senarisation/create';
import { SENARIO_INPUTS_TYPE, SENARIO_TYPE } from '@/utils/constants';
import { senarioShema } from '@/validations/schemas/senarios.create';

const LIMIT = 250;

function CreateSenario() {
  const [open, setOpen] = useState(false);
  const { currentExercise } = useExerciseStore();
  const { data: userData } = useUser();

  const { data: consoData, isLoading: isConsoDataLoading } =
    useExerciseConsolidationVersions(
      userData?.sbu ? userData.sbu.id : '',
      currentExercise?.id
    );

  const {
    type,
    name,
    input,
    description,
    consolidationInput,
    errors,
    setField,
    resetForm,
    setErrors,
  } = useSenarioCreateStore();

  const onTypeChange = (value: string) => {
    setField('type', value);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setField('name', event.target.value);
  };

  const onDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setField('description', event.target.value);
  };

  const onInputChange = (value: string) => {
    setField('input', value);
  };

  const onConsoSelect = (consoInput: string) => {
    const [id] = consoInput.split(';');
    console.log(id);
    setField('consolidationInput', id);
  };

  const onValidate = () => {
    const state = useSenarioCreateStore.getState();
    console.log('Onclick, should redirect to the senario setting component');
    console.log({ state });

    const result = senarioShema.safeParse({
      type,
      name,
      input,
      description,
      consolidationInput,
    });

    if (!result.success) {
      const errorMessages: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        console.log(err);
        if (err.path.length > 0) {
          errorMessages[err.path[0]] = err.message;
        }
      });
      setErrors(errorMessages);
      return;
    }
  };

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
          <DialogHeader>
            <DialogTitle>Nommer votre scénario</DialogTitle>
            <DialogDescription className="">
              Le nom de votre version de scénario vous aidera à la distinguer
              facilement
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-between gap-y-4">
            {/* Type */}
            <div>
              <Label htmlFor="typeSenario">Type</Label>
              <RadioGroup
                className="flex mt-3"
                defaultValue={type}
                value={type}
                onValueChange={onTypeChange}
              >
                <div className="flex flex-1 items-center space-x-2 space-y-0">
                  <RadioGroupItem value={SENARIO_TYPE.EXPLORATION} />
                  <Label>Exploration</Label>
                </div>
                <div className="flex  flex-1 items-center space-x-2 space-y-0">
                  <RadioGroupItem value={SENARIO_TYPE.EXPLOITATION} />
                  <Label>Exploitation</Label>
                </div>
              </RadioGroup>
            </div>

            {/* senario name */}
            <div>
              <Label>Nom du scénario</Label>
              <Input
                className="mt-2"
                placeholder="Nom du scénario"
                value={name}
                onChange={onNameChange}
              />
              {errors.name && (
                <p className="text-xs text-red-500 pt-2 pl-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label className="flex justify-between">
                <p>Description</p>
                <p className="text-muted-foreground text-xs">{`${description.length}/${LIMIT}`}</p>
              </Label>

              <Textarea
                className="resize-none mt-2"
                placeholder="Description de scénario vous aidera à la distinguer facilement.."
                id="description"
                value={description}
                onChange={onDescriptionChange}
              />
              {errors.description && (
                <p className="text-xs pt-2 pl-1 text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Inputs */}
            <div>
              <Label>Inputs</Label>
              <RadioGroup
                className="flex mt-3"
                defaultValue={input}
                value={input}
                onValueChange={onInputChange}
              >
                <div className="flex flex-1 items-center space-x-2 space-y-0">
                  <RadioGroupItem
                    value={SENARIO_INPUTS_TYPE.DONNEES_CONSOLIDEES}
                  />
                  <Label>Données consolidées</Label>
                </div>
                <div className="flex  flex-1 items-center space-x-2 space-y-0">
                  <RadioGroupItem
                    value={SENARIO_INPUTS_TYPE.SCENARIOS_EXISTANTS}
                  />
                  <Label>Scénario existant</Label>
                </div>
              </RadioGroup>
            </div>

            {/* select */}
            <div>
              <Select
                disabled={isConsoDataLoading}
                onValueChange={onConsoSelect}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      isConsoDataLoading ? 'Loading...' : 'Sélectionner'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {!isConsoDataLoading &&
                      consoData?.map(
                        (
                          consoInput: ExerciseConsolidationVersionsIF,
                          index: number
                        ) => {
                          return (
                            <SelectItem
                              key={index}
                              value={`${consoInput.id};${consoInput.name}`}
                            >
                              {consoInput.name}
                            </SelectItem>
                          );
                        }
                      )}
                  </SelectGroup>
                </SelectContent>
                {errors.consolidationInput && (
                  <p className="text-xs pl-1 pt-2 text-red-500">
                    {errors.consolidationInput}
                  </p>
                )}
              </Select>
            </div>
          </div>
          {/* dialog actions */}
          <div className="flex justify-between">
            <Button
              variant={'outline'}
              className="h-9 rounded-lg"
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
            >
              <X />
              <p className="text-sm font-medium">Annuler</p>
            </Button>

            <Button className="h-9 rounded-lg" onClick={onValidate}>
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
