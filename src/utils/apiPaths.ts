
// List of key;value api paths 
export const apiPaths = {
    exerciceTypes: () => `/config/exerciseTypes`,
    periodConfig: () => `/config/periodConfig`,
    periods: () => `/config/periods`,
    exercisesCount: () => `/exercises/count`,
    exercises: () => `/exercises`
} as const;