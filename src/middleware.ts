
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {auth} from './lib/firebase';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const isAuthenticated = auth.currentUser !== null;
  const { pathname } = request.nextUrl;

  // Allow requests for /login to proceed
  if (pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // If the user is not authenticated and trying to access an app route, redirect to login
  if (!isAuthenticated && pathname.startsWith('/app')) {
    // return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/app/:path*', '/login'],
};
