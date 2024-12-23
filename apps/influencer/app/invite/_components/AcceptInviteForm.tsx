"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";

interface AcceptInviteFormProps {
  invite: any;
  token: string;
}

export function AcceptInviteForm({ invite, token }: AcceptInviteFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInviteAction = async (action: "accept" | "decline") => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/team/invite/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process invite");
      }

      // Redirect based on action
      if (action === "accept") {
        router.push("/authenticated/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process invite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Invitation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <p>
            null team
            <span className="font-medium">nulll's team</span>
          </p>
          <p className="text-sm text-muted-foreground">Role: role</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={() => handleInviteAction("decline")}
            disabled={isLoading}
          >
            Decline
          </Button>
          <Button
            onClick={() => handleInviteAction("accept")}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Accept Invitation"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
