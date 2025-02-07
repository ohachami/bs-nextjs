import {Timestamps} from "@/types/refExercise/config";

export type DatasourceVersion = Timestamps & {
    id: string;
    version: number;
    path: string;
    name: string;
    comment: string;
}