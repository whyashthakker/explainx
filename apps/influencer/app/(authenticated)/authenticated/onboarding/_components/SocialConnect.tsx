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
import { Platform } from "../../../../../lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import InstagramLogin from "./instagram-connect";
import Link from "next/link";

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

export default function SocialConnect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [connectedPlatforms, setConnectedPlatforms] = useState<Set<Platform>>(
    new Set(),
  );

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      handleInstagramAuth(code);
    }
  }, [searchParams]);

  const handleInstagramAuth = async (code: string) => {
    try {
      const response = await fetch(`/api/auth/instagram?code=${code}`);
      const data = await response.json();

      if (data.success) {
        handleConnect(Platform.INSTAGRAM);
      }
    } catch (error) {
      console.error("Instagram auth error:", error);
    }
  };

  const completionPercentage = Math.round(
    (connectedPlatforms.size / platforms.length) * 100,
  );
  const instaLoginUrl = process.env.NEXT_PUBLIC_INSTAGRAM_EMBEDED_URL;

  const handleConnect = (platform: Platform) => {
    if (platform === Platform.INSTAGRAM) {
      window.location.href = instaLoginUrl!;
      return;
    }

    setConnectedPlatforms((prev) => {
      const newSet = new Set(prev);
      newSet.add(platform);
      return newSet;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 min-h-screen flex flex-col justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">Amplify Your Reach</h1>
        <p className="text-xl text-gray-600">
          Connect your social platforms to unlock more opportunities
        </p>
      </div>
      <Card className="border-2 border-blue-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Profile Strength</CardTitle>
              <CardDescription>
                Enhanced visibility with each connection
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">
                {completionPercentage}%
              </p>
              <p className="text-sm text-gray-500">Completion Score</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="h-3 mb-4" />
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
                      <h3 className="text-lg font-semibold">{platform.name}</h3>
                      <p className="text-sm text-gray-500">
                        {platform.benefit}
                      </p>
                      <p className="text-xs font-medium text-blue-600">
                        {platform.reach}
                      </p>
                    </div>
                  </div>
                  <Button
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
        ))}
      </div>
      <Alert className="bg-blue-50 border-blue-100">
        <AlertDescription className="flex items-center text-blue-600">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          {connectedPlatforms.size === platforms.length
            ? "All platforms connected! You're ready to maximize your impact."
            : `Connect ${platforms.length - connectedPlatforms.size} more platform${
                platforms.length - connectedPlatforms.size === 1 ? "" : "s"
              } to unlock full potential`}
        </AlertDescription>
      </Alert>
      <Button
        className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
        disabled={connectedPlatforms.size === 0}
        onClick={() => router.push("/authenticated/dashboard")}
      >
        Continue to Dashboard
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
