// app/api/brand/onboarding/route.ts
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { auth } from "../../../auth";

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const data = await req.json();

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: req.auth.user?.email },
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
        targetDemographic: data.targetDemographic,
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
});