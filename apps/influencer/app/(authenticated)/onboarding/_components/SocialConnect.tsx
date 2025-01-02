"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import {
  Instagram,
  Linkedin,
  Youtube,
  CheckCircle2,
  ArrowRight,
  Users,
  Globe,
  BarChart,
} from "lucide-react";
import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";
import { Progress } from "@repo/ui/components/ui/progress";
import { Platform } from "../../../../lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import InstagramLogin from "./instagram-connect";
import Link from "next/link";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@repo/ui/hooks/use-toast";

interface ProfileData {
  name: string;
  bio: string;
  category: string;
}

interface SocialPlatform {
  name: string;
  platform: Platform;
  icon: React.ElementType;
  reach: string;
  benefit: string;
  bgColor: string;
  textColor: string;
}

interface Stat {
  icon: React.ElementType;
  label: string;
  value: string;
}

const platforms: SocialPlatform[] = [
  {
    name: "Instagram",
    platform: Platform.INSTAGRAM,
    icon: Instagram,
    reach: "2.5B+ Users",
    benefit: "Access to lifestyle & fashion brands",
    bgColor: "bg-pink-100",
    textColor: "text-pink-600",
  },
  {
    name: "LinkedIn",
    platform: Platform.LINKEDIN,
    icon: Linkedin,
    reach: "900M+ Users",
    benefit: "B2B opportunities & professional networks",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    name: "YouTube",
    platform: Platform.YOUTUBE,
    icon: Youtube,
    reach: "2.7B+ Users",
    benefit: "Video content monetization",
    bgColor: "bg-red-100",
    textColor: "text-red-600",
  },
];

const stats: Stat[] = [
  { icon: Users, label: "Potential Reach", value: "6B+" },
  { icon: Globe, label: "Global Markets", value: "180+" },
  { icon: BarChart, label: "Avg. Engagement", value: "+127%" },
];

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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  connectedPlatforms: z.array(z.nativeEnum(Platform)),
});

type FormValues = z.infer<typeof formSchema>;

export default function SocialConnect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [connectedPlatforms, setConnectedPlatforms] = useState<Set<Platform>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Aryan Nagbanshi",
      bio: "I'm a creator at heart, and I'm passionate about helping brands grow",
      category: "Tech",
      connectedPlatforms: [],
    },
  });

  // Update form whenever platforms are connected
  useEffect(() => {
    form.setValue("connectedPlatforms", Array.from(connectedPlatforms));
  }, [connectedPlatforms, form]);
  // Add profile state
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    bio: "",
    category: "",
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          platforms: data.connectedPlatforms,
        }),
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

  const handleYouTubeAuth = async (code: string) => {
    try {
      console.log(
        "Processing YouTube auth with code:",
        code.substring(0, 10) + "...",
      );

      // Make a POST request to your API endpoint
      const response = await fetch("/api/auth/youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("YouTube connection response:", data);

      if (data.success) {
        setConnectedPlatforms((prev) => new Set([...prev, Platform.YOUTUBE]));
      }
    } catch (error) {
      console.error("Failed to connect YouTube:", error);
    }
  };

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state"); // Get state parameter

    if (code) {
      console.log("Received auth code:", code);
      console.log("Platform state:", state);

      if (state === "youtube") {
        handleYouTubeAuth(code);
      } else if (state === "instagram") {
        handleInstagramAuth(code);
      }
    }
  }, [searchParams]);

  const handleInstagramAuth = async (code: string) => {
    try {
      const response = await fetch(`/api/auth/instagram/callback?code=${code}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to connect Instagram');
      }

      setConnectedPlatforms((prev) => new Set([...prev, Platform.INSTAGRAM]));
      
      toast({
        title: "Successfully connected",
        description: "Your Instagram account has been connected successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Instagram auth error:", error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect Instagram account",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    const success = searchParams.get("success");

    if (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect your Instagram account. Please try again.",
        variant: "destructive",
      });
    }

    if (success === 'instagram_connected') {
      toast({
        title: "Successfully Connected",
        description: "Your Instagram account has been connected successfully!",
        variant: "default",
      });
      setConnectedPlatforms(prev => new Set([...prev, Platform.INSTAGRAM]));
    }

    if (code) {
      if (state === "instagram") {
        handleInstagramAuth(code);
      } else if (state === "youtube") {
        handleYouTubeAuth(code);
      }
    }
  }, [searchParams]);

  const ytLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(
    {
      client_id: process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_YOUTUBE_REDIRECT_URI!,
      response_type: "code",
      scope: "https://www.googleapis.com/auth/youtube.readonly",
      access_type: "offline",
      prompt: "consent",
      // Add state parameter to identify platform
      state: "youtube",
    },
  ).toString()}`;

  const instaLoginUrl = process.env.NEXT_PUBLIC_INSTAGRAM_EMBEDED_URL;

  const handleConnect = async (platform: Platform) => {
    if (platform === Platform.INSTAGRAM) {
      // Get Instagram auth URL from backend
      try {
        const response = await fetch('/api/auth/instagram');
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error('Failed to get Instagram authorization URL');
        }
      } catch (error) {
        console.error('Error initiating Instagram auth:', error);
        toast({
          title: "Connection Failed",
          description: "Failed to initiate Instagram connection. Please try again.",
          variant: "destructive",
        });
      }
      return;
    }
  };

  const calculateCompletionPercentage = () => {
    const totalSteps = platforms.length + 3; // 3 additional fields: name, bio, category
    let completedSteps = connectedPlatforms.size;

    const formValues = form.getValues();

    if (formValues.name.trim()) completedSteps++;
    if (formValues.bio.trim()) completedSteps++;
    if (formValues.category) completedSteps++;

    return Math.round((completedSteps / totalSteps) * 100);
  };

  const isProfileComplete = () => {
    const formValues = form.getValues();
    return (
      formValues.name.trim() !== "" &&
      formValues.bio.trim() !== "" &&
      formValues.category !== ""
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto space-y-8 py-8 min-h-screen flex flex-col justify-center"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-600">
            Amplify Your Reach
          </h1>
          <p className="text-xl text-gray-600">
            Connect your social platforms to unlock more opportunities
          </p>
        </div>
        {/* Profile Information Card */}
        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="text-2xl">Creator Profile</CardTitle>
            <CardDescription>
              Help brands understand your unique value
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Creator Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="How should brands know you?"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the name that will be displayed to brands
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell your story and what makes your content unique..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Share your unique story and value proposition
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary content category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category}
                              value={category.toLowerCase()}
                            >
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Choose the category that best describes your content
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        {/* Progress Card */}
        <Card className="border-2 border-blue-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Profile Strength</CardTitle>
                <CardDescription>
                  Enhanced visibility with each step completed
                </CardDescription>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">
                  {calculateCompletionPercentage()}%
                </p>
                <p className="text-sm text-gray-500">Completion Score</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress
              value={calculateCompletionPercentage()}
              className="h-3 mb-4"
            />
            <div className="grid grid-cols-3 gap-4 mt-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <stat.icon className="h-5 w-5 text-blue-600" />
                      <p className="text-sm font-medium text-gray-600">
                        {stat.label}
                      </p>
                    </div>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4">
          {platforms.map((platform) => (
            <div key={platform.platform}>
              <Card
                className={`transition-all duration-300 ${
                  connectedPlatforms.has(platform.platform)
                    ? "border-green-200 bg-green-50"
                    : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`p-3 rounded-xl ${platform.bgColor}`}>
                        <platform.icon
                          className={`h-8 w-8 ${platform.textColor}`}
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold">
                          {platform.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {platform.benefit}
                        </p>
                        <p className="text-xs font-medium text-blue-600">
                          {platform.reach}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button" // Add this to prevent form submission
                      variant={
                        connectedPlatforms.has(platform.platform)
                          ? "outline"
                          : "default"
                      }
                      onClick={() => handleConnect(platform.platform)}
                      className={`min-w-[120px] ${
                        connectedPlatforms.has(platform.platform)
                          ? "border-green-500 text-green-600"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {connectedPlatforms.has(platform.platform) ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Connected
                        </>
                      ) : (
                        <>
                          Connect
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}{" "}
        </div>
        <Alert className="bg-blue-50 border-blue-100">
          <AlertDescription className="flex items-center text-blue-600">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            {calculateCompletionPercentage() === 100
              ? "Profile complete! You're ready to connect with brands."
              : `Complete your profile and connect your platforms to unlock full potential`}
          </AlertDescription>
        </Alert>
        <Button
          type="submit"
          className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
          disabled={
            !isProfileComplete() ||
            connectedPlatforms.size === 0 ||
            isSubmitting
          }
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              Continue to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>{" "}
      </form>
    </Form>
  );
}
