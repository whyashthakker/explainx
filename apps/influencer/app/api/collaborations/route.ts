import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get user with current portal state
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        influencers: true,
        brands: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify user has access to the current portal
    if (user.activePortal === "INFLUENCER") {
      if (user.userType !== "INFLUENCER" && user.userType !== "BOTH") {
        return NextResponse.json(
          { error: "Not authorized for influencer portal" },
          { status: 403 },
        );
      }

      // Get active influencer profile
      const activeInfluencer = await prisma.influencer.findFirst({
        where: { userId: user.id },
      });

      if (!activeInfluencer) {
        return NextResponse.json(
          { error: "Influencer profile not found" },
          { status: 404 },
        );
      }

      // Get influencer collaborations
      const collaborations = await prisma.collaboration.findMany({
        where: {
          influencerId: activeInfluencer.id,
        },
        include: {
          brand: true,
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
    } else if (user.activePortal === "BRAND") {
      if (user.userType !== "BRAND" && user.userType !== "BOTH") {
        return NextResponse.json(
          { error: "Not authorized for brand portal" },
          { status: 403 },
        );
      }

      // Get active brand profile
      const activeBrand = await prisma.brand.findFirst({
        where: { userId: user.id },
      });

      if (!activeBrand) {
        return NextResponse.json(
          { error: "Brand profile not found" },
          { status: 404 },
        );
      }

      // Get brand collaborations
      const collaborations = await prisma.collaboration.findMany({
        where: {
          brandId: activeBrand.id,
        },
        include: {
          influencer: true,
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
    } else {
      return NextResponse.json(
        { error: "Invalid portal selection" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error fetching collaborations:", error);
    return NextResponse.json(
      { error: "Failed to fetch collaborations" },
      { status: 500 },
    );
  }
}
