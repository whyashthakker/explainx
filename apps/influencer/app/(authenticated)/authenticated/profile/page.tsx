// app/authenticated/profile/page.tsx
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import ProfilePage from "./_components/ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Dashboard",
  description: "Manage your profile and team settings",
};

export default async function Page() {
  // Get session
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      influencer: {
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

  if (!user?.influencer) {
    redirect("/authenticated/onboarding");
  }

  // Fetch team members
  const teamMembers = user?.influencer?.team?.members || [];
  return (
    <ProfilePage
      user={user}
      influencer={user.influencer}
      teamMembers={teamMembers}
    />
  );
}
