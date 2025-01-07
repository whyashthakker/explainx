// app/api/proposals/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { proposalFormSchema } from "../../../lib/schema";
import { z } from "zod";
import { auth } from "../../../auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate request body
    const json = await request.json();
    const validatedData = proposalFormSchema.parse(json);

    // Get the brand associated with the current user
    const brand = await prisma.brand.findFirst({
      where: { userId: session.user.id },
    });

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    // Verify the campaign belongs to this brand
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: validatedData.campaignId,
        brandId: brand.id,
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 },
      );
    }

    // Create the proposal with validated data
    const proposal = await prisma.campaignProposal.create({
      data: {
        ...validatedData,
        status: "OPEN",
      },
      include: {
        applications: true,
      },
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }

    console.error("Error creating proposal:", error);
    return NextResponse.json(
      { error: "Failed to create proposal" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const brand = await prisma.brand.findFirst({
      where: { userId: session.user.id },
    });

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    const proposals = await prisma.campaignProposal.findMany({
      where: {
        campaign: {
          brandId: brand.id,
        },
      },
      include: {
        applications: true,
      },
    });

    return NextResponse.json(proposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    return NextResponse.json(
      { error: "Failed to fetch proposals" },
      { status: 500 },
    );
  }
}
