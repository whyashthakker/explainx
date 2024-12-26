// app/authenticated/brand/dashboard/page.tsx
import React from "react";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import BrandDashboard from "./_components/influencers/influencer-carousel";

export default async function BrandDashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { brand: true },
  });

  return <BrandDashboard />;
}