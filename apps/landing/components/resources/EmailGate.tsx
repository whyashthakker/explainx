'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@repo/ui/components/ui/card';
import { toast } from "sonner";
import { sendDiscordNotification } from '../../utils/discord';

interface EmailGateProps {
  onSuccess: () => void;
}

export const EmailGate = ({ onSuccess }: EmailGateProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      await sendDiscordNotification(email);
      toast.success('Welcome! You now have access to our AI newsletter');
      onSuccess();
    } catch (err) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('resources_skipped', 'true');
    onSuccess();
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <Card className="max-w-2xl mx-auto bg-gray-800/50 border-gray-700">
        <CardHeader className="text-center">
          <Image
            src="/r/agents/Agents.png"
            alt="AI Agents"
            width={150}
            height={150}
            className="mx-auto mb-6"
            priority
          />
          <CardTitle className="text-3xl font-bold text-white mb-2">AI Agents Resources</CardTitle>
          <CardDescription className="text-lg text-gray-300">
            Get free access to our AI newsletter with your course resources.
            Stay updated with the latest in AI agents and automation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Access Resources + Newsletter'}
            </Button>
          </form>
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-300"
            >
              Skip for now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 