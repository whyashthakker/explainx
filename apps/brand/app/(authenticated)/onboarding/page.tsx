// app/authenticated/brand/onboarding/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";
import { BrandOnboardingForm } from "./_components/OnboardingForm";

export default async function BrandOnboardingPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
    return null;
  }

  const email = session.user.email;
  if (!email) {
    redirect("/login");
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: { brand: true },
  });

  if (user?.brand) {
    redirect("/authenticated/dashboard");
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Complete Your Brand Profile</h1>
        <p className="mt-2 text-gray-600">
          Tell us about your brand and ideal creator partnerships
        </p>
      </div>
      <BrandOnboardingForm />
    </div>
  );
}

