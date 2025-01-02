"use client";

import { useState } from 'react';
import { Button } from "@repo/ui/components/ui/button";
import { Instagram, Loader2 } from "lucide-react";
import { useToast } from '@repo/ui/hooks/use-toast';

interface InstagramLoginProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function InstagramLogin({ onSuccess, onError, className }: InstagramLoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      // Get the authorization URL from your backend
      const response = await fetch('/api/auth/instagram', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize Instagram login');
      }

      if (!data.url) {
        throw new Error('No authorization URL received');
      }

      // Store state if provided
      if (data.state) {
        sessionStorage.setItem('instagram_auth_state', data.state);
      }

      // Redirect to Instagram OAuth
      window.location.href = data.url;
    } catch (error) {
      console.error('Instagram login error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to connect to Instagram';
      
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: errorMessage,
      });

      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogin}
      disabled={isLoading}
      className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2 ${className}`}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Instagram className="h-4 w-4" />
      )}
      {isLoading ? "Connecting..." : "Connect Instagram Business Account"}
    </Button>
  );
}