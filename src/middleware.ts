import { NextRequest, NextResponse } from 'next/server';
import { clientRoutes } from './utils/routes';
import { decodeToken } from './utils/jwt/jose';
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
  // getting the requested url pathname
  const url = req.nextUrl.pathname;

  const cookieStore = await cookies();
  const token = cookieStore.get("steerlinxJwt")
  // decoding the JWT Token

  const JWTClaims = token ? await decodeToken(token.value) : null;
  console.log("token", JWTClaims)

  /**
   * CLIENT ROUTES PROTECTION LOGIC
   */

  // looking for the requested client route configuration
  const routeConfig = clientRoutes.find((route) => route.route === url);


  // if user is not authenticated (session null) => redirect to the login page '/'
  if (!JWTClaims) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // if user requested a URL path that's not on the Client
  // Routes list => redirect to the login page '/'
  if (!routeConfig) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // if it's an open client route (a route without restrictions)
  // procced to the requested URL path
  if (routeConfig.permissions.length === 0) {
    return NextResponse.next();
  }

  // checking if the user has the permissions to access the URL path
  const userHasAccess = routeConfig.permissions.some(
    (permission) => JWTClaims && JWTClaims.permissions.includes(permission)
  );

  // if user is authenticated but don't have a permission
  // to access the URL path => redirect to the home page '/'
  if (!userHasAccess) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Go to the requested route if every test is passed
  return NextResponse.next();
}

// Apply middleware only to API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login).*)',
  ],
  runtime: 'experimental-edge',
};
