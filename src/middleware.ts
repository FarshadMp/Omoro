import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
 
  // Define paths that are protected
  const isProtectedPath = path.startsWith('/admin')
 
  // Check for auth cookie
  const authToken = request.cookies.get('auth_token')?.value
 
  // If trying to access protected path without auth token, redirect to login
  if (isProtectedPath && !authToken) {
    const url = new URL('/login', request.url)
    // Optional: Add redirect param to return after login
    // url.searchParams.set('redirect', path)
    return NextResponse.redirect(url)
  }
 
  return NextResponse.next()
}
 
// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all paths starting with /admin
     */
    '/admin/:path*',
  ],
}
