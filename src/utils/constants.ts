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
} as const;