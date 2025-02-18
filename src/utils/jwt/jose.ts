import { JWTPayload } from 'jose';
import { jwtDecode, JwtPayload } from "jwt-decode";

// JWT CLAIMS structure
interface JWTClaimsIF extends JWTPayload {
  email: string;
  permissions: string[];
}


/**
 * Decode a JWT Token to extract email and permissions
 * @param token : Session Token
 * @returns Decoded token payload or null if invalid
 */
export async function decodeToken(token: string): Promise<JWTClaimsIF | null> {
  try {
    const payload: JwtPayload & {permissions?: string[]} = jwtDecode(token);
    
    return {
      email: payload.sub as string,
      permissions: payload.permissions as string[]
    };
  } catch (error: unknown) {
    console.error('Token decoding error: ', error);
    return null;
  }
}