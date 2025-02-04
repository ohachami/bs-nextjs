import { permissions as Permissions } from "./constants";

// Interface defining routes permissions structure
interface RoutesIF {
    route: string;
    permissions: string[]
}

export const BASE_API = process.env.NODE_ENV === "production" ?  "/api" : "http://localhost:8080/api"


// List of client routes with their corresponding permissions
export const clientRoutes: RoutesIF[] = [
    {
        route: '/',  // open route (no restrictions)
        permissions: []
    },
    {
        route: '/showcase',  // open route (no restrictions)
        permissions: []
    },
    {
        route: '/modules/tacticalPlanning',
        permissions: []
    },
    {
        route: '/modules/tacticalPlanning/exercises',
        permissions: [Permissions.ROLE_ADMIN, Permissions.ROLE_EXERCISE_LIST_R]
    }
] as const;