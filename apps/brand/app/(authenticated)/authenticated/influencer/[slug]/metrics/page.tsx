"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  TrendingUp,
  PlayCircle,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MetricsProps {
  metrics: {
    avgViews: number;
    totalViews: number;
    subscriberGrowth: number;
    viewGrowth: number;
    engagement: string;
  };
  analytics: any[]; // Replace with proper type from your schema
}

export function InfluencerMetrics({ metrics, analytics }: MetricsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Views</p>
                <h3 className="text-2xl font-bold">
                  {formatNumber(metrics.avgViews)}
                </h3>
              </div>
              <PlayCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Views</p>
                <h3 className="text-2xl font-bold">
                  {formatNumber(metrics.totalViews)}
                </h3>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Subscriber Growth
                </p>
                <h3 className="text-2xl font-bold">
                  {metrics.subscriberGrowth}%
                </h3>
              </div>
              <ThumbsUp className="h-8 w-8 text-pink-500" />
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
                <h3 className="text-2xl font-bold">{metrics.engagement}%</h3>
              </div>
              <MessageCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Trends</CardTitle>
          <CardDescription>30-day performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <Line
                  type="monotone"
                  dataKey="subscriberCount"
                  stroke="#8884d8"
                  name="Subscribers"
                />
                <Line
                  type="monotone"
                  dataKey="viewCount"
                  stroke="#82ca9d"
                  name="Views"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}