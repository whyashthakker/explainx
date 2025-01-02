'use client';

import React from 'react';
import { motion as m } from 'framer-motion';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';
import { 
  UserPlus, 
  LineChart, 
  DollarSign, 
  Users, 
  Building2, 
  Brain,
  CheckCircle2,
  ArrowRight,
  LucideIcon,
  Clock,
  Sparkles,
  Target
} from 'lucide-react';

interface ProcessStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  additionalInfo?: string[];
  stepNumber: number;
  totalSteps: number;
  delay?: number;
}

interface StepData {
  icon: LucideIcon;
  title: string;
  description: string;
  additionalInfo: string[];
  delay: number;
}

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: delay * 0.2,
      ease: "easeOut"
    }
  })
};

const ProcessStep: React.FC<ProcessStepProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  additionalInfo = [], 
  stepNumber,
  totalSteps,
  delay = 0 
}) => (
  <m.div
    variants={fadeInUpVariant}
    initial="hidden"
    animate="visible"
    custom={delay}
    className="relative"
  >
    <Card className="relative bg-white/95 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl" />
      <CardContent className="p-6 relative">
        {/* Progress indicator */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 rounded-t-lg overflow-hidden">
          <div 
            className="h-full bg-blue-500/20" 
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>
        
        <div className="pt-4">
          {/* Step number */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">Step {stepNumber}/{totalSteps}</span>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>

            {/* Additional Information */}
            {additionalInfo.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <ul className="space-y-2">
                  {additionalInfo.map((info, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <Sparkles className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>

    {stepNumber !== totalSteps && (
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden md:block text-gray-300 z-10">
        <ArrowRight className="w-6 h-6" />
      </div>
    )}
  </m.div>
);

const creatorSteps: StepData[] = [
  {
    icon: UserPlus,
    title: "Connect Your Platforms",
    description: "Begin by linking your social media accounts to our platform. We analyze your content and engagement across all channels.",
    additionalInfo: [
      "Quick integration with major social platforms",
      "Secure OAuth2 authentication process",
      "Automatic content sync and metrics tracking"
    ],
    delay: 0.1
  },
  {
    icon: LineChart,
    title: "AI Performance Analysis",
    description: "Our advanced AI analyzes your content performance, audience demographics, and engagement patterns across platforms.",
    additionalInfo: [
      "Deep learning analysis of content performance",
      "Audience sentiment and engagement tracking",
      "Cross-platform metrics consolidation"
    ],
    delay: 0.2
  },
  {
    icon: DollarSign,
    title: "Smart Rate Optimization",
    description: "Based on your performance metrics, we calculate your optimal per-click rate to maximize earnings while staying competitive.",
    additionalInfo: [
      "Dynamic pricing based on engagement rates",
      "Industry-standard rate comparisons",
      "Regular rate optimization suggestions"
    ],
    delay: 0.3
  },
  {
    icon: CheckCircle2,
    title: "Start Collaborating",
    description: "Get automatically matched with relevant brands and start earning based on actual engagement and conversions.",
    additionalInfo: [
      "AI-powered brand matching system",
      "Performance-based compensation",
      "Real-time campaign tracking dashboard"
    ],
    delay: 0.4
  }
];

const brandSteps: StepData[] = [
  {
    icon: Target,
    title: "Define Your Campaign",
    description: "Tell us about your brand, target audience, and campaign objectives. The more specific, the better the matches.",
    additionalInfo: [
      "Detailed audience targeting options",
      "Campaign goal setting tools",
      "Budget planning assistance"
    ],
    delay: 0.1
  },
  {
    icon: Brain,
    title: "AI Market Analysis",
    description: "Our AI analyzes your requirements against our creator database to find the perfect matches for your brand.",
    additionalInfo: [
      "Real-time creator performance analysis",
      "Audience overlap detection",
      "Brand safety verification"
    ],
    delay: 0.2
  },
  {
    icon: Users,
    title: "Creator Matching",
    description: "Review AI-curated creator recommendations, complete with performance predictions and ROI estimates.",
    additionalInfo: [
      "Predicted engagement metrics",
      "Audience demographic analysis",
      "Historical performance data"
    ],
    delay: 0.3
  },
  {
    icon: Clock,
    title: "Launch & Monitor",
    description: "Start your campaign with chosen creators and track performance in real-time. Pay only for actual results.",
    additionalInfo: [
      "Real-time performance tracking",
      "Automated payment processing",
      "Campaign optimization suggestions"
    ],
    delay: 0.4
  }
];

export function HowItWorks() {
  return (
    <div className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
            Simple & Transparent Process
          </span>
        </m.div>
        
        <m.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900"
        >
          How It Works
        </m.h2>
        
        <m.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 text-lg max-w-2xl mx-auto"
        >
          Whether you're a creator or a brand, our AI-powered platform makes collaboration simple, 
          transparent, and performance-based.
        </m.p>
      </div>

      <Tabs defaultValue="creator" className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-16">
          <TabsTrigger 
            value="creator" 
            className="w-1/2 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            For Creators
          </TabsTrigger>
          <TabsTrigger 
            value="brand" 
            className="w-1/2 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            For Brands
          </TabsTrigger>
        </TabsList>

        <TabsContent value="creator">
          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {creatorSteps.map((step, index) => (
              <ProcessStep 
                key={index} 
                {...step} 
                stepNumber={index + 1}
                totalSteps={creatorSteps.length}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="brand">
          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {brandSteps.map((step, index) => (
              <ProcessStep 
                key={index} 
                {...step}
                stepNumber={index + 1}
                totalSteps={brandSteps.length}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}