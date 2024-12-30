// app/api/instagram-audit/route.ts
import { NextRequest, NextResponse } from 'next/server';

export interface InstagramAuditResponse {
  username: string;
  engagement_rate: string;
  follower_count: string;
  following_count: string;
  post_count: string;
  avg_likes: string;
  avg_comments: string;
  last_updated: string;
}

type Profile = {
  engagement_rate: string;
  follower_count: string;
  following_count: string;
  post_count: string;
  avg_likes: string;
  avg_comments: string;
};

const DUMMY_PROFILES: { [key: string]: Profile } = {
  'cristiano': {
    engagement_rate: '5.8%',
    follower_count: '612M',
    following_count: '567',
    post_count: '3,452',
    avg_likes: '12.5M',
    avg_comments: '45.2K',
  },
  'leomessi': {
    engagement_rate: '6.2%',
    follower_count: '493M',
    following_count: '302',
    post_count: '1,123',
    avg_likes: '15.3M',
    avg_comments: '52.1K',
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
    engagement_rate: `${(Math.random() * 5 + 1).toFixed(1)}%`,
    follower_count: `${Math.floor(Math.random() * 100)}K`,
    following_count: `${Math.floor(Math.random() * 2000)}`,
    post_count: `${Math.floor(Math.random() * 500)}`,
    avg_likes: `${Math.floor(Math.random() * 1000)}`,
    avg_comments: `${Math.floor(Math.random() * 50)}`,
  };

  const response: InstagramAuditResponse = {
    username,
    ...profile,
    last_updated: new Date().toISOString()
  };

  return NextResponse.json(response);
}