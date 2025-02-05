export const modules = {
    marketSteering: 'marketSteering',
    tacticalPlanning: 'tacticalPlanning',
    midTermSupplyChain: 'midTermSupplyChain'
} as const;

// Constant list of permissions excpected for a user
export const permissions = {
    // Administarator Role
    ROLE_ADMIN: "ROLE_ADMIN",
    // User Create Role
    ROLE_USERS_C: "ROLE_USERS_C",
    // User Read Role
    ROLE_USERS_R: "ROLE_USERS_R",
    // User Update Role
    ROLE_USERS_U: "ROLE_USERS_U",
    // User Delete Role
    ROLE_USERS_D: "ROLE_USERS_D",
    ROLE_EXERCISE_LIST_R: "ROLE_EXERCISES_LIST_R",
} as const;

// Exercice Types
export const exerciseTypes = {
    Budget: 'Budget',
    MBR: 'MBR',
    QBR: 'QBR',
    'Ad hoc': 'Ad hoc'
} as const;

// Exercice Status
export const EXERCISE_STATUS = {
    IN_PROGRESS: 'IN_PROGRESS',
    CLOSED: 'CLOSED' 
} as const;

export const STEP_STATUS = {
    DONE: 'DONE',
    INACTIVE: 'INACTIVE',
    IN_PROGRESS: 'IN_PROGRESS',
    CLOSED: 'CLOSED' 
} as const;