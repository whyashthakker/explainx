import { MoreVertical, Mail, UserMinus, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";

interface BrandTeamMemberListProps {
  members: any[];
  onTeamUpdate: () => void;
}

export function TeamMemberList({
  members,
  onTeamUpdate,
}: BrandTeamMemberListProps) {
  const handleRemoveMember = async (memberId: string) => {
    try {
      const response = await fetch(`api/team/members/${memberId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove team member");
      }

      onTeamUpdate();
    } catch (error) {
      console.error("Error removing team member:", error);
    }
  };

  const handleRoleChange = async (memberId: string, newRole: string) => {
    try {
      const response = await fetch(`api/team/members/${memberId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      onTeamUpdate();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "OWNER":
        return "default";
      case "ADMIN":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "secondary" as const;
      case "PENDING":
        return "outline" as const;
      case "DECLINED":
        return "destructive" as const;
      default:
        return "default" as const;
    }
  };

  const getMemberDisplayName = (member: any) => {
    if (member.user?.name) return member.user.name;
    if (member.user?.email) return member.user.email;
    if (member.inviteEmail) return member.inviteEmail;
    return "Unknown Member";
  };

  const getMemberEmail = (member: any) => {
    return member.user?.email || member.inviteEmail || "No email";
  };

  const getAvatarFallback = (member: any) => {
    const displayName = getMemberDisplayName(member);
    return displayName.charAt(0).toUpperCase();
  };

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-4 rounded-lg border bg-card"
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={member.user?.image || null} />
              <AvatarFallback>{getAvatarFallback(member)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{getMemberDisplayName(member)}</div>
              <div className="text-sm text-muted-foreground">
                {getMemberEmail(member)}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant={getStatusBadgeVariant(member.inviteStatus)}>
              {member.inviteStatus}
            </Badge>
            <Badge variant={getRoleBadgeVariant(member.role)}>
              {member.role}
            </Badge>

            {member.role !== "OWNER" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {member.role !== "ADMIN" && (
                    <DropdownMenuItem
                      onClick={() => handleRoleChange(member.id, "ADMIN")}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Make Admin
                    </DropdownMenuItem>
                  )}
                  {member.role === "ADMIN" && (
                    <DropdownMenuItem
                      onClick={() => handleRoleChange(member.id, "MEMBER")}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Remove Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    <UserMinus className="mr-2 h-4 w-4" />
                    Remove Member
                  </DropdownMenuItem>
                  {member.inviteStatus === "PENDING" && (
                    <DropdownMenuItem onClick={() => {}}>
                      <Mail className="mr-2 h-4 w-4" />
                      Resend Invite
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
