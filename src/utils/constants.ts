export const modules = {
  marketSteering: 'marketSteering',
  tacticalPlanning: 'tacticalPlanning',
  midTermSupplyChain: 'midTermSupplyChain',
} as const;

// Constant list of permissions excpected for a user
export const permissions = {
  // Administarator Role
  ROLE_ADMIN: 'ROLE_ADMIN',
  // User Create Role
  ROLE_USERS_C: 'ROLE_USERS_C',
  // User Read Role
  ROLE_USERS_R: 'ROLE_USERS_R',
  // User Update Role
  ROLE_USERS_U: 'ROLE_USERS_U',
  // User Delete Role
  ROLE_USERS_D: 'ROLE_USERS_D',
  ROLE_EXERCISE_LIST_R: 'ROLE_EXERCISES_LIST_R',
} as const;

// Exercice Types
export const exerciseTypes = {
  Budget: 'Budget',
  MBR: 'MBR',
  QBR: 'QBR',
  'Ad hoc': 'Ad hoc',
} as const;

// Exercice Status
export const EXERCISE_STATUS = {
  IN_PROGRESS: 'IN_PROGRESS',
  INACTIVE: 'INACTIVE',
  CLOSED: 'CLOSED',
} as const;

// step status
export const STEP_STATUS = {
  DONE: 'DONE',
  INACTIVE: 'INACTIVE',
  IN_PROGRESS: 'IN_PROGRESS',
  CLOSED: 'CLOSED',
} as const;
// code Steps
export const CODE_SUB_STEPS = {
  COLLECT: 'COLLECT',
  CONSOLIDATION: 'CONSOLIDATION',
  SCENARISATION: 'SCENARISATION',
} as const;
// step_config table codes
export const STEP_CODES = {
  VALIDATION: 'VALIDATION',
  HYP_MANU_ADJ: 'HYP_MANU_ADJ',
  HYP_SALES: 'HYP_SALES',
  REPORT: 'REPORT',
  SCENARISATION: 'SCENARISATION',
  HYP_MANU: 'HYP_MANU',
} as const;

// SBUS
export const SBUS = {
  MINING: 'Mining',
  MANUFACTURING: 'Manufacturing',
  ROCK_SOLUTIONS: 'Rock solutions',
  OCP_NUTRICROPS: 'OCP Nutricrops',
  SPS: 'SPS',
  CORPORATE: 'Corporate',
} as const;

export const SECTIONS = {
  HYPO_SALES: 'HYPO_SALES',
  HYPO_MINING: 'HYPO_MINING',
  HYPO_MANUFACTURING: 'HYPO_MANUFACTURING',
};
