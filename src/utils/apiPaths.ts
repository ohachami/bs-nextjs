// Backend URL (API CONTEXT)
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// List of key;value api paths 
export const apiPaths = {
    exerciceTypes: () => `${BACKEND_URL}config/exerciseTypes`,
    periodConfig: () => `${BACKEND_URL}config/periodConfig`,
} as const;