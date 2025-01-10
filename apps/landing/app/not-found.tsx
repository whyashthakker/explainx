'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Progress } from "@repo/ui/components/ui/progress";
import { Button } from "@repo/ui/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setShouldRedirect(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/');
    }
  }, [shouldRedirect, router]);

  const handleHomeClick = () => {
    setShouldRedirect(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 px-4 max-w-[400px] mx-auto">
        <Image
          src="/icons/explainx_ai_light.png"
          alt="ExplainX"
          width={120}
          height={40}
          className="mx-auto"
          priority
        />
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-7xl font-bold tracking-tight">404</h1>
            <h2 className="text-xl text-muted-foreground">This page does not exist</h2>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Redirecting you home in {countdown} seconds...
          </p>
        </div>

        <div className="space-y-6">
          <Progress 
            value={(countdown / 5) * 100} 
            className="h-1"
          />

          <Button 
            onClick={handleHomeClick}
            className="w-full"
            variant="default"
          >
            Go home now
          </Button>
        </div>
      </div>
    </div>
  );
}