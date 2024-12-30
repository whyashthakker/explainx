// app/invite/[token]/AcceptInv// components/team/AcceptInviteForm.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

export default function AcceptInviteForm({ token }: { token: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const isLoading = isPending || loading;

  async function onAction(action: "accept" | "decline") {
    setLoading(true);
    try {
      const response = await fetch(`/api/team/invite/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error("Failed to process invite");
      }

      startTransition(() => {
        if (action === "accept") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      });
    } catch (error) {
      console.error("Error processing invite:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        className="flex-1"
        disabled={isLoading}
        onClick={() => onAction("decline")}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Decline"}
      </Button>

      <Button
        className="flex-1"
        disabled={isLoading}
        onClick={() => onAction("accept")}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Accept"}
      </Button>
    </div>
  );
}
