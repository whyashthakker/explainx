"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';
import { InfoIcon } from 'lucide-react';

type EngagementLevel = 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
type TweetFrequency = 'very-low' | 'low' | 'medium' | 'high' | 'very-high';

interface Metrics {
  verifiedFollowers: string;
}

const ENGAGEMENT_RATES = {
  'very-low': { multiplier: 0.2, label: 'Very Low' },
  'low': { multiplier: 0.5, label: 'Low' },
  'medium': { multiplier: 1.0, label: 'Medium' },
  'high': { multiplier: 1.5, label: 'High' },
  'very-high': { multiplier: 2.0, label: 'Very High' }
};

const TWEET_FREQUENCY = {
  'very-low': { multiplier: 0.4, label: '1 or less per day' },
  'low': { multiplier: 0.8, label: '2-5 per day' },
  'medium': { multiplier: 1.0, label: '5-10 per day' },
  'high': { multiplier: 1.3, label: '10-20 per day' },
  'very-high': { multiplier: 1.6, label: '20+ per day' }
};

// Base rate from article: $2.5-10 per 1000 verified followers
const BASE_RATE = {
  min: 2.5,
  max: 10
};

export default function XEarningsCalculator() {
  const [metrics, setMetrics] = useState<Metrics>({
    verifiedFollowers: ''
  });
  const [engagement, setEngagement] = useState<EngagementLevel>('medium');
  const [tweetFrequency, setTweetFrequency] = useState<TweetFrequency>('medium');

  const handleInputChange = (value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;
    
    setMetrics({
      verifiedFollowers: value
    });
  };

  const calculateEarnings = () => {
    const followers = parseInt(metrics.verifiedFollowers) || 0;
    if (followers === 0) return null;

    const engagementMultiplier = ENGAGEMENT_RATES[engagement].multiplier;
    const frequencyMultiplier = TWEET_FREQUENCY[tweetFrequency].multiplier;

    // Calculate base monthly earnings per 1000 followers
    const baseMin = (followers / 1000) * BASE_RATE.min;
    const baseMax = (followers / 1000) * BASE_RATE.max;

    // Apply multipliers
    const adjustedMin = baseMin * engagementMultiplier * frequencyMultiplier;
    const adjustedMax = baseMax * engagementMultiplier * frequencyMultiplier;

    return {
      monthly: {
        min: adjustedMin,
        max: adjustedMax
      },
      annual: {
        min: adjustedMin * 12,
        max: adjustedMax * 12
      }
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
          <CardTitle>Calculate X (Twitter) Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Verified Followers
                <InfoIcon className="inline-block ml-1 h-4 w-4 text-gray-400" />
              </label>
              <Input
                placeholder="Enter number of verified followers"
                value={metrics.verifiedFollowers}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Engagement Rate</label>
              <Select value={engagement} onValueChange={(value: EngagementLevel) => setEngagement(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select engagement level" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ENGAGEMENT_RATES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tweet Frequency</label>
              <Select value={tweetFrequency} onValueChange={(value: TweetFrequency) => setTweetFrequency(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tweet frequency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TWEET_FREQUENCY).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Alert>
              <AlertDescription>
                Earnings are calculated based on verified follower engagement. Only engagement from verified accounts 
                contributes to revenue sharing.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {earnings && (
        <Card>
          <CardHeader>
            <CardTitle>Estimated Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Monthly Estimate</h3>
                  <div className="text-3xl font-bold text-blue-600">
                    {formatCurrency(earnings.monthly.min)} - {formatCurrency(earnings.monthly.max)}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Annual Estimate</h3>
                  <div className="text-3xl font-bold text-gray-600">
                    {formatCurrency(earnings.annual.min)} - {formatCurrency(earnings.annual.max)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Engagement Impact</h3>
                  <p className="text-sm text-gray-600">
                    Your {ENGAGEMENT_RATES[engagement].label.toLowerCase()} engagement rate affects your 
                    earnings by {(ENGAGEMENT_RATES[engagement].multiplier * 100 - 100).toFixed()}%.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Tweet Frequency Impact</h3>
                  <p className="text-sm text-gray-600">
                    Your tweet frequency ({TWEET_FREQUENCY[tweetFrequency].label}) affects your 
                    earnings by {(TWEET_FREQUENCY[tweetFrequency].multiplier * 100 - 100).toFixed()}%.
                  </p>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  These estimates are based on current X revenue sharing data. Actual earnings may vary based on 
                  content quality, audience engagement, and platform policies.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}