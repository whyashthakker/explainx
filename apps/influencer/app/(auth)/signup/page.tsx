"use client";

import AuthForm from "../_components/AuthForm";
import { handleGoogleSignIn, handleEmailSignIn } from "../_actions/actions";
import { AuthSearchParams } from "../../../lib/types";

interface PageProps {
  searchParams: AuthSearchParams;
}

export default function SignupPage({ searchParams }: PageProps) {
  return (
    <AuthForm
      mode="signup"
      title="Create your Influencer Account"
      description="Join thousands of successful influencers"
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
