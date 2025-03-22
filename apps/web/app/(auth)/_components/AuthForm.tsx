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
import { ArrowRight, CheckCircle2, Mail, ChevronRight } from "lucide-react";
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

export default function BlackYellowAuthForm({
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
      try {
        const params = await searchParams;
        if (params?.invite) {
          setRedirectPath(`/invite/${params.invite}`);
        }
      } catch (error) {
        console.error("Error processing searchParams:", error);
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
    <main className="min-h-screen w-full bg-black">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-secondaccent2/20 blur-3xl transform" />
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Two-column layout for desktop */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl">
          {/* Left Column - Branding & Benefits */}
          <div className="w-full md:w-5/12 bg-secondaccent p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h1 className="text-black text-3xl md:text-4xl font-bold mb-3">ExplainX</h1>
              <p className="text-black/80 text-lg mb-12">Partner. Connect. Grow.</p>

              <div className="space-y-6 mb-12">
                <h2 className="text-black text-xl font-semibold">Why choose us?</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-black">
                    <CheckCircle2 className="w-6 h-6 text-black" />
                    <span className="font-medium">50K+ verified creators network</span>
                  </div>
                  <div className="flex items-center gap-3 text-black">
                    <CheckCircle2 className="w-6 h-6 text-black" />
                    <span className="font-medium">Advanced analytics dashboard</span>
                  </div>
                  <div className="flex items-center gap-3 text-black">
                    <CheckCircle2 className="w-6 h-6 text-black" />
                    <span className="font-medium">Streamlined collaboration tools</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="px-6 py-3 bg-black/10 rounded-lg inline-block">
                <span className="text-black font-semibold">Average campaign ROI: 300%+</span>
              </div>
            </div>
          </div>

          {/* Right Column - Auth Form */}
          <div className="w-full md:w-7/12 bg-black p-8 md:p-12">
            <div className="max-w-md mx-auto">
              <CardHeader className="space-y-2 px-0">
                <CardTitle className="text-secondaccent text-2xl md:text-3xl font-bold">{title}</CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  {description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-0 pt-6">
                {/* Email Auth - Prioritized */}
                <form action={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your work email"
                      className={`w-full h-12 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-secondaccent ${
                        error && error.includes("email")
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                      disabled={emailLoading}
                      required
                    />
                    {error && (
                      <p className="text-sm text-red-400 mt-1">{error}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-secondaccent hover:bg-secondaccent2 text-black flex items-center justify-center gap-3 text-base font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black px-2 text-gray-400">
                      Or
                    </span>
                  </div>
                </div>

                {/* Google Auth */}
                <form action={handleGoogleSubmit}>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 flex items-center justify-center gap-3 text-base font-medium"
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
                        {mode === "login" ? "Logging in" : "Signing up"} with Google...
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
                        Sign in with Google
                      </>
                    )}
                  </Button>
                </form>

                {/* Stats in horizontal layout */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-800 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondaccent">50K+</div>
                    <div className="text-sm text-gray-400">Creators</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondaccent">5M+</div>
                    <div className="text-sm text-gray-400">Reach</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondaccent">20+</div>
                    <div className="text-sm text-gray-400">Industries</div>
                  </div>
                </div>

                {/* Login/Register Toggle */}
                {alternateAuthLink && (
                  <div className="text-center pt-4">
                    <Button
                      variant="link"
                      className="text-secondaccent hover:text-yellow-300"
                      onClick={() =>
                        (window.location.href = alternateAuthLink.href)
                      }
                    >
                      {alternateAuthLink.text}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}

                {/* Terms Notice */}
                <div className="text-center text-xs text-gray-500 mt-4">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}