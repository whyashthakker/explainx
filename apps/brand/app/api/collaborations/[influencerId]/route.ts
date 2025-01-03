import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";

type RouteParams = Promise<{ influencerId: string }>;
type RouteContext = {
  params: RouteParams;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    // Authenticate user
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get params
    const params = await context.params;
    const { influencerId } = params;

    // Get user with their brands and verify they're using the brand portal
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        brands: true,
      },
    });

    // Check if user exists and has permission to access brand portal
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.userType !== "BRAND" && user.userType !== "BOTH") {
      return NextResponse.json(
        { error: "Not authorized to access brand portal" },
        { status: 403 },
      );
    }

    if (user.activePortal !== "BRAND") {
      return NextResponse.json(
        { error: "Please switch to brand portal" },
        { status: 403 },
      );
    }

    // Get all brands for this user
    const userBrands = user.brands;
    if (!userBrands.length) {
      return NextResponse.json(
        { error: "No brand profiles found" },
        { status: 404 },
      );
    }

    // Fetch collaborations for all brands owned by the user
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
