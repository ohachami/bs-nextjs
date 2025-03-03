import { PermissionKey } from "@/types/user";
import { MarketableConfig } from "./types";

export const modules = {
  marketSteering: 'marketSteering',
  tacticalPlanning: 'tacticalPlanning',
  midTermSupplyChain: 'midTermSupplyChain',
} as const;

// Constant list of permissions excpected for a user
export const permissions = {
  ROLE_ADMIN: 'ROLE_ADMIN', // Administarator Role
  ROLE_USERS_C: 'ROLE_USERS_C', // User Create Role
  ROLE_USERS_R: 'ROLE_USERS_R', // User Read Role
  ROLE_USERS_U: 'ROLE_USERS_U', // User Update Role
  ROLE_USERS_D: 'ROLE_USERS_D', // User Delete Role
  ROLE_EXERCISES_LIST_R: 'ROLE_EXERCISES_LIST_R', // Voir la liste des exercices - routes.ts
  ROLE_EXERCISE_R: 'ROLE_EXERCISE_R', // Voir les détails d'un exercice - ExerciseCard sheet
  ROLE_EXERCISE_W: 'ROLE_EXERCISE_W', // Créer un exercice - Exercise list create new exercise btn
  ROLE_HYPO_COLLECT_R: 'ROLE_HYPO_COLLECT_R', // Voir la liste des versions collectées
  ROLE_HYPO_CONSOLID_W: 'ROLE_HYPO_CONSOLID_W', // Consolider les données collectées
  ROLE_CONSO_DASHBOARD_R: 'ROLE_CONSO_DASHBOARD_R', // Visualiser les données consolidées
  ROLE_CONSO_VALIDATE_W: 'ROLE_CONSO_VALIDATE_W', // Valider une version consolidée
  ROLE_CONSO_COMPARE_R: 'ROLE_CONSO_COMPARE_R', // Comparer des versions consolidées
  ROLE_LOCAL_SCENARISATION_W: 'ROLE_LOCAL_SCENARISATION_W', // Executer des scénario locaux
  ROLE_LOCAL_SCENARIO_LIST_R: 'ROLE_LOCAL_SCENARIO_LIST_R', // Voir la liste des scénarios locaux
  ROLE_LOCAL_SCENARIO_R: 'ROLE_LOCAL_SCENARIO_R', // Voir le résultat d'un scénario local
  ROLE_USERS_LIST_R: 'ROLE_USERS_LIST_R', // Voir la liste des utilisateurs
  ROLE_USER_W: 'ROLE_USER_W', // Créer / modifier un utilisateur
  ROLE_PROFILE_LIST_R: 'ROLE_PROFILE_LIST_R', // Voir la liste des profils
  ROLE_PROFILE_W: 'ROLE_PROFILE_W', // Créer / modifier un profile
} as const;

export const requiredPermissions: {
  READ_EXERCISES_LIST: PermissionKey[],
  VIEW_EXERCISE_SHEET_DETAILS: PermissionKey[],
} = {
  READ_EXERCISES_LIST: ['ROLE_EXERCISES_LIST_R'],
  VIEW_EXERCISE_SHEET_DETAILS: ['ROLE_EXERCISE_R']
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


export const MARKETABLE_PRODUCT_TYPES: MarketableConfig[] = [{
  name: "Marketable Rock",
  colors: ["#F6D6C0", "#F0BF9D", "#E99C66", "#C28154", "#936646"]
}, {
  name: "Marketable Acid",
  colors: ["#ACEEB2", "#A8F2AF", "#8FED97", "#6DE477", "#57D762"]
}, {
  name: "Feed",
  colors: ["#57D762"]
}, {
  name: "Fertilizer",
  colors: ["#007BFF"]
}]

// rus_status
export const RUN_STATUS = {
  PENDING: "PENDING",
  RUNNING: "RUNNING",
  ERROR: "ERROR",
  DONE: "DONE"
} as const

//workflow_status
export const WORKFLOW_STATUS = {
  SHORTLISTED: "SHORTLISTED",
  VALIDATED: "VALIDATED"
} as const

export const SENARIO_TYPE = {
  EXPLORATION: "EXPLORATION",
  EXPLOITATION: "EXPLOITATION"
} as const

export const SENARIO_INPUTS_TYPE = {
  DONNEES_CONSOLIDEES: "DONNEES_CONSOLIDEES",
  SCENARIOS_EXISTANTS: "SCENARIOS_EXISTANTS"
} as const


export const getMarketableProductConfig = (name: string) => {
  return MARKETABLE_PRODUCT_TYPES.find(m => m.name.toLowerCase() === name.toLowerCase());
} 