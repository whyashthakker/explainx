"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';

type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin' | 'facebook';

interface Metrics {
  followers: string;
  likes: string;
  comments: string;
  shares: string;
  saves: string;
  views: string;
}

interface BenchmarkData {
  low: string;
  average: string;
  high: string;
  excellent: string;
}

const PLATFORM_BENCHMARKS: Record<Platform, BenchmarkData> = {
  instagram: {
    low: '< 1%',
    average: '1-3%',
    high: '3-6%',
    excellent: '> 6%'
  },
  tiktok: {
    low: '< 3%',
    average: '3-6%',
    high: '6-15%',
    excellent: '> 15%'
  },
  youtube: {
    low: '< 2%',
    average: '2-5%',
    high: '5-10%',
    excellent: '> 10%'
  },
  twitter: {
    low: '< 0.5%',
    average: '0.5-1%',
    high: '1-3%',
    excellent: '> 3%'
  },
  linkedin: {
    low: '< 2%',
    average: '2-5%',
    high: '5-8%',
    excellent: '> 8%'
  },
  facebook: {
    low: '< 1%',
    average: '1-3%',
    high: '3-5%',
    excellent: '> 5%'
  }
};

export default function EngagementCalculator() {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [metrics, setMetrics] = useState<Metrics>({
    followers: '',
    likes: '',
    comments: '',
    shares: '',
    saves: '',
    views: ''
  });
  const [engagementRate, setEngagementRate] = useState<number | null>(null);
  const [engagementLevel, setEngagementLevel] = useState<string>('');

  const handleInputChange = (field: keyof Metrics, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;

    setMetrics(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateEngagement = () => {
    const followers = parseInt(metrics.followers) || 0;
    if (followers === 0) return;

    const likes = parseInt(metrics.likes) || 0;
    const comments = parseInt(metrics.comments) || 0;
    const shares = parseInt(metrics.shares) || 0;
    const saves = parseInt(metrics.saves) || 0;
    const views = parseInt(metrics.views) || 0;

    let rate = 0;
    switch (platform) {
      case 'instagram':
        rate = ((likes + comments + saves) / followers) * 100;
        break;
      case 'tiktok':
        rate = ((likes + comments + shares) / followers) * 100;
        break;
      case 'youtube':
        if (views > 0) {
          rate = ((likes + comments) / views) * 100;
        } else {
          rate = ((likes + comments) / followers) * 100;
        }
        break;
      default:
        rate = ((likes + comments + shares) / followers) * 100;
    }

    setEngagementRate(parseFloat(rate.toFixed(2)));

    // Set engagement level based on benchmarks
    const benchmarks = PLATFORM_BENCHMARKS[platform];
    if (rate > parseFloat(benchmarks.excellent.replace(/[^0-9.]/g, ''))) {
      setEngagementLevel('Excellent');
    } else if (rate > parseFloat((benchmarks.high.split('-')[0] || '0'))) {
      setEngagementLevel('High');
    } else if (rate > parseFloat((benchmarks.average.split('-')[0] || '0'))) {
      setEngagementLevel('Average');
    } else {
      setEngagementLevel('Low');
    }
  };

  // Calculate engagement whenever inputs change
  React.useEffect(() => {
    calculateEngagement();
  }, [metrics, platform]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculate Engagement Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Platform</label>
              <Select value={platform} onValueChange={(value: Platform) => setPlatform(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Followers</label>
                <Input
                  placeholder="Enter number of followers"
                  value={metrics.followers}
                  onChange={(e) => handleInputChange('followers', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Likes</label>
                <Input
                  placeholder="Enter number of likes"
                  value={metrics.likes}
                  onChange={(e) => handleInputChange('likes', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Comments</label>
                <Input
                  placeholder="Enter number of comments"
                  value={metrics.comments}
                  onChange={(e) => handleInputChange('comments', e.target.value)}
                />
              </div>

              {platform !== 'instagram' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Shares</label>
                  <Input
                    placeholder="Enter number of shares"
                    value={metrics.shares}
                    onChange={(e) => handleInputChange('shares', e.target.value)}
                  />
                </div>
              )}

              {platform === 'instagram' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Saves</label>
                  <Input
                    placeholder="Enter number of saves"
                    value={metrics.saves}
                    onChange={(e) => handleInputChange('saves', e.target.value)}
                  />
                </div>
              )}

              {platform === 'youtube' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Views</label>
                  <Input
                    placeholder="Enter number of views"
                    value={metrics.views}
                    onChange={(e) => handleInputChange('views', e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {engagementRate !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Engagement Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Engagement Rate</div>
                <div className="text-3xl font-semibold text-blue-600">{engagementRate}%</div>
                <div className="mt-2 text-sm font-medium text-gray-600">
                  Level: <span className="text-blue-600">{engagementLevel}</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Industry Benchmarks</div>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span>Excellent</span>
                    <span className="font-medium">{PLATFORM_BENCHMARKS[platform].excellent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>High</span>
                    <span className="font-medium">{PLATFORM_BENCHMARKS[platform].high}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average</span>
                    <span className="font-medium">{PLATFORM_BENCHMARKS[platform].average}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Low</span>
                    <span className="font-medium">{PLATFORM_BENCHMARKS[platform].low}</span>
                  </div>
                </div>
              </div>
            </div>

            <Alert className="mt-4">
              <AlertDescription>
                These engagement rates are calculated based on industry standards and may vary by niche and audience size.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}