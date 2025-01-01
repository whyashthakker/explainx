// app/invite/[token]/page.tsx
import React from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Users, CheckCircle2, XCircle } from "lucide-react";
import { auth, signIn, signOut } from "../../../auth";
import { redirect } from "next/navigation";
import { AcceptInviteForm } from "../_components/AcceptInviteForm";
import Link from "next/link";
import WrongEmailComponent from "../_components/WrongEmailComponent";

interface InvitePageProps {
  params: Promise<{ token: string }>;
}

async function getInviteDetails(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/team/invite/${token}`,
      { next: { revalidate: 0 } },
    );
    if (!response.ok) return null;
    const data = await response.json();
    console.log("response ", data);
    return data;
  } catch (error) {
    console.error("Error fetching invite:", error);
    return null;
  }
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { token } = await params;
  const session = await auth();
  const data = await getInviteDetails(token);

  // If user is not logged in, redirect to sign in
  if (!session) {
    redirect(`/register/?invite=${token}`);
  }

  if (!data) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
          <Card className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-xl border-[#6366f1]/10">
            <CardHeader className="space-y-2 text-center">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
              <CardTitle className="text-[#1e293b] text-2xl">
                Invalid Invite
              </CardTitle>
              <CardDescription className="text-[#1e293b]/60 text-base">
                This invite link is invalid or has expired
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Link href="/">
                <Button className="w-full">Return to Home</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // If user is logged in with wrong email, show error
  if (session.user?.email !== data.invite.inviteEmail) {
    return (
      <WrongEmailComponent
        inviteEmail={data.invite.inviteEmail}
        userEmail={session.user?.email}
        token={token}
        formAction={async (formData: FormData) => {
          "use server";
          await signOut();
          await signIn("google", {
            redirectTo: `/invite/${token}`,
          });
        }}
      />
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#f8fafc] to-white">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md mb-8 text-center">
          <h1 className="text-[#2563eb] text-4xl font-bold mb-3">infloq</h1>
        </div>

        <Card className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-xl border-[#6366f1]/10">
          <CardHeader className="space-y-2 text-center">
            <Users className="w-12 h-12 text-[#2563eb] mx-auto mb-2" />
            <CardTitle className="text-[#1e293b] text-2xl">
              Team Invitation
            </CardTitle>
            <CardDescription className="text-[#1e293b]/60 text-base">
              You've been invited to join the team
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Team Details */}
              <div className="p-4 bg-[#2563eb]/5 rounded-lg space-y-2">
                <div className="font-medium text-[#1e293b]">
                  {data.invite.team.influencer.name} team
                </div>
                <div className="text-sm text-[#1e293b]/60">
                  Role:{" "}
                  {data.invite?.role.charAt(0) +
                    data.invite?.role.slice(1).toLowerCase()}
                </div>
              </div>

              {/* Benefits */}
              <div className="py-4 space-y-3">
                <div className="flex items-center gap-3 text-[#1e293b]/80">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9]" />
                  <span>Access to team dashboard</span>
                </div>
                <div className="flex items-center gap-3 text-[#1e293b]/80">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9]" />
                  <span>Collaborate on campaigns</span>
                </div>
                <div className="flex items-center gap-3 text-[#1e293b]/80">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9]" />
                  <span>Team analytics and insights</span>
                </div>
              </div>

              {/* Accept/Decline Form */}
              <AcceptInviteForm token={token} invite={data.invite} />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

