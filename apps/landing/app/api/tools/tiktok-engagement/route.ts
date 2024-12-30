// app/api/tools/tiktok-engagement/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface EngagementResponse {
  username: string;
  overall_engagement: string;
  like_rate: string;
  comment_rate: string;
  share_rate: string;
  view_engagement: string;
  peak_engagement_time: string;
  engagement_by_content_type: {
    type: string;
    rate: string;
  }[];
  weekly_engagement_trend: string;
  top_performing_content: string;
  last_updated: string;
}

type Profile = {
  overall_engagement: string;
  like_rate: string;
  comment_rate: string;
  share_rate: string;
  view_engagement: string;
  peak_engagement_time: string;
  engagement_by_content_type: {
    type: string;
    rate: string;
  }[];
  weekly_engagement_trend: string;
  top_performing_content: string;
};

const SAMPLE_PROFILES: { [key: string]: Profile } = {
  'charlidamelio': {
    overall_engagement: '8.2%',
    like_rate: '12.5%',
    comment_rate: '0.8%',
    share_rate: '1.2%',
    view_engagement: '15.3%',
    peak_engagement_time: '8:00 PM - 10:00 PM EST',
    engagement_by_content_type: [
      { type: 'Dance', rate: '9.8%' },
      { type: 'Lifestyle', rate: '7.5%' },
      { type: 'Collaboration', rate: '8.9%' }
    ],
    weekly_engagement_trend: 'Increasing (+2.3% this week)',
    top_performing_content: 'Dance tutorials and challenges'
  },
  'khaby.lame': {
    overall_engagement: '7.8%',
    like_rate: '11.2%',
    comment_rate: '1.1%',
    share_rate: '2.3%',
    view_engagement: '14.1%',
    peak_engagement_time: '2:00 PM - 4:00 PM CET',
    engagement_by_content_type: [
      { type: 'Comedy', rate: '8.9%' },
      { type: 'Reaction', rate: '7.2%' },
      { type: 'Tutorial', rate: '6.8%' }
    ],
    weekly_engagement_trend: 'Stable (+0.5% this week)',
    top_performing_content: 'Life hack reaction videos'
  }
};

const CONTENT_TYPES = [
  'Dance', 'Comedy', 'Tutorial', 'Lifestyle', 'Music',
  'Fashion', 'Food', 'Travel', 'Education', 'Gaming'
];

const TIME_ZONES = [
  'EST', 'PST', 'GMT', 'CET', 'JST'
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

  // Generate random engagement metrics for unknown users
  const randomProfile: Profile = SAMPLE_PROFILES[username.toLowerCase()] || {
    overall_engagement: `${(Math.random() * 5 + 2).toFixed(1)}%`,
    like_rate: `${(Math.random() * 8 + 4).toFixed(1)}%`,
    comment_rate: `${(Math.random() * 1.5).toFixed(1)}%`,
    share_rate: `${(Math.random() * 2).toFixed(1)}%`,
    view_engagement: `${(Math.random() * 10 + 5).toFixed(1)}%`,
    peak_engagement_time: `${Math.floor(Math.random() * 12 + 1)}:00 ${
      Math.random() > 0.5 ? 'AM' : 'PM'
    } ${TIME_ZONES[Math.floor(Math.random() * TIME_ZONES.length)]}`,
    engagement_by_content_type: CONTENT_TYPES
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(type => ({
        type,
        rate: `${(Math.random() * 5 + 2).toFixed(1)}%`
      })),
    weekly_engagement_trend: Math.random() > 0.5 
      ? `Increasing (+${(Math.random() * 3).toFixed(1)}% this week)`
      : `Stable (${(Math.random() * 1).toFixed(1)}% change)`,
    top_performing_content: `${
      CONTENT_TYPES[Math.floor(Math.random() * CONTENT_TYPES.length)]
    } content`
  };

  const response: EngagementResponse = {
    username,
    ...randomProfile,
    last_updated: new Date().toISOString()
  };

  return NextResponse.json(response);
}