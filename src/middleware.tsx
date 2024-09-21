import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/sign-in', '/sign-up', "/"],

  afterAuth(auth, req) {
    const { userId } = auth || {};
    const { nextUrl } = req;

    const isPublicRoute = nextUrl.pathname === '/sign-in' || nextUrl.pathname === '/sign-up' || nextUrl.pathname === '/' || nextUrl.pathname === '/store/mens';

    // If the user is not authenticated and tries to access a protected route
    if (!userId && !isPublicRoute) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // If the user is authenticated and tries to access public routes, redirect to dashboard
    if (userId && isPublicRoute) {
      return NextResponse.redirect(new URL('/dashboard/websites', req.url));
    }

    // Allow the request to continue if authenticated or public route is accessed
    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
