import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
export async function getPermissions(requiredPermissions: string[]): Promise<{ authorized: boolean; }> {
     const cookieStore = await cookies();
       const token = cookieStore.get("steerlinxJwt")
     
     if(!token) return {authorized: false};
     const decoded = jwtDecode(token.value)
     
      // @ts-expect-error permissions have been added server side
      return {authorized: decoded.permissions ? requiredPermissions.some(rp => decoded.permissions.inclues(rp)) : false }
  }