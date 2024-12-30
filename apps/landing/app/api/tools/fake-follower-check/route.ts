// app/api/tools/fake-follower-check/route.ts
import { NextRequest, NextResponse } from 'next/server';

export interface FakeFollowerResponse {
  username: string;
  fake_follower_percentage: string;
  engagement_quality_score: string;
  suspicious_accounts: string;
  bot_interaction_rate: string;
  authenticity_score: string;
  last_updated: string;
}

type Profile = {
  fake_follower_percentage: string;
  engagement_quality_score: string;
  suspicious_accounts: string;
  bot_interaction_rate: string;
  authenticity_score: string;
};

const SAMPLE_PROFILES: { [key: string]: Profile } = {
  'cristiano': {
    fake_follower_percentage: '2.8%',
    engagement_quality_score: '98/100',
    suspicious_accounts: '1.2M',
    bot_interaction_rate: '0.5%',
    authenticity_score: '97/100',
  },
  'leomessi': {
    fake_follower_percentage: '3.1%',
    engagement_quality_score: '96/100',
    suspicious_accounts: '800K',
    bot_interaction_rate: '0.7%',
    authenticity_score: '95/100',
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
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Generate realistic-looking data for unknown users
  const profile = SAMPLE_PROFILES[username.toLowerCase()] || {
    fake_follower_percentage: `${(Math.random() * 15 + 2).toFixed(1)}%`,
    engagement_quality_score: `${Math.floor(Math.random() * 20 + 80)}/100`,
    suspicious_accounts: `${Math.floor(Math.random() * 500 + 100)}`,
    bot_interaction_rate: `${(Math.random() * 5 + 1).toFixed(1)}%`,
    authenticity_score: `${Math.floor(Math.random() * 15 + 85)}/100`,
  };

  const response: FakeFollowerResponse = {
    username,
    ...profile,
    last_updated: new Date().toISOString()
  };

  return NextResponse.json(response);
}