// app/collaborations/[id]/page.tsx
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

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { influencer: true },
  });

  if (!user?.influencer) {
    redirect("/dashboard");
  }

  // Verify the collaboration belongs to this influencer
  const collaboration = await prisma.collaboration.findFirst({
    where: {
      id: id,
      influencerId: user.influencer.id,
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
