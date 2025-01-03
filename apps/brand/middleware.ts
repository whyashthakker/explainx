// export { auth as middleware } from "./auth";
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import prisma from "@repo/db/client";
import { UserType, ActivePortal, TeamRole } from "@prisma/client";

export async function middleware(request: NextRequest) {
  const session = await auth();

  // No session -> redirect to login
  if (!session?.user?.id) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    console.log("middleware");
    // Get and update user in one query
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        activePortal: ActivePortal.BRAND,
      },
      include: {
        brands: {
          take: 1,
        },
        brandTeamMemberships: {
          take: 1,
          where: {
            inviteStatus: "ACCEPTED",
          },
        },
      },
    });

    // If no user found, something's wrong with the session
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Check user type - allow BRAND or BOTH
    if (user.userType !== UserType.BRAND && user.userType !== UserType.BOTH) {
      return NextResponse.redirect(new URL("/auth/unauthorized", request.url));
    }

    // Get team membership if exists
    const teamMembership = user.brandTeamMemberships[0];

    // If trying to access team-view and is OWNER, redirect to dashboard
    if (
      request.nextUrl.pathname.startsWith("/team-view") &&
      teamMembership?.role === TeamRole.OWNER
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If MEMBER or ADMIN, redirect to team-view
    if (
      teamMembership &&
      (teamMembership.role === TeamRole.MEMBER ||
        teamMembership.role === TeamRole.ADMIN)
    ) {
      if (!request.nextUrl.pathname.startsWith("/team-view")) {
        return NextResponse.redirect(new URL("/team-view", request.url));
      }
    } else if (
      // Only check for brand profile if they're not a team member or are OWNER
      user.brands.length === 0 &&
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
    "/influencer/:path*", // Added creators path for brand-specific feature
    // Exclude auth-related paths and other static/api routes
    "/((?!api|_next/static|_next/image|favicon.ico|login|signup|invite|auth|verify|callback).*)",
  ],
};
