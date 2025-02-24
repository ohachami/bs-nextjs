import { Exercise } from '../exercise';
import { RefSbu } from '../refExercise/config';

interface ConsolidationVersionsIF {
  id: string;
  name: string;
  exercise?: Exercise;
  sbu?: RefSbu;
  data?: SbuData;
  createdAt?: string; // LocalDateTime as an ISO string
  updatedAt?: string; // LocalDateTime as an ISO string
}

interface ExerciseConsolidationVersionsIF {
  id: string;
  name: string;
  consolidatedData: {
    id: string;
    name: string;
    sbuId: string;
    dataVersions?: {
      id: string;
      name: string;
    }[];
  }[];
}

interface SbuData {
  values: KeyValueDTO[];
}

interface KeyValueDTO {
  key: string;
  value: string;
  suffix: string;
}

export type { ConsolidationVersionsIF, ExerciseConsolidationVersionsIF };
