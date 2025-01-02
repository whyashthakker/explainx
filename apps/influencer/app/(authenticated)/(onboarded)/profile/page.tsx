import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import ProfilePage from "./_components/ProfilePage";
import { Metadata } from "next";
import {
  Influencer,
  InfluencerTeamMember,
  InfluencerTeam,
  InviteStatus,
  Platform,
  TeamRole,
  User,
  UserType,
} from "../../../../lib/types";

export const metadata: Metadata = {
  title: "Profile | Dashboard",
  description: "Manage your profile and team settings",
};

export default async function Page() {
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
              name: true,
              createdAt: true,
              updatedAt: true,
            },
          },
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

  if (!user.influencer) {
    redirect("/onboarding");
  }
  const typedUser: User = {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    emailVerified: user.emailVerified,
    userType: user.userType as UserType | null,
  };

  // Map influencer data first without team
  const typedInfluencer: Influencer = {
    id: user.influencer.id,
    userId: user.influencer.userId,
    name: user.influencer.name,
    bio: user.influencer.bio,
    avatar: user.influencer.avatar,
    category: user.influencer.category,
    followers: user.influencer.followers,
    platforms: user.influencer.platforms as Platform[],
    user: typedUser,
    createdAt: user.influencer.createdAt,
    updatedAt: user.influencer.updatedAt,
    team: undefined, // Will be set later
  };

  // Create team if it exists
  let team: InfluencerTeam | undefined;
  if (user.influencer.team) {
    team = {
      id: user.influencer.team.id,
      influencerId: user.influencer.team.influencerId,
      createdAt: user.influencer.team.createdAt,
      updatedAt: user.influencer.team.updatedAt,
      influencer: typedInfluencer,
      members: [], // Will be populated with typed members
    };
    typedInfluencer.team = team;
  }

  // Map team members
  const typedTeamMembers: InfluencerTeamMember[] = (
    user.influencer.team?.members || []
  )
    .filter((member) => member.userId !== null && member.user)
    .map((member) => {
      const typedMemberUser: User = {
        id: member.user!.id,
        name: member.user!.name,
        email: member.user!.email,
        image: member.user!.image,
        createdAt: new Date(), // Add required fields
        updatedAt: new Date(),
        userType: null,
      };

      return {
        id: member.id,
        teamId: member.teamId,
        userId: member.userId!,
        role: member.role as TeamRole,
        inviteStatus: member.inviteStatus as InviteStatus,
        inviteToken: member.inviteToken,
        createdAt: member.createdAt,
        updatedAt: member.updatedAt,
        team: team!,
        user: typedMemberUser,
      };
    });

  // Update team members
  if (team) {
    team.members = typedTeamMembers;
    console.log(team.members);
  }
  return (
    <ProfilePage
      user={typedUser}
      influencer={typedInfluencer}
      teamMembers={typedTeamMembers}
    />
  );
}
