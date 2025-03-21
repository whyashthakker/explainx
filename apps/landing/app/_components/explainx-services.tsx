"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  GraduationCap, 
  Code2, 
  Layout,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Users,
  BrainCircuit,
  Layers
} from 'lucide-react';
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  ctaText: string;
  ctaLink: string;
  gradient: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  features,
  ctaText,
  ctaLink,
  gradient,
  delay
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="w-full"
    >
      <Card className="relative h-full overflow-hidden border border-gray-200 bg-white transition-all hover:shadow-lg">
        <div className={`absolute inset-x-0 top-0 h-2 ${gradient}`} />
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-gray-100 p-2.5">
              {icon}
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full justify-between group"
            variant="outline"
            asChild
          >
            <a href={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const services: ServiceCardProps[] = [
  {
    title: "Custom AI Agent Development",
    description: "Build powerful AI agents tailored to your specific needs",
    icon: <Bot className="h-6 w-6 text-blue-600" />,
    features: [
      "Custom workflow automation",
      "Integration with existing systems",
      "Natural language processing capabilities",
      "Scalable and maintainable solutions"
    ],
    ctaText: "Start Building Your Agent",
    ctaLink: "/contact",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-500",
    delay: 0.1
  },
  {
    title: "AI Agent Training Programs",
    description: "Empower your team to build and maintain AI agents",
    icon: <GraduationCap className="h-6 w-6 text-green-600" />,
    features: [
      "Hands-on workshops",
      "Best practices and methodologies",
      "Technical implementation guides",
      "Ongoing support and mentoring"
    ],
    ctaText: "Train Your Team",
    ctaLink: "/training",
    gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
    delay: 0.2
  },
  {
    title: "Generative AI Training",
    description: "Master the fundamentals of generative AI",
    icon: <BrainCircuit className="h-6 w-6 text-purple-600" />,
    features: [
      "LLM fundamentals",
      "Prompt engineering",
      "Fine-tuning strategies",
      "Practical applications"
    ],
    ctaText: "Learn Generative AI",
    ctaLink: "/gen-ai-training",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
    delay: 0.3
  },
  {
    title: "Frontend Development",
    description: "Create intuitive interfaces for your AI agents",
    icon: <Layout className="h-6 w-6 text-indigo-600" />,
    features: [
      "User-friendly interfaces",
      "Responsive design",
      "Real-time interactions",
      "Custom dashboards"
    ],
    ctaText: "Design Your Interface",
    ctaLink: "/frontend",
    gradient: "bg-gradient-to-r from-indigo-500 to-blue-500",
    delay: 0.4
  },
  {
    title: "AI Consulting Services",
    description: "Strategic guidance for AI implementation",
    icon: <Lightbulb className="h-6 w-6 text-yellow-600" />,
    features: [
      "AI strategy development",
      "Technology assessment",
      "Implementation roadmap",
      "ROI optimization"
    ],
    ctaText: "Get Expert Advice",
    ctaLink: "/consulting",
    gradient: "bg-gradient-to-r from-secondaccent2 to-orange-500",
    delay: 0.5
  }
];

export default function ServicesPage() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-cal font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive solutions to help you build, deploy, and manage AI agents that transform your business
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center p-4 bg-blue-50 rounded-lg">
            <Users className="h-6 w-6 text-blue-600 mr-2" />
            <p className="text-blue-800">
              Not sure which service is right for you? 
              <a href="/demo" className="ml-2 font-semibold hover:underline">
                Let's talk →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}