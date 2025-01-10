"use client";

import React from 'react';
import { 
  Bot, 
  Users, 
  Wrench, 
  Code2, 
  ArrowRight,
  InfoIcon,
  CheckIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/ui/card";

const engagementModels = [
  {
    name: "Agent Development",
    description: "Custom AI agent development for your specific needs",
    icon: <Bot className="h-5 w-5" />,
    priceRange: "Project-based",
    features: [
      "Custom development & integration",
      "Performance optimization",
      "Security implementation",
      "Deployment support"
    ],
    timeframe: "2-12 weeks",
    buttonText: "Discuss Your Project",
    highlight: true,
  },
  {
    name: "Team Training",
    description: "Empower your team with AI development skills",
    icon: <Users className="h-5 w-5" />,
    priceRange: "$15,000 - $50,000",
    features: [
      "Customized curriculum",
      "Hands-on workshops",
      "Project-based learning",
      "Ongoing mentorship"
    ],
    timeframe: "4-12 weeks",
    buttonText: "Plan Your Training",
  },
  {
    name: "Consulting & Support",
    description: "Strategic guidance and ongoing maintenance",
    icon: <Wrench className="h-5 w-5" />,
    priceRange: "Monthly fee",
    features: [
      "Technical architecture review",
      "Implementation roadmap",
      "Performance monitoring",
      "Technical support"
    ],
    timeframe: "Ongoing",
    buttonText: "Learn More",
  }
];

const PricingCard = ({ model }: { model: typeof engagementModels[0] }) => (
  <Card className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 ${
    model.highlight ? 'ring-2 ring-primary shadow-lg' : ''
  }`}>
    <CardHeader className="relative">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
          {model.icon}
        </div>
        <div>
          <h3 className="text-xl font-cal font-bold tracking-tight">{model.name}</h3>
          <p className="text-sm text-muted-foreground">{model.description}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Badge variant="outline" className="px-3 py-1">
          {model.timeframe}
        </Badge>
      </div>
    </CardHeader>

    <CardContent className="relative">
      <ul className="space-y-2.5">
        {model.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <CheckIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>

    <CardFooter className="relative">
      <Button 
        className="w-full group" 
        variant={model.highlight ? "default" : "outline"}
        asChild
      >
        <Link href="/demo" className="flex items-center justify-center gap-2">
          {model.buttonText}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function PricingSection() {
  return (
    <section className="relative py-20">
      <div className="container max-w-6xl relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-cal font-bold mb-4">
            Engagement Models
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Flexible solutions tailored to your AI development needs
          </p>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl inline-block max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <InfoIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-sm text-blue-900 text-left">
                Our pricing is based on project complexity and requirements. Schedule a consultation 
                to discuss your project and receive a detailed proposal.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {engagementModels.map((model, index) => (
            <PricingCard key={index} model={model} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/demo" className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Schedule a Consultation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}