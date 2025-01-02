"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';

type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook';
type InfluencerTier = 'nano' | 'micro' | 'mid' | 'macro' | 'mega';
type Industry = 'fashion' | 'beauty' | 'tech' | 'gaming' | 'fitness' | 'food' | 'travel' | 'lifestyle';

interface CampaignMetrics {
  budget: string;
  campaignDuration: string;
  averageOrderValue: string;
}

const INFLUENCER_TIERS = {
  nano: {
    label: 'Nano (1K-10K)',
    cost: { min: 50, max: 250 },
    engagement: 0.05
  },
  micro: {
    label: 'Micro (10K-50K)',
    cost: { min: 250, max: 1000 },
    engagement: 0.04
  },
  mid: {
    label: 'Mid-tier (50K-500K)',
    cost: { min: 1000, max: 5000 },
    engagement: 0.03
  },
  macro: {
    label: 'Macro (500K-1M)',
    cost: { min: 5000, max: 20000 },
    engagement: 0.02
  },
  mega: {
    label: 'Mega (1M+)',
    cost: { min: 20000, max: 100000 },
    engagement: 0.015
  }
};

const PLATFORM_MULTIPLIERS: Record<Platform, number> = {
  instagram: 1.0,
  tiktok: 1.2,
  youtube: 1.5,
  twitter: 0.8,
  facebook: 0.9
};

const INDUSTRY_MULTIPLIERS: Record<Industry, number> = {
  fashion: 1.2,
  beauty: 1.15,
  tech: 1.3,
  gaming: 1.1,
  fitness: 1.05,
  food: 1.0,
  travel: 1.1,
  lifestyle: 1.0
};

const CONVERSION_RATES = {
  nano: 0.025,
  micro: 0.02,
  mid: 0.015,
  macro: 0.01,
  mega: 0.008
};

export default function InfluencerMarketingCalculator() {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [tier, setTier] = useState<InfluencerTier>('micro');
  const [industry, setIndustry] = useState<Industry>('lifestyle');
  const [metrics, setMetrics] = useState<CampaignMetrics>({
    budget: '',
    campaignDuration: '',
    averageOrderValue: ''
  });

  const handleInputChange = (field: keyof CampaignMetrics, value: string) => {
    // Only allow numbers and decimal points
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    
    setMetrics(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateEstimates = () => {
    const budget = parseFloat(metrics.budget) || 0;
    const averageOrderValue = parseFloat(metrics.averageOrderValue) || 0;
    if (budget === 0) return null;

    const platformMultiplier = PLATFORM_MULTIPLIERS[platform];
    const industryMultiplier = INDUSTRY_MULTIPLIERS[industry];
    const tierData = INFLUENCER_TIERS[tier];
    const conversionRate = CONVERSION_RATES[tier];

    // Calculate number of influencers that can be hired
    const avgCostPerInfluencer = (tierData.cost.min + tierData.cost.max) / 2;
    const adjustedCost = avgCostPerInfluencer * platformMultiplier * industryMultiplier;
    const numberOfInfluencers = Math.floor(budget / adjustedCost);

    // Calculate potential reach and engagement
    const avgReach = {
      nano: 5000,
      micro: 30000,
      mid: 250000,
      macro: 750000,
      mega: 2000000
    }[tier];

    const totalReach = avgReach * numberOfInfluencers;
    const totalEngagement = totalReach * tierData.engagement;
    const expectedConversions = totalEngagement * conversionRate;
    const expectedRevenue = expectedConversions * averageOrderValue;
    const roi = ((expectedRevenue - budget) / budget) * 100;

    return {
      influencers: numberOfInfluencers,
      reach: totalReach,
      engagement: totalEngagement,
      conversions: expectedConversions,
      revenue: expectedRevenue,
      roi: roi,
      costPerInfluencer: adjustedCost
    };
  };

  const estimates = calculateEstimates();

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toFixed(0);
  };

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
          <CardTitle>Calculate Influencer Marketing Costs & ROI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Influencer Tier</label>
                <Select value={tier} onValueChange={(value: InfluencerTier) => setTier(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(INFLUENCER_TIERS).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Industry</label>
                <Select value={industry} onValueChange={(value: Industry) => setIndustry(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Campaign Budget ($)</label>
                <Input
                  placeholder="Enter total campaign budget"
                  value={metrics.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Average Order Value ($)</label>
                <Input
                  placeholder="Enter average order value"
                  value={metrics.averageOrderValue}
                  onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {estimates && (
        <Card>
          <CardHeader>
            <CardTitle>Campaign Estimates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Campaign Reach</h3>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatNumber(estimates.reach)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Potential audience reach</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Expected ROI</h3>
                  <div className="text-2xl font-bold text-blue-600">
                    {estimates.roi.toFixed(1)}%
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Return on investment</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Projected Revenue</h3>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(estimates.revenue)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Based on conversion rates</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Influencers</h3>
                  <div className="text-xl font-semibold">
                    {estimates.influencers}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatCurrency(estimates.costPerInfluencer)} per influencer
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Engagement</h3>
                  <div className="text-xl font-semibold">
                    {formatNumber(estimates.engagement)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Expected interactions</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Conversions</h3>
                  <div className="text-xl font-semibold">
                    {formatNumber(estimates.conversions)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Estimated sales</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Cost per Result</h3>
                  <div className="text-xl font-semibold">
                    {formatCurrency(parseFloat(metrics.budget) / estimates.conversions)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Per conversion</p>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  These estimates are based on industry averages and benchmarks. Actual results may vary based on 
                  content quality, targeting, and market conditions.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}