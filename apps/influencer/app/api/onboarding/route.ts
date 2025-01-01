// app/api/onboarding/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";
import { z } from "zod";
import { Platform } from "../../../lib/types";

const profileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().min(10),
  category: z.string().min(1),
  platforms: z.array(z.nativeEnum(Platform)),
});

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = profileSchema.parse(body);
    console.log(session);

    // Get existing user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { influencer: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create or update influencer profile
    const influencer = await prisma.influencer.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        name: validatedData.name,
        bio: validatedData.bio,
        category: validatedData.category,
        platforms: validatedData.platforms,
        followers: 0, // This will be updated when social accounts are connected
      },
      update: {
        name: validatedData.name,
        bio: validatedData.bio,
        category: validatedData.category,
        platforms: validatedData.platforms,
      },
    });

    // Update user type if not already set
    if (!user.userType || !user.name) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name: validatedData.name, userType: "INFLUENCER" },
      });
    }

    return NextResponse.json({ success: true, data: influencer });
  } catch (error) {
    console.error("Profile creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 },
    );
  }
}
