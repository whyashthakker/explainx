// app/(authenticated)/authenticated/dashboard/_components/MainDashboard.tsx
"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import {
  Bell,
  TrendingUp,
  Users,
  Video,
  Heart,
  Share2,
  Sparkles,
  Award,
  LogOut,
  UserCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { handleSignOut } from "../../../../lib/actions";
import { PrismaUserWithInfluencer, Platform } from "../../../../lib/types";

interface PlatformDistribution {
  name: Platform;
  value: number;
}

interface ChartDataPoint {
  month: string;
  followers: number;
}

interface EngagementDataPoint {
  day: string;
  likes: number;
  comments: number;
  shares: number;
}

const InfluencerDashboard: React.FC<{ user: PrismaUserWithInfluencer }> = ({
  user,
}) => {
  const router = useRouter();

  if (!user.influencer) {
    return null;
  }

  const { influencer } = user;

  const followerData: ChartDataPoint[] = [
    { month: "Jan", followers: Math.floor(influencer.followers * 0.7) },
    { month: "Feb", followers: Math.floor(influencer.followers * 0.8) },
    { month: "Mar", followers: Math.floor(influencer.followers * 0.85) },
    { month: "Apr", followers: Math.floor(influencer.followers * 0.9) },
    { month: "May", followers: Math.floor(influencer.followers * 0.95) },
    { month: "Jun", followers: influencer.followers },
  ];

  const engagementData: EngagementDataPoint[] = [
    { day: "Mon", likes: 15000, comments: 2000, shares: 1000 },
    { day: "Tue", likes: 18000, comments: 2400, shares: 1200 },
    { day: "Wed", likes: 22000, comments: 3000, shares: 1500 },
    { day: "Thu", likes: 17000, comments: 2200, shares: 1100 },
    { day: "Fri", likes: 20000, comments: 2800, shares: 1300 },
    { day: "Sat", likes: 25000, comments: 3500, shares: 1800 },
    { day: "Sun", likes: 23000, comments: 3200, shares: 1600 },
  ];

  const calculatePlatformDistribution = (): PlatformDistribution[] => {
    const total = influencer.platforms.length;
    return influencer.platforms.map((platform: any) => ({
      name: platform,
      value: Math.round(100 / total),
    }));
  };

  const COLORS = ["#6366f1", "#ec4899", "#14b8a6", "#f97316"] as const;
  type ColorType = (typeof COLORS)[number];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={
                  influencer.avatar || user.image || "/api/placeholder/100/100"
                }
                alt={influencer.name}
              />
              <AvatarFallback>{influencer.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {influencer.name}
              </h1>
              <p className="text-gray-500">{influencer.category} Influencer</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => router.push("/authenticated/profile")}
            >
              <UserCircle className="h-4 w-4" />
              Profile
            </Button>
            <form action={handleSignOut}>
              <Button
                type="submit"
                variant="outline"
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </form>
            <Badge className="bg-indigo-500 hover:bg-indigo-600">
              <Sparkles className="w-4 h-4 mr-2" />
              {influencer.category}
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Followers
                  </p>
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
                  <p className="text-sm font-medium text-gray-500">Platforms</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {influencer.platforms.length}
                  </h3>
                </div>
                <Heart className="h-8 w-8 text-pink-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Category</p>
                  <h3 className="text-xl font-bold text-gray-900">
                    {influencer.category}
                  </h3>
                </div>
                <Video className="h-8 w-8 text-teal-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Growth Rate
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">+12.5%</h3>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bio Alert */}
        {influencer.bio && (
          <Alert className="bg-indigo-50 border-indigo-200">
            <Bell className="h-4 w-4 text-indigo-500" />
            <AlertTitle className="text-indigo-700">
              About {influencer.name}
            </AlertTitle>
            <AlertDescription className="text-indigo-600">
              {influencer.bio}
            </AlertDescription>
          </Alert>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Follower Growth */}
          <Card>
            <CardHeader>
              <CardTitle>Follower Growth</CardTitle>
              <CardDescription>Monthly follower count trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={followerData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="followers"
                      stroke="#6366f1"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Daily interaction breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="likes" fill="#6366f1" stackId="stack" />
                    <Bar dataKey="comments" fill="#ec4899" stackId="stack" />
                    <Bar dataKey="shares" fill="#14b8a6" stackId="stack" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Platform Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Distribution</CardTitle>
              <CardDescription>Active social platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={calculatePlatformDistribution()}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {calculatePlatformDistribution().map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Platforms List */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Platforms</CardTitle>
              <CardDescription>Your social media presence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {influencer.platforms.map((platform: any, index: number) => (
                  <div key={platform} className="flex items-center space-x-4">
                    <Award
                      style={{ color: COLORS[index % COLORS.length] }}
                      className="h-8 w-8"
                    />
                    <div>
                      <p className="font-medium">{platform}</p>
                      <p className="text-sm text-gray-500">
                        Connected and Active
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDashboard;