"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Verified,
  Users,
  BarChart3,
  Share2,
  Search,
} from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import { Platform } from "../../../../../../lib/types";

interface Influencer {
  id: string;
  name: string;
  avatar: string;
  category: string;
  followers: number;
  platforms: Platform[];
  bio: string;
  isVerified: boolean;
  engagement: string;
  metrics: {
    subscribers: number;
    videos: number;
    views: number;
  };
}

const InfluencerCard = ({ influencer, onClick }: { influencer: Influencer; onClick: () => void }) => (
  <Card
    className="cursor-pointer hover:shadow-lg transition-shadow"
    onClick={onClick}
  >
    <CardHeader className="pb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={influencer.avatar} />
            <AvatarFallback>{influencer.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{influencer.name}</CardTitle>
              {influencer.isVerified && (
                <Verified className="h-5 w-5 text-blue-500" />
              )}
            </div>
            <CardDescription>{influencer.category}</CardDescription>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Users className="h-5 w-5 mx-auto text-gray-500" />
            <p className="mt-1 text-sm font-medium">
              {(influencer.followers / 1000).toFixed(1)}K
            </p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <BarChart3 className="h-5 w-5 mx-auto text-gray-500" />
            <p className="mt-1 text-sm font-medium">
              {influencer.engagement}%
            </p>
            <p className="text-xs text-gray-500">Engagement</p>
          </div>
          <div className="text-center">
            <Share2 className="h-5 w-5 mx-auto text-gray-500" />
            <p className="mt-1 text-sm font-medium">
              {influencer.platforms.length}
            </p>
            <p className="text-xs text-gray-500">Platforms</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {influencer.platforms.map((platform) => (
            <Badge
              key={platform}
              variant="secondary"
              className="text-xs"
            >
              {platform}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {influencer.bio}
        </p>
      </div>
    </CardContent>
  </Card>
);

export default function BrandDashboard() {
  const router = useRouter();
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch("/api/influencers");
        const data = await response.json();
        setInfluencers(data);
      } catch (error) {
        console.error("Failed to fetch influencers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  const filteredInfluencers = influencers.filter(
    (influencer) =>
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateToInfluencer = (id: string) => {
    router.push(`/authenticated/influencer/${id}`);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Search Section */}
        <div className="space-y-8">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Creator Discovery</h1>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search creators by name or category..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {searchTerm && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Search Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInfluencers.map((influencer) => (
                  <InfluencerCard
                    key={influencer.id}
                    influencer={influencer}
                    onClick={() => navigateToInfluencer(influencer.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* All Creators Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">All Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {influencers.map((influencer) => (
              <InfluencerCard
                key={influencer.id}
                influencer={influencer}
                onClick={() => navigateToInfluencer(influencer.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}