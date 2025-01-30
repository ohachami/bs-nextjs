export type Period = {
    id: string;        
    name: string;
    sortedBy: number; 
    startMonth: number;
    startDay: number;
    children: Period[];  // Array of PeriodDTO for nested structure
  }