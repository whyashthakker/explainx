"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/ui/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { DollarSign, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ProposalPageProps } from "../../_components/types";
import prisma, { ApplicationStatus } from "@repo/db/client";
import ApplicationCard from "./ApplicationCard";

export default function ProposalPage({ proposal }: ProposalPageProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const filteredApplications = proposal.applications.filter((app) =>
    selectedStatus === "ALL" ? true : app.status === selectedStatus,
  );

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <Badge variant="outline">{proposal.status}</Badge>
          <span className="text-sm text-muted-foreground">
            Campaign: {proposal.campaign.title}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{proposal.title}</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">
              ${Number(proposal.budget).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{proposal.timeframe} days</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Created {format(new Date(proposal.createdAt), "MMM d, yyyy")}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{proposal.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {proposal.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                {proposal.requirements && proposal.requirements.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">
                      Additional Requirements
                    </h3>
                    <ul className="list-disc pl-4 space-y-1">
                      {proposal.requirements.map(
                        (requirement: any, index: number) => (
                          <li key={index}>{requirement}</li>
                        ),
                      )}
                    </ul>
                  </div>
                )}{" "}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={proposal.campaign.brand.logo ?? undefined}
                  />
                  <AvatarFallback>
                    {proposal.campaign.brand.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">
                    {proposal.campaign.brand.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {proposal.campaign.brand.industry}
                  </p>
                </div>
              </div>
              {proposal.campaign.brand.description && (
                <p className="text-sm">{proposal.campaign.brand.description}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            Applications ({filteredApplications.length})
          </h2>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="ACCEPTED">Accepted</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      </div>
    </div>
  );
}
