"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Alert, AlertDescription } from '@repo/ui/components/ui/alert';
import { InfoIcon } from 'lucide-react';

type Platform = 'facebook' | 'instagram' | 'tiktok' | 'linkedin' | 'twitter';

interface CampaignMetrics {
  campaignCost: string;
  impressions: string;
  clicks: string;
  conversions: string;
  conversionValue: string;
}

interface ROIMetrics {
  roi: number;
  roas: number;
  cpc: number;
  cpm: number;
  conversionRate: number;
  costPerConversion: number;
}

const PLATFORM_BENCHMARKS = {
  facebook: {
    ctr: '0.90%',
    conversionRate: '2.8%',
    cpc: '$1.72',
    roas: '2.5x'
  },
  instagram: {
    ctr: '1.11%',
    conversionRate: '3.1%',
    cpc: '$3.56',
    roas: '2.8x'
  },
  tiktok: {
    ctr: '1.3%',
    conversionRate: '1.9%',
    cpc: '$1.82',
    roas: '2.1x'
  },
  linkedin: {
    ctr: '0.45%',
    conversionRate: '2.2%',
    cpc: '$5.26',
    roas: '2.7x'
  },
  twitter: {
    ctr: '0.86%',
    conversionRate: '2.0%',
    cpc: '$1.94',
    roas: '2.2x'
  }
};

export default function SocialROICalculator() {
  const [platform, setPlatform] = useState<Platform>('facebook');
  const [metrics, setMetrics] = useState<CampaignMetrics>({
    campaignCost: '',
    impressions: '',
    clicks: '',
    conversions: '',
    conversionValue: ''
  });
  const [results, setResults] = useState<ROIMetrics | null>(null);

  const handleInputChange = (field: keyof CampaignMetrics, value: string) => {
    // Only allow numbers and decimal points
    if (value && !/^\d*\.?\d*$/.test(value)) return;

    setMetrics(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateMetrics = () => {
    const cost = parseFloat(metrics.campaignCost) || 0;
    const impressions = parseInt(metrics.impressions) || 0;
    const clicks = parseInt(metrics.clicks) || 0;
    const conversions = parseInt(metrics.conversions) || 0;
    const conversionValue = parseFloat(metrics.conversionValue) || 0;

    if (cost === 0) return;

    const totalRevenue = conversions * conversionValue;
    
    const roi = ((totalRevenue - cost) / cost) * 100;
    const roas = totalRevenue / cost;
    const cpc = clicks > 0 ? cost / clicks : 0;
    const cpm = impressions > 0 ? (cost / impressions) * 1000 : 0;
    const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;
    const costPerConversion = conversions > 0 ? cost / conversions : 0;

    setResults({
      roi,
      roas,
      cpc,
      cpm,
      conversionRate,
      costPerConversion
    });
  };

  // Calculate metrics whenever inputs change
  React.useEffect(() => {
    calculateMetrics();
  }, [metrics, platform]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return value.toFixed(2) + '%';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculate Social Media ROI</CardTitle>
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
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Campaign Cost ($)</label>
                <Input
                  placeholder="Enter total campaign spend"
                  value={metrics.campaignCost}
                  onChange={(e) => handleInputChange('campaignCost', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Impressions</label>
                <Input
                  placeholder="Enter total impressions"
                  value={metrics.impressions}
                  onChange={(e) => handleInputChange('impressions', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Clicks</label>
                <Input
                  placeholder="Enter total clicks"
                  value={metrics.clicks}
                  onChange={(e) => handleInputChange('clicks', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Conversions</label>
                <Input
                  placeholder="Enter number of conversions"
                  value={metrics.conversions}
                  onChange={(e) => handleInputChange('conversions', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Conversion Value ($)
                  <InfoIcon className="inline-block ml-1 h-4 w-4 text-gray-400" />
                </label>
                <Input
                  placeholder="Enter average value per conversion"
                  value={metrics.conversionValue}
                  onChange={(e) => handleInputChange('conversionValue', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">ROI</div>
                <div className="text-2xl font-semibold text-blue-600">
                  {formatPercent(results.roi)}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">ROAS</div>
                <div className="text-2xl font-semibold text-blue-600">
                  {results.roas.toFixed(2)}x
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Cost Per Click</div>
                <div className="text-2xl font-semibold text-blue-600">
                  {formatCurrency(results.cpc)}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">CPM</div>
                <div className="text-2xl font-semibold text-blue-600">
                  {formatCurrency(results.cpm)}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Conversion Rate</div>
                <div className="text-2xl font-semibold text-blue-600">
                  {formatPercent(results.conversionRate)}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Cost Per Conversion</div>
                <div className="text-2xl font-semibold text-blue-600">
                  {formatCurrency(results.costPerConversion)}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">{platform.charAt(0).toUpperCase() + platform.slice(1)} Benchmarks</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600">Avg. CTR</div>
                  <div className="font-medium">{PLATFORM_BENCHMARKS[platform].ctr}</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600">Avg. Conv. Rate</div>
                  <div className="font-medium">{PLATFORM_BENCHMARKS[platform].conversionRate}</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600">Avg. CPC</div>
                  <div className="font-medium">{PLATFORM_BENCHMARKS[platform].cpc}</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600">Avg. ROAS</div>
                  <div className="font-medium">{PLATFORM_BENCHMARKS[platform].roas}</div>
                </div>
              </div>
            </div>

            <Alert className="mt-4">
              <AlertDescription>
                These metrics are calculated based on your input data. Industry benchmarks are averages and may vary by niche, audience, and campaign objectives.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}