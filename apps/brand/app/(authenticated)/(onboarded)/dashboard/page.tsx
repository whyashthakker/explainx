// app/authenticated/brand/dashboard/page.tsx
import React from "react";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import BrandDashboard from "./_components/influencers/influencer-carousel";
import { UserType } from "@prisma/client";

export default async function BrandDashboardPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      brands: {
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

  // Check if user has brand access
  if (
    !user.brands.length ||
    user.userType === UserType.INFLUENCER ||
    (user.userType === UserType.BOTH && user.activePortal !== "BRAND")
  ) {
    redirect("/onboarding");
  }

  return <BrandDashboard />;
}
