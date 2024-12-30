// app/collaborations/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";
import CollaborationsView from "./_components/CollaborationsView";

export default async function CollaborationsPage() {
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

  return <CollaborationsView influencerId={user.influencer.id} />;
}
