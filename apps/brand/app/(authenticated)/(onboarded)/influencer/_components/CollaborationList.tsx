"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { MessageSquare, DollarSign, Calendar } from "lucide-react";

interface Collaboration {
  id: string;
  status: "PENDING" | "ACCEPTED" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  terms: string;
  compensation: number;
  createdAt: string;
  campaign: {
    title: string;
    description: string;
    status: "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED";
  };
  chatRoom?: {
    messages: {
      content: string;
      createdAt: string;
    }[];
  };
}

interface CollaborationListProps {
  influencerId: string;
  refreshTrigger?: number;
}

export function CollaborationList({
  influencerId,
  refreshTrigger = 0,
}: CollaborationListProps) {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollaborations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/collaborations/${influencerId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch collaborations");
        }
        const data = await response.json();
        setCollaborations(data);
      } catch (err) {
        setError("Failed to load collaborations");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollaborations();
  }, [influencerId, refreshTrigger]); // Add refreshTrigger to dependencies

  const getStatusColor = (status: Collaboration["status"]) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      ACCEPTED: "bg-blue-100 text-blue-800",
      ACTIVE: "bg-green-100 text-green-800",
      COMPLETED: "bg-purple-100 text-purple-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Collaborations</CardTitle>
          <CardDescription>Loading collaborations...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Collaborations</CardTitle>
          <CardDescription className="text-red-500">{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Collaborations</CardTitle>
        <CardDescription>
          Your collaboration history with this influencer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {collaborations.length === 0 ? (
            <p className="text-center text-gray-500">
              No collaborations found with this influencer
            </p>
          ) : (
            <div className="space-y-4">
              {collaborations.map((collab) => (
                <Card key={collab.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">
                            {collab.campaign.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {collab.campaign.description}
                          </p>
                        </div>
                        <Badge className={getStatusColor(collab.status)}>
                          {collab.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            ${collab.compensation.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            {new Date(collab.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {collab.chatRoom?.messages[0] && (
                          <div className="flex items-center space-x-2">
                            <MessageSquare className="h-4 w-4 text-gray-500" />
                            <span className="text-sm truncate">
                              Last message:{" "}
                              {new Date(
                                collab.chatRoom.messages[0].createdAt,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
