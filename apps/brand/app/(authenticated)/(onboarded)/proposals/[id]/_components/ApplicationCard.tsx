"use client";

import { useState } from "react";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/ui/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { format } from "date-fns";
import { Application } from "../../_components/types";

export default function ApplicationCard({
  application,
}: {
  application: Application;
}) {
  const [showDialog, setShowDialog] = useState(false);
  const [status, setStatus] = useState(application.status);

  const handleStatusUpdate = async (newStatus: "ACCEPTED" | "REJECTED") => {
    try {
      const response = await fetch(
        `/api/proposals/applications/${application.id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (response.ok) {
        setStatus(newStatus);
        setShowDialog(false);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setShowDialog(true)}
      >
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={application.influencer.avatar ?? undefined} />
              <AvatarFallback>
                {application.influencer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {application.influencer.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Applied{" "}
                    {format(new Date(application.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
                <Badge
                  variant={
                    status === "ACCEPTED"
                      ? "default"
                      : status === "REJECTED"
                        ? "destructive"
                        : status === "WITHDRAWN"
                          ? "secondary"
                          : "outline"
                  }
                >
                  {status}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={application.influencer.avatar ?? undefined} />
                <AvatarFallback>
                  {application.influencer.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  {application.influencer.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Applied {format(new Date(application.createdAt), "PPP")}
                </p>
              </div>
              <Badge
                variant={
                  status === "ACCEPTED"
                    ? "default"
                    : status === "REJECTED"
                      ? "destructive"
                      : status === "WITHDRAWN"
                        ? "secondary"
                        : "outline"
                }
              >
                {status}
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Cover Letter</h4>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm whitespace-pre-wrap">
                    {application.coverLetter}
                  </p>
                </div>
              </div>

              {application.proposedTerms && (
                <div>
                  <h4 className="font-medium mb-2">Proposed Terms</h4>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm whitespace-pre-wrap">
                      {application.proposedTerms}
                    </p>
                  </div>
                </div>
              )}

              {application.proposedBudget && (
                <div>
                  <h4 className="font-medium mb-2">Proposed Budget</h4>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-lg font-semibold">
                      ${Number(application.proposedBudget).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {status === "PENDING" && (
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => handleStatusUpdate("REJECTED")}
                >
                  Reject
                </Button>
                <Button onClick={() => handleStatusUpdate("ACCEPTED")}>
                  Accept
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
