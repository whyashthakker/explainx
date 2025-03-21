"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
import { cn } from "@repo/ui/lib/utils";

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

interface PricingCardProps {
  model: typeof engagementModels[0];
  index: number;
  isVisible: boolean;
}

const PricingCard = ({ model, index, isVisible }: PricingCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
  >
    <Card className={cn(
      "relative overflow-hidden hover:shadow-lg transition-all duration-300",
      "border border-gray-200 dark:border-gray-800",
      "h-full flex flex-col",
      model.highlight ? 'ring-2 ring-secondaccent shadow-lg dark:ring-secondaccent2' : ''
    )}>
      {model.highlight && (
        <div className="absolute top-0 right-0">
          <div className="w-24 h-24 relative">
            <div className="absolute transform rotate-45 bg-secondaccent text-white font-medium py-1 right-[-35px] top-[32px] w-[170px] text-center text-xs">
              RECOMMENDED
            </div>
          </div>
        </div>
      )}
      
      <CardHeader className="relative pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-secondaccent/10 text-secondaccent2">
            {model.icon}
          </div>
          <div>
            <h3 className="text-xl font-medium tracking-tight">{model.name}</h3>
            <p className="text-sm text-muted-foreground">{model.description}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Badge variant="outline" className="px-3 py-1 border-secondaccent/20 bg-secondaccent/5">
            {model.timeframe}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative flex-grow">
        <ul className="space-y-3">
          {model.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <CheckIcon className="h-4 w-4 text-secondaccent2 flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="relative pt-6">
        <Button 
          className={cn(
            "w-full group",
            model.highlight 
              ? "bg-secondaccent hover:bg-secondaccent2 text-black" 
              : "border-secondaccent text-secondaccent2 hover:bg-secondaccent/10"
          )}
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
  </motion.div>
);

export default function PricingSection() {
  // Create refs for each section to track when they're in view
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { 
    once: true, 
    amount: 0.3 
  });

  const infoBoxRef = useRef(null);
  const isInfoBoxInView = useInView(infoBoxRef, { 
    once: true, 
    amount: 0.5 
  });

  const cardsRef = useRef(null);
  const isCardsInView = useInView(cardsRef, { 
    once: true, 
    amount: 0.1 
  });

  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { 
    once: true, 
    amount: 0.8 
  });

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background dark:bg-[#0A0A0A]" id="pricing">
      <div className="mx-auto max-w-6xl px-6 relative">
        {/* Section Header with Yellow Accent */}
        <div className="mb-16" ref={headerRef}>
          <motion.div 
            className="flex items-center gap-3 mb-2"
            initial={{ x: -20, opacity: 0 }}
            animate={isHeaderInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-1 h-6 bg-secondaccent"></div>
            <h3 className="text-sm font-medium uppercase tracking-wider">ENGAGEMENT MODELS</h3>
          </motion.div>
          
          {/* Headline with mixed styling */}
          <div className="mt-8">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-normal font-cal"
              initial={{ y: 20, opacity: 0 }}
              animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className=" ">Flexible</span> solutions
              <br />
              tailored to your <span className=" ">needs</span>
            </motion.h2>
            
            {/* Description paragraph */}
            <motion.p 
              className="mt-6 text-muted-foreground max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our engagement models are designed to accommodate different project requirements,
              timelines, and budgets. Choose the option that best suits your AI development journey.
            </motion.p>
          </div>
          
          {/* Yellow Circle Accent */}
         
        </div>

        {/* Info Box */}
        <motion.div 
          ref={infoBoxRef}
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInfoBoxInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 p-5 rounded-xl max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <InfoIcon className="h-5 w-5 text-yellow-600 dark:text-secondaccent2 flex-shrink-0 mt-1" />
              <p className="text-sm text-yellow-900 dark:text-yellow-300/90 text-left">
                Our pricing is based on project complexity and requirements. Schedule a consultation 
                to discuss your project and receive a detailed proposal tailored to your specific needs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Creative Staggered Card Layout */}
        <div 
          ref={cardsRef}
          className="grid gap-8 md:grid-cols-3 mb-16 relative"
        >
          {/* Decorative Element */}
          <motion.div 
            className="absolute inset-0 -z-10 opacity-20 dark:opacity-10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isCardsInView ? { opacity: 0.2 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 blur-3xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 to-secondaccent opacity-30"></div>
            </div>
          </motion.div>
          
          {engagementModels.map((model, index) => (
            <PricingCard 
              key={index} 
              model={model} 
              index={index} 
              isVisible={isCardsInView}
            />
          ))}
        </div>

        <motion.div 
          ref={ctaRef}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Button 
            size="lg" 
            variant="outline" 
            className="border-secondaccent text-secondaccent2 hover:bg-secondaccent/10 px-8"
            asChild
          >
            <Link href="/demo" className="flex items-center gap-3">
              <Code2 className="h-5 w-5" />
              <span className="font-medium">Schedule a Consultation</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}