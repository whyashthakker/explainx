import React from 'react';
import { CheckIcon, StarIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/ui/card";
import { plans, PricingPlan } from '../../data/plans/pricing';

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
      </div>
      <p className="text-gray-500">{plan.description}</p>
      <div className="flex items-baseline gap-2 mt-4">
        <p className="text-3xl font-bold">{plan.price}</p>
        <p className="text-sm text-gray-500">/month</p>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-medium">Supported Platforms</p>
          <p className="text-sm text-gray-600">{plan.platforms}</p>
        </div>
        <ul className="space-y-3">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex gap-2">
              <CheckIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
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

export default function PricingSection() {

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-xl text-gray-600 mb-6">
          Flexible options for every stage of your growth
        </p>
        <div className="bg-blue-50 p-4 rounded-lg inline-block">
          <div className="flex items-center gap-2">
            <InfoIcon className="h-5 w-5 text-blue-500" />
            <p className="text-sm text-gray-700">
              Pay based on performance: Purchase credits and pay influencers based on their average views.
              Eligible for refunds if content outperforms expectations!
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </div>

      <div className="mt-12 space-y-6 text-center">
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