'use client';

import usePermissions from '@/hooks/usePermissions';
import { PermissionKey } from '@/types/user';
import { ComponentType, PropsWithChildren } from 'react';

export function withGuard(permissions: PermissionKey[]) {
  return function <P extends object>(WrappedComponent: ComponentType<P>) {
    const GuardedComponent = (props: P & PropsWithChildren) => {
      const { isAuthorized } = usePermissions(permissions);

      if (isAuthorized) {
        return <WrappedComponent {...props} />;
      }

      return null;
    };

    GuardedComponent.displayName = `withGuard(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return GuardedComponent;
  };
}
