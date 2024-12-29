// components/onboarding/BrandOnboardingForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Platform } from "../../../../lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
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
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  logo: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
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

type FormValues = z.infer<typeof formSchema>;

export function BrandOnboardingForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logo: "",
      website: "",
      industry: "",
      description: "",
      targetDemographic: "",
      preferredCategories: [],
      minFollowers: 0,
      maxBudget: 0,
      preferredPlatforms: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/brand/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      router.push("/authenticated/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Brand Profile</CardTitle>
        <CardDescription>
          Tell us about your brand and what you're looking for in creators
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Brand Info */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Creator Preferences */}
            <FormField
              control={form.control}
              name="targetDemographic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Demographic</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., 18-24 year old females interested in fitness"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minFollowers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Follower Count</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Budget per Campaign</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredPlatforms"
              render={() => (
                <FormItem>
                  <FormLabel>Preferred Platforms</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.values(Platform).map((platform) => (
                      <FormField
                        key={platform}
                        control={form.control}
                        name="preferredPlatforms"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(platform)}
                                onCheckedChange={(checked) => {
                                  const updated = checked
                                    ? [...field.value, platform]
                                    : field.value.filter((p) => p !== platform);
                                  field.onChange(updated);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="!mt-0">{platform}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

