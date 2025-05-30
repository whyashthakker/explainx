import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@repo/db/client';
import { Prisma } from '@prisma/client';
import { sendDiscordNotification } from '../../../../lib/discord-notify';

const subscribeSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = subscribeSchema.parse(body);

    // Create newsletter subscriber in database
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: validatedData.email,
        subscriberType: 'RESOURCES', // Special type for resources subscribers
      },
    });

    // Send Discord notification
    await sendDiscordNotification(
      `🎉 New Resources Subscriber\nEmail: ${validatedData.email}\nSource: Newsletter page`
    );

    return NextResponse.json({ success: true, data: subscriber });
  } catch (error) {
    console.error('Resources subscription error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    // Handle unique constraint violation
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to subscribe', details: String(error) },
      { status: 500 }
    );
  }
} 