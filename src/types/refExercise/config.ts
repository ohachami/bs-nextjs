// Type definitions for RefExercise Config
// Used for The Exercise Section

import { CODE_SUB_STEPS } from '@/utils/constants';
import { DataVersionIF } from '../collect/datasources';

export type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};
interface PeriodsIF {
  id: string;
  period: PeriodIF;
  year: number;
}

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
  sbus: SBUS[];
}

type SBUS = Timestamps & {
  id: string;
  name: string;
};
type RefSbu = Timestamps & {
  id: string;
  name: string;
  steps?: StepConfigIF[];
};

interface RefSiteIF {
  id: string;
  name: string;
  code: string | null;
  dataVersions?: DataVersionIF[];
}

interface ProductTypeIF {
  id: string;
  name: string;
  isDisabled: boolean;
}

interface RegionTypeIF {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface ProductGroup {
  id: string;
  name: string;
  products: ProductTypeIF[];
}

export type {
  PeriodConfigIF,
  PeriodConfigV2IF,
  ExerciseTypeIF,
  PeriodIF,
  StepConfigIF,
  RefSbu,
  RefSiteIF,
  ProductTypeIF,
  RegionTypeIF,
  ProductGroup,
};

export type CodeSubStepType =
  (typeof CODE_SUB_STEPS)[keyof typeof CODE_SUB_STEPS];
