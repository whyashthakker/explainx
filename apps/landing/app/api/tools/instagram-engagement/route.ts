// app/api/tools/instagram-engagement/route.ts
import { NextRequest, NextResponse } from 'next/server';

export interface InstagramEngagementResponse {
  username: string;
  engagement_rate: string;
  total_engagements: string;
  avg_likes: string;
  avg_comments: string;
  avg_saves: string;
  follower_count: string;
  last_updated: string;
  benchmarks: {
    low: string;
    average: string;
    high: string;
  };
}

const DUMMY_PROFILES: { [key: string]: Omit<InstagramEngagementResponse, 'username' | 'last_updated'> } = {
  'cristiano': {
    engagement_rate: '5.8%',
    total_engagements: '15.2M',
    avg_likes: '12.5M',
    avg_comments: '45.2K',
    avg_saves: '892K',
    follower_count: '612M',
    benchmarks: {
      low: '1.5%',
      average: '3.2%',
      high: '5.0%'
    }
  },
  'leomessi': {
    engagement_rate: '6.2%',
    total_engagements: '18.1M',
    avg_likes: '15.3M',
    avg_comments: '52.1K',
    avg_saves: '1.2M',
    follower_count: '493M',
    benchmarks: {
      low: '1.5%',
      average: '3.2%',
      high: '5.0%'
    }
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
    total_engagements: `${Math.floor(Math.random() * 50000)}`,
    avg_likes: `${Math.floor(Math.random() * 1000)}`,
    avg_comments: `${Math.floor(Math.random() * 50)}`,
    avg_saves: `${Math.floor(Math.random() * 100)}`,
    follower_count: `${Math.floor(Math.random() * 10000)}`,
    benchmarks: {
      low: '1.5%',
      average: '3.2%',
          high: '5.0%'
        }
      };
    const response: InstagramEngagementResponse = {
        username,
        ...profile,
        last_updated: new Date().toISOString()
    };

    return NextResponse.json(response);
}