// app/api/instagram/reels/route.ts
import { NextResponse } from 'next/server';
import prisma from '@repo/db/client';
import { InstagramService } from '../../../services/instagram';
import { auth } from '../../../../auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '25');

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        influencer: {
          include: {
            instagramAccount: true
          }
        }
      }
    });

    if (!user || !user.influencer || !user.influencer.instagramAccount) {
      return NextResponse.json(
        { error: 'Instagram not connected' },
        { status: 404 }
      );
    }

    const { accessToken, id: accountId } = user.influencer.instagramAccount;

    const reels = await InstagramService.getReels(accessToken, limit);

    // Store or update reels in database
    await Promise.all(reels.map(async (reel) => {
      const now = new Date();
      
      return prisma.instagramReel.upsert({
        where: { igMediaId: reel.id },
        create: {
          accountId,
          igMediaId: reel.id,
          mediaUrl: reel.media_url,
          thumbnailUrl: reel.thumbnail_url || reel.media_url,
          permalink: reel.permalink,
          caption: reel.caption,
          publishedAt: new Date(reel.timestamp),
          playsCount: 0,
          likesCount: 0,
          commentsCount: 0
        },
        update: {
          mediaUrl: reel.media_url,
          thumbnailUrl: reel.thumbnail_url || reel.media_url,
          caption: reel.caption,
          updatedAt: now
        }
      });
    }));

    return NextResponse.json(reels);
  } catch (error) {
    console.error('Error fetching Instagram reels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reels' },
      { status: 500 }
    );
  }
}