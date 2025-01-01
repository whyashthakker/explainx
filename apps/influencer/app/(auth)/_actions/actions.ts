// app/(creator)/signin/actions.ts
"use server";

import { signIn } from "../../../auth";

export async function handleGoogleSignIn(redirectPath: string) {
  await signIn("google", { redirectTo: redirectPath });
}

export async function handleEmailSignIn(email: string, redirectPath: string) {
  await signIn("resend", {
    email,
    userType: "INFLUENCER",
    redirectTo: redirectPath,
  });
}
