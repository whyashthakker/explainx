import prisma from "@repo/db/client";
import React from "react";
import { auth } from "../../../../auth";

export default async function page() {
  // Retrieve session data
  const session = await auth();

  // Check if there is a session, if not redirect or show an error
  if (!session) {
    return <div>You must be logged in to access this page.</div>;
  }

  // Fetch the influencer team member role from the database
  const isInfluencerTeamMember = await prisma.influencerTeamMember.findFirst({
    where: {
      userId: session.user.id, // Make sure session.user.id exists
    },
    select: {
      role: true, // Selecting only the 'role' field
    },
  });

  // If the user is not part of the influencer team, show an error message
  if (!isInfluencerTeamMember) {
    return <div>You are not authorized to view this page.</div>;
  }

  // If the user is a team member, render the content
  return (
    <div>
      This is the view that is only accessible to team members. Your role:{" "}
      {isInfluencerTeamMember.role}
    </div>
  );
}
