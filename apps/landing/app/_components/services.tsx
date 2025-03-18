import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Code, BookOpen, Cpu, Layout, Lightbulb, Bot } from 'lucide-react';
import { ReactNode } from 'react';
import Link from 'next/link';

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-32 dark:bg-[#0A0A0A]">
      <div className="@container mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Our Services</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Comprehensive solutions to help you build, deploy, and manage AI agents that transform your business
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard 
            title="Custom AI Agent Development"
            description="Build powerful AI agents tailored to your specific needs"
            icon={<Bot className="size-6" />}
            features={[
              "Custom workflow automation",
              "Integration with existing systems",
              "Natural language processing capabilities",
              "Scalable and maintainable solutions"
            ]}
            ctaText="Start Building Your Agent"
            ctaLink="#start-building"
          />
          
          <ServiceCard 
            title="AI Agent Training Programs"
            description="Empower your team to build and maintain AI agents"
            icon={<BookOpen className="size-6" />}
            features={[
              "Hands-on workshops",
              "Best practices and methodologies",
              "Technical implementation guides",
              "Ongoing support and mentoring"
            ]}
            ctaText="Train Your Team"
            ctaLink="#train-team"
          />
          
          <ServiceCard 
            title="Generative AI Training"
            description="Master the fundamentals of generative AI"
            icon={<Cpu className="size-6" />}
            features={[
              "LLM fundamentals",
              "Prompt engineering",
              "Fine-tuning strategies",
              "Practical applications"
            ]}
            ctaText="Learn Generative AI"
            ctaLink="#learn-generative-ai"
          />
          
          <ServiceCard 
            title="Frontend Development"
            description="Create intuitive interfaces for your AI agents"
            icon={<Layout className="size-6" />}
            features={[
              "User-friendly interfaces",
              "Responsive design",
              "Real-time interactions",
              "Custom dashboards"
            ]}
            ctaText="Design Your Interface"
            ctaLink="#design-interface"
          />
          
          <ServiceCard 
            title="AI Consulting Services"
            description="Strategic guidance for AI implementation"
            icon={<Lightbulb className="size-6" />}
            features={[
              "AI strategy development",
              "Technology assessment",
              "Implementation roadmap",
              "ROI optimization"
            ]}
            ctaText="Get Expert Advice"
            ctaLink="#expert-advice"
          />
          
          <ServiceCard 
            title="AI Development Workshops"
            description="Hands-on learning for rapid AI implementation"
            icon={<Code className="size-6" />}
            features={[
              "Practical development exercises",
              "Real-world case studies",
              "Framework tutorials",
              "Implementation best practices"
            ]}
            ctaText="Join a Workshop"
            ctaLink="#join-workshop"
          />
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

const ServiceCard = ({ title, description, icon, features, ctaText, ctaLink }: ServiceCardProps) => (
  <Card className="group h-full flex flex-col shadow-zinc-950/5 transition-all duration-300 hover:shadow-md overflow-hidden">
    <CardHeader className="pb-3">
      <CardDecorator>
        {icon}
      </CardDecorator>
      <h3 className="mt-6 font-medium text-xl">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
    </CardHeader>
    
    <CardContent className="flex-grow">
      <ul className="space-y-2 mt-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="mr-2 mt-1 flex h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    
    <CardFooter className="pt-4">
      <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        <Link href={ctaLink}>
          {ctaText}
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-24 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:12px_12px]" />
    <div aria-hidden className="bg-radial to-background absolute inset-0 from-transparent to-75%" />
    <div className="bg-background absolute inset-0 m-auto flex size-10 items-center justify-center border-l border-t text-primary">{children}</div>
  </div>
);