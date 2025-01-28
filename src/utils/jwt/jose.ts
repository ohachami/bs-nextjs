import { JWTPayload, SignJWT, jwtVerify } from 'jose';

// JWT CLAIMS structure
interface JWTClaimsIF extends JWTPayload {
  email: string;
  permissions: string[];
}

/**
 * Generate a JWT Token using claims: email & permissions
 * @param claims : JWT claims object
 * @returns a JWT Token
 */
export async function generateToken(claims: JWTClaimsIF): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return await new SignJWT(claims)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);
}

/**
 * Decode a JWT Token to extract email and permissions
 * @param token : Session Token
 * @returns Decoded token payload or null if invalid
 */
export async function decodeToken(token: string): Promise<JWTClaimsIF | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    return {
      email: payload.email as string,
      permissions: payload.permissions as string[]
    };
  } catch (error: unknown) {
    console.log('Token decoding error: ', error);
    return null;
  }
}