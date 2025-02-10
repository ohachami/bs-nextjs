import { Exercise } from '@/types/exercise';
import { create } from 'zustand';

interface ExerciseState {
  currentExercise: Exercise|undefined;
  setExercise: (value: Exercise|undefined) => void;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  currentExercise: undefined, // Default value
  setExercise(value) {
    set({ currentExercise: value });
  }
}));
