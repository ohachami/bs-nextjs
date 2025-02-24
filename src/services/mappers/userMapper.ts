import { PermissionKey, User } from "@/types/user";

export const buildPermissionsFromCurrentUser = (currentUser: User): PermissionKey[] => {
    return currentUser && currentUser.profile && currentUser.profile.permissions ?
        currentUser.profile.permissions.map(
            (permission) => ('ROLE_' + permission.name) as PermissionKey
        ) : [];
} 