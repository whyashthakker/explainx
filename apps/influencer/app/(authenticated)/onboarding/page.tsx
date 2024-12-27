// app/(authenticated)/authenticated/onboarding/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";
import SocialConnect from "./_components/SocialConnect";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  // Check if user already has a profile
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      influencer: true,
    },
  });

  if (!user) {
    redirect("/");
  }

  const isInfluencerTeamMember = await prisma.influencerTeamMember.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      role: true,
    },
  });

  // If the user is a member, redirect them to the team view page
  if (
    isInfluencerTeamMember?.role === "MEMBER" ||
    isInfluencerTeamMember?.role === "ADMIN"
  ) {
    redirect("/team-view");
  }

  if (user.influencer) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <SocialConnect />
    </div>
  );
}
