import jwt from 'jsonwebtoken';

// JWT CLAIMS structure
interface JWTClaimsIF {
  email: string;
  permissions: string[];
}

/**
 * Generate a JWT Token using claims: email & permissions
 * @param email : user email
 * @param permissions : user list of permissions
 * @returns a JWT Token
 */
export function generateToken(claims: JWTClaimsIF): string {
  return jwt.sign(claims, process.env.JWT_SECRET!, { expiresIn: '1h' });
}

/**
 * Decode a JWT Token to extract email and permissions
 * @param token : Session Token
 * @returns Decoded token payload or null if invalid
 */
export function decodeToken(token: string): JWTClaimsIF | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTClaimsIF;
    return {
      email: decoded.email,
      permissions: decoded.permissions,
    };
  } catch (error: unknown) {
    console.log('Token decoding error: ', error);
    return null;
  }
}