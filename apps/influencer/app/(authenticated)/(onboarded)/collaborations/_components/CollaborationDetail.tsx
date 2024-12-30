"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { useToast } from "@repo/ui/hooks/use-toast";
import {
  DollarSign,
  Calendar,
  Building,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Globe,
  Users,
  Target,
} from "lucide-react";

interface CollaborationDetailProps {
  id: string;
}

interface Collaboration {
  id: string;
  status: string;
  terms: string;
  compensation: number;
  createdAt: string;
  deliverables: string[];
  campaign: {
    title: string;
    description: string;
    platforms: string[];
    requirements: string[];
  };
  brand: {
    name: string;
    logo: string | null;
    website: string | null;
    industry: string;
  };
}

export default function CollaborationDetail({ id }: CollaborationDetailProps) {
  const [collaboration, setCollaboration] = useState<Collaboration | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchCollaboration();
  }, [id]);

  const fetchCollaboration = async () => {
    try {
      const response = await fetch(`/api/collaborations/${id}`);
      if (!response.ok) throw new Error("Failed to fetch collaboration");
      const data = await response.json();
      setCollaboration(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load collaboration details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (status: "ACCEPTED" | "DECLINED") => {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/collaborations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      const updatedCollaboration = await response.json();
      setCollaboration(updatedCollaboration);

      toast({
        title: "Success",
        description: `Collaboration ${status.toLowerCase()} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update collaboration status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      ACCEPTED: "bg-blue-100 text-blue-800",
      ACTIVE: "bg-green-100 text-green-800",
      COMPLETED: "bg-purple-100 text-purple-800",
      CANCELLED: "bg-red-100 text-red-800",
      DECLINED: "bg-gray-100 text-gray-800",
    };
    return variants[status] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 space-y-6">
        <Skeleton className="h-8 w-[200px]" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[300px]" />
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!collaboration) return null;

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.push("/collaborations")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collaborations
        </Button>
        <Badge className={getStatusBadge(collaboration.status)}>
          {collaboration.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>
              Information about the campaign and requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">
                {collaboration.campaign.title}
              </h3>
              <p className="text-gray-600">
                {collaboration.campaign.description}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Campaign Requirements</h4>
              <ul className="list-disc pl-4 space-y-1">
                {collaboration.campaign.requirements.map((req, index) => (
                  <li key={index} className="text-gray-600">
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Target Platforms</h4>
              <div className="flex flex-wrap gap-2">
                {collaboration.campaign.platforms.map((platform) => (
                  <Badge key={platform} variant="secondary">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Brand Information</CardTitle>
            <CardDescription>
              Details about the brand and compensation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Building className="h-12 w-12" />
              <div>
                <h3 className="font-semibold">{collaboration.brand.name}</h3>
                <p className="text-gray-600">{collaboration.brand.industry}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Compensation</p>
                <p className="font-semibold">
                  ${collaboration.compensation.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Request Date</p>
                <p className="font-semibold">
                  {new Date(collaboration.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {collaboration.brand.website && (
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <a
                  href={collaboration.brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  Visit Website
                </a>
              </div>
            )}
          </CardContent>
          {collaboration.status === "PENDING" && (
            <CardFooter className="flex gap-4">
              <Button
                className="flex-1"
                onClick={() => handleStatusUpdate("ACCEPTED")}
                disabled={isUpdating}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Accept
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleStatusUpdate("DECLINED")}
                disabled={isUpdating}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Decline
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
