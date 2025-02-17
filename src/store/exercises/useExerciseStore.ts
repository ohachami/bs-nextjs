import { Exercise, ExercisePeriod } from '@/types/exercise';
import { create } from 'zustand';

interface ExerciseState {
  currentExercise: Exercise | undefined;
  setExercise: (value: Exercise | undefined) => void;
  getExercisePeriods: () => ExercisePeriod[];
}

export const useExerciseStore = create<ExerciseState>((set, get) => ({
  currentExercise: undefined, // Default value

  setExercise(value) {
    set({ currentExercise: value });
  },

  getExercisePeriods() {
    const currentExercise = get().currentExercise;
    return currentExercise?.periods || [];
  }
}));