import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";
import CollaborationsView from "./_components/CollaborationsView";
import { UserType } from "../../../../lib/types";

export default async function CollaborationsPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      influencers: true,
    },
  });

  if (!user) {
    redirect("/");
  }

  // Check if user exists and is in influencer portal
  if (user.userType !== UserType.INFLUENCER || UserType.BOTH) {
    redirect("/dashboard");
  }

  // Get the first influencer profile
  const currentInfluencer = user.influencers[0];

  if (!currentInfluencer) {
    redirect("/dashboard");
  }

  return <CollaborationsView influencerId={currentInfluencer.id} />;
}
