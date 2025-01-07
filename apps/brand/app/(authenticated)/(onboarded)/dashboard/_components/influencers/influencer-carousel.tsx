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
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Slider } from "@repo/ui/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";
import { Button } from "@repo/ui/components/ui/button";
import { Platform } from "../../../../../../lib/types";
import { useUser } from "../../../_context/user-context";

interface Filters {
  category: string | null;
  platform: Platform | null;
  minFollowers: number;
  minEngagement: number;
}

interface Influencer {
  id: string;
  userId: string;
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

const InfluencerCard = ({
  influencer,
  onClick,
}: {
  influencer: Influencer;
  onClick: () => void;
}) => (
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
            <p className="mt-1 text-sm font-medium">{influencer.engagement}%</p>
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
            <Badge key={platform} variant="secondary" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{influencer.bio}</p>
      </div>
    </CardContent>
  </Card>
);

export default function InfluencerDashboard() {
  const user = useUser();
  const router = useRouter();
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    category: null,
    platform: null,
    minFollowers: 0,
    minEngagement: 0,
  });

  // Derive unique categories and platforms from data
  const categories = [...new Set(influencers.map((inf) => inf.category))];
  const platforms = [...new Set(influencers.flatMap((inf) => inf.platforms))];

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch("/api/influencers");
        const data = await response.json();
        const filteredInfluencers = data.filter(
          (influencer: Influencer) => influencer.userId !== user?.id,
        );
        setInfluencers(filteredInfluencers);
      } catch (error) {
        console.error("Failed to fetch influencers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, [user?.id]);

  // Updated filter logic
  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch =
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !filters.category || influencer.category === filters.category;
    const matchesPlatform =
      !filters.platform || influencer.platforms.includes(filters.platform);
    const matchesFollowers = influencer.followers >= filters.minFollowers;
    const matchesEngagement =
      parseFloat(influencer.engagement) >= filters.minEngagement;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPlatform &&
      matchesFollowers &&
      matchesEngagement
    );
  });

  const FilterPanel = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Creators</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={filters.category || ""}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  category: value === "All" ? null : value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="All">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={filters.platform || ""}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  platform: value === "All" ? null : (value as Platform),
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Platforms</SelectItem>
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Minimum Followers (K)</label>
            <Slider
              min={0}
              max={1000}
              step={10}
              value={[filters.minFollowers ?? 0]}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  minFollowers: value[0] ? value[0] : 0,
                })
              }
              className="mt-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              {filters.minFollowers}K followers
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Minimum Engagement (%)
            </label>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[filters.minEngagement ?? 0]}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  minEngagement: value[0] ? value[0] : 0,
                })
              }
              className="mt-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              {filters.minEngagement}% engagement
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              setFilters({
                category: null,
                platform: null,
                minFollowers: 0,
                minEngagement: 0,
              })
            }
          >
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
  const navigateToInfluencer = (id: string) => {
    router.push(`/influencer/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-8">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Creator Discovery
            </h1>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search creators by name or category..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <FilterPanel />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {searchTerm ? "Search Results" : "All Creators"}
              </h2>
              <p className="text-sm text-gray-500">
                {filteredInfluencers.length} creators found
              </p>
            </div>
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
        </div>
      </div>
    </div>
  );
}
