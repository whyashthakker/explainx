// app/api/influencers/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";
import type { NextRequest } from "next/server";

interface InfluencerMetrics {
  subscribers: number;
  videos: number;
  views: number;
}

interface ProcessedInfluencer {
  id: string;
  name: string;
  avatar: string | null;
  category: string;
  followers: number;
  platforms: string[];
  bio: string | null;
  isVerified: boolean;
  engagement: string;
  metrics: InfluencerMetrics;
  userId: string; // Added userId for filtering
}

interface RawInfluencer {
  id: string;
  name: string;
  avatar: string | null;
  category: string;
  followers: number;
  platforms: string[];
  bio: string | null;
  userId: string; // Added userId
  youtubeAccount: {
    channelId: string;
    channelTitle: string;
    subscriberCount: number;
    videoCount: number;
    viewCount: number;
  } | null;
  user: {
    id: string;
    email: string | null;
    image: string | null;
  };
}

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Fetch all influencers with their YouTube accounts
    const influencers = (await prisma.influencer.findMany({
      include: {
        youtubeAccount: {
          select: {
            channelId: true,
            channelTitle: true,
            subscriberCount: true,
            videoCount: true,
            viewCount: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            image: true,
          },
        },
      },
    })) as RawInfluencer[];

    // Calculate engagement metrics and add sample data
    const processedInfluencers = influencers.map((influencer) => {
      const isVerified = !!influencer.youtubeAccount;
      const avgEngagement = calculateEngagement(influencer);

      return {
        id: influencer.id,
        name: influencer.name,
        avatar: influencer.avatar || influencer.user.image,
        category: influencer.category,
        followers: influencer.followers,
        platforms: influencer.platforms,
        bio: influencer.bio,
        isVerified,
        userId: influencer.user.id, // Use user.id instead of email
        engagement: avgEngagement,
        metrics: {
          subscribers: influencer.youtubeAccount?.subscriberCount || 0,
          videos: influencer.youtubeAccount?.videoCount || 0,
          views: influencer.youtubeAccount?.viewCount || 0,
        },
      };
    });

    // Add sample influencers
    const sampleInfluencers = getSampleInfluencers();
    const allInfluencers = [...processedInfluencers, ...sampleInfluencers];

    return NextResponse.json(allInfluencers);
  } catch (error) {
    console.error("Error fetching influencers:", error);
    return NextResponse.json(
      { error: "Failed to fetch influencers" },
      { status: 500 },
    );
  }
}

function calculateEngagement(influencer: RawInfluencer): string {
  if (influencer.youtubeAccount) {
    return (
      (influencer.youtubeAccount.viewCount / influencer.followers) *
      100
    ).toFixed(2);
  }
  // Return random engagement rate for non-verified profiles
  return (Math.random() * (8 - 2) + 2).toFixed(2);
}

function getSampleInfluencers(): ProcessedInfluencer[] {
  return [
    {
      id: "sample1",
      name: "Alex Tech",
      avatar: "/api/placeholder/150/150",
      category: "Technology",
      followers: 250000,
      platforms: ["YOUTUBE", "TWITTER"],
      bio: "Tech reviewer and gadget enthusiast",
      isVerified: true,
      engagement: "6.8",
      userId: "sample-user-1", // Added userId for sample data
      metrics: {
        subscribers: 280000,
        videos: 450,
        views: 15000000,
      },
    },
    {
      id: "sample2",
      name: "FitWithSarah",
      avatar: "/api/placeholder/150/150",
      category: "Fitness",
      followers: 180000,
      platforms: ["INSTAGRAM", "TIKTOK"],
      bio: "Helping you achieve your fitness goals",
      isVerified: false,
      engagement: "4.2",
      userId: "sample-user-2", // Added userId for sample data
      metrics: {
        subscribers: 0,
        videos: 0,
        views: 0,
      },
    },
  ];
}

