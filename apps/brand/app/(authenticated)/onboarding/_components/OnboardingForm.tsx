// components/onboarding/BrandOnboardingForm.tsx

"use client";
import React, { memo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Progress } from "@repo/ui/components/ui/progress";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";
import { ArrowRight, ArrowLeft, CheckCircle2, Check } from "lucide-react";
import {
  Building2,
  Target,
  Users,
  Globe,
  BarChart,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
} from "lucide-react";
import { Platform } from "../../../../lib/types";

const categories = [
  "Tech",
  "Fashion",
  "Beauty",
  "Lifestyle",
  "Gaming",
  "Education",
  "Finance",
  "Food",
  "Travel",
  "Fitness",
];

const industries = [
  "Technology",
  "Fashion & Apparel",
  "Beauty & Cosmetics",
  "Food & Beverage",
  "Health & Wellness",
  "Travel & Tourism",
  "Finance & Banking",
  "Education",
  "Entertainment",
  "Sports & Fitness",
];

const targetAudiences = [
  "Gen Z (18-24)",
  "Young Professionals (25-34)",
  "Parents (25-45)",
  "Business Decision Makers",
  "Luxury Consumers",
  "Budget-conscious Shoppers",
  "Health Enthusiasts",
  "Tech Early Adopters",
  "Fashion Enthusiasts",
  "Travel Enthusiasts",
];

const followerRanges = [
  { label: "Micro (5K-20K)", value: 5000 },
  { label: "Mid-tier (20K-100K)", value: 20000 },
  { label: "Macro (100K-1M)", value: 100000 },
  { label: "Mega (1M+)", value: 1000000 },
];

const budgetRanges = [
  { label: "Up to $5,000", value: 5000 },
  { label: "$5,000 - $10,000", value: 10000 },
  { label: "$10,000 - $50,000", value: 50000 },
  { label: "$50,000+", value: 100000 },
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  logo: z.string().url().optional().or(z.literal("")),
  website: z
    .string()
    .trim()
    .transform((val) => {
      if (!val) return "";

      try {
        // Try to create URL - this will throw if invalid
        new URL(val);
        return val;
      } catch {
        // If it fails, assume it's a domain without protocol
        if (val.includes("://")) {
          return ""; // Invalid URL with protocol
        }
        return `https://${val}`;
      }
    })
    .refine(
      (val) => {
        if (!val) return true; // Allow empty
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Please enter a valid website URL" },
    )
    .optional()
    .or(z.literal("")),
  industry: z.string().min(2, "Industry is required"),
  description: z.string().max(500).optional(),
  targetDemographic: z.string().min(2, "Target demographic is required"),
  preferredCategories: z
    .array(z.string())
    .min(1, "Select at least one category"),
  minFollowers: z.number().min(0),
  maxBudget: z.number().min(0),
  preferredPlatforms: z
    .array(z.nativeEnum(Platform))
    .min(1, "Select at least one platform"),
});

// Define platform icons with type safety
const platformIcons: Record<Platform, React.ElementType> = {
  [Platform.INSTAGRAM]: Instagram,
  [Platform.LINKEDIN]: Linkedin,
  [Platform.YOUTUBE]: Youtube,
  [Platform.TIKTOK]: Youtube, // Replace with proper TikTok icon when available
  [Platform.TWITTER]: Twitter,
};

// Define platform colors with type safety
const platformColors: Record<Platform, string> = {
  [Platform.INSTAGRAM]: "text-pink-600 bg-pink-100",
  [Platform.LINKEDIN]: "text-blue-600 bg-blue-100",
  [Platform.YOUTUBE]: "text-red-600 bg-red-100",
  [Platform.TIKTOK]: "text-black bg-gray-100", // Add appropriate TikTok colors
  [Platform.TWITTER]: "text-black bg-gray-100",
};

type FormValues = z.infer<typeof formSchema>;

interface CategoryOption {
  label: string;
  value: string;
  description: string;
}

const categoryOptions: CategoryOption[] = [
  {
    label: "Tech",
    value: "tech",
    description: "Technology, software, and digital products",
  },
  {
    label: "Fashion",
    value: "fashion",
    description: "Clothing, accessories, and style",
  },
  {
    label: "Beauty",
    value: "beauty",
    description: "Skincare, makeup, and personal care",
  },
  {
    label: "Lifestyle",
    value: "lifestyle",
    description: "General lifestyle and daily living",
  },
  {
    label: "Gaming",
    value: "gaming",
    description: "Video games and gaming culture",
  },
  {
    label: "Education",
    value: "education",
    description: "Learning and educational content",
  },
  {
    label: "Finance",
    value: "finance",
    description: "Financial services and products",
  },
  {
    label: "Food",
    value: "food",
    description: "Food, beverages, and culinary",
  },
  {
    label: "Travel",
    value: "travel",
    description: "Travel and tourism",
  },
  {
    label: "Fitness",
    value: "fitness",
    description: "Health, fitness, and wellness",
  },
];

interface PlatformOption {
  platform: Platform;
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  metrics: string;
}

// Update platform options to include all platforms
const platformOptions: PlatformOption[] = [
  {
    platform: Platform.INSTAGRAM,
    icon: Instagram,
    label: "Instagram",
    description: "Photo and video sharing platform",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    metrics: "1B+ monthly active users",
  },
  {
    platform: Platform.LINKEDIN,
    icon: Linkedin,
    label: "LinkedIn",
    description: "Professional networking platform",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    metrics: "875M+ professionals",
  },
  {
    platform: Platform.YOUTUBE,
    icon: Youtube,
    label: "YouTube",
    description: "Video content platform",
    color: "text-red-600",
    bgColor: "bg-red-100",
    metrics: "2.5B+ monthly active users",
  },
  {
    platform: Platform.TIKTOK,
    icon: Youtube, // Replace with proper TikTok icon when available
    label: "TikTok",
    description: "Short-form video platform",
    color: "text-black",
    bgColor: "bg-gray-100",
    metrics: "1B+ monthly active users",
  },
];
// Additional utility functions you might need

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Custom hook for form validation feedback
const useFormValidation = (form: any) => {
  const [validationMessage, setValidationMessage] = useState("");

  const validateForm = () => {
    const values = form.getValues();
    const requiredFields = [
      "name",
      "industry",
      "targetDemographic",
      "preferredCategories",
      "preferredPlatforms",
    ];

    const missingFields = requiredFields.filter((field) => {
      const value = values[field];
      return !value || (Array.isArray(value) && value.length === 0);
    });

    if (missingFields.length > 0) {
      setValidationMessage(
        `Please complete the following: ${missingFields.join(", ")}`,
      );
      return false;
    }

    setValidationMessage("");
    return true;
  };

  return { validationMessage, validateForm };
};

// Export types for use in other components
export type { FormValues, CategoryOption, PlatformOption };

// Export the main component and utilities
export {
  categoryOptions,
  platformOptions,
  formatCurrency,
  formatNumber,
  useFormValidation,
};

const steps = [
  { id: 1, title: "Brand Basics" },
  { id: 2, title: "Target Audience" },
  { id: 3, title: "Campaign Details" },
  { id: 4, title: "Platform Selection" },
];

const PlatformCard = memo(
  ({
    platform,
    isSelected,
    onSelect,
  }: {
    platform: Platform;
    isSelected: boolean;
    onSelect: () => void;
  }) => (
    <Card
      className={`cursor-pointer transition-all ${
        isSelected ? "border-blue-500 bg-blue-50" : ""
      }`}
    >
      <CardContent
        className="p-4 flex items-center justify-between"
        onClick={onSelect}
      >
        <div className="flex items-center space-x-2">
          {platformIcons[platform] && (
            <div className={`h-5 w-5 ${platformColors[platform]}`}>
              {React.createElement(platformIcons[platform])}
            </div>
          )}
          <span>{platform}</span>
        </div>
        <Checkbox checked={isSelected} className="pointer-events-none" />
      </CardContent>
    </Card>
  ),
);

PlatformCard.displayName = "PlatformCard";

export default function MultistepBrandOnboardingForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      website: "",
      industry: "",
      description: "",
      targetDemographic: "",
      preferredCategories: [] as string[],
      minFollowers: 5000,
      maxBudget: 5000,
      preferredPlatforms: [] as Platform[],
    },
  });

  const isStepValid = () => {
    const currentFields: Record<number, Array<keyof FormValues>> = {
      1: ["name", "website", "industry", "description"],
      2: ["targetDemographic", "preferredCategories"],
      3: ["minFollowers", "maxBudget"],
      4: ["preferredPlatforms"],
    };

    const fieldsToCheck = currentFields[currentStep];
    if (!fieldsToCheck) return false;

    return fieldsToCheck.every((field) => {
      const value = form.getValues(field);
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      // Handle optional fields
      if (field === "description" || field === "website") {
        return true;
      }
      return !!value;
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length && isStepValid()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const calculateProgress = () => {
    return (currentStep / steps.length) * 100;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your brand's legal or trading name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed to creators and used
                    in all communications
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="yourwebsite.com"
                      {...field}
                      onChange={(e) => {
                        let value = e.target.value.trim();
                        value = value.replace(/^(https?:\/\/)/, "");
                        value = value.replace(/^www\./, "");
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Your official website where creators can learn more about
                    your brand. No need to include 'http://' or 'www.'
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your primary industry sector" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the industry that best represents your brand's main
                    business activity
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your brand's story, mission, and values..."
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a compelling description that will help creators
                    understand your brand's vision and what makes it unique
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="targetDemographic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your ideal customer demographic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {targetAudiences.map((audience) => (
                        <SelectItem key={audience} value={audience}>
                          {audience}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the primary audience segment that your brand wants to
                    reach through creator collaborations
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredCategories"
              render={() => (
                <FormItem>
                  <FormLabel>Content Categories</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <FormField
                        key={category}
                        control={form.control}
                        name="preferredCategories"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(category)}
                                onCheckedChange={(checked) => {
                                  const updated = checked
                                    ? [...field.value, category]
                                    : field.value.filter((c) => c !== category);
                                  field.onChange(updated);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {category}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormDescription>
                    Select all content categories that align with your brand's
                    marketing objectives
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="minFollowers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Followers</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose minimum follower requirement" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {followerRanges.map((range) => (
                        <SelectItem
                          key={range.value}
                          value={String(range.value)}
                        >
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Set the minimum follower count required for creators to work
                    with your brand
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Budget</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your campaign budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem
                          key={range.value}
                          value={String(range.value)}
                        >
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Indicate your maximum budget for creator collaborations
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 4:
        return (
          <FormField
            control={form.control}
            name="preferredPlatforms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Platforms</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.values(Platform).map((platform) => {
                    const isSelected = (field.value || []).includes(platform);

                    return (
                      <div
                        key={platform}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          const newValue = isSelected
                            ? (field.value || []).filter((p) => p !== platform)
                            : [...(field.value || []), platform];
                          field.onChange(newValue);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            const newValue = isSelected
                              ? (field.value || []).filter(
                                  (p) => p !== platform,
                                )
                              : [...(field.value || []), platform];
                            field.onChange(newValue);
                          }
                        }}
                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      >
                        <Card
                          className={`cursor-pointer transition-all ${
                            isSelected ? "border-blue-500 bg-blue-50" : ""
                          }`}
                        >
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {platformIcons[platform] && (
                                <div
                                  className={`h-5 w-5 ${platformColors[platform]}`}
                                >
                                  {React.createElement(platformIcons[platform])}
                                </div>
                              )}
                              <span>{platform}</span>
                            </div>
                            <div
                              className={`h-4 w-4 rounded-sm border ${
                                isSelected
                                  ? "bg-blue-500 border-blue-500"
                                  : "border-gray-300"
                              } flex items-center justify-center`}
                            >
                              {isSelected && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
                </div>
                <FormDescription>
                  Choose the social media platforms where you want to run your
                  creator campaigns
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!isStepValid()) return;
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Infloq
          </h1>
          <p className="text-gray-600">
            Let's set up your brand profile to connect with amazing creators
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 pb-6">
            <div className="space-y-4">
              {/* Step Progress */}
              <div className="relative">
                <Progress
                  value={calculateProgress()}
                  className="h-2 bg-gray-100"
                />
                <div className="absolute top-4 left-0 right-0">
                  <div className="flex justify-between text-sm">
                    {steps.map((step) => (
                      <div
                        key={step.id}
                        className={`flex flex-col items-center ${
                          currentStep >= step.id
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                            currentStep >= step.id
                              ? "bg-blue-100"
                              : "bg-gray-100"
                          }`}
                        >
                          {step.id === 1 && <Building2 className="w-4 h-4" />}
                          {step.id === 2 && <Target className="w-4 h-4" />}
                          {step.id === 3 && <BarChart className="w-4 h-4" />}
                          {step.id === 4 && <Globe className="w-4 h-4" />}
                        </div>
                        <span className="hidden sm:block text-xs font-medium">
                          {step.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="bg-white rounded-lg p-6">
                  {renderStepContent()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-gray-100">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="flex items-center hover:bg-gray-50"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous Step
                    </Button>
                  )}
                  {currentStep === steps.length ? (
                    <Button
                      type="submit"
                      className={`flex items-center ml-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white ${
                        isSubmitting || !isStepValid()
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={isSubmitting || !isStepValid()}
                    >
                      {isSubmitting ? (
                        "Setting up your profile..."
                      ) : (
                        <>
                          Complete Setup
                          <CheckCircle2 className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className={`flex items-center ml-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white ${
                        !isStepValid() ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
