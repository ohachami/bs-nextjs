// Define the type for the exercise payload
interface ExercisePayload {
  name: string;
  year: number;
  status: string;
  description: string;
  exerciseType: {
    id: string;
  };
  parentPeriod: {
    id: string;
  };
  steps: Array<{
    status: string;
    deadlineAt: string;
    stepConfig: {
      id: string;
    };
  }>;
}

export type {
  ExercisePayload
}