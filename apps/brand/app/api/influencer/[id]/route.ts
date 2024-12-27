import { auth } from "../../../../auth";
import prisma from "@repo/db/client";
import { createApiResponse, handleApiError } from "../../../../lib/api-helper";
import { type NextRequest } from "next/server";

interface YoutubeVideo {
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

interface YoutubeAnalytics {
  subscriberCount: number;
  viewCount: number;
  date: Date;
}

interface YoutubeAccount {
  videos: YoutubeVideo[];
  analytics: YoutubeAnalytics[];
  viewCount: number;
}

interface InfluencerResponse {
  id: string;
  user: {
    email: string | null;
    image: string | null;
  };
  youtubeAccount: {
    videos: YoutubeVideo[];
    analytics: YoutubeAnalytics[];
    viewCount: number;
  } | null;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return createApiResponse(undefined, "Not authenticated", 401);
    }

    const { id } = await context.params;

    const influencer = await prisma.influencer.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true,
            image: true,
          },
        },
        youtubeAccount: {
          include: {
            videos: {
              orderBy: {
                publishedAt: "desc",
              },
              take: 6,
            },
            analytics: {
              orderBy: {
                date: "desc",
              },
              take: 30,
            },
          },
        },
      },
    }) as InfluencerResponse | null;

    if (!influencer) {
      return createApiResponse(undefined, "Influencer not found", 404);
    }

    const metrics = influencer.youtubeAccount?.videos.length 
      ? {
          avgViews: Math.round(
            influencer.youtubeAccount.videos.reduce(
              (sum: number, video: YoutubeVideo) => sum + video.viewCount,
              0
            ) / influencer.youtubeAccount.videos.length
          ),
          totalViews: influencer.youtubeAccount.viewCount,
          subscriberGrowth: influencer.youtubeAccount.analytics 
            ? calculateGrowth(influencer.youtubeAccount.analytics, "subscriberCount")
            : 0,
          viewGrowth: influencer.youtubeAccount.analytics
            ? calculateGrowth(influencer.youtubeAccount.analytics, "viewCount")
            : 0,
          engagement: calculateEngagement(influencer.youtubeAccount.videos),
        }
      : null;

    return createApiResponse({
      influencer,
      metrics,
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch influencer details");
  }
}

function isValidAnalytics(analytics: YoutubeAnalytics[]): boolean {
  return analytics.length >= 2;
}

function calculateGrowth(analytics: YoutubeAnalytics[], metric: keyof Pick<YoutubeAnalytics, 'subscriberCount' | 'viewCount'>): number {
  if (!isValidAnalytics(analytics)) {
    return 0;
  }

  const oldest = analytics.length > 0 ? analytics[analytics.length - 1]?.[metric] ?? 0 : 0;
  const newest = analytics.length > 0 ? analytics[0]?.[metric] ?? 0 : 0;

  if (typeof oldest !== 'number' || typeof newest !== 'number' || oldest === 0) {
    return 0;
  }

  return Number(((newest - oldest) / oldest * 100).toFixed(2));
}

function calculateEngagement(videos: YoutubeVideo[]): string {
  if (!videos.length) return "0";

  const totalEngagements = videos.reduce(
    (sum: number, video: YoutubeVideo) => sum + video.likeCount + video.commentCount,
    0
  );
  const totalViews = videos.reduce(
    (sum: number, video: YoutubeVideo) => sum + video.viewCount,
    0
  );

  if (totalViews === 0) return "0";

  return ((totalEngagements / totalViews) * 100).toFixed(2);
}