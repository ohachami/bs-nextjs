import { create } from 'zustand';
import * as z from 'zod';
import {
  deadlinesSchema,
  horizonSchema,
  // objectifsSchema,
} from '@/validations/schemas/exercises.create';

export interface StepIF {
  stepConfigId: string;
  sortedBy: number;
  deadlineAt: Date | undefined;
}

export interface ExerciseCreationFormData {
  exerciceType: string;
  periodConfig: string[];
  file: File | null;
  steps: StepIF[];
}

// Exercise Creation State Structure
interface ExerciseCreationState {
  step: number;
  data: ExerciseCreationFormData;
  errors: Record<string, string[]>;
  nextStep: () => void;
  prevStep: () => void;
  clearState: () => void;
  updateData: (values: Partial<ExerciseCreationFormData>) => void;
}

const initialState = {
  data: {
    exerciceType: '',
    periodConfig: [],
    file: null,
    steps: [],
  },
  errors: {},
  step: 0,
};

//store management
export const useExerciseCreationStore = create<ExerciseCreationState>(
  (set, get) => ({
    // initialize state data items
    data: {
      exerciceType: '',
      periodConfig: [],
      file: null,
      steps: [],
    },
    errors: {},
    step: 0,
    nextStep: () => {
      const { step, data } = get();
      try {
        switch (step) {
          case 0:
            horizonSchema.parse({
              exerciceType: data.exerciceType,
              periodConfig: data.periodConfig,
            });
            break;
          // TODO: ignore file upload validation for the moment
          // case 1:
          //   objectifsSchema.parse({ file: data.file });
          //   break;
          case 2:
            deadlinesSchema.parse({ steps: data.steps });
            break;
        }
        set({ errors: {}, step: step + 1 });
      } catch (error) {
        if (error instanceof z.ZodError) {
          // eslint-disable-next-line
          //@ts-ignore
          set({ errors: error.formErrors.fieldErrors });
        }
      }
    },
    prevStep: () => set((state) => ({ step: Math.max(0, state.step - 1) })),
    updateData: (values) =>
      set((state) => ({ data: { ...state.data, ...values } })),
    clearState: () =>
      set(() => ({
        step: initialState.step,
        data: initialState.data,
        errors: initialState.errors,
      })),
  })
);
