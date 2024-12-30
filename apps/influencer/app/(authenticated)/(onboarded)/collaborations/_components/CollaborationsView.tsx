"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { useToast } from "@repo/ui/hooks/use-toast";
import {
  DollarSign,
  Calendar,
  MessageSquare,
  ChevronRight,
  Building,
  Users,
} from "lucide-react";

interface Collaboration {
  id: string;
  status: string;
  compensation: number;
  createdAt: string;
  campaign: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    logo: string | null;
  };
  chatRoom?: {
    messages: {
      content: string;
      createdAt: string;
    }[];
  };
}

interface CollaborationsViewProps {
  influencerId: string;
}

export default function CollaborationsView({
  influencerId,
}: CollaborationsViewProps) {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchCollaborations();
  }, [influencerId]); // Add influencerId to dependencies

  const fetchCollaborations = async () => {
    try {
      const response = await fetch("/api/collaborations");
      if (!response.ok) {
        throw new Error("Failed to fetch collaborations");
      }
      const data = await response.json();
      setCollaborations(data);
    } catch (err) {
      setError("Failed to load collaborations");
      toast({
        title: "Error",
        description: "Failed to load collaborations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
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

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Your Collaborations</CardTitle>
          <CardDescription>
            Manage your brand collaborations and partnerships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Compensation</TableHead>
                <TableHead>Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collaborations.map((collab) => (
                <TableRow
                  key={collab.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => router.push(`/collaborations/${collab.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>{collab.brand.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{collab.campaign.title}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(collab.status)}>
                      {collab.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${collab.compensation.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(collab.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="h-4 w-4" />
                  </TableCell>
                </TableRow>
              ))}
              {collaborations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No collaborations found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
