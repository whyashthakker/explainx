"use client";

import React, { useEffect, useState } from "react";
import { use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
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
import { MetricsResponse } from "../../../../../api/influencer/[id]/metrics/route";

// Loading skeleton component
function MetricsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-200 rounded"></div>
        </CardContent>
      </Card>
    </div>
  );
}

// Error component
function ErrorDisplay({ error }: { error: string }) {
  return (
    <Card className="p-6">
      <div className="text-center text-red-500">
        <h3 className="text-lg font-semibold mb-2">Error Loading Metrics</h3>
        <p>{error}</p>
      </div>
    </Card>
  );
}

interface MetricsProps {
  metrics: MetricsResponse["metrics"];
  analytics: MetricsResponse["analytics"];
}

function InfluencerMetrics({ metrics, analytics }: MetricsProps) {
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

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function InfluencerMetricsPage(props: PageProps) {
  // Use the `use` hook to handle async params
  const params = use(props.params);
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/influencer/${params.slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch metrics data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Influencer Metrics</h1>
      {loading ? (
        <MetricsSkeleton />
      ) : error ? (
        <ErrorDisplay error={error} />
      ) : data ? (
        <InfluencerMetrics metrics={data.metrics} analytics={data.analytics} />
      ) : null}
    </div>
  );
}