// app/(authenticated)/(onboarded)/layout.tsx
import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import BrandDashboardLayout from "./_components/BrandDashboardLayout";
import { UserProvider } from "./_context/user-context";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function OnboardedLayout({ children }: LayoutProps) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      brand: {
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

  if (!user.brand) {
    redirect("/onboarding");
  }

  return (
    <UserProvider value={user}>
      <BrandDashboardLayout>{children}</BrandDashboardLayout>
    </UserProvider>
  );
}
