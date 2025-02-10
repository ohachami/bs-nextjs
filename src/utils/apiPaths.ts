

// List of key;value api paths 
export const apiPaths = {
    exerciceTypes: () => `/config/exerciseTypes`,
    periodConfig: () => `/config/periodConfig`,
    periods: () => `/config/periods`,
    stepConfig: () => `/config/steps`,
    exercises: () => `/exercises`,
    exercisesCount: () => `/exercises/count`,
    currentUser: () => `/users/current`,
    regions: () => `/referential/regions`,
    products: () => `/referential/products`,

    dashboardSections: (stepId: string) => `/dashboard/steps/${stepId}/sections`,
} as const;
