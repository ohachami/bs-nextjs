
// List of key;value api paths 
export const apiPaths = {
    exerciceTypes: () => `${BASE_API}/config/exerciseTypes`,
    periodConfig: () => `${BASE_API}/config/periodConfig`,
    periods: () => `${BASE_API}/config/periods`,
    stepConfig: () => `${BASE_API}/config/steps`,
    exercises: () => `${BASE_API}/exercises`,
    exercisesCount: () => `/exercises/count`,
    currentUser: () => `/users/current`
} as const;