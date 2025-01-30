import { PeriodIF, StepConfig, Timestamps } from "./refExercise/config";
import { User } from "./user";

export type Exercise = Timestamps & {
    id: string;
    name: string;
    target: string;
    year: number;
    status: string;
    description: string;
    creator: User;
    exerciseType: ExerciseType;
    parentPeriod: PeriodIF;
    steps: ExerciseStep[]
}

export type ExerciseType = Timestamps & {
    id: string;
    name: string;
    monthOffset: number;
    horizon: string;
}

export type ExerciseStep = Timestamps & {
    id: string;
    status: string;
    deadlineAt: Date;
    stepConfig: StepConfig;
}

