//app/api/instagram/callback/route.ts;
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { auth } from "../../../../auth";
import { Platform, Influencer, InstagramAccount } from "@prisma/client";

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
