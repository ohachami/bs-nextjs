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
    ROLE_EXERCISE_LIST_R: "ROLE_EXERCISES_LIST_R",
} as const;