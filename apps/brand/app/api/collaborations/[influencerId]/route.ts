//app/api/collaborations/[influencerId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";

type RouteParams = Promise<{ influencerId: string }>;
type RouteContext = {
  params: RouteParams;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const params = await context.params;
    const { influencerId } = params;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        brands: true,
        influencers: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.userType !== "BRAND" && user.userType !== "BOTH") {
      return NextResponse.json(
        { error: "Not authorized to access brand portal" },
        { status: 403 },
      );
    }

    // Check if trying to view collaborations with own influencer profile
    const isOwnInfluencer = user.influencers.some(
      (inf) => inf.id === influencerId,
    );
    if (isOwnInfluencer) {
      return NextResponse.json(
        {
          error: "Cannot view collaborations with your own influencer profile",
        },
        { status: 400 },
      );
    }

    const userBrands = user.brands;
    if (!userBrands.length) {
      return NextResponse.json(
        { error: "No brand profiles found" },
        { status: 404 },
      );
    }

    const brandIds = userBrands.map((brand) => brand.id);
    const collaborations = await prisma.collaboration.findMany({
      where: {
        AND: [{ brandId: { in: brandIds } }, { influencerId }],
      },
      include: {
        campaign: true,
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
