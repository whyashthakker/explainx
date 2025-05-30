'use client';

import { useState, useEffect } from 'react';
import { EmailGate } from './EmailGate';
import { ResourcesList } from './ResourcesList';
import { ResourceType } from '../../types/resources';

interface ResourcesClientProps {
  resources: ResourceType[];
}

export function ResourcesClient({ resources }: ResourcesClientProps) {
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