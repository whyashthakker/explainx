// app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { z } from "zod";
import { sendDiscordNotification } from "../../../lib/discord-notify";

const waitlistSchema = z.object({
  email: z.string().email(),
  userType: z.string().refine(val => val === "BRAND" || val === "INFLUENCER", {
    message: "User type must be either BRAND or INFLUENCER"
  }),
  intention: z.string().min(1)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = waitlistSchema.parse(body);

    sendDiscordNotification(
        `New waitlist entry: ${validatedData.email}, ${validatedData.userType}, ${validatedData.intention}`
    ).catch(console.error);

    // const entry = await prisma.waitlistEntry.create({
    //   data: {
    //     email: validatedData.email,
    //     userType: validatedData.userType as "BRAND" | "INFLUENCER",
    //     intention: validatedData.intention,
    //     status: "PENDING"
    //   },
    // });

    return NextResponse.json({ success: true, data: validatedData });
  } catch (error) {
    console.error("Waitlist entry error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to join waitlist", details: error },
      { status: 500 }
    );
  }
}