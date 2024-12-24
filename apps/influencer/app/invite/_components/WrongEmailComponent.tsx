"use client";
import { useState } from "react";
import { XCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";

interface WrongEmailComponentProps {
  /** The email address the invite was sent to */
  inviteEmail: string;
  /** The email address of the currently logged in user */
  userEmail: string | null | undefined;
  /** The invite token used for redirecting after sign in */
  token: string;
  /** Server action for authentication flow */
  formAction: (formData: FormData) => Promise<void>;
}

const WrongEmailComponent = ({
  inviteEmail,
  userEmail,
  token,
  formAction,
}: WrongEmailComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#f8fafc] to-white">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <Card className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-xl border-[#6366f1]/10">
          <CardHeader className="space-y-2 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
            <CardTitle className="text-[#1e293b] text-2xl">
              Wrong Email Address
            </CardTitle>
            <CardDescription className="text-[#1e293b]/60 text-base">
              This invite was sent to {inviteEmail}. You're currently signed in
              with {userEmail}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form
              action={async (formData) => {
                setIsLoading(true);
                try {
                  await formAction(formData);
                } catch (error) {
                  console.error("Authentication error:", error);
                  setIsLoading(false);
                }
              }}
            >
              <input type="hidden" name="token" value={token} />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading
                  ? "Switching accounts..."
                  : "Sign in with correct account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default WrongEmailComponent;
