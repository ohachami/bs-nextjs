import { NextRequest, NextResponse } from 'next/server';
import { getMockSession } from './utils/mocks';
import { clientRoutes, serverRoutes } from './utils/routes';
import { decodeToken } from './utils/jwt/jose';


export async function middleware(req: NextRequest) {
  // getting the session data
  // TODO: update the mocked session with the real one "getSession" found in '@/utils/auth'
  const session = await getMockSession();
  // getting the requested url pathname
  const url = req.nextUrl.pathname;
  
  // decoding the JWT Token
  const JWTClaims = await decodeToken(session.accessToken);

  

  /**
   * API ROUTES PROTECTION LOGIC
   */
  if (url.startsWith('/api/')) {
    // if user is not authenticated (session null)
    if (!session || (session && !JWTClaims)) {
      return NextResponse.json({ error: `UNAUTHORIZED` }, { status: 401 });
    }

    // looking for the requested server route configuration
    const routeConfig = serverRoutes.find((route) => route.route === url);

    if (!routeConfig) {
      return NextResponse.json({ error: `BAD_REQUEST` }, { status: 400 });
    }

    // if it's an open server route (a route without permissions restrictions, but still needs authentication)
    // procced to the requested URL path
    if (routeConfig.permissions.length === 0) {
      return NextResponse.next();
    }

    // checking if the user has at least one of the api route permissions
    const userHasAccess = routeConfig.permissions.some(
      (permission) => JWTClaims && JWTClaims.permissions.includes(permission)
    );

    if (!userHasAccess) {
      return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
    }

    // Go to the requested route if every test is passed
    return NextResponse.next();
  }

  /**
   * CLIENT ROUTES PROTECTION LOGIC
   */

  // looking for the requested client route configuration
  const routeConfig = clientRoutes.find((route) => route.route === url);

  // if user is not authenticated (session null) => redirect to the login page '/'
  if (!session || (session && !JWTClaims)) {
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
