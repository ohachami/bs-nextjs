'use client';

import { callAsync } from '@/hooks/useAsync';
import { getPermissions } from '@/hooks/usePermission';
import { PermissionKey } from '@/types/user';
import { ComponentType, PropsWithChildren, useEffect, useState } from 'react';

export function withGuard(permissions: PermissionKey[]) {
  return function <P extends object>(WrappedComponent: ComponentType<P>) {
    const GuardedComponent = (props: P & PropsWithChildren) => {
      const [authorized, setAuthorized] = useState<boolean>(false);

      useEffect(() => {
        const handleAuthorization = async () => {
          const userPermissions =
            await callAsync<PermissionKey[]>(getPermissions);

          setAuthorized(permissions.some((rp) => userPermissions.includes(rp)));
        };

        handleAuthorization();
      }, []);

      // Check if data and authorized are available before rendering children
      return authorized && <WrappedComponent {...props} />;
    };

    GuardedComponent.displayName = `withGuard(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return GuardedComponent;
  };
}
