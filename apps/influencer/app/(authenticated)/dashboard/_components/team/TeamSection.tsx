// components/team/TeamSection.tsx
"use client";

import { useEffect, useState } from "react";
import { TeamMemberList } from "./TeamMemberList";
import { InviteMemberDialog } from "./InviteMemberDialog";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";
import { Loader2 } from "lucide-react";

export function TeamSection() {
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  const fetchTeam = async () => {
    try {
      const response = await fetch("/api/team");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch team");
      }

      setTeam(data.team);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Team Management</CardTitle>
        <Button onClick={() => setInviteDialogOpen(true)}>Invite Member</Button>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <TeamMemberList
            //@ts-ignore
            members={team?.members || []}
            onTeamUpdate={fetchTeam}
          />
        )}

        <InviteMemberDialog
          open={inviteDialogOpen}
          onOpenChange={setInviteDialogOpen}
          onInviteSent={fetchTeam}
        />
      </CardContent>
    </Card>
  );
}
