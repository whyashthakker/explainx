// app/api/collaborations/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";

type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const collaboration = await prisma.collaboration.findUnique({
      where: {
        id: id,
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
              include: {
                sender: true,
                receiver: true,
              },
            },
          },
        },
      },
    });

    if (!collaboration) {
      return NextResponse.json(
        { error: "Collaboration not found" },
        { status: 404 },
      );
    }

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

    if (!["ACCEPTED", "DECLINED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { influencer: true },
    });

    if (!user?.influencer) {
      return NextResponse.json(
        { error: "Influencer profile not found" },
        { status: 404 },
      );
    }

    const collaboration = await prisma.collaboration.findUnique({
      where: { id: id },
    });

    if (!collaboration) {
      return NextResponse.json(
        { error: "Collaboration not found" },
        { status: 404 },
      );
    }

    if (collaboration.influencerId !== user.influencer.id) {
      return NextResponse.json(
        { error: "Not authorized to update this collaboration" },
        { status: 403 },
      );
    }

    const updatedCollaboration = await prisma.collaboration.update({
      where: { id: id },
      data: { status },
      include: {
        brand: true,
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
