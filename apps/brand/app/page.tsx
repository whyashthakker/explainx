import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";
import { auth, signIn } from "../auth";
import Link from "next/link";

interface SignInPageProps {
  searchParams: Promise<{
    invite?: string;
    email?: string;
  }>;
}

async function getInviteDetails(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/team/invite/${token}`,
    );
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    return null;
  }
}

export default async function Landing({ searchParams }: SignInPageProps) {
  const session = await auth();
  const params = await searchParams;
  const { invite: receivedInvite } = params;

  console.log(params);
  const invite = receivedInvite ? await getInviteDetails(receivedInvite) : null;

  // If user is logged in
  if (session) {
    // If there's an invite, redirect to invite page
    if (params.invite) {
      redirect(`/invite/${params.invite}`);
    }
    // Otherwise redirect to dashboard
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#f8fafc] to-white">
      Landing will be here , in the meantime head over to the{" "}
      <Link href="/signup">sign in page</Link>
    </main>
  );
}
