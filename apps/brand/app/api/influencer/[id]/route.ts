// app/api/influencer/[id]/route.ts
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";
import { createApiResponse, handleApiError } from "../../../../lib/api-helper";

export const GET = auth(async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!req.auth) {
      return createApiResponse(undefined, "Not authenticated", 401);
    }

    // Fetch detailed influencer data
    const influencer = await prisma.influencer.findUnique({
      where: { id: params.id },
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
    });

    if (!influencer) {
      return createApiResponse(undefined, "Influencer not found", 404);
    }

    // Calculate engagement metrics
    const metrics = influencer.youtubeAccount ? {
      avgViews: Math.round(
        influencer.youtubeAccount.videos.reduce((sum, video) => sum + video.viewCount, 0) / 
        influencer.youtubeAccount.videos.length
      ),
      totalViews: influencer.youtubeAccount.viewCount,
      subscriberGrowth: calculateGrowth(influencer.youtubeAccount.analytics, "subscriberCount"),
      viewGrowth: calculateGrowth(influencer.youtubeAccount.analytics, "viewCount"),
      engagement: (
        (influencer.youtubeAccount.videos.reduce(
          (sum, video) => sum + video.likeCount + video.commentCount,
          0
        ) /
          influencer.youtubeAccount.videos.reduce((sum, video) => sum + video.viewCount, 0)) *
        100
      ).toFixed(2),
    } : null;

    return createApiResponse({
      influencer,
      metrics,
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch influencer details");
  }
});

function calculateGrowth(analytics: any[], metric: string): number {
  if (!analytics || analytics.length < 2) return 0;

  const oldest = analytics[analytics.length - 1][metric];
  const newest = analytics[0][metric];
  
  return Number(((newest - oldest) / oldest * 100).toFixed(2));
}