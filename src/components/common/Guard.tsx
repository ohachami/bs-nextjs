'use client';

import usePermissions from '@/hooks/usePermissions';
import { PermissionKey } from '@/types/user';
import { PropsWithChildren } from 'react';

export function Guard({
  permissions,
  children,
}: { permissions: PermissionKey[] } & PropsWithChildren) {
  const { isAuthorized } = usePermissions(permissions);

  if (isAuthorized) {
    return children;
  }

  return null;
}
