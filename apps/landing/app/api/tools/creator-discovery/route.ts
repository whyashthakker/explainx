// app/api/tools/creator-discovery/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface Creator {
  username: string;
  fullName: string;
  bio: string;
  location: string;
  followers: string;
  engagement: string;
  categories: string[];
  averageLikes: string;
  postsPerWeek: string;
  audienceLocation: string;
  primaryLanguage: string;
}

const SAMPLE_CREATORS: { [key: string]: Creator[] } = {
  'new york': [
    {
      username: 'nycfoodie',
      fullName: 'NYC Food Guide',
      bio: 'Exploring the best restaurants and hidden gems in New York City 🗽 Food blogger & photographer',
      location: 'New York, NY',
      followers: '125K',
      engagement: '4.8%',
      categories: ['Food & Dining', 'Lifestyle', 'Photography'],
      averageLikes: '6,200',
      postsPerWeek: '5.2',
      audienceLocation: '85% New York Metro Area',
      primaryLanguage: 'English'
    },
    {
      username: 'urbanexplorernyc',
      fullName: 'Sarah Mitchell',
      bio: 'NYC lifestyle | Street photography | Local events 📸 Sharing the real New York experience',
      location: 'Brooklyn, NY',
      followers: '89K',
      engagement: '5.2%',
      categories: ['Lifestyle', 'Photography', 'Travel'],
      averageLikes: '4,800',
      postsPerWeek: '4.8',
      audienceLocation: '78% New York Metro Area',
      primaryLanguage: 'English'
    }
  ],
  'london': [
    {
      username: 'londonfoodscene',
      fullName: 'London Food Scene',
      bio: 'Discovering London\'s finest restaurants and street food \u{1F37D} Food critic & cultural explorer',
      location: 'London, UK',
      followers: '95K',
      engagement: '4.5%',
      categories: ['Food & Dining', 'Lifestyle', 'Culture'],
      averageLikes: '4,300',
      postsPerWeek: '4.5',
      audienceLocation: '82% Greater London',
      primaryLanguage: 'English'
    }
  ]
};

const CATEGORIES = [
  'Fashion', 'Beauty', 'Lifestyle', 'Travel', 'Food & Dining', 
  'Fitness', 'Photography', 'Art', 'Technology', 'Business', 
  'Entertainment', 'Education', 'Culture', 'Sports', 'Wellness'
];

function generateRandomCreator(location: string): Creator {
  const randomNumber = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1) + min);
  
  const randomCategories = CATEGORIES
    .sort(() => 0.5 - Math.random())
    .slice(0, randomNumber(2, 4));

  const followers = randomNumber(5, 500);
  const followersStr = followers > 100 ? 
    `${(followers/100).toFixed(1)}M` : 
    `${followers}K`;

  return {
    username: `creator_${Math.random().toString(36).substring(7)}`,
    fullName: `Local Creator ${Math.random().toString(36).substring(7)}`,
    bio: `Creating authentic content in ${location}. Sharing local insights and lifestyle tips.`,
    location: location,
    followers: followersStr,
    engagement: `${(Math.random() * 5 + 2).toFixed(1)}%`,
    categories: randomCategories,
    averageLikes: `${randomNumber(1, 50)}K`,
    postsPerWeek: `${(Math.random() * 7 + 1).toFixed(1)}`,
    audienceLocation: `${randomNumber(70, 90)}% ${location} Area`,
    primaryLanguage: 'English'
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const location = searchParams.get('location')?.toLowerCase();

  if (!location) {
    return NextResponse.json(
      { error: 'Location is required' },
      { status: 400 }
    );
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Get sample creators or generate random ones
  let creators = SAMPLE_CREATORS[location] || Array(6)
    .fill(null)
    .map(() => generateRandomCreator(location));

  return NextResponse.json({ creators });
}