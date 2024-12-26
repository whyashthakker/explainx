import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";
import { Session } from "next-auth";

// Extend NextRequest to include auth property
type AuthenticatedRequest = NextRequest & {
  auth: Session | null;
}

// Define proper types for analytics data
type Analytics = {
  date: Date;
  subscriberCount: number;
  viewCount: number;
}

type Video = {
  id: string;
  title: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: Date;
  thumbnailUrl: string;
  analytics: any[]; // Replace with proper analytics type if available
}

export const GET = auth(async (req: AuthenticatedRequest) => {
  try {
    const session = req.auth;
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" }, 
        { status: 401 }
      );
    }

    // Rest of your code remains the same...
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        influencer: {
          include: {
            youtubeAccount: {
              include: {
                videos: {
                  include: {
                    analytics: true
                  }
                },
                analytics: {
                  orderBy: {
                    date: 'desc'
                  },
                  take: 30 // Last 30 days
                }
              }
            }
          }
        }
      }
    });

    if (!user?.influencer?.youtubeAccount) {
      return NextResponse.json(
        { error: "YouTube account not found" }, 
        { status: 404 }
      );
    }

    const videos = user.influencer.youtubeAccount.videos;
    const recentAnalytics = user.influencer.youtubeAccount.analytics;

    if (!videos.length) {
      return NextResponse.json({
        metrics: {
          totalViews: 0,
          totalLikes: 0,
          totalComments: 0,
          averageViews: 0,
          averageLikes: 0,
          engagementRate: 0,
        },
        growthTrends: {
          subscriberGrowth: 0,
          viewGrowth: 0,
          predictedReach: null
        },
        recentVideos: [],
        channelStats: {
          subscriberCount: user.influencer.youtubeAccount.subscriberCount,
          totalViews: user.influencer.youtubeAccount.viewCount,
          videoCount: user.influencer.youtubeAccount.videoCount
        }
      });
    }

    // Calculate CTR and engagement metrics
    const metrics = {
      totalViews: videos.reduce((sum, video) => sum + video.viewCount, 0),
      totalLikes: videos.reduce((sum, video) => sum + video.likeCount, 0),
      totalComments: videos.reduce((sum, video) => sum + video.commentCount, 0),
      averageViews: Math.round(videos.reduce((sum, video) => sum + video.viewCount, 0) / videos.length),
      averageLikes: Math.round(videos.reduce((sum, video) => sum + video.likeCount, 0) / videos.length),
      engagementRate: Math.round(
        (videos.reduce((sum, video) => sum + video.likeCount + video.commentCount, 0) /
        videos.reduce((sum, video) => sum + video.viewCount, 0)) * 100
      ),
    };

    // Calculate growth trends
    const growthTrends = {
      subscriberGrowth: calculateGrowthRate(recentAnalytics, 'subscriberCount'),
      viewGrowth: calculateGrowthRate(recentAnalytics, 'viewCount'),
      predictedReach: predictReach(recentAnalytics)
    };

    // Get recent video performance
    const recentVideos = videos
      .sort((a: Video, b: Video) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, 10)
      .map((video: Video) => ({
        id: video.id,
        title: video.title,
        views: video.viewCount,
        likes: video.likeCount,
        comments: video.commentCount,
        publishedAt: video.publishedAt,
        thumbnailUrl: video.thumbnailUrl,
        engagementRate: ((video.likeCount + video.commentCount) / video.viewCount * 100).toFixed(2)
      }));

    return NextResponse.json({
      metrics,
      growthTrends,
      recentVideos,
      channelStats: {
        subscriberCount: user.influencer.youtubeAccount.subscriberCount,
        totalViews: user.influencer.youtubeAccount.viewCount,
        videoCount: user.influencer.youtubeAccount.videoCount
      }
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
});

// Helper functions
function calculateGrowthRate(analytics: Analytics[], metric: keyof Pick<Analytics, 'subscriberCount' | 'viewCount'>) {
  if (!analytics || analytics.length < 2) return 0;
  
  const oldestAnalytic = analytics[analytics.length - 1];
  const newestAnalytic = analytics[0];
  
  if (!oldestAnalytic || !newestAnalytic) return 0;
  
  const oldest = oldestAnalytic[metric];
  const newest = newestAnalytic[metric];
  
  if (oldest === 0) return 0; // Prevent division by zero
  
  const growthRate = ((newest - oldest) / oldest) * 100;
  return parseFloat(growthRate.toFixed(2));
}

function predictReach(analytics: Analytics[]) {
  if (!analytics || analytics.length < 7) return null;
  
  // Calculate average daily growth rate
  const dailyGrowth = analytics.slice(0, -1).map((day, index) => {
    const nextDay = analytics[index + 1];
    if (!nextDay || nextDay.viewCount === 0) return 0;
    return (day.viewCount - nextDay.viewCount) / nextDay.viewCount;
  });
  
  if (dailyGrowth.length === 0) return null;
  
  const avgDailyGrowth = dailyGrowth.reduce((sum, rate) => sum + rate, 0) / dailyGrowth.length;
  
  // Predict next 30 days
  const currentViews = analytics[0]?.viewCount ?? 0;
  const predictedViews = currentViews * Math.pow(1 + avgDailyGrowth, 30);
  
  return Math.round(predictedViews);
}