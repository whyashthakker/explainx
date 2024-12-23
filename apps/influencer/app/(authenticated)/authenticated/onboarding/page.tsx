import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";
import { OnboardingForm } from "./_components/OnboardingForm";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Check if user already has a profile
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { influencer: true },
  });

  if (user?.influencer) {
    redirect("/authenticated/dashboard");
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Complete Your Profile</h1>
        <p className="mt-2 text-gray-600">
          Tell us about yourself to get started
        </p>
      </div>
      <OnboardingForm />
    </div>
  );
}
