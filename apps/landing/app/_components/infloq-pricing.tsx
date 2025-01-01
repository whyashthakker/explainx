"use client"

import React, { useState } from "react";
import { CheckIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { Slider } from "@repo/ui/components/ui/slider";
import { Badge } from "@repo/ui/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select";
import { Label } from "@repo/ui/components/ui/label";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        premium: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 hover:opacity-90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface Plan {
  name: string;
  description: string;
  initialCredits: number;
  price: string;
  features: string[];
  unavailableFeatures?: string[];
  buttonText: string;
  buttonVariant?: "default" | "premium" | "outline";
  buttonLink: string;
  tag?: {
    text: string;
    color: "default" | "secondary" | "destructive";
  };
  highlight?: boolean;
}

interface InfluencerTier {
  name: string;
  minCPC: number;
  maxCPC: number;
  averageEngagement: number;
  description: string;
}

const influencerTiers: InfluencerTier[] = [
  {
    name: "Micro",
    minCPC: 0.05,
    maxCPC: 0.15,
    averageEngagement: 0.05,
    description: "10k-50k followers"
  },
  {
    name: "Mid-Tier",
    minCPC: 0.15,
    maxCPC: 0.50,
    averageEngagement: 0.035,
    description: "50k-500k followers"
  },
  {
    name: "Macro",
    minCPC: 0.50,
    maxCPC: 1.50,
    averageEngagement: 0.025,
    description: "500k-1M followers"
  },
  {
    name: "Celebrity",
    minCPC: 1.50,
    maxCPC: 5.00,
    averageEngagement: 0.015,
    description: "1M+ followers"
  }
];

export function Pricing() {
  const [budget, setBudget] = useState(1000);
  const [selectedTier, setSelectedTier] = useState<string>(influencerTiers.length > 0 && influencerTiers[0] ? influencerTiers[0].name : "");
  const [estimatedCPC, setEstimatedCPC] = useState<number>(0.10);
  
  const calculateCredits = (amount: number) => amount * 10; // 100 credits = $10
  
  const selectedTierInfo = influencerTiers.find(tier => tier.name === selectedTier)!;
  
  const calculateEstimates = () => {
    const credits = calculateCredits(budget);
    const potentialClicks = Math.floor(budget / estimatedCPC);
    const estimatedReach = Math.floor(potentialClicks / selectedTierInfo.averageEngagement);
    
    return {
      credits,
      potentialClicks,
      estimatedReach
    };
  };

  const estimates = calculateEstimates();

  const plans: Plan[] = [
    {
      name: "Starter",
      description: "Perfect for small businesses starting with influencer marketing",
      initialCredits: calculateCredits(500),
      price: "$500",
      features: [
        "Access to AI-powered influencer matching",
        "Basic analytics dashboard",
        "Email support",
        "Pay-per-click pricing",
        "Campaign management tools"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
      buttonLink: "/signup",
      tag: {
        text: "Popular",
        color: "default"
      }
    },
    {
      name: "Growth",
      description: "Ideal for growing brands with regular campaigns",
      initialCredits: calculateCredits(2000),
      price: "$2,000",
      features: [
        "Everything in Starter",
        "Priority influencer matching",
        "Advanced analytics & reporting",
        "Dedicated account manager",
        "Custom campaign strategies",
        "Bulk messaging tools"
      ],
      buttonText: "Scale Up",
      buttonVariant: "premium",
      buttonLink: "/signup",
      tag: {
        text: "Recommended",
        color: "secondary"
      },
      highlight: true
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large-scale campaigns",
      initialCredits: calculateCredits(5000),
      price: "$5,000+",
      features: [
        "Everything in Growth",
        "Custom integration support",
        "API access",
        "Multi-brand management",
        "Volume discounts",
        "24/7 priority support"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "default",
      buttonLink: "/contact",
      tag: {
        text: "Custom",
        color: "destructive"
      }
    }
  ];

  return (
    <div className="relative mx-auto max-w-7xl bg-white px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 className="font-cal text-base leading-7 text-blue-600">Transparent Pricing</h2>
        <p className="mt-2 font-cal text-3xl text-gray-900 sm:text-5xl">
          Pay Only For Results
        </p>
        <p className="mt-4 text-lg text-gray-600">
          Purchase credits upfront and only pay for actual engagement. 
          100 credits = $10, no expiration.
        </p>
      </div>

      <div className="mt-8 mx-auto max-w-lg">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Campaign Budget</Label>
            <Slider 
              value={[budget]}
              onValueChange={(value) => {
                if (value[0] !== undefined) {
                  setBudget(value[0]);
                }
              }}
              max={10000}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>$500</span>
              <span>$10,000</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Influencer Tier</Label>
            <Select 
              value={selectedTier} 
              onValueChange={(value) => {
                setSelectedTier(value);
                const tier = influencerTiers.find(t => t.name === value)!;
                setEstimatedCPC((tier.minCPC + tier.maxCPC) / 2);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select influencer tier" />
              </SelectTrigger>
              <SelectContent>
                {influencerTiers.map((tier) => (
                  <SelectItem key={tier.name} value={tier.name}>
                    {tier.name} ({tier.description})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Cost per Click (USD)
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

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Credits</p>
                <p className="text-2xl font-bold">{estimates.credits.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Potential Clicks</p>
                <p className="text-2xl font-bold">{estimates.potentialClicks.toLocaleString()}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Estimated Reach</p>
                <p className="text-2xl font-bold">{estimates.estimatedReach.toLocaleString()}+</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-2">
              {/* <InfoCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" /> */}
              <p>
                Cost varies based on influencer performance and engagement rates.
                Final costs include a 30% platform fee.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-3xl bg-white p-8 ${
              plan.highlight 
                ? `ring-2 ring-blue-500 shadow-xl` 
                : "ring-1 ring-gray-200"
            }`}
          >
            {plan.tag && (
              <Badge
                variant={plan.tag.color}
                className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1"
              >
                {plan.tag.text}
              </Badge>
            )}

            <div className="mb-4">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
            </div>

            <div className="mt-6">
              <p className="text-3xl font-bold">{plan.price}</p>
              <p className="mt-1 text-sm text-gray-500">
                {plan.initialCredits.toLocaleString()} initial credits
              </p>
            </div>

            <ul className="mt-8 space-y-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckIcon className="h-5 w-5 flex-none text-blue-600 mt-0.5" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              href={plan.buttonLink}
              className={`${buttonVariants({ 
                variant: plan.buttonVariant, 
                size: "lg" 
              })} mt-8 w-full`}
            >
              {plan.buttonText}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          All plans include a one-time onboarding fee. Influencer transaction fees are 30% of campaign spend.
          <br />
          Need a custom plan? <Link href="/contact" className="text-blue-600 hover:underline">Contact our sales team</Link>
        </p>
      </div>
    </div>
  );
}