// Type definitions for RefExercise Config

export type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
}

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

export type StepConfig = Timestamps & {
  id: string;
  name: string;
  code: string;
  iconKey: string;
  sortedBy: number;
  deadlineDay: number;
  mandatory: boolean;
}

export type RefSbu = Timestamps & {
  id: string;
  name: string;
}

export type { PeriodConfigIF, ExerciseTypeIF, PeriodIF };
