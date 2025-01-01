"use client";

import { useState } from "react";
import { z } from "zod";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Mail } from "lucide-react";
import { signIn } from "../../../../auth";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormProps = {
  invite?: string;
};

export function EmailForm({ invite }: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate email
      const result = emailSchema.parse({ email });

      setIsLoading(true);

      // Submit form
      await signIn("resend", {
        email: result.email,
        redirectTo: invite ? `/invite/${invite}` : "/dashboard",
      });
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0]?.message || "Invalid email format"); // Provide a fallback string
      } else {
        setError("Failed to send login link. Please try again.");
      }
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-2">
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          placeholder="Enter your email"
          className={`w-full h-12 border-[#6366f1]/20 ${
            error ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
          disabled={isLoading}
          required
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
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
  );
}
