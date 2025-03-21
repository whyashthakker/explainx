import { NextResponse } from "next/server";
import { z } from "zod";
import { sendDiscordNotification } from "../../../lib/discord-notify";
import prisma from "@repo/db/client";
import { Prisma } from "@prisma/client";

const waitlistSchema = z.object({
  email: z.string().email(),
  subscriberType: z.string().refine(val => val === "ENTHUSIAST" || val === "DEVELOPER" || val === "BUSINESS", {
    message: "User type must be either DEVELOPER or ENTHU OR BUSINESS"
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = waitlistSchema.parse(body);

    // Create newsletter subscriber in database
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: validatedData.email,
        subscriberType: validatedData.subscriberType,
      },
    });

    // Send Discord notification
    sendDiscordNotification(
        `New waitlist entry: ${validatedData.email}, ${validatedData.subscriberType}`
    ).catch(console.error);

    return NextResponse.json({ success: true, data: subscriber });
  } catch (error) {
    console.error("Newsletter entry error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    // Handle unique constraint violation
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json(
        { error: "Email already subscribed to newsletter" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to join waitlist", details: String(error) },
      { status: 500 }
    );
  }
}