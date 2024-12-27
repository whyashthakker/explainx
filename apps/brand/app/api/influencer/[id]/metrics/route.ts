// app/api/influencer/[id]/metrics/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { type NextRequest } from 'next/server';

const metricsResponse = z.object({
  metrics: z.object({
    avgViews: z.number(),
    totalViews: z.number(),
    subscriberGrowth: z.number(),
    viewGrowth: z.number(),
    engagement: z.string()
  }),
  analytics: z.array(z.object({
    date: z.string(),
    subscriberCount: z.number(),
    viewCount: z.number()
  }))
});

export type MetricsResponse = z.infer<typeof metricsResponse>;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Get params safely
    const { id } = await context.params;

    // TODO: Replace with actual database query using the id
    const metrics = {
      avgViews: 150000,
      totalViews: 1500000,
      subscriberGrowth: 12.5,
      viewGrowth: 15.2,
      engagement: "8.3"
    };

    // Generate some sample analytics data
    const analytics = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      
      return {
        date: date.toISOString(),
        subscriberCount: 10000 + (i * 100) + Math.floor(Math.random() * 200),
        viewCount: 150000 + (i * 1000) + Math.floor(Math.random() * 2000)
      };
    });

    const response = { metrics, analytics };
    const parsed = metricsResponse.parse(response);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Error fetching influencer metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch influencer metrics' },
      { status: 500 }
    );
  }
}