// app/(authenticated)/(onboarded)/profile/page.tsx
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import ProfilePage from "./_components/ProfilePage";
import { Metadata } from "next";
import { UserType, ActivePortal, TeamRole, InviteStatus } from "@prisma/client";

export const metadata: Metadata = {
  title: "Brand Profile | Dashboard",
  description: "Manage your brand profile and team settings",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  // Fetch user with brand data
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      brands: {
        include: {
          team: {
            include: {
              members: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      image: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    redirect("/");
  }

  // Get the active brand (currently using the first brand)
  const activeBrand = user.brands[0];

  if (!activeBrand) {
    redirect("/onboarding");
  }

  return (
    <ProfilePage
      user={user}
      brand={activeBrand}
      teamMembers={activeBrand.team?.members || []}
    />
  );
}
