'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useExerciseTypes } from '@/services/refExercise.service';
import { ExerciseTypeIF } from '@/types/refExercise/config';
import { useEffect, useState } from 'react';
import {
  horizonFormSchema,
  HorizonFormType,
} from '@/validations/exercises.create';

function HorizonForm() {
  const {
    data: exerciseTypes,
    isLoading: isExerciseTypeLoading,
    isError: isExerciseTypeError,
  } = useExerciseTypes();

  const [selectedExerciseTypeId, setSelectedExerciseTypeId] =
    useState<string>('');

  useEffect(() => {}, []);

  // react hook form instance
  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HorizonFormType>({
    // schema validation with zod
    resolver: zodResolver(horizonFormSchema),
  });

  const onSubmit = (data: HorizonFormType) => {
    console.log("Form Data:", data);
  };

  const handleButtonClick = async () => {
    const isValid = await trigger(); // Manually trigger validation

    if (isValid) {
      handleSubmit(onSubmit)(); // Manually submit the form
    }
  };


  

  return (
    <div className="space-y-6">
      {/* Type d'exercice */}
      <section className="space-y-2">
        <Label htmlFor="typeExercice">Type d&apos;exercice</Label>
        <Select {...register('exerciseType')}>
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                isExerciseTypeLoading ? 'Loading...' : 'Sélectionner un type'
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {!isExerciseTypeLoading &&
                exerciseTypes &&
                exerciseTypes.map((type: ExerciseTypeIF, key: number) => (
                  <SelectItem key={key} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.exerciseType && <p>{errors.exerciseType.message}</p>}
      </section>
      {/* Période del'exercice */}
      <section className="space-y-2">
        <Label htmlFor="typeExercice">Période de l&apos;exercice</Label>
        <Select {...register('exercisePeriod')}>
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                isExerciseTypeLoading ? 'Loading...' : 'Sélectionner un type'
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {!isExerciseTypeLoading &&
                exerciseTypes &&
                exerciseTypes.map((type: ExerciseTypeIF, key: number) => (
                  <SelectItem key={key} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.exercisePeriod && <p>{errors.exercisePeriod.message}</p>}
      </section>
      <button onClick={handleButtonClick}>validate</button>
    </div>
  );
}

export default HorizonForm;
