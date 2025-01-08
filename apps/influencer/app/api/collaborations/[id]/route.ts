import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";
import { UserType } from "@prisma/client";

type Params = Promise<{ id: string }>;

async function checkCollaborationAccess(
  collaborationId: string,
  userId: string,
  userType: UserType,
) {
  const collaboration = await prisma.collaboration.findUnique({
    where: { id: collaborationId },
    include: {
      brand: {
        include: { user: true },
      },
      influencer: {
        include: { user: true },
      },
    },
  });

  if (!collaboration) return { error: "Collaboration not found", status: 404 };

  // Check if same user owns both brand and influencer
  if (collaboration.brand.user.id === collaboration.influencer.user.id) {
    return { error: "Invalid collaboration between own profiles", status: 403 };
  }

  const userBrand = await prisma.brand.findFirst({ where: { userId } });
  const userInfluencer = await prisma.influencer.findFirst({
    where: { userId },
  });

  const hasBrandAccess = userBrand && collaboration.brandId === userBrand.id;
  const hasInfluencerAccess =
    userInfluencer && collaboration.influencerId === userInfluencer.id;

  if (!hasBrandAccess && !hasInfluencerAccess) {
    return {
      error: "Not authorized to access this collaboration",
      status: 403,
    };
  }

  return {
    collaboration,
    isBrand: hasBrandAccess,
    isInfluencer: hasInfluencerAccess,
  };
}

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user?.userType) {
      return NextResponse.json(
        { error: "User not onboarded" },
        { status: 404 },
      );
    }

    const { id } = await params;
    const accessCheck = await checkCollaborationAccess(
      id,
      user.id,
      user.userType,
    );

    if ("error" in accessCheck) {
      return NextResponse.json(
        { error: accessCheck.error },
        { status: accessCheck.status },
      );
    }

    const collaboration = await prisma.collaboration.findUnique({
      where: { id },
      include: {
        brand: true,
        influencer: true,
        campaign: true,
        chatRoom: {
          include: {
            messages: {
              orderBy: { createdAt: "desc" },
              include: { sender: true, receiver: true },
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
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user?.userType) {
      return NextResponse.json(
        { error: "User not onboarded" },
        { status: 404 },
      );
    }

    const { id } = await params;
    const { status } = await req.json();

    if (!["ACCEPTED", "DECLINED", "COMPLETED", "CANCELLED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const accessCheck = await checkCollaborationAccess(
      id,
      user.id,
      user.userType,
    );
    if ("error" in accessCheck) {
      return NextResponse.json(
        { error: accessCheck.error },
        { status: accessCheck.status },
      );
    }

    // Check permissions based on user role and requested status
    const { isBrand, isInfluencer } = accessCheck;
    if (isInfluencer && !["ACCEPTED", "DECLINED"].includes(status)) {
      return NextResponse.json(
        { error: "Influencers can only accept or decline collaborations" },
        { status: 400 },
      );
    }

    if (isBrand && !["COMPLETED", "CANCELLED"].includes(status)) {
      return NextResponse.json(
        { error: "Brands can only complete or cancel collaborations" },
        { status: 400 },
      );
    }

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
