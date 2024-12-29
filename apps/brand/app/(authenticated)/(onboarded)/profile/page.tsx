// app/(authenticated)/authenticated/profile/page.tsx
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import ProfilePage from "./_components/ProfilePage";
import { Metadata } from "next";
import { User, Influencer, InfluencerTeamMember } from "../../../../lib/types";
export const metadata: Metadata = {
  title: "Profile | Dashboard",
  description: "Manage your profile and team settings",
};

interface ProfilePageProps {
  user: User & {
    influencer: Influencer | null;
  };
  influencer: Influencer;
  teamMembers: InfluencerTeamMember[];
}

export default async function Page() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email || "", // Handle null case with empty string
    },
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
    redirect("/onboarding");
  }

  // Cast the data to match our component types
  const typedUser = user as ProfilePageProps["user"];
  const typedInfluencer = user.influencer as ProfilePageProps["influencer"];
  //@ts-ignore
  const typedTeamMembers = (user?.influencer?.team?.members ||
    []) as ProfilePageProps["teamMembers"];

  return (
    <ProfilePage
      user={typedUser}
      influencer={typedInfluencer}
      teamMembers={typedTeamMembers}
    />
  );
}
