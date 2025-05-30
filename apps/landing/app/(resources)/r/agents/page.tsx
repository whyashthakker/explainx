'use client';

import { useState, useEffect } from 'react';
import { EmailGate } from '../../../../components/resources/EmailGate';
import { ResourcesList } from '../../../../components/resources/ResourcesList';
import { ResourceType } from '../../../../types/resources';

const resources: ResourceType[] = [
  {
    title: 'AI Agents GitHub Repository',
    description: 'Access the complete source code and implementation details.',
    link: 'https://github.com/whyashthakker/ai-agents',
    type: 'external'
  },
  {
    title: 'AI Agents - Deep Dive',
    description: 'Comprehensive guide on AI agents implementation and architecture.',
    link: '/r/agents/AI Agents - Deep Dive.pdf',
    type: 'pdf'
  },
  {
    title: 'A Practical Guide to Building Agents by OpenAI',
    description: 'Learn how to build AI agents.',
    link: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf',
    type: 'external'
  }
];

export default function ResourcesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasSkipped = localStorage.getItem('resources_skipped') === 'true';
    const hasSubscribed = localStorage.getItem('resources_subscribed') === 'true';
    setIsAuthenticated(hasSkipped || hasSubscribed);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <>
      {!isAuthenticated ? (
        <EmailGate onSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <ResourcesList resources={resources} />
      )}
    </>
  );
}
