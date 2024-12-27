"use client";

import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@repo/ui/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { 
  TrendingUp, Users, Video, Heart, Activity, 
  BarChart2, PieChart as PieChartIcon, LucideIcon
} from 'lucide-react';

// Types
interface MetricsData {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  averageViews: number;
  averageLikes: number;
  engagementRate: number;
}

interface GrowthTrends {
  subscriberGrowth: number;
  viewGrowth: number;
  predictedReach: number | null;
}

interface VideoData {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
  thumbnailUrl: string;
  engagementRate: string;
}

interface ChannelStats {
  subscriberCount: number;
  totalViews: number;
  videoCount: number;
}

interface AnalyticsData {
  metrics: MetricsData;
  growthTrends: GrowthTrends;
  recentVideos: VideoData[];
  channelStats: ChannelStats;
}

interface VideoPerformanceData {
  name: string;
  views: number;
  engagement: number;
}

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
  subtitle?: string;
}

const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics/youtube');
        if (!response.ok) throw new Error('Failed to fetch analytics');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <AnalyticsLoadingSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!data) return null;

  const { metrics, growthTrends, recentVideos, channelStats } = data;

  // Format recent videos data for chart
  const videoPerformanceData: VideoPerformanceData[] = recentVideos.map(video => ({
    name: video.title.substring(0, 20) + '...',
    views: video.views,
    engagement: parseFloat(video.engagementRate)
  }));

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Subscribers"
          value={channelStats.subscriberCount.toLocaleString()}
          icon={<Users className="h-8 w-8 text-blue-500" />}
          trend={growthTrends.subscriberGrowth}
        />
        <StatsCard
          title="Total Views"
          value={channelStats.totalViews.toLocaleString()}
          icon={<Video className="h-8 w-8 text-green-500" />}
          trend={growthTrends.viewGrowth}
        />
        <StatsCard
          title="Engagement Rate"
          value={`${metrics.engagementRate}%`}
          icon={<Heart className="h-8 w-8 text-red-500" />}
        />
        <StatsCard
          title="Predicted Reach"
          value={growthTrends.predictedReach?.toLocaleString() ?? 'N/A'}
          icon={<TrendingUp className="h-8 w-8 text-purple-500" />}
          subtitle="Next 30 days"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Video Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Video Performance</CardTitle>
            <CardDescription>Views and engagement rates for recent uploads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={videoPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="views" fill="#6366f1" name="Views" />
                  <Bar yAxisId="right" dataKey="engagement" fill="#14b8a6" name="Engagement Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Growth Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>Subscriber and view count growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={recentVideos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="publishedAt" 
                    tickFormatter={(date: string) => new Date(date).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#6366f1" name="Views" />
                  <Line type="monotone" dataKey="likes" stroke="#14b8a6" name="Likes" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Videos List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Videos</CardTitle>
          <CardDescription>Performance metrics for your latest uploads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentVideos.map((video) => (
              <div key={video.id} className="p-4 border rounded-lg">
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="font-medium text-sm mb-2">{video.title}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Views</p>
                    <p className="font-medium">{video.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Engagement</p>
                    <p className="font-medium">{video.engagementRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, subtitle }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        {icon}
      </div>
      {trend !== undefined && (
        <div className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% growth
        </div>
      )}
    </CardContent>
  </Card>
);

const AnalyticsLoadingSkeleton: React.FC = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...Array(2)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-96 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <Skeleton className="h-32 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Skeleton className="h-3 w-12 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div>
                  <Skeleton className="h-3 w-12 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AnalyticsDashboard;