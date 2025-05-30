'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { toast } from "sonner";
import { sendDiscordNotification } from '../../utils/discord';

export const NewsletterBanner = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/resources/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      localStorage.setItem('resources_email', email);
      localStorage.setItem('resources_subscribed', 'true');
      localStorage.removeItem('resources_skipped');
      await sendDiscordNotification(email);
      toast.success('Welcome! You now have access to our AI newsletter');
      setEmail('');
    } catch (err) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/20 mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              Don't miss out on AI updates!
            </h3>
            <p className="text-gray-300 text-sm">
              Get free access to our AI newsletter with the latest resources and guides.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            />
            <Button 
              type="submit"
              disabled={isLoading}
              variant="secondary"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}; 