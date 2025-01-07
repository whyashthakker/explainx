// app/api/collaborations/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";
import { z } from "zod";
import { Platform } from "../../../lib/types";
import { type NextRequest } from "next/server";

const collaborationSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  budget: z.number().min(1),
  platforms: z.array(z.nativeEnum(Platform)).min(1),
  requirements: z.string().min(10),
  influencerId: z.string(),
  brandId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const data = await request.json();
    const validatedData = collaborationSchema.parse(data);

    // Get user and verify brand access
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { brands: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify user has brand access and is in brand portal
    if (user.userType !== "BRAND" && user.userType !== "BOTH") {
      return NextResponse.json(
        { error: "Not authorized to access brand portal" },
        { status: 403 },
      );
    }

    // Check if the brandId belongs to the user
    const userBrand = user.brands.find(
      (brand) => brand.id === validatedData.brandId,
    );
    if (!userBrand) {
      return NextResponse.json(
        { error: "Unauthorized or brand not found" },
        { status: 403 },
      );
    }

    // Create campaign
    const campaign = await prisma.campaign.create({
      data: {
        brandId: validatedData.brandId,
        createdById: user.id,
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

    // Create chat room
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
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Failed to create collaboration" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get user with brands
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { brands: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify user has brand access and is in brand portal
    if (user.userType !== "BRAND" && user.userType !== "BOTH") {
      return NextResponse.json(
        { error: "Not authorized to access brand portal" },
        { status: 403 },
      );
    }

    if (!user.brands.length) {
      return NextResponse.json(
        { error: "No brand profiles found" },
        { status: 404 },
      );
    }

    // Get all brand IDs for the user
    const brandIds = user.brands.map((brand) => brand.id);

    // Fetch collaborations for all user's brands
    const collaborations = await prisma.collaboration.findMany({
      where: {
        brandId: { in: brandIds },
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
      { status: 500 },
    );
  }
}
