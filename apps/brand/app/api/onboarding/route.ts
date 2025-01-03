// app/api/brand/onboarding/route.ts
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { auth } from "../../../auth";
import { type NextRequest } from "next/server";
import { Platform, UserType, ActivePortal } from "@prisma/client";

interface BrandOnboardingData {
  name: string;
  logo?: string;
  website?: string;
  industry: string;
  description?: string;
  targetDemographic: string;
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

    const data = (await request.json()) as BrandOnboardingData;

    // Input validation
    if (!data.name || !data.industry || !data.targetDemographic) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate arrays are not empty
    if (!data.preferredCategories.length || !data.preferredPlatforms.length) {
      return NextResponse.json(
        { error: "Categories and platforms cannot be empty" },
        { status: 400 },
      );
    }

    // Get user
    const email = session.user?.email;
    if (!email) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        brands: true,
        influencers: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Clean up optional fields
    const cleanData = {
      userId: user.id,
      name: data.name,
      logo: data.logo || null,
      website: data.website || null,
      industry: data.industry,
      description: data.description || null,
      targetDemographic: data.targetDemographic,
      preferredCategories: data.preferredCategories,
      minFollowers: data.minFollowers,
      maxBudget: data.maxBudget,
      preferredPlatforms: data.preferredPlatforms,
    };

    // Create brand profile
    const brand = await prisma.brand.create({
      data: cleanData,
    });

    // Create brand team automatically
    await prisma.brandTeam.create({
      data: {
        brandId: brand.id,
        members: {
          create: {
            userId: user.id,
            role: "OWNER",
            inviteStatus: "ACCEPTED",
          },
        },
      },
    });

    // Determine user type based on existing profiles
    const hasInfluencer = user.influencers.length > 0;
    const userType = hasInfluencer ? UserType.BOTH : UserType.BRAND;

    // Generate name from email if needed
    const nameFromEmail = email
      ? //@ts-ignore
        email
          .split("@")[0]
          .split(/[._-]/)
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" ")
      : null;

    // Update user type and name if necessary
    await prisma.user.update({
      where: { id: user.id },
      data: {
        userType,
        activePortal: ActivePortal.BRAND,
        // Only update name if it's not already set and we have a valid email-based name
        ...(!user.name || (user.name.trim() === "" && nameFromEmail)
          ? { name: nameFromEmail }
          : {}),
      },
    });

    return NextResponse.json({
      success: true,
      brand,
      message: "Brand profile created successfully",
    });
  } catch (error) {
    console.error("Brand onboarding error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Failed to complete brand onboarding" },
      { status: 500 },
    );
  }
}
