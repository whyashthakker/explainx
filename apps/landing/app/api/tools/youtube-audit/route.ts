// app/api/tools/youtube-audit/route.ts
import { NextRequest, NextResponse } from 'next/server';

export interface YouTubeAuditResponse {
  username: string;
  subscriber_count: string;
  total_views: string;
  engagement_rate: string;
  avg_views: string;
  avg_likes: string;
  avg_comments: string;
  video_count: string;
  last_updated: string;
}

type Profile = {
  subscriber_count: string;
  total_views: string;
  engagement_rate: string;
  avg_views: string;
  avg_likes: string;
  avg_comments: string;
  video_count: string;
};

const DUMMY_PROFILES: { [key: string]: Profile } = {
  'mkbhd': {
    subscriber_count: '18.2M',
    total_views: '3.8B',
    engagement_rate: '8.4%',
    avg_views: '2.5M',
    avg_likes: '185K',
    avg_comments: '12.5K',
    video_count: '1,423'
  },
  'veritasium': {
    subscriber_count: '13.7M',
    total_views: '2.1B',
    engagement_rate: '7.2%',
    avg_views: '1.8M',
    avg_likes: '142K',
    avg_comments: '8.9K',
    video_count: '892'
  }
};

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
  const profile = DUMMY_PROFILES[username.toLowerCase()] || {
    subscriber_count: `${Math.floor(Math.random() * 500)}K`,
    total_views: `${Math.floor(Math.random() * 50)}M`,
    engagement_rate: `${(Math.random() * 8 + 2).toFixed(1)}%`,
    avg_views: `${Math.floor(Math.random() * 50)}K`,
    avg_likes: `${Math.floor(Math.random() * 5000)}`,
    avg_comments: `${Math.floor(Math.random() * 500)}`,
    video_count: `${Math.floor(Math.random() * 500)}`
  };

  const response: YouTubeAuditResponse = {
    username,
    ...profile,
    last_updated: new Date().toISOString()
  };

  return NextResponse.json(response);
}