'use client';

import { useEffect, useState } from 'react';
import { ResourceType } from '../../types/resources';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { NewsletterBanner } from './NewsletterBanner';

interface ResourcesListProps {
  resources: ResourceType[];
}

export const ResourcesList = ({ resources }: ResourcesListProps) => {
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    const hasSkipped = localStorage.getItem('resources_skipped') === 'true';
    const hasSubscribed = localStorage.getItem('resources_subscribed') === 'true';
    setShowNewsletter(hasSkipped && !hasSubscribed);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">AI Agents Resources</h1>
        {showNewsletter && <NewsletterBanner />}
        <div className="grid gap-8">
          {resources.map((resource, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription className="text-gray-300">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="link"
                  className="text-blue-400 hover:text-blue-300 p-0"
                >
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.type === 'external' ? 'Visit Repository →' : 'Download PDF →'}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}; 