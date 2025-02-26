// Define the type for the exercise payload
interface ExercisePayload {
  name: string | null;
  year: number;
  status: string | null;
  description: string | null;
  exerciseTypeId: string;
  parentPeriodId: string;
  periods?: string[];
  steps: Array<{
    stepConfigId: string;
    status: string;
    deadlineAt: string | null;
  }>;
}

export type {
  ExercisePayload
}