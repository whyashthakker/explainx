// app/api/instagram/callback/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@repo/db/client";
// import { auth } from "../../../../auth";

// export async function GET(request: Request) {
//   const baseUrl = new URL(request.url).origin;

//   const { searchParams } = new URL(request.url);
//   const code = searchParams.get('code');
//   const error = searchParams.get('error');

//   if (error) {
//     return NextResponse.redirect(`${baseUrl}/onboarding?error=instagram_auth_failed`);
//   }

//   if (!code) {
//     return NextResponse.redirect(`${baseUrl}/onboarding?error=no_code`);
//   }

//   try {
//     const session = await auth();
//     if (!session?.user?.email) {
//       return NextResponse.redirect(`${baseUrl}/onboarding?error=not_authenticated`);
//     }

//     // Get user and create influencer profile if it doesn't exist
//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email },
//       include: { influencer: true },
//     });

//     if (!user) {
//       return NextResponse.redirect(`${baseUrl}/onboarding?error=user_not_found`);
//     }

//     // Create influencer profile if it doesn't exist
//     let influencer = user.influencer;
//     if (!influencer) {
//       influencer = await prisma.influencer.create({
//         data: {
//           userId: user.id,
//           name: user.name || 'Untitled Profile',
//           platforms: [],
//           followers: 0,
//           category: 'OTHERS',
//         },
//       });
//     }

//     // Rest of your Instagram token exchange code...
//     const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         client_id: process.env.INSTAGRAM_CLIENT_ID!,
//         client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
//         grant_type: 'authorization_code',
//         redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
//         code,
//       }).toString(),
//     });

//     const tokenData = await tokenResponse.json();
//     if (!tokenResponse.ok) {
//       console.error('Token exchange error:', tokenData);
//       throw new Error(tokenData.error_message || 'Failed to exchange token');
//     }

//     // Exchange for long-lived access token
//     const longLivedTokenResponse = await fetch(
//       `https://graph.instagram.com/access_token?${new URLSearchParams({
//         grant_type: 'ig_exchange_token',
//         client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
//         access_token: tokenData.access_token,
//       })}`
//     );

//     const longLivedTokenData = await longLivedTokenResponse.json();
//     if (!longLivedTokenResponse.ok) {
//       console.error('Long-lived token error:', longLivedTokenData);
//       throw new Error('Failed to get long-lived token');
//     }

//     const finalAccessToken = longLivedTokenData.access_token;
//     const expiresIn = longLivedTokenData.expires_in || 5184000; // Default to 60 days

//     // Get user profile with business fields
//     const profileResponse = await fetch(
//       `https://graph.instagram.com/v12.0/me?fields=id,username,account_type,media_count,followers_count,follows_count&access_token=${finalAccessToken}`
//     );

//     if (!profileResponse.ok) {
//       const errorData = await profileResponse.json();
//       console.error('Profile fetch error:', errorData);
//       throw new Error(errorData.error?.message || 'Failed to fetch Instagram profile');
//     }

//     const profileData = await profileResponse.json();

//     // Verify it's a business/creator account
//     if (profileData.account_type !== 'BUSINESS' && profileData.account_type !== 'CREATOR') {
//       return NextResponse.redirect(`${baseUrl}/onboarding?error=not_business_account`);
//     }

//     // Update or create Instagram account
//     await prisma.instagramAccount.upsert({
//       where: {
//         influencerId: influencer.id
//       },
//       create: {
//         influencerId: influencer.id,
//         username: profileData.username,
//         accessToken: finalAccessToken,
//         tokenExpires: new Date(Date.now() + expiresIn * 1000),
//         igAccountId: profileData.id,
//         followersCount: profileData.followers_count || 0,
//         followingCount: profileData.follows_count || 0,
//         mediaCount: profileData.media_count || 0,
//         lastUpdated: new Date(),
//       },
//       update: {
//         username: profileData.username,
//         accessToken: finalAccessToken,
//         tokenExpires: new Date(Date.now() + expiresIn * 1000),
//         followersCount: profileData.followers_count || 0,
//         followingCount: profileData.follows_count || 0,
//         mediaCount: profileData.media_count || 0,
//         lastUpdated: new Date(),
//       }
//     });

//     // Update influencer's platforms array
//     if (user.influencer && !user.influencer.platforms.includes('INSTAGRAM')) {
//       await prisma.influencer.update({
//         where: { id: user.influencer.id },
//         data: {
//           platforms: {
//             push: 'INSTAGRAM'
//           }
//         }
//       });
//     }

//     // Create initial analytics entry
//     await prisma.instagramAnalytics.create({
//       data: {
//         accountId: influencer.id,
//         date: new Date(),
//         followersCount: profileData.followers_count || 0,
//         followingCount: profileData.follows_count || 0,
//         mediaCount: profileData.media_count || 0,
//         impressions: 0,
//         reach: 0,
//         profileViews: 0,
//       }
//     });

//     return NextResponse.redirect(`${baseUrl}/onboarding?success=instagram_connected`);
//   } catch (error) {
//     console.error('Instagram callback error:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.redirect(
//       `${baseUrl}/onboarding?error=instagram_auth_failed&message=${encodeURIComponent(errorMessage)}`
//     );
//   }
// }

