import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";

type Params = Promise<{ id: string }>;

// Helper function to check if user has access to collaboration
async function checkCollaborationAccess(
  collaborationId: string,
  userId: string,
  activePortal: "BRAND" | "INFLUENCER",
) {
  const collaboration = await prisma.collaboration.findUnique({
    where: { id: collaborationId },
    include: {
      brand: true,
      influencer: true,
    },
  });

  if (!collaboration) {
    return { error: "Collaboration not found", status: 404 };
  }

  // Check if user has access based on active portal
  if (activePortal === "BRAND") {
    const userBrand = await prisma.brand.findFirst({
      where: { userId },
    });
    if (!userBrand || collaboration.brandId !== userBrand.id) {
      return {
        error: "Not authorized to access this collaboration",
        status: 403,
      };
    }
  } else {
    const userInfluencer = await prisma.influencer.findFirst({
      where: { userId },
    });
    if (!userInfluencer || collaboration.influencerId !== userInfluencer.id) {
      return {
        error: "Not authorized to access this collaboration",
        status: 403,
      };
    }
  }

  return { collaboration };
}

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get user with portal info
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.activePortal) {
      return NextResponse.json(
        { error: "No active portal selected" },
        { status: 400 },
      );
    }

    // Verify user has access to current portal
    if (
      user.activePortal === "BRAND" &&
      user.userType !== "BRAND" &&
      user.userType !== "BOTH"
    ) {
      return NextResponse.json(
        { error: "Not authorized for brand portal" },
        { status: 403 },
      );
    }

    if (
      user.activePortal === "INFLUENCER" &&
      user.userType !== "INFLUENCER" &&
      user.userType !== "BOTH"
    ) {
      return NextResponse.json(
        { error: "Not authorized for influencer portal" },
        { status: 403 },
      );
    }

    // Check access and get collaboration
    const accessCheck = await checkCollaborationAccess(
      id,
      user.id,
      user.activePortal,
    );
    if ("error" in accessCheck) {
      return NextResponse.json(
        { error: accessCheck.error },
        { status: accessCheck.status },
      );
    }

    // Get full collaboration details
    const collaboration = await prisma.collaboration.findUnique({
      where: { id },
      include: {
        brand: true,
        influencer: true,
        campaign: true,
        chatRoom: {
          include: {
            messages: {
              orderBy: {
                createdAt: "desc",
              },
              include: {
                sender: true,
                receiver: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(collaboration);
  } catch (error) {
    console.error("Error fetching collaboration:", error);
    return NextResponse.json(
      { error: "Failed to fetch collaboration" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { status } = body;

    if (!["ACCEPTED", "DECLINED", "COMPLETED", "CANCELLED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Get user with portal info
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.activePortal) {
      return NextResponse.json(
        { error: "No active portal selected" },
        { status: 400 },
      );
    }

    // Verify user has access to current portal
    if (
      user.activePortal === "BRAND" &&
      user.userType !== "BRAND" &&
      user.userType !== "BOTH"
    ) {
      return NextResponse.json(
        { error: "Not authorized for brand portal" },
        { status: 403 },
      );
    }

    if (
      user.activePortal === "INFLUENCER" &&
      user.userType !== "INFLUENCER" &&
      user.userType !== "BOTH"
    ) {
      return NextResponse.json(
        { error: "Not authorized for influencer portal" },
        { status: 403 },
      );
    }

    // Check access and get collaboration
    const accessCheck = await checkCollaborationAccess(
      id,
      user.id,
      user.activePortal,
    );
    if ("error" in accessCheck) {
      return NextResponse.json(
        { error: accessCheck.error },
        { status: accessCheck.status },
      );
    }

    // Handle status updates based on portal
    if (
      user.activePortal === "INFLUENCER" &&
      !["ACCEPTED", "DECLINED"].includes(status)
    ) {
      return NextResponse.json(
        { error: "Influencers can only accept or decline collaborations" },
        { status: 400 },
      );
    }

    if (
      user.activePortal === "BRAND" &&
      !["COMPLETED", "CANCELLED"].includes(status)
    ) {
      return NextResponse.json(
        { error: "Brands can only complete or cancel collaborations" },
        { status: 400 },
      );
    }

    // Update collaboration
    const updatedCollaboration = await prisma.collaboration.update({
      where: { id },
      data: { status },
      include: {
        brand: true,
        influencer: true,
        campaign: true,
      },
    });

    return NextResponse.json(updatedCollaboration);
  } catch (error) {
    console.error("Error updating collaboration:", error);
    return NextResponse.json(
      { error: "Failed to update collaboration" },
      { status: 500 },
    );
  }
}
