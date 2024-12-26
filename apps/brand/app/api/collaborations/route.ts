// app/api/collaborations/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";
import { z } from "zod";
import { Platform } from "../../../lib/types";

const collaborationSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  budget: z.number().min(1),
  platforms: z.array(z.nativeEnum(Platform)).min(1),
  requirements: z.string().min(10),
  influencerId: z.string(),
  brandId: z.string(),
});

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const data = await req.json();
    const validatedData = collaborationSchema.parse(data);

    // Check if brand exists and user has access
    const brand = await prisma.brand.findUnique({
      where: { id: validatedData.brandId },
      include: { user: true },
    });

    if (!brand || brand.user.email !== req.auth.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized or brand not found" },
        { status: 403 }
      );
    }

    // Create campaign
    const campaign = await prisma.campaign.create({
      data: {
        brandId: validatedData.brandId,
        createdById: brand.userId,
        title: validatedData.title,
        description: validatedData.description,
        budget: validatedData.budget,
        requirements: [validatedData.requirements],
        platforms: validatedData.platforms,
        status: "ACTIVE",
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    });

    // Create collaboration
    const collaboration = await prisma.collaboration.create({
      data: {
        campaignId: campaign.id,
        brandId: validatedData.brandId,
        influencerId: validatedData.influencerId,
        status: "PENDING",
        terms: validatedData.description,
        deliverables: [validatedData.requirements],
        compensation: validatedData.budget,
      },
    });

    // Create chat room for the collaboration
    const chatRoom = await prisma.chatRoom.create({
      data: {
        collaborationId: collaboration.id,
      },
    });

    return NextResponse.json({
      success: true,
      collaboration,
      campaign,
      chatRoom,
    });
  } catch (error) {
    console.error("Collaboration creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data provided", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create collaboration" },
      { status: 500 }
    );
  }
});

export const GET = auth(async function GET(req) {
  try {
    if (!req.auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get user's brand
    const user = await prisma.user.findUnique({
      where: { email: req.auth.user?.email },
      include: { brand: true },
    });

    if (!user?.brand) {
      return NextResponse.json(
        { error: "Brand profile not found" },
        { status: 404 }
      );
    }

    // Fetch collaborations for the brand
    const collaborations = await prisma.collaboration.findMany({
      where: {
        brandId: user.brand.id,
      },
      include: {
        campaign: true,
        influencer: {
          include: {
            user: {
              select: {
                email: true,
                image: true,
              },
            },
          },
        },
        chatRoom: {
          include: {
            messages: {
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(collaborations);
  } catch (error) {
    console.error("Error fetching collaborations:", error);
    return NextResponse.json(
      { error: "Failed to fetch collaborations" },
      { status: 500 }
    );
  }
});