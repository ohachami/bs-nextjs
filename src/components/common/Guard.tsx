'use client';

import { callAsync } from '@/hooks/useAsync';
import { getPermissions } from '@/hooks/usePermission';
import { PermissionKey } from '@/types/user';
import { PropsWithChildren, useEffect, useState } from 'react';

export function Guard({
  permissions,
  children,
}: { permissions: PermissionKey[] } & PropsWithChildren) {
  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const handleAuthorization = async () => {
      const userPermissions = await callAsync<PermissionKey[]>(getPermissions);

      setAuthorized(permissions.some((rp) => userPermissions.includes(rp)));
    };

    handleAuthorization();
  }, [permissions]);

  // Check if data and authorized are available before rendering children
  return <>{authorized && children}</>;
}
