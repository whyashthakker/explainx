import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { BookOpen, HelpCircle, FileText, BookMarked, PenTool } from 'lucide-react';

export const metadata = {
  title: 'Resources | Infloq',
  description: 'Access guides, documentation, help center articles, and other resources to make the most of Infloq\'s influencer marketing platform.',
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: 'Resources | Infloq - Influencer Marketing Platform',
    description: 'Find everything you need to succeed with Infloq - from guides and documentation to tools and support resources.',
    url: 'https://infloq.com/resources',
    siteName: 'Infloq',
    type: 'website',
    images: [
      {
        url: "/images/main/landing.png",
        width: 1200,
        height: 630,
        alt: 'Infloq Resources',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources | Infloq - Influencer Marketing Platform',
    description: 'Access comprehensive resources to maximize your success with Infloq\'s influencer marketing platform.',
    site: '@infloq',
    creator: '@infloq',
    images: ["/images/main/landing.png"],
  },
  keywords: [
    'Infloq resources',
    'influencer marketing guides',
    'creator marketing documentation',
    'influencer platform help',
    'marketing tools documentation',
    'influencer analytics guides',
    'campaign management resources'
  ]
};

interface ResourceSectionProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { name: string; href: string; description?: string }[];
}

const ResourceSection: React.FC<ResourceSectionProps> = ({ title, description, icon: Icon, items }) => (
  <Card className="w-full">
    <CardHeader>
      <div className="flex items-center gap-2">
        <Icon className="h-6 w-6" />
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="grid gap-2">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="font-medium">{item.name}</div>
            {item.description && (
              <div className="text-sm text-gray-600">{item.description}</div>
            )}
          </a>
        ))}
      </div>
    </CardContent>
  </Card>
);

const ResourcesPage = () => {
  const sections = [
    {
      title: "Documentation",
      icon: BookOpen,
      description: "Technical documentation and API references",
      items: [
        { 
          name: "Docs",
          href: "/docs",
          description: "Comprehensive technical documentation and guides"
        }
      ]
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      description: "Get help and find answers to common questions",
      items: [
        { 
          name: "Help Center",
          href: "/help",
          description: "Find answers to frequently asked questions"
        },
        {
          name: "Blog",
          href: "/blog",
          description: "Latest updates, tips, and best practices"
        }
      ]
    },
    {
      title: "Guides",
      icon: BookMarked,
      description: "Step-by-step guides and tutorials",
      items: [
        {
          name: "Platform Guides",
          href: "/guides",
          description: "Learn how to make the most of our platform"
        },
        {
          name: "How it works",
          href: "/how-it-works",
          description: "Understanding the Infloq platform"
        }
      ]
    },
    {
      title: "Tools",
      icon: PenTool,
      description: "Free tools to enhance your influencer marketing",
      items: [
        {
          name: "Instagram Audit",
          href: "/tools/instagram-audit",
          description: "Analyze Instagram profiles and performance"
        },
        {
          name: "Engagement Calculator",
          href: "/tools/engagement-calculator",
          description: "Calculate engagement rates across platforms"
        },
        {
          name: "Social ROI Calculator",
          href: "/tools/social-roi-calculator",
          description: "Measure your social media ROI"
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold mb-8">Resources</h1>
        <p className="text-xl text-gray-600 mb-8">
          Everything you need to succeed with Infloq's influencer marketing platform.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <ResourceSection key={section.title} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;