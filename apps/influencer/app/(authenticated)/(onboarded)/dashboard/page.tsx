// app/(authenticated)/dashboard/page.tsx
import React from "react";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import InfluencerDashboard from "./_components/MainDashboard";
import { UserWithProfiles } from "../../../../lib/types";

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
      influencers: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              image: true,
            },
          },
          team: true,
          collaborations: true,
          youtubeAccount: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/");
  }

  return <InfluencerDashboard user={user as UserWithProfiles} />;
}
