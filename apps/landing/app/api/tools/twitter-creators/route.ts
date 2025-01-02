// app/api/tools/twitter-creators/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface Creator {
  handle: string;
  name: string;
  location: string;
  followers: string;
  engagement: string;
  bio: string;
  topics: string[];
}

// Sample data - in a real application, this would come from a database
const SAMPLE_CREATORS: { [key: string]: Creator[] } = {
  'united states': [
    {
      handle: 'techexpert',
      name: 'Tech Expert',
      location: 'San Francisco, CA',
      followers: '245K',
      engagement: '3.2%',
      bio: 'Tech enthusiast sharing the latest in AI, web development, and startup culture.',
      topics: ['Technology', 'AI', 'Startups']
    },
    {
      handle: 'digitalmarketer',
      name: 'Digital Marketing Pro',
      location: 'New York, NY',
      followers: '178K',
      engagement: '2.8%',
      bio: 'Digital marketing strategist helping businesses grow their online presence.',
      topics: ['Marketing', 'Business', 'Social Media']
    }
  ],
  'united kingdom': [
    {
      handle: 'financeuk',
      name: 'UK Finance Guru',
      location: 'London',
      followers: '156K',
      engagement: '2.5%',
      bio: 'Breaking down complex financial topics for everyday investors.',
      topics: ['Finance', 'Investment', 'Economics']
    }
  ]
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const location = searchParams.get('location')?.toLowerCase();
  const category = searchParams.get('category')?.toLowerCase();

  if (!location) {
    return NextResponse.json(
      { error: 'Location is required' },
      { status: 400 }
    );
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Get creators for the location
  let creators = SAMPLE_CREATORS[location] || [];

  // Filter by category if specified and not 'all'
  if (category && category !== 'all') {
    creators = creators.filter(creator => 
      creator.topics.some(topic => topic.toLowerCase().includes(category))
    );
  }

  // If no exact match found, generate some sample data
  if (creators.length === 0) {
    creators = [
      {
        handle: `creator_${location}`,
        name: `Creator from ${location}`,
        location: location,
        followers: `${Math.floor(Math.random() * 500)}K`,
        engagement: `${(Math.random() * 5).toFixed(1)}%`,
        bio: `Content creator based in ${location} sharing insights about life and culture.`,
        topics: ['Lifestyle', 'Culture', 'Entertainment']
      }
    ];
  }

  return NextResponse.json(creators);
}