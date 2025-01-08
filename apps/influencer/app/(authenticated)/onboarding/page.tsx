// app/(authenticated)/onboarding/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";
import SocialConnect from "./_components/SocialConnect";
import { UserType } from "@prisma/client";

async function getRedirectPath(user: any, teamMember: any) {
  // Check user type first
  if (
    user.userType !== UserType.INFLUENCER &&
    user.userType !== UserType.BOTH
  ) {
    return "/";
  }

  // Check team membership
  if (teamMember?.role === "MEMBER" || teamMember?.role === "ADMIN") {
    return "/team-view";
  }

  // Check if user has completed onboarding
  if (user.influencers?.length > 0 && user.influencers[0].isOnboarded) {
    return "/dashboard";
  }

  // No redirect needed - stay on onboarding
  return null;
}

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }

  try {
    // Get and update user in one query with all necessary relations
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
      include: {
        influencers: {
          include: {
            youtubeAccount: true,
            instagramAccount: true,
          },
        },
      },
    });

    if (!user) {
      redirect("/");
    }

    // Check team membership status
    const teamMember = await prisma.influencerTeamMember.findFirst({
      where: {
        userId: user.id,
        inviteStatus: "ACCEPTED",
      },
      select: {
        role: true,
      },
    });

    // Determine if we need to redirect
    const redirectPath = await getRedirectPath(user, teamMember);
    if (redirectPath) {
      redirect(redirectPath);
    }

    // If we get here, show the onboarding page
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Complete Your Profile</h1>
              <p className="mt-2 text-gray-600">
                Connect your social accounts to get started
              </p>
            </div>
            <SocialConnect />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Onboarding Error:", error);
    // Only redirect on actual errors, not redirect "errors"
    if (!(error as any)?.digest?.startsWith("NEXT_REDIRECT")) {
      redirect("/auth/error");
    }
    throw error; // Re-throw the redirect "error" for Next.js to handle
  }
}
