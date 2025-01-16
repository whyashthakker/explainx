// app/authenticated/brand/onboarding/page.tsx
import { redirect } from "next/navigation";
import OnboardingForm from "./_components/OnboardingForm";
import { auth } from "../../../auth";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import prisma from "@repo/db/client";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Fetch user from database to check onboarding status
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
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
    throw new Error("User not found");
  }

  // Redirect if user is already onboarded
  if (user.isOnboarded) {
    console.log("onboarding" + user.isOnboarded);
    redirect("/dashboard");
  }

  // Check if user is an invited team member
  const isInvitedMember = user.organizationTeamMemberships.some(
    (membership) =>
      membership.role !== "OWNER" &&
      membership.inviteStatus === "ACCEPTED" &&
      membership.isInvitedDuringOnboarding,
  );

  if (isInvitedMember) {
    // Update user as onboarded if they're an invited member
    await prisma.user.update({
      where: { id: user.id },
      data: { isOnboarded: true },
    });
    redirect("/dashboard");
  }

  return (
    <div className="container max-w-6xl min-h-screen flex flex-col justify-center py-12">
      <div className="mx-auto w-full max-w-xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Complete Your Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OnboardingForm user={user} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
