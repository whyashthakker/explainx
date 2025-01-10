//app/api/instagram/callback/route.ts;
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { auth } from "../../../../auth";
import { Platform, Influencer, InstagramAccount } from "@prisma/client";

import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

// type InstagramMediaItem = {
//   id: string;
//   caption?: string;
//   media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'REEL' | 'STORY';
//   media_url?: string;
//   permalink: string;
//   thumbnail_url?: string;
//   timestamp: string;
//   like_count?: number;
//   comments_count?: number;
//   video_title?: string;
//   plays?: number;
//   reach?: number;
//   saved?: number;
//   engagement?: number;
//   impressions?: number;
// };

// async function fetchInstagramMedia(userId: string, accessToken: string): Promise<InstagramMediaItem[]> {
//   const mediaItems: InstagramMediaItem[] = [];
//   let url = `https://graph.instagram.com/v12.0/${userId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count,video_title,saved,insights.metric(reach,impressions,engagement,plays)&limit=50&access_token=${accessToken}`;
  
//   while (url) {
//     const response = await fetch(url);
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error?.message || 'Failed to fetch Instagram media');
//     }

//     const data = await response.json();
//     mediaItems.push(...data.data);

//     // Check for next page
//     url = data.paging?.next || '';
//   }

//   return mediaItems;
// }

// // Function to fetch stories
// async function fetchInstagramStories(userId: string, accessToken: string): Promise<InstagramMediaItem[]> {
//   const response = await fetch(
//     `https://graph.instagram.com/v12.0/${userId}/stories?fields=id,media_type,media_url,timestamp,insights.metric(reach,impressions)&access_token=${accessToken}`
//   );

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.error?.message || 'Failed to fetch Instagram stories');
//   }

//   const data = await response.json();
//   return data.data.map((story: any) => ({
//     ...story,
//     media_type: 'STORY'
//   }));
// }

type InfluencerWithInstagram = Influencer & {
  instagramAccount: InstagramAccount | null;
};

export async function GET(request: Request) {
  const baseUrl = new URL(request.url).origin;

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      `${baseUrl}/onboarding?error=instagram_auth_failed&details=${error}`,
    );
  }

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/onboarding?error=no_code`);
  }

  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.redirect(
        `${baseUrl}/onboarding?error=not_authenticated`,
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        influencers: {
          include: {
            instagramAccount: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.redirect(
        `${baseUrl}/onboarding?error=user_not_found`,
      );
    }

    let influencer: InfluencerWithInstagram;

    if (user.influencers.length === 0) {
      influencer = await prisma.influencer.create({
        data: {
          userId: user.id,
          name: user.name || "Untitled Profile",
          platforms: [Platform.INSTAGRAM],
          followers: 0,
          category: "Lifestyle",
        },
        include: {
          instagramAccount: true,
        },
      });
    } else {
      const existingInfluencer = user.influencers[0];
      if (!existingInfluencer) {
        throw new Error("Influencer not found");
      }
      influencer = existingInfluencer;
    }

    const tokenResponse = await fetch(
      "https://api.instagram.com/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_INSTGRAM_CLIENT_ID!,
          client_secret: process.env.NEXT_PUBLIC_INSTGRAM_CLIENT_SECRET!,
          grant_type: "authorization_code",
          redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
          code,
        }),
      },
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_message || "Failed to exchange token");
    }

    const longLivedTokenUrl = new URL(
      "https://graph.instagram.com/access_token",
    );

    longLivedTokenUrl.searchParams.append("grant_type", "ig_exchange_token");
    longLivedTokenUrl.searchParams.append(
      "client_secret",
      process.env.NEXT_PUBLIC_INSTGRAM_CLIENT_SECRET!,
    );
    longLivedTokenUrl.searchParams.append(
      "access_token",
      tokenData.access_token,
    );

    const longLivedTokenResponse = await fetch(longLivedTokenUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!longLivedTokenResponse.ok) {
      const errorData = await longLivedTokenResponse.json();
      throw new Error(`HTTP error! status: ${longLivedTokenResponse.status}`);
    }

    const longLivedTokenData = await longLivedTokenResponse.json();

    if (!longLivedTokenResponse.ok) {
      throw new Error("Failed to get long-lived token");
    }

    const finalAccessToken = longLivedTokenData.access_token;
    const expiresIn = longLivedTokenData.expires_in || 5184000;

    const profileResponse = await fetch(
      `https://graph.instagram.com/v12.0/me?fields=id,username,account_type,media_count,followers_count,follows_count&access_token=${finalAccessToken}`,
    );

    const profileData = await profileResponse.json();

    if (!profileResponse.ok) {
      throw new Error(
        profileData.error?.message || "Failed to fetch Instagram profile",
      );
    }

    if (
      profileData.account_type !== "BUSINESS" &&
      profileData.account_type !== "CREATOR"
    ) {
      return NextResponse.redirect(
        `${baseUrl}/onboarding?error=not_business_account`,
      );
    }

    const instagramAccount = await prisma.instagramAccount.upsert({
      where: {
        influencerId: influencer.id,
      },
      create: {
        influencerId: influencer.id,
        username: profileData.username,
        accessToken: finalAccessToken,
        tokenExpires: new Date(Date.now() + expiresIn * 1000),
        igAccountId: profileData.id,
        followersCount: profileData.followers_count || 0,
        followingCount: profileData.follows_count || 0,
        mediaCount: profileData.media_count || 0,
        lastUpdated: new Date(),
      },
      update: {
        username: profileData.username,
        accessToken: finalAccessToken,
        tokenExpires: new Date(Date.now() + expiresIn * 1000),
        followersCount: profileData.followers_count || 0,
        followingCount: profileData.follows_count || 0,
        mediaCount: profileData.media_count || 0,
        lastUpdated: new Date(),
      },
    });

    if (!influencer.platforms.includes(Platform.INSTAGRAM)) {
      await prisma.influencer.update({
        where: { id: influencer.id },
        data: {
          platforms: {
            push: Platform.INSTAGRAM,
          },
          followers: profileData.followers_count || influencer.followers,
        },
      });
    }

    await prisma.instagramAnalytics.create({
      data: {
        accountId: instagramAccount.id,
        date: new Date(),
        followersCount: profileData.followers_count || 0,
        followingCount: profileData.follows_count || 0,
        mediaCount: profileData.media_count || 0,
        impressions: 0,
        reach: 0,
        profileViews: 0,
      },
    });

    // const posts = await fetchInstagramMedia(profileData.id, finalAccessToken);
    // const stories = await fetchInstagramStories(profileData.id, finalAccessToken);

    // // Combine all media
    // const allMedia = [...posts, ...stories];

    // // Prepare data for CSV
    // const csvData = allMedia.map(item => ({
    //   id: item.id,
    //   type: item.media_type,
    //   caption: item.caption || '',
    //   url: item.media_url || item.permalink,
    //   thumbnail: item.thumbnail_url || '',
    //   posted_at: item.timestamp,
    //   likes: item.like_count || 0,
    //   comments: item.comments_count || 0,
    //   plays: item.plays || 0,
    //   reach: item.reach || 0,
    //   impressions: item.impressions || 0,
    //   saved: item.saved || 0,
    //   engagement: item.engagement || 0
    // }));

    // // Generate timestamp for filename
    // const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    // const filename = `instagram_data_${profileData.username}_${timestamp}.csv`;
    // const filepath = path.join(process.cwd(), 'public', 'exports', filename);

    // // Create CSV writer
    // const csvWriter = createObjectCsvWriter({
    //   path: filepath,
    //   header: [
    //     {id: 'id', title: 'ID'},
    //     {id: 'type', title: 'Type'},
    //     {id: 'caption', title: 'Caption'},
    //     {id: 'url', title: 'URL'},
    //     {id: 'thumbnail', title: 'Thumbnail'},
    //     {id: 'posted_at', title: 'Posted At'},
    //     {id: 'likes', title: 'Likes'},
    //     {id: 'comments', title: 'Comments'},
    //     {id: 'plays', title: 'Video Plays'},
    //     {id: 'reach', title: 'Reach'},
    //     {id: 'impressions', title: 'Impressions'},
    //     {id: 'saved', title: 'Saved'},
    //     {id: 'engagement', title: 'Engagement'}
    //   ]
    // });

    // // Write to CSV
    // await csvWriter.writeRecords(csvData);

    // console.log(`Exported ${csvData.length} media items to ${filename}`);

    console.log("Instagram profile data:", profileData);

    return NextResponse.redirect(
      `${baseUrl}/onboarding?success=instagram_connected`,
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.redirect(
      `${baseUrl}/onboarding?error=instagram_auth_failed&message=${encodeURIComponent(errorMessage)}`,
    );
  }
}
