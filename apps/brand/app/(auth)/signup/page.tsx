// app/signup/page.tsx
"use client";

import AuthForm from "../_components/AuthForm";
import { handleGoogleSignIn, handleEmailSignIn } from "../_actions/actions";
import { AuthSearchParams } from "../../../lib/types";

interface PageProps {
  params: {};
  searchParams: AuthSearchParams;
}

export default function SignupPage({ searchParams }: PageProps) {
  return (
    <AuthForm
      mode="signup"
      title="Sign up to Brand Portal"
      description="Create your brand account and start collaborating with influencers"
      handleEmailAuth={handleEmailSignIn}
      handleGoogleAuth={handleGoogleSignIn}
      searchParams={searchParams}
      alternateAuthLink={{
        text: "Already have an account? Sign in",
        href: "/login",
      }}
    />
  );
}
