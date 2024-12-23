import React from "react";
import { auth, signOut } from "../../../../auth";
import { TeamSection } from "./_components/team/TeamSection";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";

export default async function page() {
  // Retrieve the session data
  const session = await auth();

  // Ensure the session exists
  if (!session) {
    redirect("/login"); // Redirect to login if session is not available
  }

  // Fetch user data based on the session email
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { influencer: true },
  });

  // Check if the user is part of the influencer team and get their role
  const isInfluencerTeamMember = await prisma.influencerTeamMember.findFirst({
    where: {
      userId: session.user.id,
    },
    select: {
      role: true,
    },
  });

  // If the user is a member, redirect them to the team view page
  if (isInfluencerTeamMember?.role === "MEMBER") {
    redirect("/authenticated/team-view");
  }

  // If the user doesn't have an influencer profile, redirect to onboarding
  if (!user?.influencer) {
    redirect("/authenticated/onboarding");
  }

  // Render the page if no redirects occurred
  return (
    <div>
      <h1>Protected Page</h1>
      <TeamSection />

      <form
        action={async () => {
          "use server";
          await signOut(); // Sign out the user
          redirect("/login"); // Optionally redirect after sign-out
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
