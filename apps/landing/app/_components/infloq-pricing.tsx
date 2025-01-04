import React from 'react';
import { CheckIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/ui/tabs";

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  billingPeriod?: string;
  creditValue: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "outline" | "default" | "secondary" | "destructive";
  buttonLink: string;
  tag?: { 
    text: string; 
    variant: "outline" | "default" | "secondary" | "destructive" 
  };
  highlight?: boolean;
  showStar?: boolean;
}

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
  <Card className={`relative ${plan.highlight ? 'border-2 border-blue-500 shadow-lg' : ''}`}>
    {plan.tag && (
      <Badge className="absolute -top-2 right-4" variant={plan.tag.variant}>
        {plan.tag.text}
      </Badge>
    )}
    <CardHeader>
      <div className="flex items-center gap-2">
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        {plan.showStar && (
          <StarIcon className="h-5 w-5 text-yellow-500" fill="currentColor" />
        )}
      </div>
      <p className="text-gray-500">{plan.description}</p>
    </CardHeader>
    <CardContent>
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold">{plan.price}</p>
          {plan.billingPeriod && (
            <p className="text-sm text-gray-500">{plan.billingPeriod}</p>
          )}
        </div>
        <p className="text-sm text-gray-500">{plan.creditValue}</p>
      </div>
      <ul className="space-y-3">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex gap-2">
            <CheckIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button 
        className="w-full"
        variant={plan.buttonVariant || "default"}
        asChild
      >
        <Link href={plan.buttonLink}>{plan.buttonText}</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function HybridPricing() {
  const monthlyPlans: PricingPlan[] = [
    {
      name: "Starter",
      description: "Perfect for trying out our platform",
      price: "$49",
      billingPeriod: "/month",
      creditValue: "5,000 credits per month",
      features: [
        "Monthly credit refresh",
        "Basic influencer matching",
        "Campaign management tools",
        "Up to 5 active campaigns",
        "Email support"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline",
      buttonLink: "/signup"
    },
    {
      name: "Professional",
      description: "For growing creators and brands",
      price: "$99",
      billingPeriod: "/month",
      creditValue: "12,000 credits per month",
      features: [
        "Monthly credit refresh",
        "AI-powered matching",
        "Analytics dashboard",
        "Unlimited campaigns",
        "Priority support",
        "Campaign templates"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default",
      buttonLink: "/signup",
      tag: { text: "Popular", variant: "default" },
      highlight: true
    },
    {
      name: "Business",
      description: "For marketing teams and agencies",
      price: "$199",
      billingPeriod: "/month",
      creditValue: "30,000 credits per month",
      features: [
        "Monthly credit refresh",
        "Advanced analytics",
        "Priority matching",
        "API access",
        "Dedicated support",
        "Custom integrations"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline",
      buttonLink: "/signup"
    }
  ];

  const yearlyPlans: PricingPlan[] = [
    {
      name: "Starter",
      description: "Perfect for trying out our platform",
      price: "$469",
      billingPeriod: "/year",
      creditValue: "5,000 credits per month",
      features: [
        "20% savings vs monthly",
        "Monthly credit refresh",
        "Basic influencer matching",
        "Campaign management tools",
        "Up to 5 active campaigns",
        "Email support"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline",
      buttonLink: "/signup"
    },
    {
      name: "Professional",
      description: "For growing creators and brands",
      price: "$949",
      billingPeriod: "/year",
      creditValue: "12,000 credits per month",
      features: [
        "20% savings vs monthly",
        "Monthly credit refresh",
        "AI-powered matching",
        "Analytics dashboard",
        "Unlimited campaigns",
        "Priority support",
        "Campaign templates"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default",
      buttonLink: "/signup",
      tag: { text: "Popular", variant: "default" },
      highlight: true
    },
    {
      name: "Business",
      description: "For marketing teams and agencies",
      price: "$1,899",
      billingPeriod: "/year",
      creditValue: "30,000 credits per month",
      features: [
        "20% savings vs monthly",
        "Monthly credit refresh",
        "Advanced analytics",
        "Priority matching",
        "API access",
        "Dedicated support",
        "Custom integrations"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline",
      buttonLink: "/signup"
    }
  ];

  const lifetimePlans: PricingPlan[] = [
    {
      name: "Growth Package",
      description: "Best for seasonal campaigns",
      price: "$999",
      creditValue: "15,000 credits (never expire)",
      features: [
        "One-time payment",
        "Credits never expire",
        "AI-powered matching",
        "Basic analytics",
        "Email support",
        "Campaign templates"
      ],
      buttonText: "Buy Now",
      buttonVariant: "outline",
      buttonLink: "/checkout",
      showStar: true
    },
    {
      name: "Scale Package",
      description: "For consistent marketing needs",
      price: "$2,499",
      creditValue: "40,000 credits (never expire)",
      features: [
        "One-time payment",
        "Credits never expire",
        "Priority matching",
        "Advanced analytics",
        "Dedicated manager",
        "Priority support"
      ],
      buttonText: "Buy Now",
      buttonVariant: "default",
      buttonLink: "/checkout",
      tag: { text: "Best Value", variant: "secondary" },
      highlight: true,
      showStar: true
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large teams",
      price: "Custom",
      creditValue: "Custom package",
      features: [
        "Volume discounts",
        "Custom features",
        "API access",
        "24/7 support",
        "Strategic consulting",
        "Custom integrations"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      buttonLink: "/contact",
      showStar: true
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-xl text-gray-600 mb-6">
          Flexible options for every stage of your growth
        </p>
      </div>

      <Tabs defaultValue="monthly" className="mb-12">
        <TabsList className="mx-auto mb-8">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
          <TabsTrigger value="lifetime">
            <div className="flex items-center gap-1">
              Lifetime
              <StarIcon className="h-4 w-4 text-yellow-500" fill="currentColor" />
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly">
          <div className="grid gap-8 md:grid-cols-3">
            {monthlyPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="yearly">
          <div className="grid gap-8 md:grid-cols-3">
            {yearlyPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lifetime">
          <div className="grid gap-8 md:grid-cols-3">
            {lifetimePlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 space-y-6 text-center">
        <div className="inline-block bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            💡 All plans include core features • Dedicated support • 30-day money-back guarantee
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Need a custom solution?{' '}
          <Link href="/contact" className="text-blue-600 hover:underline">
            Talk to our team
          </Link>
        </p>
      </div>
    </div>
  );
}