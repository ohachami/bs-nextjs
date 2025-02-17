import { PeriodIF, StepConfigIF, Timestamps } from './refExercise/config';
import { User } from './user';

export type Exercise = Timestamps & {
  id: string;
  name: string;
  target: string;
  year: number;
  status: 'IN_PROGRESS' | 'CLOSED';
  description: string;
  creator: User;
  exerciseType: ExerciseType;
  parentPeriod: PeriodIF;
  steps: ExerciseStep[];
  periods: ExercisePeriod[];
};

export type ExercisePeriod = {
  id: string;
  name: string;
  sortedBy: number;
  startMonth: number;
  startDay: number;
  children: PeriodIF[];
};

export type ExerciseType = Timestamps & {
  id: string;
  name: string;
  monthOffset: number;
  horizon: string;
};

export type ExerciseStep = Timestamps & {
  id: string;
  status: string;
  deadlineAt: Date;
  stepConfig: StepConfigIF;
  subSteps: SubSteps[];
};

export type SubSteps = Timestamps & {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  status: string;
  code: string;
  sortedBy: number;
};

export type Section = {
  id: string;
  name: string;
  code: string;
};
