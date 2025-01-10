'use client';

import React from 'react';
import { motion as m } from 'framer-motion';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { 
  CalendarDays,
  VideoIcon,
  Code,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  LucideIcon,
  Boxes,
  FileCode2,
  Rocket
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
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-3xl" />
      <CardContent className="p-6 relative">
        {/* Progress indicator */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 rounded-t-lg overflow-hidden">
          <div 
            className="h-full bg-primary/20" 
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>
        
        <div className="pt-4">
          {/* Step number */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-muted-foreground">Step {stepNumber}</span>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>

            {/* Additional Information */}
            {additionalInfo.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <ul className="space-y-2">
                  {additionalInfo.map((info, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
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
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden md:block text-muted-foreground z-10">
        <ArrowRight className="w-6 h-6" />
      </div>
    )}
  </m.div>
);

const projectSteps: StepData[] = [
  {
    icon: CalendarDays,
    title: "Schedule a Consultation",
    description: "Book a free consultation call with our AI solutions team to discuss your needs and requirements.",
    additionalInfo: [
      "30-minute initial discussion",
      "Share your AI agent requirements",
      "Explore potential solutions"
    ],
    delay: 0.1
  },
  {
    icon: VideoIcon,
    title: "Discovery Call",
    description: "Deep dive into your business needs, technical requirements, and expected outcomes.",
    additionalInfo: [
      "Technical feasibility assessment",
      "Integration requirements review",
      "Project scope definition"
    ],
    delay: 0.2
  },
  {
    icon: FileCode2,
    title: "Proposal & Agreement",
    description: "Receive a detailed proposal outlining the solution, timeline, and investment required.",
    additionalInfo: [
      "Detailed scope documentation",
      "Clear deliverables timeline",
      "Transparent pricing structure"
    ],
    delay: 0.3
  },
  {
    icon: Code,
    title: "Development Kickoff",
    description: "Once approved, our team begins developing your custom AI agent solution.",
    additionalInfo: [
      "Regular progress updates",
      "Iterative development process",
      "Continuous feedback integration"
    ],
    delay: 0.4
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    description: "Deploy your AI agent with full documentation and ongoing support.",
    additionalInfo: [
      "Thorough testing phase",
      "Comprehensive documentation",
      "Post-launch support"
    ],
    delay: 0.5
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
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Simple Project Process
          </span>
        </m.div>
        
        <m.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold"
        >
          How We Work
        </m.h2>
        
        <m.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          From initial consultation to deployment, we ensure a smooth and transparent process
          for developing your custom AI agent solutions.
        </m.p>
      </div>

      <div className="grid md:grid-cols-5 gap-6 md:gap-8">
        {projectSteps.map((step, index) => (
          <ProcessStep 
            key={index} 
            {...step} 
            stepNumber={index + 1}
            totalSteps={projectSteps.length}
          />
        ))}
      </div>
    </div>
  );
}