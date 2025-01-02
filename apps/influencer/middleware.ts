// export { auth as middleware } from "./auth";
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

// middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { auth } from "./auth";

// export async function middleware(request: NextRequest) {
//   const session = await auth();

//   if (!session) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Check if user is an influencer
//   if (session.user.userType !== "INFLUENCER") {
//     return NextResponse.redirect(new URL("/auth/unauthorized", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/profile/:path*",
//     // Add other protected routes
//   ],
// }
//
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import prisma from "@repo/db/client";
import { UserType, ActivePortal } from "@prisma/client";

export async function middleware(request: NextRequest) {
  const session = await auth();

  // No session -> redirect to login
  if (!session?.user?.id) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Get and update user in one query
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        activePortal: ActivePortal.INFLUENCER,
      },
      include: {
        influencers: {
          take: 1, // Only need to check if any exist
        },
      },
    });

    // If no user found, something's wrong with the session
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Check user type - allow INFLUENCER or BOTH
    if (
      user.userType !== UserType.INFLUENCER &&
      user.userType !== UserType.BOTH
    ) {
      return NextResponse.redirect(new URL("/auth/unauthorized", request.url));
    }

    // If no influencer profile exists and not already on onboarding page
    if (
      user.influencers.length === 0 &&
      !request.nextUrl.pathname.startsWith("/onboarding")
    ) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    // Allow access to protected routes
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/auth/error", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/campaigns/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|login|auth).*)",
  ],
};
