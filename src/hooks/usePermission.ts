import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
export function usePermissions(requiredPermissions: string[]): {authorized: boolean} {
     const session = useSession()
     // @ts-expect-error accessToken have been added server side
     const token = session.data?.accessToken
     if(!token) return {authorized: false};
     const decoded = jwtDecode(token)
     
      // @ts-expect-error permissions have been added server side
      return {authorized: decoded.permissions ? requiredPermissions.some(rp => decoded.permissions.inclues(rp)) : false }
  }