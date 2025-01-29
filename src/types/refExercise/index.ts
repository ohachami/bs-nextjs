// Type definitions for RefExercise Config

interface PeriodIF {
  id: string;
  name: string;
  sortedBy: number;
  startMonth: number;
  startDay: number;
  children: PeriodIF[];
}

interface ExerciseTypeIF {
  id: string;
  name: string;
  monthOffset: number;
  horizon: string;
}

interface PeriodConfigIF {
  id: string;
  exerciseType: ExerciseTypeIF;
  parentPeriod: PeriodIF;
  period: PeriodIF;
  sortedBy: number;
  bumpYear: boolean;
}

export type { PeriodConfigIF, ExerciseTypeIF };
