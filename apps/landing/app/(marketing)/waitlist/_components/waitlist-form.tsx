'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/ui/radio-group';
import { Label } from '@repo/ui/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, Mail, Building2, User2 } from 'lucide-react';

type UserType = 'BRAND' | 'INFLUENCER';

interface FormData {
  email: string;
  userType: UserType | '';
  intention: string;
}

interface FormErrors {
  email?: string;
  userType?: string;
  intention?: string;
}

const validateFormData = (data: FormData): { isValid: boolean; message?: string } => {
  if (!data.email || !data.email.includes('@')) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  if (!data.userType) {
    return { isValid: false, message: 'Please select whether you are a Brand or Creator' };
  }
  if (!data.intention || data.intention.trim().length < 10) {
    return { isValid: false, message: 'Please describe your goals in at least 10 characters' };
  }
  return { isValid: true };
};

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    userType: '',
    intention: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    // Clear previous errors
    setErrors({});

    // Validate form data before submission
    const validation = validateFormData(formData);
    
    if (!validation.isValid) {
      // Set specific error based on the validation message
      if (validation.message?.includes('email')) {
        setErrors(prev => ({ ...prev, email: validation.message }));
      } else if (validation.message?.includes('Brand or Creator')) {
        setErrors(prev => ({ ...prev, userType: validation.message }));
      } else if (validation.message?.includes('goals')) {
        setErrors(prev => ({ ...prev, intention: validation.message }));
      }
      return;
    }

    setIsLoading(true);
    try {
      // Ensure we're sending a valid payload
      const payload = {
        email: formData.email.trim(),
        userType: formData.userType,
        intention: formData.intention.trim()
      };

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to join waitlist');
      }

      setSubmitted(true);
      toast.success('Successfully joined the waitlist!');
      setFormData({ email: '', userType: '', intention: '' });
    } catch (error) {
      console.error('Waitlist submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Error joining waitlist. Please try again.');
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
        <CheckCircle className="w-16 h-16 text-[#4361ee] mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-4">You&apos;re on the list!</h3>
        <p className="text-gray-600">We&apos;ll notify you as soon as we launch.</p>
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
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#4361ee]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#4361ee]/20 rounded-full blur-3xl" />
        
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
                className={`h-12 bg-white/50 backdrop-blur-sm border-gray-200 focus:border-[#4361ee] focus:ring-[#4361ee] ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium mb-2">
                <User2 className="w-4 h-4" />
                I am a
              </Label>
              <RadioGroup
                value={formData.userType}
                onValueChange={(value: UserType) => {
                  setFormData(prev => ({ ...prev, userType: value }));
                  setErrors(prev => ({ ...prev, userType: undefined }));
                }}
                className="grid grid-cols-2 gap-4"
                required
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Label
                    htmlFor="brand"
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.userType === 'BRAND'
                        ? 'border-[#4361ee] bg-[#4361ee]/5'
                        : 'border-gray-200 hover:border-[#4361ee]/50'
                    }`}
                  >
                    <RadioGroupItem value="BRAND" id="brand" className="sr-only" />
                    <Building2 className="w-4 h-4" />
                    Brand
                  </Label>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Label
                    htmlFor="creator"
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.userType === 'INFLUENCER'
                        ? 'border-[#4361ee] bg-[#4361ee]/5'
                        : 'border-gray-200 hover:border-[#4361ee]/50'
                    }`}
                  >
                    <RadioGroupItem value="INFLUENCER" id="creator" className="sr-only" />
                    <User2 className="w-4 h-4" />
                    Creator
                  </Label>
                </motion.div>
              </RadioGroup>
              {errors.userType && (
                <p className="text-sm text-red-500 mt-1">{errors.userType}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="intention" className="flex items-center gap-2 text-sm font-medium">
                Goals & Expectations
              </Label>
              <Textarea
                id="intention"
                placeholder="Tell us what you're looking to achieve..."
                value={formData.intention}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, intention: e.target.value }));
                  setErrors(prev => ({ ...prev, intention: undefined }));
                }}
                required
                className={`min-h-[100px] bg-white/50 backdrop-blur-sm border-gray-200 focus:border-[#4361ee] focus:ring-[#4361ee] ${
                  errors.intention ? 'border-red-500' : ''
                }`}
              />
              {errors.intention && (
                <p className="text-sm text-red-500 mt-1">{errors.intention}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#4361ee] hover:bg-[#4361ee]/90 text-white transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Joining...
                </>
              ) : (
                'Join Waitlist'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}