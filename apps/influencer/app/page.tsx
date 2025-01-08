// app/page.tsx
import React from "react";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import Link from "next/link";

type SearchParams = Promise<{
  invite?: string;
  email?: string;
}>;

type Params = Promise<{}>;

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

export default async function SignIn(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const session = await auth();
  const searchParams = await props.searchParams;
  const { invite: receivedInvite } = searchParams;

  console.log(searchParams);
  const invite = receivedInvite ? await getInviteDetails(receivedInvite) : null;

  // If user is logged in
  if (session) {
    // If there's an invite, redirect to invite page
    if (searchParams.invite) {
      redirect(`/invite/${searchParams.invite}`);
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
