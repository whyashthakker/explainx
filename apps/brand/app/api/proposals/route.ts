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

    const json = await request.json();
    const validatedData = proposalFormSchema.parse(json);

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { influencers: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const brand = await prisma.brand.findFirst({
      where: { userId: session.user.id },
    });

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

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

    // Prevent creating proposals for own influencer profiles
    const proposal = await prisma.campaignProposal.create({
      data: {
        ...validatedData,
        status: "OPEN",
      },
      include: {
        applications: {
          where: {
            influencerId: {
              notIn: user.influencers.map((inf) => inf.id),
            },
          },
        },
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

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { influencers: true },
    });

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
        applications: {
          where: {
            influencerId: {
              notIn: user?.influencers.map((inf) => inf.id) || [],
            },
          },
        },
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
