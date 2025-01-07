// app/brand/proposals/_components/ProposalList.tsx
"use client";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { buttonVariants } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";
import { Decimal } from "@prisma/client/runtime/library";
import { ProposalCardProps, ProposalListProps } from "./types";
import { ApplicationStatus } from "@prisma/client";

export function ProposalList({ proposals }: ProposalListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {proposals.map((proposal) => (
        <ProposalCard key={proposal.id} proposal={proposal} />
      ))}
    </div>
  );
}

function ProposalCard({ proposal }: ProposalCardProps) {
  const activeApplications = proposal.applications.filter(
    (app) => app.status === ApplicationStatus.PENDING,
  );
  const displayedApplications = activeApplications.slice(0, 3);
  const remainingApplications = Math.max(0, activeApplications.length - 3);

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg line-clamp-1">
              {proposal.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Campaign: {proposal.campaign.title}
            </p>
          </div>
          <Link
            href={`/brand/proposals/${proposal.id}`}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "opacity-0 group-hover:opacity-100 transition-opacity",
            )}
          >
            View Details
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm line-clamp-2">{proposal.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            ${Number(proposal.budget).toLocaleString()}
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">
            {proposal.timeframe} days
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {proposal.platforms.map((platform) => (
            <Badge key={platform} variant="secondary">
              {platform}
            </Badge>
          ))}
        </div>
        {activeApplications.length > 0 ? (
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-2">
              Recent Applications ({activeApplications.length})
            </p>
            <div className="flex -space-x-2 overflow-hidden">
              {displayedApplications.map((application) => (
                <Avatar
                  key={application.id}
                  className="border-2 border-background w-8 h-8"
                >
                  <AvatarImage
                    src={application.influencer.avatar ?? undefined}
                    alt={application.influencer.name}
                  />
                  <AvatarFallback>
                    {application.influencer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {remainingApplications > 0 && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-xs border-2 border-background">
                  +{remainingApplications}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">No applications yet</p>
          </div>
        )}
        <div className="text-xs text-muted-foreground mt-4">
          Created {format(new Date(proposal.createdAt), "MMM d, yyyy")}
        </div>
      </CardContent>
    </Card>
  );
}
