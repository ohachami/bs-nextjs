export type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
}

export type Period = Timestamps & {
  id: string;
  name: string;
  sortedBy: number;
  startMonth: number;
  startDay: number;
  children: Period[];  // Array of PeriodDTO for nested structure
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

