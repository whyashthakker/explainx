// data/pricing.ts
import { type } from "os";

export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  features: string[];
  platforms: string;
  buttonText: string;
  buttonVariant?: "outline" | "default" | "secondary" | "destructive";
  buttonLink: string;
  tag?: { 
    text: string; 
    variant: "outline" | "default" | "secondary" | "destructive" 
  };
  highlight?: boolean;
}

export interface InfluencerTier {
  name: string;
  minCPC: number;
  maxCPC: number;
  averageEngagement: number;
}

export interface Feature {
  title: string;
  description: string;
  items: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export const plans: PricingPlan[] = [
  {
    name: "Free",
    description: "Perfect for trying out our platform",
    price: "$0",
    platforms: "Instagram only",
    features: [
      "Find nano influencers",
      "1 campaign per month",
      "View up to 5 applications",
      "Pay based on influencer performance",
      "Verified influencers only"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
    buttonLink: "/signup"
  },
  {
    name: "Starter",
    description: "For small businesses and startups",
    price: "$19",
    platforms: "Instagram and LinkedIn",
    features: [
      "Access all influencer tiers (nano to mega)",
      "Up to 5 campaigns per month",
      "View up to 20 applications",
      "Pay based on influencer performance",
      "Verified influencers only",
      "2 platforms support"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "outline",
    buttonLink: "/signup"
  },
  {
    name: "Growth",
    description: "For growing brands",
    price: "$49",
    platforms: "Instagram, LinkedIn, Twitter, Facebook, TikTok, YouTube",
    features: [
      "All Starter features",
      "Up to 20 campaigns per month",
      "AI-powered influencer matching",
      "Advanced analytics dashboard",
      "Pay based on influencer performance",
      "Verified influencers only",
      "6 platforms support"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "default",
    buttonLink: "/signup",
    tag: { text: "Popular", variant: "default" },
    highlight: true
  },
  {
    name: "Professional",
    description: "For marketing teams and agencies",
    price: "$89",
    platforms: "All platforms supported",
    features: [
      "All Growth features",
      "Unlimited campaigns",
      "Unlimited applications",
      "AI-powered campaign optimization",
      "Priority support",
      "Pay based on influencer performance",
      "Verified influencers only",
      "Unlimited platform access"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "outline",
    buttonLink: "/signup"
  }
];

export const influencerTiers: InfluencerTier[] = [
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

export const features: Feature[] = [
  {
    title: "Performance-Based Pricing",
    description: "Pay only for actual engagement and results",
    items: [
      "Credits based on influencer views",
      "Refunds for overperforming content",
      "Transparent pricing per platform",
      "No hidden fees"
    ]
  },
  {
    title: "Platform Features",
    description: "Everything you need to run successful campaigns",
    items: [
      "Verified influencers only",
      "AI-powered matching",
      "Real-time analytics",
      "Multi-platform support"
    ]
  },
  {
    title: "Campaign Management",
    description: "Tools to maximize your ROI",
    items: [
      "Easy campaign creation",
      "Automated payments",
      "Performance tracking",
      "Content approval system"
    ]
  }
];

export const faqs: FAQ[] = [
  {
    question: "How does the pay-per-performance model work?",
    answer: "You purchase platform credits and pay influencers based on their average view count. If content outperforms expectations, you're eligible for a refund of the difference. This ensures you only pay for actual performance."
  },
  {
    question: "What platforms are supported?",
    answer: "Different plans support different platforms. Free tier includes Instagram only, Starter adds LinkedIn, Growth tier includes major platforms (Instagram, LinkedIn, Twitter, Facebook, TikTok, YouTube), and Professional supports all platforms without limits."
  },
  {
    question: "How are influencers verified?",
    answer: "All influencers on our platform go through a verification process that checks their identity, engagement authenticity, and content quality. This ensures you're working with legitimate creators who can deliver real results."
  },
  {
    question: "What happens if I need more applications or campaigns?",
    answer: "You can upgrade your plan at any time to increase your campaign and application limits. The Professional plan offers unlimited campaigns and applications for maximum flexibility."
  }
];