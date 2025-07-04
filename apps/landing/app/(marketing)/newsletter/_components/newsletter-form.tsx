'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/ui/radio-group';
import { Label } from '@repo/ui/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, Mail, Code, Building2 } from 'lucide-react';

type SubscriberType = 'DEVELOPER' | 'BUSINESS' | 'ENTHUSIAST';

interface FormData {
  email: string;
  subscriberType: SubscriberType | '';
  interests: string[];
}

interface FormErrors {
  email?: string;
  subscriberType?: string;
}

interface ReferralData {
  referralUrl?: string;
  referralCode?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

const validateFormData = (data: FormData): { isValid: boolean; message?: string } => {
  if (!data.email || !data.email.includes('@')) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  if (!data.subscriberType) {
    return { isValid: false, message: 'Please select your primary interest in AI' };
  }
  return { isValid: true };
};

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

export default function NewsletterForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    subscriberType: '',
    interests: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [referralData, setReferralData] = useState<ReferralData>({});

  useEffect(() => {
    // Extract referral data from URL when component mounts
    setReferralData(extractUrlParams());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    setErrors({});

    const validation = validateFormData(formData);
    
    if (!validation.isValid) {
      if (validation.message?.includes('email')) {
        setErrors(prev => ({ ...prev, email: validation.message }));
      } else if (validation.message?.includes('interest')) {
        setErrors(prev => ({ ...prev, subscriberType: validation.message }));
      }
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        email: formData.email.trim(),
        subscriberType: formData.subscriberType,
        interests: formData.interests,
        // Include referral data
        ...referralData,
        routePath: window.location.pathname,
      };

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to subscribe');
      }

      setSubmitted(true);
      toast.success('Successfully subscribed to our newsletter!');
      setFormData({ email: '', subscriberType: '', interests: [] });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error(error instanceof Error ? error.message : 'Error subscribing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <CheckCircle className="w-16 h-16 text-secondaccent mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-4 text-secondaccent">Welcome to Our Community!</h3>
        <p className="text-gray-300">You'll receive our next AI insights directly in your inbox.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      <Card className="backdrop-blur-sm bg-black/90 shadow-xl border-0 relative overflow-hidden text-white">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondaccent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondaccent/20 rounded-full blur-3xl" />
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-secondaccent">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, email: e.target.value }));
                  setErrors(prev => ({ ...prev, email: undefined }));
                }}
                required
                className={`h-12 bg-black/50 backdrop-blur-sm border-gray-800 text-white placeholder:text-gray-500 ${
                  errors.email ? 'border-red-500' : 'focus:border-secondaccent focus:ring-secondaccent'
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium mb-2 text-secondaccent">
                <Code className="w-4 h-4" />
                I'm primarily interested in
              </Label>
              <RadioGroup
                value={formData.subscriberType}
                onValueChange={(value: SubscriberType) => {
                  setFormData(prev => ({ ...prev, subscriberType: value }));
                  setErrors(prev => ({ ...prev, subscriberType: undefined }));
                }}
                className="grid grid-cols-3 gap-4"
                required
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Label
                    htmlFor="developer"
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.subscriberType === 'DEVELOPER'
                        ? 'border-secondaccent bg-secondaccent/10 text-secondaccent'
                        : 'border-gray-800 hover:border-secondaccent/50 text-gray-300'
                    }`}
                  >
                    <RadioGroupItem value="DEVELOPER" id="developer" className="sr-only" />
                    <Code className="w-4 h-4" />
                    Developer
                  </Label>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Label
                    htmlFor="business"
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.subscriberType === 'BUSINESS'
                        ? 'border-secondaccent bg-secondaccent/10 text-secondaccent'
                        : 'border-gray-800 hover:border-secondaccent/50 text-gray-300'
                    }`}
                  >
                    <RadioGroupItem value="BUSINESS" id="business" className="sr-only" />
                    <Building2 className="w-4 h-4" />
                    Business
                  </Label>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Label
                    htmlFor="enthusiast"
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.subscriberType === 'ENTHUSIAST'
                        ? 'border-secondaccent bg-secondaccent/10 text-secondaccent'
                        : 'border-gray-800 hover:border-secondaccent/50 text-gray-300'
                    }`}
                  >
                    <RadioGroupItem value="ENTHUSIAST" id="enthusiast" className="sr-only" />
                    <Code className="w-4 h-4" />
                    AI Enthusiast
                  </Label>
                </motion.div>
              </RadioGroup>
              {errors.subscriberType && (
                <p className="text-sm text-red-500 mt-1">{errors.subscriberType}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 transition-all bg-secondaccent hover:bg-yellow-500 text-black font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Subscribing...
                </>
              ) : (
                'Subscribe to Newsletter'
              )}
            </Button>

            <p className="text-xs text-center text-gray-400">
              Get weekly updates on AI agents, automation trends, and industry insights. 
              You can unsubscribe at any time.
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}