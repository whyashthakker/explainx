// app/api/tools/twitch-audit/route.ts
import { NextRequest, NextResponse } from 'next/server';

export interface TwitchAuditResponse {
  username: string;
  follower_count: string;
  total_views: string;
  engagement_rate: string;
  avg_viewers: string;
  peak_viewers: string;
  stream_time: string;
  audience_gender: {
    male: string;
    female: string;
    other: string;
  };
  authenticity_score: string;
  subscriber_count: string;
  last_updated: string;
}

type Profile = {
  follower_count: string;
  total_views: string;
  engagement_rate: string;
  avg_viewers: string;
  peak_viewers: string;
  stream_time: string;
  audience_gender: {
    male: string;
    female: string;
    other: string;
  };
  authenticity_score: string;
  subscriber_count: string;
};

const DUMMY_PROFILES: { [key: string]: Profile } = {
  'ninja': {
    follower_count: '18.3M',
    total_views: '542M',
    engagement_rate: '5.8%',
    avg_viewers: '42.5K',
    peak_viewers: '156K',
    stream_time: '186h',
    audience_gender: {
      male: '78%',
      female: '19%',
      other: '3%'
    },
    authenticity_score: '98%',
    subscriber_count: '25.4K'
  },
  'pokimane': {
    follower_count: '9.2M',
    total_views: '218M',
    engagement_rate: '4.9%',
    avg_viewers: '18.2K',
    peak_viewers: '82K',
    stream_time: '142h',
    audience_gender: {
      male: '65%',
      female: '32%',
      other: '3%'
    },
    authenticity_score: '97%',
    subscriber_count: '12.8K'
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
    follower_count: `${Math.floor(Math.random() * 500)}K`,
    total_views: `${Math.floor(Math.random() * 10)}M`,
    engagement_rate: `${(Math.random() * 5 + 1).toFixed(1)}%`,
    avg_viewers: `${Math.floor(Math.random() * 5000)}`,
    peak_viewers: `${Math.floor(Math.random() * 15000)}`,
    stream_time: `${Math.floor(Math.random() * 200)}h`,
    audience_gender: {
      male: `${Math.floor(Math.random() * 30 + 50)}%`,
      female: `${Math.floor(Math.random() * 30 + 15)}%`,
      other: `${Math.floor(Math.random() * 5 + 1)}%`
    },
    authenticity_score: `${Math.floor(Math.random() * 15 + 85)}%`,
    subscriber_count: `${Math.floor(Math.random() * 5000)}`
  };

  const response: TwitchAuditResponse = {
    username,
    ...profile,
    last_updated: new Date().toISOString()
  };

  return NextResponse.json(response);
}