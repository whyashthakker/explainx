"use client";

import { use } from "react";
import AuthForm from "../_components/AuthForm";
import { handleGoogleSignIn, handleEmailSignIn } from "../_actions/actions";
import { AuthSearchParams } from "../../../lib/types";

interface PageProps {
 params: Promise<{}>;
 searchParams: Promise<AuthSearchParams>;
}

export default function SignupPage(props: PageProps) {
 const params = use(props.params);
 const searchParams = use(props.searchParams);

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