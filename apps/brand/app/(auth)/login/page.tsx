"use client";

import { use } from "react";
import AuthForm from "../_components/AuthForm";
import { handleGoogleSignIn, handleEmailSignIn } from "../_actions/actions";
import { AuthSearchParams } from "../../../lib/types";

interface PageProps {
  params: Promise<{}>;
  searchParams: Promise<AuthSearchParams>;
}

export default function LoginPage(props: PageProps) {
  const params = use(props.params);
  const searchParams = use(props.searchParams);

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