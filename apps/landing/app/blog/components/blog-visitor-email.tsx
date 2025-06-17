'use client';

import { useState, useEffect } from 'react';
import { X, Rocket, Check, ArrowRight, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Badge } from '@repo/ui/components/ui/badge';
import { Input } from '@repo/ui/components/ui/input';

interface EmailPopupProps {
  currentPath: string;
}

interface ReferralData {
  referralUrl?: string;
  referralCode?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

// Function to extract URL parameters
const extractUrlParams = (): ReferralData => {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  const referralUrl = urlParams.get('ref') || urlParams.get('referral_url') || document.referrer || undefined;
  
  return {
    referralUrl,
    referralCode: urlParams.get('referral_code') || urlParams.get('ref_code') || undefined,
    utmSource: urlParams.get('utm_source') || undefined,
    utmMedium: urlParams.get('utm_medium') || undefined,
    utmCampaign: urlParams.get('utm_campaign') || undefined,
  };
};

const EmailPopup: React.FC<EmailPopupProps> = ({ currentPath }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [referralData, setReferralData] = useState<ReferralData>({});

  useEffect(() => {
    setIsMounted(true);
    setReferralData(extractUrlParams());
    checkAndShowPopup();
  }, []);

  const checkAndShowPopup = () => {
    // Check if user has successfully subscribed
    const hasSubscribed = localStorage.getItem('hasSubscribed');
    if (hasSubscribed) {
      return; // Don't show popup if already subscribed
    }

    // Check last popup close time
    const lastPopupClose = localStorage.getItem('lastPopupClose');
    const currentTime = new Date().getTime();

    if (!lastPopupClose || currentTime - parseInt(lastPopupClose) > 24 * 60 * 60 * 1000) { // 24 hours
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    // Store the close time if user hasn't subscribed
    if (!localStorage.getItem('hasSubscribed')) {
      localStorage.setItem('lastPopupClose', new Date().getTime().toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        email,
        subscriberType: 'ENTHUSIAST', // Default for blog visitors
        routePath: currentPath,
        // Include referral data
        ...referralData,
      };

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        // Store that user has successfully subscribed
        localStorage.setItem('hasSubscribed', 'true');
        setTimeout(() => {
          setIsVisible(false);
        }, 15000);
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      // Show error message but don't prevent retry
      alert(error instanceof Error ? error.message : 'Error subscribing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-in fade-in duration-300">
      <Card className="max-w-md w-full relative bg-white/95 backdrop-blur border-2">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        {!isSuccess ? (
          <>
            <CardHeader className="space-y-2 pb-4">
              <Badge variant="secondary" className="w-fit mx-auto gap-1">
                <Rocket className="h-3 w-3" />
                <span>Limited Time Offer</span>
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Ready to Explode Your Social Growth?
              </h2>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Join 10,000+ social media managers</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Social Media Growth Playbook ($97 value)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Viral Content Templates ($85 value)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Engagement Strategy Guide ($50 value)</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className="h-11"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <span className="flex items-center gap-2">
                      Get Free Guides Worth $232
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter>
              <p className="text-xs text-center text-muted-foreground w-full">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardFooter>
          </>
        ) : (
          <CardContent className="py-12 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-green-600">
              You&apos;re In!
            </h3>
            <p className="text-muted-foreground">
              Check your inbox for your free guides and start growing your social media presence today!
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default EmailPopup;