// app/api/brand/onboarding/route.ts
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { auth } from "../../../auth";
import { type NextRequest } from "next/server";
import { Platform } from "../../types";

interface BrandOnboardingData {
  name: string;
  logo: string;
  website: string;
  industry: string;
  description: string;
  targetDemographic: string[];
  preferredCategories: string[];
  minFollowers: number;
  maxBudget: number;
  preferredPlatforms: Platform[];
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const data = await request.json() as BrandOnboardingData;

    // Get user
    const email = session.user?.email;
    if (!email) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if brand profile already exists
    const existingBrand = await prisma.brand.findUnique({
      where: { userId: user.id },
    });

    if (existingBrand) {
      return NextResponse.json(
        { error: "Brand profile already exists" },
        { status: 400 },
      );
    }

    // Create brand profile
    const brand = await prisma.brand.create({
      data: {
        userId: user.id,
        name: data.name,
        logo: data.logo,
        website: data.website,
        industry: data.industry,
        description: data.description,
        preferredCategories: data.preferredCategories,
        minFollowers: data.minFollowers,
        maxBudget: data.maxBudget,
        preferredPlatforms: data.preferredPlatforms,
      },
    });

    // Update user type
    await prisma.user.update({
      where: { id: user.id },
      data: {
        userType: "BRAND",
      },
    });

    return NextResponse.json({ success: true, brand });
  } catch (error) {
    console.error("Brand onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to complete brand onboarding" },
      { status: 500 },
    );
  }
}