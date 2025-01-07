// app/(authenticated)/(onboarded)/collaborations/[id]/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import prisma from "@repo/db/client";
import CollaborationDetail from "../_components/CollaborationDetail";

type Params = Promise<{ id: string }>;

interface PageProps {
  params: Params;
}

export default async function CollaborationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }

  // Get user with their influencer profiles and check active portal
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      influencers: true,
    },
  });

  // Check if user exists and has proper access
  if (!user) {
    redirect("/");
  }

  // Verify user has influencer access and is in influencer portal
  if (user.userType !== "INFLUENCER" && user.userType !== "BOTH") {
    redirect("/dashboard");
  }

  // Get the active influencer profile
  const activeInfluencer = user?.influencers?.[0];
  if (!activeInfluencer) {
    redirect("/dashboard");
  }

  // Verify the collaboration belongs to this influencer
  const collaboration = await prisma.collaboration.findFirst({
    where: {
      id: id,
      influencerId: activeInfluencer.id,
    },
  });

  if (!collaboration) {
    redirect("/collaborations");
  }

  return <CollaborationDetail id={id} />;
}

// Optional: Add metadata generation if needed
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return {
    title: `Collaboration ${id}`,
    description: `Details for collaboration ${id}`,
  };
}
