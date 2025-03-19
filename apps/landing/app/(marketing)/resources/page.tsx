import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { BookOpen, HelpCircle, FileText, BookMarked, PenTool } from 'lucide-react';

interface ResourceItem {
  name: string;
  href: string;
  description?: string;
}

interface ResourceSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  resources: ResourceItem[];
}

interface ResourcesSectionProps {
  resources: ResourceSection;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ resources }) => (
  <Card className="w-full bg-gray-900 border-gray-800">
    <CardHeader>
      <div className="flex items-center gap-2">
        <resources.icon className="h-6 w-6 text-white" />
        <CardTitle className="text-white">{resources.title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-400 mb-4">{resources.description}</p>
      <div className="grid gap-2">
        {resources.resources.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="block p-3 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <div className="font-medium text-white">{item.name}</div>
            {item.description && (
              <div className="text-sm text-gray-400">{item.description}</div>
            )}
          </a>
        ))}
      </div>
    </CardContent>
  </Card>
);

const ResourcesPage = () => {
  const sections: ResourceSection[] = [
    {
      title: "Technical Documentation",
      icon: BookOpen,
      description: "Comprehensive API documentation and technical references",
      resources: [
        { 
          name: "API Documentation",
          href: "/docs",
          description: "Detailed API references and integration guides"
        },
        { 
          name: "AI Agent SDK",
          href: "/docs/sdk",
          description: "Build and customize AI agents with our SDK"
        }
      ]
    },
    {
      title: "Developer Support",
      icon: HelpCircle,
      description: "Technical support and development resources",
      resources: [
        { 
          name: "Developer Hub",
          href: "/help",
          description: "Technical FAQs and implementation guides"
        },
        {
          name: "Tech Blog",
          href: "/blog",
          description: "Technical insights and development best practices"
        }
      ]
    },
    {
      title: "Implementation Guides",
      icon: BookMarked,
      description: "Step-by-step implementation tutorials",
      resources: [
        {
          name: "Integration Guides",
          href: "/guides",
          description: "LangChain and CrewAI integration tutorials"
        },
        {
          name: "Architecture Patterns",
          href: "/how-it-works",
          description: "AI agent architecture and design patterns"
        }
      ]
    },
    {
      title: "AI Development Tools",
      icon: PenTool,
      description: "Tools for AI agent development and testing",
      resources: [
        {
          name: "Agent Playground",
          href: "/tools/agent-playground",
          description: "Test and debug AI agents in real-time"
        },
        {
          name: "Performance Analyzer",
          href: "/tools/performance-analyzer",
          description: "Measure AI agent performance and optimization"
        },
        {
          name: "Integration Tester",
          href: "/tools/integration-tester",
          description: "Test API integrations and endpoints"
        }
      ]
    }
  ];

  return (
    <div className='bg-[#0A0A0A]'>
      <div className="bg-[#0A0A0A] max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-4 mt-20">
        <h1 className="text-4xl font-bold mb-8 text-white">Developer Resources</h1>
        <p className="text-xl text-gray-400 mb-8">
          Everything you need to build and implement custom AI agents with ExplainX.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <ResourcesSection key={section.title} resources={section} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ResourcesPage;