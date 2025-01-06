// app/api/campaigns/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { z } from "zod";
import { auth } from "../../../auth";

const campaignSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  budget: z.number().positive(),
  requirements: z.array(z.string()).min(1),
  platforms: z.array(z.string()).min(1),
  startDate: z.string(),
  endDate: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the brand associated with the current user
    const brand = await prisma.brand.findFirst({
      where: { userId: session.user.id },
    });

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    // Validate request body
    const json = await request.json();
    const validatedData = campaignSchema.parse(json);

    // Create the campaign
    const campaign = await prisma.campaign.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        budget: validatedData.budget,
        requirements: validatedData.requirements,
        platforms: validatedData.platforms as any[], // Cast to match your Prisma schema
        status: "ACTIVE",
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        brandId: brand.id,
        createdById: session.user.id,
      },
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }

    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 },
    );
  }
}
