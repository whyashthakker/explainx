// app/api/instagram/profile/route.ts
// import { NextResponse } from 'next/server';
// import prisma from '@repo/db/client';
// import { InstagramService } from '../../../services/instagram';
// import { auth } from '../../../../auth';

// export async function GET() {
//   try {
//     const session = await auth();
//     if (!session?.user?.email) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email },
//       include: {
//         influencer: {
//           include: {
//             instagramAccount: true
//           }
//         }
//       }
//     });

//     if (!user || !user.influencer || !user.influencer.instagramAccount) {
//       return NextResponse.json(
//         { error: 'Instagram not connected' },
//         { status: 404 }
//       );
//     }

//     const { accessToken, id: accountId } = user.influencer.instagramAccount;

//     const profile = await InstagramService.getProfile(accessToken);

//     // Update stored metrics if they've changed
//     if (profile.followers_count !== user.influencer.instagramAccount.followersCount ||
//         profile.media_count !== user.influencer.instagramAccount.mediaCount) {

//       await prisma.$transaction([
//         // Update account metrics
//         prisma.instagramAccount.update({
//           where: { id: accountId },
//           data: {
//             followersCount: profile.followers_count,
//             mediaCount: profile.media_count,
//             followingCount: profile.follows_count,
//             lastUpdated: new Date()
//           }
//         }),
//         // Create analytics entry
//         prisma.instagramAnalytics.create({
//           data: {
//             accountId,
//             date: new Date(),
//             followersCount: profile.followers_count,
//             followingCount: profile.follows_count,
//             mediaCount: profile.media_count,
//             impressions: 0, // These would come from insights API
//             reach: 0,
//             profileViews: 0
//           }
//         })
//       ]);
//     }

//     return NextResponse.json(profile);
//   } catch (error) {
//     console.error('Error fetching Instagram profile:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch profile' },
//       { status: 500 }
//     );
//   }
// }

