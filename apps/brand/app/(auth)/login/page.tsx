"use client";

import AuthForm from "../_components/AuthForm";
import { handleGoogleSignIn, handleEmailSignIn } from "../_actions/actions";
import { AuthSearchParams } from "../../../lib/types";

interface PageProps {
searchParams: AuthSearchParams;
}

export default function LoginPage({ searchParams }: PageProps) {
return (
    <AuthForm
      mode="login"
      title="Sign in to Brand Portal"
      description="Access our network of top-tier creators"
      handleEmailAuth={handleEmailSignIn}
      handleGoogleAuth={handleGoogleSignIn}
      searchParams={searchParams}
      alternateAuthLink={{
        text: "New to Infloq? Create a brand account",
        href: "/signup",
      }}
    />
  );
}