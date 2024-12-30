// app/api/collaborations/[influencerId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { influencerId: string } },
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { brand: true },
    });

    if (!user?.brand) {
      return NextResponse.json(
        { error: "Brand profile not found" },
        { status: 404 },
      );
    }

    const collaborations = await prisma.collaboration.findMany({
      where: {
        AND: [
          { brandId: user.brand.id },
          { influencerId: params.influencerId },
        ],
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
