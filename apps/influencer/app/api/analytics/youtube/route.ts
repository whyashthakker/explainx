// app/api/analytics/youtube/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";

export const GET = auth(async function GET(req) {
  try {
    if (!req.auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: req.auth.user?.email },
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
      return NextResponse.json({ error: "YouTube account not found" }, { status: 404 });
    }

    // Calculate key metrics
    const videos = user.influencer.youtubeAccount.videos;
    const recentAnalytics = user.influencer.youtubeAccount.analytics;

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
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, 10)
      .map(video => ({
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
function calculateGrowthRate(analytics: any[], metric: string) {
  if (analytics.length < 2) return 0;
  
  const oldest = analytics[analytics.length - 1][metric];
  const newest = analytics[0][metric];
  const growthRate = ((newest - oldest) / oldest) * 100;
  
  return parseFloat(growthRate.toFixed(2));
}

function predictReach(analytics: any[]) {
  if (analytics.length < 7) return null;
  
  // Calculate average daily growth rate
  const dailyGrowth = analytics.slice(0, -1).map((day, index) => {
    const nextDay = analytics[index + 1];
    return (day.viewCount - nextDay.viewCount) / nextDay.viewCount;
  });
  
  const avgDailyGrowth = dailyGrowth.reduce((sum, rate) => sum + rate, 0) / dailyGrowth.length;
  
  // Predict next 30 days
  const currentViews = analytics[0].viewCount;
  const predictedViews = currentViews * Math.pow(1 + avgDailyGrowth, 30);
  
  return Math.round(predictedViews);
}