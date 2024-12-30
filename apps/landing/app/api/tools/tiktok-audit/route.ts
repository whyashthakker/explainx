// app/api/tools/tiktok-audit/route.ts
import { NextRequest, NextResponse } from 'next/server';

export interface TikTokAuditResponse {
  username: string;
  follower_count: string;
  engagement_rate: string;
  avg_likes: string;
  avg_comments: string;
  avg_shares: string;
  avg_plays: string;
  total_videos: string;
  content_categories: string[];
  posting_frequency: string;
  last_updated: string;
}

type Profile = {
  follower_count: string;
  engagement_rate: string;
  avg_likes: string;
  avg_comments: string;
  avg_shares: string;
  avg_plays: string;
  total_videos: string;
  content_categories: string[];
  posting_frequency: string;
};

const SAMPLE_PROFILES: { [key: string]: Profile } = {
  'charlidamelio': {
    follower_count: '150.8M',
    engagement_rate: '8.2%',
    avg_likes: '5.2M',
    avg_comments: '125K',
    avg_shares: '89K',
    avg_plays: '15.8M',
    total_videos: '2,453',
    content_categories: ['Dance', 'Lifestyle', 'Entertainment'],
    posting_frequency: '1.8 videos/day'
  },
  'khaby.lame': {
    follower_count: '161.3M',
    engagement_rate: '7.8%',
    avg_likes: '4.8M',
    avg_comments: '98K',
    avg_shares: '156K',
    avg_plays: '12.5M',
    total_videos: '1,234',
    content_categories: ['Comedy', 'Reactions', 'Entertainment'],
    posting_frequency: '1.2 videos/day'
  }
};

const CATEGORIES = [
  'Dance', 'Comedy', 'Lifestyle', 'Entertainment', 'Education',
  'Food', 'Fashion', 'Beauty', 'Sports', 'Gaming', 'Music',
  'Travel', 'DIY & Crafts', 'Pets & Animals', 'Technology'
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: 400 }
    );
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate random data for unknown users
  const randomCategories = CATEGORIES
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 2);

  const profile = SAMPLE_PROFILES[username.toLowerCase()] || {
    follower_count: `${Math.floor(Math.random() * 900 + 100)}K`,
    engagement_rate: `${(Math.random() * 8 + 2).toFixed(1)}%`,
    avg_likes: `${Math.floor(Math.random() * 50 + 10)}K`,
    avg_comments: `${Math.floor(Math.random() * 1000 + 100)}`,
    avg_shares: `${Math.floor(Math.random() * 500 + 50)}`,
    avg_plays: `${Math.floor(Math.random() * 150 + 50)}K`,
    total_videos: `${Math.floor(Math.random() * 500 + 50)}`,
    content_categories: randomCategories,
    posting_frequency: `${(Math.random() * 2 + 0.5).toFixed(1)} videos/day`
  };

  const response: TikTokAuditResponse = {
    username,
    ...profile,
    last_updated: new Date().toISOString()
  };

  return NextResponse.json(response);
}