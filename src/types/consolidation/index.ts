import { Exercise } from "../exercise";
import { RefSbu } from "../refExercise/config";

interface ConsolidationVersionsIF {
  id: string;
  name: string;
  exercise?: Exercise;
  sbu?: RefSbu;
  data?: SbuData;
  createdAt?: string; // LocalDateTime as an ISO string
  updatedAt?: string; // LocalDateTime as an ISO string
}

interface SbuData {
  values: KeyValueDTO[];
}

interface KeyValueDTO {
  key: string;
  value: string;
  suffix: string;
}

export type {
  ConsolidationVersionsIF
}