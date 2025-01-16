// app/(authenticated)/(onboarded)/profile/page.tsx
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Profile | Dashboard",
  description: "Manage your brand profile and team settings",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  return <> Done with profile</>;
}
