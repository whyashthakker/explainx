'use client';

import React, { useState } from 'react';
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

const validateFormData = (data: FormData): { isValid: boolean; message?: string } => {
  if (!data.email || !data.email.includes('@')) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  if (!data.subscriberType) {
    return { isValid: false, message: 'Please select your primary interest in AI' };
  }
  return { isValid: true };
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
        interests: formData.interests
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
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-4">Welcome to Our Community!</h3>
        <p className="text-muted-foreground">You'll receive our next AI insights directly in your inbox.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      <Card className="backdrop-blur-sm bg-white/80 shadow-xl border-0 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
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
                className={`h-12 bg-white/50 backdrop-blur-sm border-gray-200 ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium mb-2">
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
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
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
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
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
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
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
              className="w-full h-12 transition-all"
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

            <p className="text-xs text-center text-muted-foreground">
              Get weekly updates on AI agents, automation trends, and industry insights. 
              You can unsubscribe at any time.
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}