import { NextResponse } from "next/server";
import { google } from "googleapis";
import prisma from "@repo/db/client";
import { auth } from "../../../../auth";

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI,
);

const youtube = google.youtube("v3");

async function syncYouTubeVideos(accountId: string, accessToken: string) {
  let pageToken: string | undefined;
  let totalVideos = 0;
  const batchSize = 50; // YouTube API maximum

  try {
    console.log("Starting video sync...");

    do {
      // 1. First get list of video IDs
      console.log(
        `Fetching batch of videos${pageToken ? " (page token: " + pageToken.substring(0, 10) + "...)" : ""}`,
      );
      const searchResponse = await youtube.search.list({
        part: ["id"],
        maxResults: batchSize,
        pageToken,
        type: ["video"],
        forMine: true,
        access_token: accessToken,
      });

      const videoIds = searchResponse.data.items
        ?.map((item) => item.id?.videoId)
        .filter((id): id is string => !!id);

      if (!videoIds?.length) {
        console.log("No more videos found");
        break;
      }

      // 2. Get detailed video information
      console.log(`Fetching details for ${videoIds.length} videos...`);
      const videoDetails = await youtube.videos.list({
        part: ["snippet", "statistics"],
        id: videoIds,
        access_token: accessToken,
      });

      // 3. Process each video
      for (const video of videoDetails.data.items || []) {
        if (!video.id) continue;

        try {
          console.log(`Processing video: ${video.snippet?.title || video.id}`);

          // Store video data
          const savedVideo = await prisma.youTubeVideo.upsert({
            where: { videoId: video.id },
            create: {
              accountId,
              videoId: video.id,
              title: video.snippet?.title || "",
              description: video.snippet?.description || "",
              thumbnailUrl: video.snippet?.thumbnails?.default?.url || "",
              publishedAt: new Date(video.snippet?.publishedAt || Date.now()),
              viewCount: Number(video.statistics?.viewCount) || 0,
              likeCount: Number(video.statistics?.likeCount) || 0,
              commentCount: Number(video.statistics?.commentCount) || 0,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            update: {
              title: video.snippet?.title || "",
              description: video.snippet?.description || "",
              thumbnailUrl: video.snippet?.thumbnails?.default?.url || "",
              viewCount: Number(video.statistics?.viewCount) || 0,
              likeCount: Number(video.statistics?.likeCount) || 0,
              commentCount: Number(video.statistics?.commentCount) || 0,
              updatedAt: new Date(),
            },
          });

          // Store analytics snapshot
          await prisma.youTubeVideoAnalytics.create({
            data: {
              videoId: savedVideo.id,
              date: new Date(),
              viewCount: Number(video.statistics?.viewCount) || 0,
              likeCount: Number(video.statistics?.likeCount) || 0,
              commentCount: Number(video.statistics?.commentCount) || 0,
            },
          });

          totalVideos++;
          console.log(`Successfully processed video ${video.id}`);
        } catch (videoError) {
          console.error(`Error processing video ${video.id}:`, videoError);
          // Continue with next video instead of breaking the entire sync
          continue;
        }
      }

      // Get next page token
      pageToken = searchResponse.data.nextPageToken || undefined;
      console.log(`Processed ${totalVideos} videos so far...`);
    } while (pageToken);

    // 4. Update account with sync status
    await prisma.youTubeAccount.update({
      where: { id: accountId },
      data: {
        lastUpdated: new Date(),
        videoCount: totalVideos,
      },
    });

    console.log(`Video sync completed. Total videos processed: ${totalVideos}`);
  } catch (error) {
    console.error("Error in video sync:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    // Re-throw to let caller handle the error
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { code } = await req.json();
    console.log("Received code:", code.substring(0, 10) + "...");

    // Exchange code for tokens
    console.log("Exchanging code for tokens...");
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    if (!tokens.access_token) {
      throw new Error("No access token received");
    }

    // Get channel data
    console.log("Fetching channel data...");
    const channelResponse = await youtube.channels.list({
      part: ["snippet", "statistics"],
      mine: true,
      access_token: tokens.access_token,
    });

    const channel = channelResponse.data.items?.[0];
    if (!channel?.id) {
      throw new Error("No channel found");
    }

    // Get the authenticated user
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    // Get user with current portal state
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        influencers: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Verify user has influencer access and is in influencer portal
    if (user.userType !== "INFLUENCER" && user.userType !== "BOTH") {
      throw new Error("Not authorized for influencer portal");
    }

    if (user.activePortal !== "INFLUENCER") {
      throw new Error("Please switch to influencer portal");
    }

    // Get or create the active influencer profile
    const activeInfluencer = await prisma.influencer.findFirst({
      where: { userId: user.id },
    });

    // If no active influencer profile exists, create one
    const influencer =
      activeInfluencer ||
      (await prisma.influencer.create({
        data: {
          userId: user.id,
          name: user.name || channel.snippet?.title || "",
          category: "CONTENT_CREATOR",
          followers: Number(channel.statistics?.subscriberCount) || 0,
          platforms: ["YOUTUBE"],
        },
      }));

    // Update the influencer profile with YouTube data
    await prisma.influencer.update({
      where: { id: influencer.id },
      data: {
        followers: Number(channel.statistics?.subscriberCount) || 0,
        platforms: { push: "YOUTUBE" },
      },
    });

    // Create or update YouTube account
    console.log("Storing YouTube account data...");
    const youtubeAccount = await prisma.youTubeAccount.upsert({
      where: { channelId: channel.id },
      create: {
        influencerId: influencer.id,
        channelId: channel.id,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || "",
        tokenExpires: new Date(Date.now() + (tokens.expiry_date || 3600000)),
        channelTitle: channel.snippet?.title || "",
        description: channel.snippet?.description || "",
        subscriberCount: Number(channel.statistics?.subscriberCount) || 0,
        videoCount: Number(channel.statistics?.videoCount) || 0,
        viewCount: Number(channel.statistics?.viewCount) || 0,
      },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || "",
        tokenExpires: new Date(Date.now() + (tokens.expiry_date || 3600000)),
        channelTitle: channel.snippet?.title || "",
        description: channel.snippet?.description || "",
        subscriberCount: Number(channel.statistics?.subscriberCount) || 0,
        videoCount: Number(channel.statistics?.videoCount) || 0,
        viewCount: Number(channel.statistics?.viewCount) || 0,
      },
    });

    // Store channel analytics snapshot
    await prisma.youTubeAnalytics.create({
      data: {
        accountId: youtubeAccount.id,
        date: new Date(),
        subscriberCount: Number(channel.statistics?.subscriberCount) || 0,
        viewCount: Number(channel.statistics?.viewCount) || 0,
        videoCount: Number(channel.statistics?.videoCount) || 0,
      },
    });

    // Sync videos in the background
    syncYouTubeVideos(youtubeAccount.id, tokens.access_token).catch((error) =>
      console.error("Error syncing videos:", error),
    );

    return NextResponse.json({
      success: true,
      data: { influencer, youtubeAccount },
    });
  } catch (error) {
    // Convert error to string before logging
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("YouTube auth error:", errorMessage);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}

