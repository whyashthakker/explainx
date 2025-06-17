import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@repo/db/client";
import { Prisma } from "@prisma/client";

const waitlistSchema = z.object({
  email: z.string().email(),
  subscriberType: z.string().refine(val => val === "ENTHUSIAST" || val === "DEVELOPER" || val === "BUSINESS", {
    message: "User type must be either DEVELOPER or ENTHUSIAST OR BUSINESS"
  }).optional(),
  referralUrl: z.string().url().optional(),
  referralCode: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  routePath: z.string().optional(),
});

// Beehiiv API configuration
const BEEHIIV_API_URL = 'https://api.beehiiv.com/v2';
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

async function subscribeToBeehiiv(data: {
  email: string;
  subscriberType?: string;
  referralUrl?: string;
  referralCode?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  routePath?: string;
}) {
  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
    throw new Error('Beehiiv API configuration missing');
  }

  const beehiivPayload = {
    email: data.email,
    reactivate_existing: false,
    send_welcome_email: true,
    utm_source: data.utmSource || 'explainx_website',
    utm_medium: data.utmMedium || 'newsletter_signup',
    utm_campaign: data.utmCampaign || 'ai_newsletter',
    referring_site: data.referralUrl || (data.routePath ? `https://explainx.ai${data.routePath}` : 'https://explainx.ai'),
    ...(data.referralCode && { referral_code: data.referralCode }),
    custom_fields: data.subscriberType ? [
      {
        name: "Subscriber Type",
        value: data.subscriberType
      }
    ] : []
  };

  const response = await fetch(`${BEEHIIV_API_URL}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(beehiivPayload),
  });

  if (!response.ok) {
    let errorData = null;
    try {
      errorData = await response.json();
    } catch (parseError) {
      const responseText = await response.text().catch(() => 'Unable to read response text');
      throw new Error(`Beehiiv API error: ${response.status} - ${responseText}`);
    }
    throw new Error(errorData?.message || `Beehiiv API error: ${response.status}`);
  }

  return await response.json();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = waitlistSchema.parse(body);

    let subscriber = null;
    let isExistingSubscriber = false;

    // Try to create newsletter subscriber in database
    try {
      subscriber = await prisma.newsletterSubscriber.create({
        data: {
          email: validatedData.email,
          subscriberType: validatedData.subscriberType || 'ENTHUSIAST',
        },
      });
    } catch (dbError) {
      // Handle unique constraint violation (duplicate email)
      if (dbError instanceof Prisma.PrismaClientKnownRequestError && dbError.code === 'P2002') {
        // Email already exists in our database, fetch the existing record
        subscriber = await prisma.newsletterSubscriber.findUnique({
          where: { email: validatedData.email }
        });
        isExistingSubscriber = true;
      } else {
        throw dbError; // Re-throw if it's a different database error
      }
    }

    // Always try to subscribe to beehiiv (beehiiv handles duplicates gracefully)
    let beehiivResponse = null;
    try {
      beehiivResponse = await subscribeToBeehiiv({
        email: validatedData.email,
        subscriberType: validatedData.subscriberType,
        referralUrl: validatedData.referralUrl,
        referralCode: validatedData.referralCode,
        utmSource: validatedData.utmSource,
        utmMedium: validatedData.utmMedium,
        utmCampaign: validatedData.utmCampaign,
        routePath: validatedData.routePath,
      });
    } catch (beehiivError) {
      // Don't fail the entire request if beehiiv fails, but log it
      console.error('Beehiiv subscription failed:', beehiivError instanceof Error ? beehiivError.message : String(beehiivError));
    }

    return NextResponse.json({ 
      success: true, 
      data: subscriber,
      beehiivId: beehiivResponse?.data?.id,
      message: isExistingSubscriber 
        ? 'Email already subscribed, but we\'ve updated your preferences!' 
        : 'Successfully subscribed to our newsletter!'
    });
  } catch (error) {
    console.error("Newsletter entry error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to join newsletter", details: String(error) },
      { status: 500 }
    );
  }
}