// app/(authenticated)/(onboarded)/layout.tsx
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import { auth } from "../../../auth";
import { PrismaUserWithBrands } from "../../../lib/types";
import BrandDashboardLayout from "./_components/BrandDashboardLayout";
import { UserProvider } from "./_context/user-context";

export default async function OnboardedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  if (user.brands.length === 0) {
    redirect("/onboarding");
  }

  // Cast the user to PrismaUserWithBrands type
  const typedUser = user as unknown as PrismaUserWithBrands;

  return (
    <UserProvider value={typedUser}>
      <BrandDashboardLayout>{children}</BrandDashboardLayout>
    </UserProvider>
  );
}
