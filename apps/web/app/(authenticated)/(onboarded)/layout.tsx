// app/(authenticated)/(onboarded)/layout.tsx
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import { auth } from "../../../auth";

export default async function OnboardedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }

  // Fetch user with complete details
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isOnboarded: true,
      onboardingStep: true,
      organizationTeamMemberships: {
        select: {
          role: true,
          inviteStatus: true,
          isInvitedDuringOnboarding: true,
          team: {
            select: {
              organization: {
                select: {
                  id: true,
                  name: true,
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

  console.log(user.isOnboarded);

  // If user is not onboarded, redirect to onboarding
  if (!user.isOnboarded) {
    // Check if user is an invited team member
    const isInvitedMember = user.organizationTeamMemberships.some(
      (membership) =>
        membership.role !== "OWNER" &&
        membership.inviteStatus === "ACCEPTED" &&
        membership.isInvitedDuringOnboarding,
    );

    // If they're not an invited member, send them to onboarding
    if (!isInvitedMember) {
      redirect("/onboarding");
    }
  }

  return <>{children}</>;
}
