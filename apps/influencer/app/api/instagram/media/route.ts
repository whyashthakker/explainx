// app/api/instagram/media/route.ts
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

    if (!user?.influencer?.instagramAccount) {
      return NextResponse.json(
        { error: 'Instagram not connected' },
        { status: 404 }
      );
    }

    const media = await InstagramService.getMedia(user.influencer.instagramAccount.accessToken, limit);

    // Store or update media in database
    await Promise.all(media.map(async (item) => {
      if (!user.influencer || !user.influencer.instagramAccount) {
        throw new Error('Influencer or Instagram account not found');
      }
      await prisma.instagramPost.upsert({
        where: { igMediaId: item.id },
        create: {
          accountId: user.influencer.instagramAccount.id,
          igMediaId: item.id,
          mediaType: item.media_type,
          mediaUrl: item.media_url,
          thumbnailUrl: item.thumbnail_url,
          permalink: item.permalink,
          caption: item.caption,
          publishedAt: new Date(item.timestamp),
          likesCount: 0,  // These would come from a separate insights API call
          commentsCount: 0
        },
        update: {
          mediaUrl: item.media_url,
          thumbnailUrl: item.thumbnail_url,
          caption: item.caption,
        }
      });
    }));

    return NextResponse.json(media);
  } catch (error) {
    console.error('Error fetching Instagram media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}