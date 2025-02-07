// Type definitions for RefExercise Config
// Used for The Exercise Section

export type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

interface PeriodIF {
  id: string;
  name: string;
  sortedBy: number;
  startMonth: number;
  startDay: number;
  children: PeriodIF[];
}

// used to get exercise types
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

interface PeriodConfigV2IF {
  id: string;
  exerciseTypeName: string;
  parentPeriodId: string;
  periods: PeriodIF[];
}

// StepConfig used for the step number 3
// at the exercice step form creation process
interface StepConfigIF {
  id: string;
  name: string;
  code: string;
  iconKey: string;
  sortedBy: number;
  deadlineDay: number;
  mandatory: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type RefSbu = Timestamps & {
  id: string;
  name: string;
  steps?: StepConfigIF[];
};

interface RefSiteIF {
  id: string;
  name: string;
  code: string;
  sbu: RefSbu;
}

export type {
  PeriodConfigIF,
  PeriodConfigV2IF,
  ExerciseTypeIF,
  PeriodIF,
  StepConfigIF,
  RefSbu,
  RefSiteIF,
};
