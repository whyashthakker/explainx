// app/(authenticated)/(onboarded)/layout.tsx
import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import DashboardLayout from "./_components/DashboardLayout";
import { PrismaUserWithInfluencer } from "../../../lib/types";
import { UserProvider } from "./_context/user-context";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayoutWrapper({
  children,
}: LayoutProps) {
  const session = await auth();

  console.log("session for authenticated layout", JSON.stringify(session));

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
    redirect("/team-view");
  }

  if (!user.influencer) {
    redirect("/onboarding");
  }

  // Make the user data available to all child components through React Context
  return (
    <UserProvider value={user as PrismaUserWithInfluencer}>
      <DashboardLayout>{children}</DashboardLayout>
    </UserProvider>
  );
}
