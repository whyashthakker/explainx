// app/api/tools/pinterest-audit/route.ts
import { NextRequest, NextResponse } from 'next/server';

export interface PinterestAuditResponse {
  username: string;
  follower_count: string;
  engagement_rate: string;
  avg_repins: string;
  board_count: string;
  pin_count: string;
  monthly_views: string;
  last_updated: string;
}

type Profile = {
  follower_count: string;
  engagement_rate: string;
  avg_repins: string;
  board_count: string;
  pin_count: string;
  monthly_views: string;
};

const DUMMY_PROFILES: { [key: string]: Profile } = {
  'designhome': {
    follower_count: '2.8M',
    engagement_rate: '4.2%',
    avg_repins: '156',
    board_count: '89',
    pin_count: '12.4K',
    monthly_views: '5.2M'
  },
  'foodlover': {
    follower_count: '892K',
    engagement_rate: '3.8%',
    avg_repins: '98',
    board_count: '45',
    pin_count: '8.9K',
    monthly_views: '2.1M'
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
    follower_count: `${Math.floor(Math.random() * 100)}K`,
    engagement_rate: `${(Math.random() * 5 + 1).toFixed(1)}%`,
    avg_repins: `${Math.floor(Math.random() * 200)}`,
    board_count: `${Math.floor(Math.random() * 50)}`,
    pin_count: `${Math.floor(Math.random() * 5000)}`,
    monthly_views: `${Math.floor(Math.random() * 1000)}K`
  };

  const response: PinterestAuditResponse = {
    username,
    ...profile,
    last_updated: new Date().toISOString()
  };

  return NextResponse.json(response);
}