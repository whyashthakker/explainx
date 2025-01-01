"use client";

import { z } from "zod";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import { handleGoogleSignIn, handleEmailSignIn } from "../_actions/actions";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type SearchParams = Promise<{
  invite?: string;
  email?: string;
}>;

type Params = Promise<{}>;

export default function CreatorSignIn(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = async (formData: FormData) => {
    setError(null);
    setIsLoading(true);

    try {
      const email = formData.get("email") as string;
      const result = emailSchema.parse({ email });

      const searchParams = await props.searchParams;
      const redirectPath = searchParams.invite
        ? `/invite/${searchParams.invite}`
        : "/dashboard";

      await handleEmailSignIn(result.email, redirectPath);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0]?.message || "Invalid email format");
      } else {
        setError("Failed to send login link. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#f8fafc] to-white">
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
              Sign in to Creator Portal
            </CardTitle>
            <CardDescription className="text-[#1e293b]/60 text-base">
              Access the leading creator monetization platform
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Google Sign In */}
              <form
                action={async () => {
                  const searchParams = await props.searchParams;
                  const redirectPath = searchParams.invite
                    ? `/invite/${searchParams.invite}`
                    : "/dashboard";
                  await handleGoogleSignIn(redirectPath);
                }}
              >
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#2563eb] hover:bg-[#2563eb]/90 text-white flex items-center justify-center gap-3 text-base font-medium"
                >
                  Continue with Google
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#6366f1]/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-[#1e293b]/60">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Email Sign In */}
              <form action={handleEmailSubmit} className="space-y-3">
                <div className="space-y-2">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`w-full h-12 border-[#6366f1]/20 ${
                      error ? "border-red-500 focus-visible:ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                    required
                  />
                  {error && (
                    <p className="text-sm text-red-500 mt-1">{error}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-white border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white flex items-center justify-center gap-3 text-base font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending link...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Continue with Email
                    </>
                  )}
                </Button>
              </form>

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
                  <div className="text-2xl font-bold text-[#2563eb]">50K+</div>
                  <div className="text-sm text-[#1e293b]/60">Creators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0ea5e9]">100+</div>
                  <div className="text-sm text-[#1e293b]/60">Brands</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#6366f1]">$2M+</div>
                  <div className="text-sm text-[#1e293b]/60">Paid Out</div>
                </div>
              </div>

              {/* Login/Register Toggle */}
              <div className="text-center">
                <Button
                  variant="link"
                  className="text-[#2563eb] hover:text-[#2563eb]/80"
                >
                  New to Infloq? Create a creator account
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

        <div className="mt-6 px-6 py-3 bg-[#22c55e]/10 rounded-full">
          <span className="text-[#22c55e] font-medium">
            Average creator earnings: $2,500/month
          </span>
        </div>
      </div>
    </main>
  );
}
