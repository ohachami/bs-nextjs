import { Exercise, ExercisePeriod, ExerciseStep } from '@/types/exercise';
import { STEP_STATUS } from '@/utils/constants';
import { create } from 'zustand';

interface ExerciseState {
  currentExercise: Exercise | undefined;
  exerciseStep: ExerciseStep | undefined;
  exercisePeriods: ExercisePeriod[] | undefined;
  setExercise: (value: Exercise | undefined) => void;
}

export const useExerciseStore = create<ExerciseState>((set, ) => ({
  currentExercise: undefined, // Default value
  exerciseStep: undefined,
  exercisePeriods: undefined,
  setExercise(value) {
    set({
      currentExercise: value,
      exerciseStep: value?.steps.find(
        (step) => step.status === STEP_STATUS.IN_PROGRESS
      ),
      exercisePeriods: value?.periods,
    });
  },
}));
