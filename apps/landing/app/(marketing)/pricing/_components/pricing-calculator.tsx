"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Button } from "@repo/ui/components/ui/button";
import { Slider } from "@repo/ui/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select";

interface InfluencerTier {
  name: string;
  minCPC: number;
  maxCPC: number;
  averageEngagement: number;
}

const influencerTiers: InfluencerTier[] = [
  {
    name: "Nano (1k-10k followers)",
    minCPC: 0.02,
    maxCPC: 0.05,
    averageEngagement: 0.08 // 8%
  },
  {
    name: "Micro (10k-50k followers)",
    minCPC: 0.05,
    maxCPC: 0.15,
    averageEngagement: 0.05 // 5%
  },
  {
    name: "Mid-Tier (50k-500k followers)",
    minCPC: 0.15,
    maxCPC: 0.50,
    averageEngagement: 0.035 // 3.5%
  },
  {
    name: "Macro (500k-1M followers)",
    minCPC: 0.50,
    maxCPC: 1.50,
    averageEngagement: 0.025 // 2.5%
  }
];

export function PricingCalculator() {
  const [budget, setBudget] = useState<number>(1000);
  const [selectedTier, setSelectedTier] = useState<string>(influencerTiers[0]?.name || "");
  const [engagementRate, setEngagementRate] = useState<number>(5); // Default 5%
  const [estimatedCPC, setEstimatedCPC] = useState<number>(0.10); // Default $0.10

  const selectedTierInfo = influencerTiers.find(tier => tier.name === selectedTier)!;

  const calculateEstimates = () => {
    const credits = budget * 10; // 100 credits = $10
    const potentialClicks = Math.floor(budget / estimatedCPC);
    const estimatedReach = Math.floor(potentialClicks / (engagementRate / 100));
    
    return {
      credits,
      potentialClicks,
      estimatedReach,
      costPerThousand: (budget / (estimatedReach / 1000)).toFixed(2)
    };
  };

  const estimates = calculateEstimates();

  return (
    <Card className="mb-16">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Campaign Cost Calculator</CardTitle>
        <CardDescription className="text-center">
          Estimate campaign performance based on influencer tier and engagement rates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6">
          {/* Budget Input */}
          <div className="space-y-2">
            <Label htmlFor="budget">Campaign Budget (USD)</Label>
            <Input
              id="budget"
              type="number"
              min="500"
              max="100000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          </div>

          {/* Influencer Tier Selection */}
          <div className="space-y-2">
            <Label>Influencer Tier</Label>
            <Select 
              value={selectedTier} 
              onValueChange={(value) => {
                setSelectedTier(value);
                const tier = influencerTiers.find(t => t.name === value)!;
                setEngagementRate(tier.averageEngagement * 100);
                setEstimatedCPC((tier.minCPC + tier.maxCPC) / 2);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select influencer tier" />
              </SelectTrigger>
              <SelectContent>
                {influencerTiers.map((tier) => (
                  <SelectItem key={tier.name} value={tier.name}>
                    {tier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Estimated CPC Range */}
          <div className="space-y-2">
            <Label>
              Estimated Cost per Click (USD)
              <span className="text-sm text-gray-500 ml-2">
                (Range: ${selectedTierInfo.minCPC.toFixed(2)} - ${selectedTierInfo.maxCPC.toFixed(2)})
              </span>
            </Label>
            <Slider
              value={[estimatedCPC]}
              min={selectedTierInfo.minCPC}
              max={selectedTierInfo.maxCPC}
              step={0.01}
              onValueChange={(value) => {
                if (value[0] !== undefined) {
                  setEstimatedCPC(value[0]);
                }
              }}
            />
            <div className="text-sm text-gray-500">
              Selected CPC: ${estimatedCPC.toFixed(2)}
            </div>
          </div>

          {/* Engagement Rate */}
          <div className="space-y-2">
            <Label>
              Expected Engagement Rate (%)
              <span className="text-sm text-gray-500 ml-2">
                (Average: {(selectedTierInfo.averageEngagement * 100).toFixed(1)}%)
              </span>
            </Label>
            <Slider
              value={[engagementRate]}
              min={0.1}
              max={10}
              step={0.1}
              onValueChange={(value) => {
                if (value[0] !== undefined) {
                  setEngagementRate(value[0]);
                }
              }}
            />
            <div className="text-sm text-gray-500">
              Selected Rate: {engagementRate.toFixed(1)}%
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-4 mt-6 bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <Label>Platform Credits</Label>
              <div className="text-2xl font-bold">{estimates.credits}</div>
              <div className="text-sm text-gray-500">($0.10 per credit)</div>
            </div>
            <div className="space-y-2">
              <Label>Potential Clicks</Label>
              <div className="text-2xl font-bold">{estimates.potentialClicks.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Based on selected CPC</div>
            </div>
            <div className="space-y-2">
              <Label>Estimated Reach</Label>
              <div className="text-2xl font-bold">{estimates.estimatedReach.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total impressions</div>
            </div>
            <div className="space-y-2">
              <Label>Cost per 1000 (CPM)</Label>
              <div className="text-2xl font-bold">${estimates.costPerThousand}</div>
              <div className="text-sm text-gray-500">Average cost per 1000 impressions</div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-2">
            {/* <InfoCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" /> */}
            <p>
              Note: Actual costs may vary based on influencer performance, content quality, and audience engagement. 
              A 30% platform fee will be applied to the final campaign spend.
            </p>
          </div>
        </div>
        
        <Button className="w-full" size="lg">
          Start Campaign
        </Button>
      </CardContent>
    </Card>
  );
}