export { auth as middleware } from "./auth";
// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { auth } from '@/lib/auth'

// export async function middleware(request: NextRequest) {
//   const session = await auth()

//   // Protect authenticated routes
//   if (request.nextUrl.pathname.startsWith('/authenticated') && !session) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   // Redirect logged in users from auth pages
//   if (session && (
//     request.nextUrl.pathname === '/login' ||
//     request.nextUrl.pathname === '/register'
//   )) {
//     return NextResponse.redirect(new URL('/authenticated/dashboard', request.url))
//   }
// }

// export const config = {
//   matcher: ['/authenticated/:path*', '/login', '/register', '/onboarding']
// }
