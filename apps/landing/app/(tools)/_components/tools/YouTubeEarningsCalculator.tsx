"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';

type Niche = 'gaming' | 'tech' | 'education' | 'entertainment' | 'lifestyle' | 'business' | 'music' | 'sports';

interface Metrics {
  subscribers: string;
  monthlyViews: string;
  averageVideoLength: string;
  videosPerMonth: string;
  engagementRate: string;
}

const NICHE_CPM_RATES: Record<Niche, { min: number; max: number }> = {
  gaming: { min: 2, max: 5 },
  tech: { min: 4, max: 8 },
  education: { min: 5, max: 10 },
  entertainment: { min: 3, max: 6 },
  lifestyle: { min: 3, max: 7 },
  business: { min: 7, max: 15 },
  music: { min: 2, max: 5 },
  sports: { min: 3, max: 6 }
};

const MONETIZATION_BENCHMARKS = {
  adsense: {
    factor: 1.0,
    description: 'Ad revenue based on niche CPM rates'
  },
  sponsorships: {
    factor: 0.8,
    minSubscribers: 10000,
    description: 'Brand deals and sponsored content'
  },
  memberships: {
    factor: 0.3,
    minSubscribers: 30000,
    description: 'Channel memberships and Super Chats'
  },
  merchandise: {
    factor: 0.4,
    minSubscribers: 10000,
    description: 'Custom merchandise sales'
  },
  affiliates: {
    factor: 0.5,
    description: 'Affiliate marketing revenue'
  }
};

export default function YouTubeEarningsCalculator() {
  const [niche, setNiche] = useState<Niche>('entertainment');
  const [metrics, setMetrics] = useState<Metrics>({
    subscribers: '',
    monthlyViews: '',
    averageVideoLength: '',
    videosPerMonth: '',
    engagementRate: ''
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
    const subscribers = parseInt(metrics.subscribers) || 0;
    const monthlyViews = parseInt(metrics.monthlyViews) || 0;
    const videosPerMonth = parseInt(metrics.videosPerMonth) || 0;
    const engagementRate = parseFloat(metrics.engagementRate) || 0;

    if (monthlyViews === 0) return null;

    const nicheCPM = NICHE_CPM_RATES[niche];
    const avgCPM = (nicheCPM.min + nicheCPM.max) / 2;
    
    // Calculate base AdSense earnings
    const baseAdsenseEarnings = (monthlyViews / 1000) * avgCPM;

    // Calculate earnings for each revenue stream
    const earnings = {
      adsense: {
        min: baseAdsenseEarnings * 0.8,
        max: baseAdsenseEarnings * 1.2
      },
      sponsorships: {
        min: subscribers >= 10000 ? baseAdsenseEarnings * MONETIZATION_BENCHMARKS.sponsorships.factor * 0.8 : 0,
        max: subscribers >= 10000 ? baseAdsenseEarnings * MONETIZATION_BENCHMARKS.sponsorships.factor * 1.2 : 0
      },
      memberships: {
        min: subscribers >= 30000 ? (subscribers * 0.01 * 4.99) * MONETIZATION_BENCHMARKS.memberships.factor : 0,
        max: subscribers >= 30000 ? (subscribers * 0.02 * 4.99) * MONETIZATION_BENCHMARKS.memberships.factor : 0
      },
      merchandise: {
        min: subscribers >= 10000 ? (subscribers * 0.005 * 15) * MONETIZATION_BENCHMARKS.merchandise.factor : 0,
        max: subscribers >= 10000 ? (subscribers * 0.01 * 20) * MONETIZATION_BENCHMARKS.merchandise.factor : 0
      },
      affiliates: {
        min: monthlyViews * 0.001 * MONETIZATION_BENCHMARKS.affiliates.factor,
        max: monthlyViews * 0.002 * MONETIZATION_BENCHMARKS.affiliates.factor
      }
    };

    // Calculate totals
    const totalMin = Object.values(earnings).reduce((sum, e) => sum + e.min, 0);
    const totalMax = Object.values(earnings).reduce((sum, e) => sum + e.max, 0);

    return { earnings, totalMin, totalMax };
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
          <CardTitle>Calculate YouTube Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Content Niche</label>
              <Select value={niche} onValueChange={(value: Niche) => setNiche(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select niche" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Subscribers</label>
                <Input
                  placeholder="Enter number of subscribers"
                  value={metrics.subscribers}
                  onChange={(e) => handleInputChange('subscribers', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Monthly Views</label>
                <Input
                  placeholder="Enter monthly views"
                  value={metrics.monthlyViews}
                  onChange={(e) => handleInputChange('monthlyViews', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Videos per Month</label>
                <Input
                  placeholder="Enter videos per month"
                  value={metrics.videosPerMonth}
                  onChange={(e) => handleInputChange('videosPerMonth', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {earnings && (
        <Card>
          <CardHeader>
            <CardTitle>Estimated Monthly Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Total Potential Earnings</h3>
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(earnings.totalMin)} - {formatCurrency(earnings.totalMax)}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  per month based on current metrics
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">AdSense Revenue</h3>
                  <div className="text-xl font-semibold">
                    {formatCurrency(earnings.earnings.adsense.min)} - {formatCurrency(earnings.earnings.adsense.max)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Based on {niche} niche CPM rates
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Sponsorships</h3>
                  <div className="text-xl font-semibold">
                    {formatCurrency(earnings.earnings.sponsorships.min)} - {formatCurrency(earnings.earnings.sponsorships.max)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {parseInt(metrics.subscribers) >= 10000 ? 'Available based on subscriber count' : 'Requires 10,000+ subscribers'}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Channel Memberships</h3>
                  <div className="text-xl font-semibold">
                    {formatCurrency(earnings.earnings.memberships.min)} - {formatCurrency(earnings.earnings.memberships.max)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {parseInt(metrics.subscribers) >= 30000 ? 'Available based on subscriber count' : 'Requires 30,000+ subscribers'}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Merchandise</h3>
                  <div className="text-xl font-semibold">
                    {formatCurrency(earnings.earnings.merchandise.min)} - {formatCurrency(earnings.earnings.merchandise.max)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {parseInt(metrics.subscribers) >= 10000 ? 'Estimated merchandise sales' : 'Requires 10,000+ subscribers'}
                  </p>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  These estimates are based on industry averages and can vary significantly based on content quality, 
                  audience engagement, and market conditions. Actual earnings may differ.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}