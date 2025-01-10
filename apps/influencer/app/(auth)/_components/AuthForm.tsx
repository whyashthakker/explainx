"use client";

import { z } from "zod";
import React, { useState, useEffect } from "react";
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
import { AuthSearchParams } from "../../../lib/types";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

interface AuthFormProps {
  mode: "login" | "signup";
  title: string;
  description: string;
  handleEmailAuth: (email: string, redirectPath: string) => Promise<void>;
  handleGoogleAuth: (redirectPath: string) => Promise<void>;
  searchParams: AuthSearchParams;
  alternateAuthLink?: {
    text: string;
    href: string;
  };
}

export default function AuthForm({
  mode,
  title,
  description,
  handleEmailAuth,
  handleGoogleAuth,
  searchParams,
  alternateAuthLink,
}: AuthFormProps) {
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirectPath, setRedirectPath] = useState("/dashboard");

  useEffect(() => {
    const initializeRedirectPath = async () => {
      const params = await searchParams;
      if (params?.invite) {
        setRedirectPath(`/invite/${params.invite}`);
      }
    };
    initializeRedirectPath();
  }, [searchParams]);

  const handleEmailSubmit = async (formData: FormData) => {
    setError(null);
    setEmailLoading(true);

    try {
      const email = formData.get("email") as string;
      const result = formSchema.parse({ email });
      await handleEmailAuth(result.email, redirectPath);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0]?.message || "Invalid input");
      } else {
        setError(
          `Failed to ${mode === "login" ? "send login link" : "sign up"}. Please try again.`,
        );
      }
      setEmailLoading(false);
    }
  };

  const handleGoogleSubmit = async () => {
    setGoogleLoading(true);
    try {
      await handleGoogleAuth(redirectPath);
    } catch (err) {
      setError("Failed to authenticate with Google. Please try again.");
      setGoogleLoading(false);
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
          <h1 className="text-[#2563eb] text-4xl font-bold mb-3">ExplainX</h1>
          <p className="text-[#1e293b]/80 text-lg">Partner. Connect. Grow.</p>
        </div>

        {/* Main Card */}
        <Card className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-xl border-[#6366f1]/10">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-[#1e293b] text-2xl">{title}</CardTitle>
            <CardDescription className="text-[#1e293b]/60 text-base">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Google Auth */}
              <form action={handleGoogleSubmit}>
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#2563eb] hover:bg-[#2563eb]/90 text-white flex items-center justify-center gap-3 text-base font-medium"
                  disabled={googleLoading}
                >
                  {googleLoading ? (
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
                      {mode === "login" ? "Logging in" : "Signing up"} with
                      Google...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                        <path d="M1 1h22v22H1z" fill="none" />
                      </svg>
                      Continue with Google
                    </>
                  )}
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

              {/* Email Auth */}
              <form action={handleEmailSubmit} className="space-y-3">
                <div className="space-y-2">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter work email"
                    className={`w-full h-12 border-[#6366f1]/20 ${
                      error && error.includes("email")
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                    disabled={emailLoading}
                    required
                  />
                  {error && (
                    <p className="text-sm text-red-500 mt-1">{error}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-white border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white flex items-center justify-center gap-3 text-base font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={emailLoading}
                >
                  {emailLoading ? (
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
                  <span>Access to 50K+ verified creators</span>
                </div>
                <div className="flex items-center gap-3 text-[#1e293b]/80">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9]" />
                  <span>Campaign performance analytics</span>
                </div>
                <div className="flex items-center gap-3 text-[#1e293b]/80">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9]" />
                  <span>Streamlined creator collaboration</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#6366f1]/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2563eb]">50K+</div>
                  <div className="text-sm text-[#1e293b]/60">Creators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0ea5e9]">5M+</div>
                  <div className="text-sm text-[#1e293b]/60">Reach</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#6366f1]">20+</div>
                  <div className="text-sm text-[#1e293b]/60">Industries</div>
                </div>
              </div>

              {/* Login/Register Toggle */}
              {alternateAuthLink && (
                <div className="text-center">
                  <Button
                    variant="link"
                    className="text-[#2563eb] hover:text-[#2563eb]/80"
                    onClick={() =>
                      (window.location.href = alternateAuthLink.href)
                    }
                  >
                    {alternateAuthLink.text}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-[#1e293b]/60">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>

        <div className="mt-6 px-6 py-3 bg-[#22c55e]/10 rounded-full">
          <span className="text-[#22c55e] font-medium">
            Average campaign ROI: 300%+
          </span>
        </div>
      </div>
    </main>
  );
}
