// app/(authenticated)/authenticated/dashboard/page.tsx
import React from "react";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import InfluencerDashboard from "./_components/MainDashboard";
import { PrismaUserWithInfluencer } from "../../../../lib/types";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      influencer: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              image: true,
            },
          },
        },
      },
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

  if (isInfluencerTeamMember?.role === "MEMBER") {
    redirect("/authenticated/team-view");
  }

  if (!user.influencer) {
    redirect("/authenticated/onboarding");
  }

  // Type assertion here if needed
  return (
    <div>
      <InfluencerDashboard user={user as PrismaUserWithInfluencer} />
    </div>
  );
}

