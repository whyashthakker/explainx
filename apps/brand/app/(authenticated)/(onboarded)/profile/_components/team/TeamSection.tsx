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
import { TeamRole, InviteStatus } from "@prisma/client";

interface TeamMember {
  id: string;
  userId: string | null;
  role: TeamRole;
  inviteStatus: InviteStatus;
  inviteEmail?: string | null;
  user?: {
    name: string | null;
    email: string;
    image: string | null;
  } | null;
}

interface BrandTeam {
  id: string;
  brandId: string;
  members: TeamMember[];
}

interface BrandTeamSectionProps {
  profileVersion?: number;
  onError?: (error: string) => void;
}

export function TeamSection({
  profileVersion = 0,
  onError,
}: BrandTeamSectionProps) {
  const [team, setTeam] = useState<BrandTeam | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  const fetchTeam = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/team`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch brand team");
      }

      setTeam(data.team);
      setError("");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch brand team";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [profileVersion]);

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
        <CardTitle>Brand Team Management</CardTitle>
        <Button
          onClick={() => setInviteDialogOpen(true)}
          disabled={
            !team?.members.some(
              (member) => member.role === "OWNER" || member.role === "ADMIN",
            )
          }
        >
          Invite Team Member
        </Button>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <TeamMemberList
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