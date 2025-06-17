"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { X, CheckCircle, ArrowLeft, ArrowRight, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

interface BootcampRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BootcampRegistrationForm({ isOpen, onClose }: BootcampRegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    experience: "",
    goals: "",
    referralSource: "",
    pricingTier: "EARLY_BIRD", // Default to early bird
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bootcamp-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          experience: formData.experience,
          pricingTier: formData.pricingTier,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setRegistrationId(data.data.id);
        setCurrentStep(2);
        toast.success("Basic registration complete! Please fill in additional details.");
      } else {
        toast.error(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bootcamp-registration/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registrationId,
          goals: formData.goals,
          referralSource: formData.referralSource,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Bootcamp registration completed successfully!");
      } else {
        toast.error(data.error || "Update failed. Please try again.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBackToStep1 = () => {
    setCurrentStep(1);
  };

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div 
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={handleBackgroundClick}
      >
        <Card className="w-full max-w-md bg-gray-900 border-gray-700">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Welcome to the Bootcamp!</CardTitle>
            <CardDescription className="text-gray-300">
              Your 5-week AI bootcamp registration is complete. Check your email for program details and next steps.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3">
                <p className="text-purple-200 text-sm text-center">
                  📅 Program starts with Week 1 on the next available Saturday
                </p>
              </div>
              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
                <p className="text-blue-200 text-sm text-center">
                  🎯 You'll receive calendar invites for all sessions
                </p>
              </div>
            </div>
            <Button onClick={onClose} className="w-full bg-purple-600 hover:bg-purple-700">
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={handleBackgroundClick}
    >
      <Card className="w-full max-w-lg bg-gray-900 border-gray-700 my-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-white">
                {currentStep === 1 ? "Join AI Bootcamp - Step 1" : "Complete Your Registration - Step 2"}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {currentStep === 1 
                  ? "Basic Information - 5-Week Complete AI Mastery Program"
                  : "Additional Details - Help us personalize your learning experience"
                }
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center space-x-2 mt-4">
            <div className={`w-3 h-3 rounded-full ${currentStep >= 1 ? 'bg-purple-600' : 'bg-gray-600'}`} />
            <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-600'}`} />
            <div className={`w-3 h-3 rounded-full ${currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-600'}`} />
          </div>
        </CardHeader>
        <CardContent>
          {currentStep === 1 ? (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-white">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <Label htmlFor="department" className="text-white">Department/Role</Label>
                <Select onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select your department/role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="STUDENT" className="text-white">Student</SelectItem>
                    <SelectItem value="MARKETING" className="text-white">Marketing</SelectItem>
                    <SelectItem value="SALES" className="text-white">Sales</SelectItem>
                    <SelectItem value="FINANCE" className="text-white">Finance</SelectItem>
                    <SelectItem value="PRODUCT" className="text-white">Product</SelectItem>
                    <SelectItem value="TECH" className="text-white">Tech</SelectItem>
                    <SelectItem value="OTHER" className="text-white">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="experience" className="text-white">AI Experience Level *</Label>
                <Select onValueChange={(value) => handleInputChange("experience", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="BEGINNER" className="text-white">Beginner</SelectItem>
                    <SelectItem value="INTERMEDIATE" className="text-white">Intermediate</SelectItem>
                    <SelectItem value="ADVANCED" className="text-white">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="pricingTier" className="text-white">Pricing Option *</Label>
                <Select onValueChange={(value) => handleInputChange("pricingTier", value)} defaultValue="EARLY_BIRD">
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select pricing option" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="EARLY_BIRD" className="text-white">
                      Early Bird - ₹4,999 (Save ₹2,000)
                    </SelectItem>
                    <SelectItem value="REGULAR" className="text-white" disabled>
                      Regular - ₹6,999 (Available July 1st)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-orange-200">
                    <p className="font-medium mb-1">Early Bird Pricing Ends Soon!</p>
                    <p className="text-xs">
                      Save ₹2,000 with early bird pricing. Limited time offer valid until June 30, 2025.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.email || !formData.experience}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
              >
                {isSubmitting ? "Registering..." : (
                  <>
                    Continue to Step 2
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleStep2Submit} className="space-y-4">
              <div>
                <Label htmlFor="goals" className="text-white">Learning Goals</Label>
                <Textarea
                  id="goals"
                  value={formData.goals}
                  onChange={(e) => handleInputChange("goals", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="What do you hope to achieve from this 5-week AI bootcamp?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="referralSource" className="text-white">How did you hear about us?</Label>
                <Select onValueChange={(value) => handleInputChange("referralSource", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select how you found us" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="X" className="text-white">X (Twitter)</SelectItem>
                    <SelectItem value="INSTAGRAM" className="text-white">Instagram</SelectItem>
                    <SelectItem value="LINKEDIN" className="text-white">LinkedIn</SelectItem>
                    <SelectItem value="REFERRAL" className="text-white">Referral</SelectItem>
                    <SelectItem value="FACEBOOK" className="text-white">Facebook</SelectItem>
                    <SelectItem value="YOUTUBE" className="text-white">YouTube</SelectItem>
                    <SelectItem value="OTHER" className="text-white">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-purple-200">
                    <p className="font-medium mb-1">Newsletter Subscription Included</p>
                    <p className="text-xs">
                      Your bootcamp registration automatically includes our free AI Newsletter with the latest insights and trends, delivered 4 times per week.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBackToStep1}
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Completing..." : "Complete Registration"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 