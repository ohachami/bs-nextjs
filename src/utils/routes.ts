import { permissions as Permissions } from "./constants";

// Interface defining routes permissions structure
interface RoutesIF {
    route: string;
    permissions: string[]
}

// List of server routes with their corresponding permissions
export const serverRoutes: RoutesIF[] = [
    {
        route: '/api/users',
        permissions: [Permissions.ROLE_ADMIN, Permissions.ROLE_USERS_R]
    },
    {
        route: '/api/sitemap', // open route (no restrictions)
        permissions: []
    },
] as const;

// List of client routes with their corresponding permissions
export const clientRoutes: RoutesIF[] = [
    {
        route: '/',  // open route (no restrictions)
        permissions: []
    },
    {
        route: '/login',  // open route (no restrictions)
        permissions: []
    },
    {
        route: '/modules/tacticalPlanning',
        permissions: [Permissions.ROLE_ADMIN, Permissions.ROLE_USERS_R]
    }
] as const;