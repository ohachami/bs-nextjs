import { PermissionKey } from "@/types/user";

export async function getPermissions(): Promise<PermissionKey[]> {
  const response = await fetch("/api/permissions");
  const permissions = await response.json();
  return permissions;
}

