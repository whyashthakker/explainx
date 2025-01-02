// app/(authenticated)/(onboarded)/layout.tsx
import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import DashboardLayout from "./_components/DashboardLayout";
import { UserProvider } from "./_context/user-context";
import { UserType, ActivePortal } from "@prisma/client";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayoutWrapper({
  children,
}: LayoutProps) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  try {
    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        activePortal: ActivePortal.INFLUENCER,
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

    if (!user) {
      redirect("/");
    }

    if (
      user.userType !== UserType.INFLUENCER &&
      user.userType !== UserType.BOTH
    ) {
      redirect("/auth/unauthorized");
    }

    if (!user.influencers || user.influencers.length === 0) {
      redirect("/onboarding");
    }

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

    if (teamMembership?.role === "MEMBER") {
      redirect("/team-view");
    }

    return (
      <UserProvider value={user}>
        <DashboardLayout>{children}</DashboardLayout>
      </UserProvider>
    );
  } catch (error) {
    console.error("Layout Error:", error);
    redirect("/auth/error");
  }
}
