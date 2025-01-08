// app/(authenticated)/(onboarded)/layout.tsx
import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import DashboardLayout from "./_components/DashboardLayout";
import { UserProvider } from "./_context/user-context";
import { UserType } from "@prisma/client";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayoutWrapper({
  children,
}: LayoutProps) {
  const session = await auth();

  if (!session?.user?.email) redirect("/");

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
    include: {
      influencers: {
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

  if (!user) redirect("/");

  // Check user type
  if (
    user.userType !== UserType.INFLUENCER &&
    user.userType !== UserType.BOTH
  ) {
    redirect("/");
  }

  // Check onboarding status
  if (!user.influencers?.length) {
    console.log("No influencers");
    redirect("/onboarding");
  }

  if (!user.influencers[0]?.isOnboarded) {
    console.log("Not onboarded");
    redirect("/onboarding");
  }

  // Check team membership
  const teamMembership = await prisma.influencerTeamMember.findFirst({
    where: {
      userId: user.id,
      inviteStatus: "ACCEPTED",
    },
    include: {
      team: {
        include: {
          influencer: true,
        },
      },
    },
  });

  if (teamMembership?.role === "MEMBER" || teamMembership?.role === "ADMIN") {
    redirect("/team-view");
  }

  return (
    <UserProvider value={user}>
      <DashboardLayout>{children}</DashboardLayout>
    </UserProvider>
  );
}
