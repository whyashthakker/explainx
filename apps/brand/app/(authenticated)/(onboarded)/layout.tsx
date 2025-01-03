// app/(authenticated)/(onboarded)/layout.tsx
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import { auth } from "../../../auth";
import { UserType } from "@prisma/client";
import { PrismaUserWithBrands } from "../../../lib/types";
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

  if (!user.brands.length) {
    redirect("/onboarding");
  }

  return (
    <UserProvider value={user as PrismaUserWithBrands}>
      <BrandDashboardLayout>{children}</BrandDashboardLayout>
    </UserProvider>
  );
}
