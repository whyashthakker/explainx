// app/authenticated/brand/onboarding/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";
import MultistepBrandOnboardingForm from "./_components/OnboardingForm";

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

  // Check if user exists and fetch their brands
  const user = await prisma.user.findUnique({
    where: { email },
    include: { brands: true },
  });

  // If user has any brands, redirect to dashboard
  if (user?.brands && user.brands.length > 0) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <MultistepBrandOnboardingForm />
    </div>
  );
}
