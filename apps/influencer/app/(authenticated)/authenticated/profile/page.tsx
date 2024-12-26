import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import ProfilePage from "./_components/ProfilePage";
import { Metadata } from "next";
import { Influencer, InfluencerTeamMember, InviteStatus, Platform, TeamRole, User, UserType } from "../../../../types";

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
      email: session.user.email 
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
            }
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
    redirect("/authenticated/onboarding");
  }

  // Map user data
  const typedUser: User = {
    id: user.id,
    email: user.email || '',
    name: user.name,
    image: user.image,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    emailVerified: user.emailVerified,
    userType: user.userType as UserType | null | undefined
  };

  // Map influencer data
  const typedInfluencer: Influencer = {
    ...user.influencer,
    platforms: (user.influencer.platforms || []) as Platform[],
    user: typedUser
  };

  // Map team members
  const typedTeamMembers: InfluencerTeamMember[] = (user.influencer.team?.members || []).map(member => ({
    id: member.id,
    userId: member.userId,
    teamId: member.teamId,
    role: member.role as TeamRole,
    inviteStatus: member.inviteStatus as InviteStatus,
    inviteToken: member.inviteToken,
    inviteEmail: member.inviteEmail,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
    user: member.user ? {
      id: member.user.id,
      name: member.user.name,
      email: member.user.email || '',
      image: member.user.image
    } : null
  }));

  return (
    <ProfilePage
      user={typedUser}
      influencer={typedInfluencer}
      teamMembers={typedTeamMembers}
    />
  );
}