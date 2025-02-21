'use client';

import { buildPermissionsFromCurrentUser } from '@/services/mappers/userMapper';
import { useUser } from '@/services/users.service';
import { PermissionKey } from '@/types/user';

function usePermissions(permissions: PermissionKey[]) {
    const { data: user, isLoading, isError } = useUser();

    if (isLoading || isError) {
        return { isAuthorized: false };
    }

    if (user) {
        const userPermissions = buildPermissionsFromCurrentUser(user);
        const isAuthorized = permissions.some((rp) => userPermissions.includes(rp));
        return { isAuthorized };
    }

    return { isAuthorized: false };
}

export default usePermissions;