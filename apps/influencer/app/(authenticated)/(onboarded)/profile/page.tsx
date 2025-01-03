import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import ProfilePage from "./_components/ProfilePage";
import { Metadata } from "next";
import { auth } from "../../../../auth";
import {
  Influencer,
  InfluencerTeamMember,
  InfluencerTeam,
  InviteStatus,
  Platform,
  TeamRole,
  User,
  UserType,
} from "@prisma/client";

export const metadata: Metadata = {
  title: "Profile | Dashboard",
  description: "Manage your profile and team settings",
};

interface InfluencerWithTeam extends Influencer {
  team?: InfluencerTeam & {
    members: (InfluencerTeamMember & {
      user: Pick<User, "id" | "name" | "email" | "image">;
    })[];
  };
}

export default async function Page() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        influencers: {
          take: 1,
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

    const currentInfluencer = user.influencers[0];
    if (!currentInfluencer) {
      redirect("/onboarding");
    }

    // Map basic user data
    const typedUser: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      emailVerified: user.emailVerified,
      userType: user.userType,
      activePortal: user.activePortal,
    };

    // Map influencer with team
    const typedInfluencer: InfluencerWithTeam = {
      ...currentInfluencer,
      team: currentInfluencer.team
        ? {
            ...currentInfluencer.team,
            members: currentInfluencer.team.members
              .filter((member) => member.userId && member.user)
              .map((member) => ({
                ...member,
                user: {
                  id: member.user!.id,
                  name: member.user!.name,
                  email: member.user!.email,
                  image: member.user!.image,
                },
              })),
          }
        : undefined,
    };

    // Get team members if team exists
    const teamMembers = typedInfluencer.team?.members || [];

    return (
      <ProfilePage
        user={typedUser}
        influencer={typedInfluencer}
        teamMembers={teamMembers}
      />
    );
  } catch (error) {
    console.error("Profile page error:", error);
    redirect("/auth/error");
  }
}
