// app/(authenticated)/dashboard/page.tsx
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

  // Type assertion here if needed
  return <InfluencerDashboard user={user as PrismaUserWithInfluencer} />;
}
