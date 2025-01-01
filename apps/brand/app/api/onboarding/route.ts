// app/api/brand/onboarding/route.ts
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { auth } from "../../../auth";
import { type NextRequest } from "next/server";
import { Platform } from "../../../lib/types";

interface BrandOnboardingData {
  name: string;
  logo?: string;
  website?: string;
  industry: string;
  description?: string;
  targetDemographic: string; // Changed from string[] to string to match form
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

    // Clean up optional fields
    const cleanData = {
      userId: user.id,
      name: data.name,
      logo: data.logo || "", // Handle optional fields
      website: data.website || "",
      industry: data.industry,
      description: data.description || "",
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

    // Update user type
    if (user && user.email) {
      // Check if user exists and has email
      //@ts-ignore
      const nameFromEmail = user.email
        .split("@")[0]
        .split(/[._-]/)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");

      await prisma.user.update({
        where: { id: user.id },
        data: {
          name: nameFromEmail,
          userType: "BRAND",
        },
      });
    } else {
      // Handle the case where user is undefined
      console.error("User not found or email missing");
      // You might want to throw an error or handle this case differently
      throw new Error("Failed to update user: User not found");
    }

    return NextResponse.json({
      success: true,
      brand,
      message: "Brand profile created successfully",
    });
  } catch (error) {
    console.error("Brand onboarding error:", error);

    // Better error handling
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Failed to complete brand onboarding" },
      { status: 500 },
    );
  }
}
