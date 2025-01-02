"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';

type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'twitch';
type ContentType = 'post' | 'story' | 'video' | 'reel' | 'stream';
type Niche = 'lifestyle' | 'fashion' | 'tech' | 'gaming' | 'beauty' | 'fitness' | 'food' | 'travel';

interface Metrics {
  followers: string;
  engagementRate: string;
  averageViews: string;
}

const PLATFORM_RATES = {
  instagram: {
    baseline: { min: 100, max: 300 },
    multiplier: 0.01,
    engagementBonus: 0.2
  },
  tiktok: {
    baseline: { min: 80, max: 250 },
    multiplier: 0.008,
    engagementBonus: 0.25
  },
  youtube: {
    baseline: { min: 200, max: 500 },
    multiplier: 0.015,
    engagementBonus: 0.3
  },
  twitter: {
    baseline: { min: 50, max: 150 },
    multiplier: 0.005,
    engagementBonus: 0.15
  },
  twitch: {
    baseline: { min: 150, max: 400 },
    multiplier: 0.012,
    engagementBonus: 0.25
  }
};

const NICHE_MULTIPLIERS: Record<Niche, number> = {
  tech: 1.4,
  fashion: 1.3,
  beauty: 1.25,
  lifestyle: 1.2,
  fitness: 1.15,
  gaming: 1.1,
  food: 1.1,
  travel: 1.2
};

export default function InfluencerEarningsCalculator() {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [niche, setNiche] = useState<Niche>('lifestyle');
  const [metrics, setMetrics] = useState<Metrics>({
    followers: '',
    engagementRate: '',
    averageViews: ''
  });

  const handleInputChange = (field: keyof Metrics, value: string) => {
    // Only allow numbers and decimal points
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    
    setMetrics(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateEarnings = () => {
    const followers = parseInt(metrics.followers) || 0;
    const engagementRate = parseFloat(metrics.engagementRate) || 0;
    const averageViews = parseInt(metrics.averageViews) || 0;

    if (followers === 0) return null;

    const rates = PLATFORM_RATES[platform];
    const nicheMultiplier = NICHE_MULTIPLIERS[niche];

    // Base calculation using followers
    const baseRate = (rates.baseline.min + rates.baseline.max) / 2;
    let baseEarnings = followers * rates.multiplier;
    
    // Apply engagement bonus if above average
    const engagementBonus = engagementRate > 3 ? rates.engagementBonus : 0;
    
    // Apply niche multiplier
    baseEarnings *= nicheMultiplier;

    // Calculate different content type rates
    const contentTypes = {
      post: baseEarnings,
      story: baseEarnings * 0.5,
      video: baseEarnings * 2,
      reel: baseEarnings * 1.5,
      stream: baseEarnings * 3
    };

    // Apply engagement bonus to all rates
    Object.keys(contentTypes).forEach(type => {
      contentTypes[type as ContentType] *= (1 + engagementBonus);
    });

    return {
      minPost: contentTypes.post * 0.8,
      maxPost: contentTypes.post * 1.2,
      minStory: contentTypes.story * 0.8,
      maxStory: contentTypes.story * 1.2,
      minVideo: contentTypes.video * 0.8,
      maxVideo: contentTypes.video * 1.2,
      minReel: contentTypes.reel * 0.8,
      maxReel: contentTypes.reel * 1.2,
      minStream: contentTypes.stream * 0.8,
      maxStream: contentTypes.stream * 1.2
    };
  };

  const earnings = calculateEarnings();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculate Influencer Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <SelectItem value="twitch">Twitch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content Niche</label>
                <Select value={niche} onValueChange={(value: Niche) => setNiche(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Followers</label>
                <Input
                  placeholder="Enter number of followers"
                  value={metrics.followers}
                  onChange={(e) => handleInputChange('followers', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Engagement Rate (%)</label>
                <Input
                  placeholder="Enter engagement rate"
                  value={metrics.engagementRate}
                  onChange={(e) => handleInputChange('engagementRate', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Average Views</label>
                <Input
                  placeholder="Enter average views"
                  value={metrics.averageViews}
                  onChange={(e) => handleInputChange('averageViews', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {earnings && (
        <Card>
          <CardHeader>
            <CardTitle>Estimated Earnings Per Content Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="post" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
                <TabsTrigger value="post">Post</TabsTrigger>
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="reel">Reel</TabsTrigger>
                <TabsTrigger value="stream">Stream</TabsTrigger>
              </TabsList>

              <TabsContent value="post" className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Single Post</h3>
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(earnings.minPost)} - {formatCurrency(earnings.maxPost)}
                </div>
              </TabsContent>

              <TabsContent value="story" className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Story</h3>
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(earnings.minStory)} - {formatCurrency(earnings.maxStory)}
                </div>
              </TabsContent>

              <TabsContent value="video" className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Video</h3>
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(earnings.minVideo)} - {formatCurrency(earnings.maxVideo)}
                </div>
              </TabsContent>

              <TabsContent value="reel" className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Reel</h3>
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(earnings.minReel)} - {formatCurrency(earnings.maxReel)}
                </div>
              </TabsContent>

              <TabsContent value="stream" className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Stream</h3>
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(earnings.minStream)} - {formatCurrency(earnings.maxStream)}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Niche Factor</h3>
                <p className="text-sm text-gray-600">
                  Your content niche ({niche}) has a {((NICHE_MULTIPLIERS[niche] - 1) * 100).toFixed()}% 
                  impact on standard rates.
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Engagement Impact</h3>
                <p className="text-sm text-gray-600">
                  {parseFloat(metrics.engagementRate) > 3 
                    ? 'Your above-average engagement rate increases your potential earnings.'
                    : 'Increasing your engagement rate can boost your earning potential.'}
                </p>
              </div>
            </div>

            <Alert className="mt-4">
              <AlertDescription>
                These estimates are based on industry averages and can vary based on factors like seasonality, 
                campaign objectives, and brand budgets.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}