// app/api/onboarding/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";
import type { CreateInfluencerInput } from "../../../lib/types/";

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const data: CreateInfluencerInput = await req.json();

    // Validate required fields
    if (
      !data.name ||
      !data.category ||
      !data.followers ||
      !data.platforms?.length
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: req.auth.user?.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if influencer profile already exists
    const existingInfluencer = await prisma.influencer.findUnique({
      where: { userId: user.id },
    });

    if (existingInfluencer) {
      return NextResponse.json(
        { error: "Influencer profile already exists" },
        { status: 400 },
      );
    }

    // Create influencer profile
    const influencer = await prisma.influencer.create({
      data: {
        userId: user.id,
        name: data.name,
        avatar: data.avatar,
        bio: data.bio,
        category: data.category,
        followers: data.followers,
        platforms: data.platforms,
      },
    });

    // Update user type
    await prisma.user.update({
      where: { id: user.id },
      data: {
        userType: "INFLUENCER",
      },
    });

    return NextResponse.json({
      success: true,
      influencer,
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to complete onboarding" },
      { status: 500 },
    );
  }
});

export const GET = auth(async function GET(req) {
  try {
    if (!req.auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: req.auth.user?.email },
      include: {
        influencer: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      hasProfile: !!user.influencer,
      profile: user.influencer,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
});
