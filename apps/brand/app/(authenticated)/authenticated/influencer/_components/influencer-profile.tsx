// app/(authenticated)/authenticated/influencer/_components/influencer-profile.tsx
"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import {
  Verified,
  Users,
  BarChart3,
  Share2,
  ArrowLeft,
  MessageCircle,
  Youtube,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Brand, Influencer, User, YouTubeAccount } from "../../../../types";
import CollaborationForm from "./collab-form";

interface InfluencerProfileProps {
  influencer: Influencer & {
    user: Pick<User, "email" | "image">;
    youtubeAccount?: YouTubeAccount | null;
  };
  brand: (User & { brand: Brand | null }) | null;
}

export default function InfluencerProfile({ 
  influencer, 
  brand 
}: InfluencerProfileProps) {
  const router = useRouter();
  const [showCollaboration, setShowCollaboration] = useState(false);

  if (!influencer) {
    router.push("/authenticated/dashboard");
    return null;
  }

  const isVerified = !!influencer.youtubeAccount;

  // Calculate engagement metrics
  const engagement = isVerified
    ? ((influencer.youtubeAccount.viewCount / influencer.followers) * 100).toFixed(2)
    : "N/A";

  // Format analytics data for the chart
  const analyticsData = influencer.youtubeAccount?.analytics?.map((data) => ({
    date: new Date(data.date).toLocaleDateString(),
    subscribers: data.subscriberCount,
    views: data.viewCount,
  })) || [];

  const handleCollaboration = () => {
    setShowCollaboration(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.push("/authenticated/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Discovery
        </Button>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={influencer.avatar || influencer.user.image || ""} />
              <AvatarFallback>{influencer.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {influencer.name}
                </h1>
                {isVerified && <Verified className="h-6 w-6 text-blue-500" />}
              </div>
              <p className="text-xl text-gray-600">{influencer.category}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              className="flex items-center gap-2"
              onClick={handleCollaboration}
            >
              <MessageCircle className="h-4 w-4" />
              Start Collaboration
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Followers</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {influencer.followers.toLocaleString()}
                  </h3>
                </div>
                <Users className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Engagement Rate
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {engagement}%
                  </h3>
                </div>
                <BarChart3 className="h-8 w-8 text-pink-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Platforms</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {influencer.platforms.length}
                  </h3>
                </div>
                <Share2 className="h-8 w-8 text-teal-500" />
              </div>
            </CardContent>
          </Card>
          {isVerified && influencer.youtubeAccount && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Views
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {influencer.youtubeAccount.viewCount.toLocaleString()}
                    </h3>
                  </div>
                  <Youtube className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Rest of the component remains the same... */}

        {/* Collaboration Dialog */}
        {brand?.brand && (
          <Dialog open={showCollaboration} onOpenChange={setShowCollaboration}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Start Collaboration</DialogTitle>
                <DialogDescription>
                  Send a collaboration request to {influencer.name}
                </DialogDescription>
              </DialogHeader>
              <CollaborationForm
                influencerId={influencer.id}
                brandId={brand.brand.id}
                onSuccess={() => setShowCollaboration(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}