// Backend URL (API CONTEXT)
export const BASE_API = process.env.NODE_ENV === "production" ?  "/api" : "http://localhost:8080/api"

// List of key;value api paths 
export const apiPaths = {
    exerciceTypes: () => `${BASE_API}/config/exerciseTypes`,
    periodConfig: () => `${BASE_API}/config/periodConfig`,
    periods: () => `${BASE_API}/config/periods`,
} as const;