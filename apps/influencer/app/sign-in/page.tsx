// app/page.tsx
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
import { auth, signIn } from "../../auth";
import { redirect } from "next/navigation";

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
      {/* <InstagramAuth /> */}
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[#2563eb]/5 blur-3xl scale-y-50 transform" />
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Logo & Header */}
        <div className="w-full max-w-md mb-8 text-center">
          <h1 className="text-[#2563eb] text-4xl font-bold mb-3">infloq</h1>
          <p className="text-[#1e293b]/80 text-lg">Connect. Create. Earn.</p>
        </div>

        {/* Main Card */}
        <Card className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-xl border-[#6366f1]/10">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-[#1e293b] text-2xl">
              {invite ? "Accept Team Invitation" : "Sign in to Infloq"}
            </CardTitle>
            <CardDescription className="text-[#1e293b]/60 text-base">
              {invite ? (
                <>
                  You've been invited to join{" "}
                  <span className="font-medium">
                    {invite.team?.influencer?.name}'s team
                  </span>
                </>
              ) : (
                "Access the leading creator monetization platform"
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Sign In Options */}
            <div className="space-y-4">
              <form
                action={async () => {
                  "use server";
                  await signIn("google", {
                    redirectTo: searchParams.invite
                      ? `/invite/${searchParams.invite}`
                      : "/dashboard",
                  });
                }}
              >
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#2563eb] hover:bg-[#2563eb]/90 text-white flex items-center justify-center gap-3 text-base font-medium"
                >
                  Continue with Google
                  {invite && (
                    <span className="text-sm opacity-75">
                      ({invite.inviteEmail})
                    </span>
                  )}
                </Button>
              </form>

              {!invite && (
                <>
                  {/* Benefits */}
                  <div className="py-6 space-y-3">
                    <div className="flex items-center gap-3 text-[#1e293b]/80">
                      <CheckCircle2 className="w-5 h-5 text-[#0ea5e9]" />
                      <span>Instant access to brand deals</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#1e293b]/80">
                      <CheckCircle2 className="w-5 h-5 text-[#0ea5e9]" />
                      <span>Analytics and performance tracking</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#1e293b]/80">
                      <CheckCircle2 className="w-5 h-5 text-[#0ea5e9]" />
                      <span>Direct payments and fast withdrawals</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#6366f1]/10">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#2563eb]">
                        50K+
                      </div>
                      <div className="text-sm text-[#1e293b]/60">Creators</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0ea5e9]">
                        100+
                      </div>
                      <div className="text-sm text-[#1e293b]/60">Brands</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#6366f1]">
                        $2M+
                      </div>
                      <div className="text-sm text-[#1e293b]/60">Paid Out</div>
                    </div>
                  </div>
                </>
              )}

              {/* Login/Register Toggle */}
              <div className="text-center">
                <Button
                  variant="link"
                  className="text-[#2563eb] hover:text-[#2563eb]/80"
                >
                  {invite
                    ? "Need to use a different account?"
                    : "Need to create an account? Sign up"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-[#1e293b]/60">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>

        {!invite && (
          <div className="mt-6 px-6 py-3 bg-[#22c55e]/10 rounded-full">
            <span className="text-[#22c55e] font-medium">
              Average creator earnings: $2,500/month
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
