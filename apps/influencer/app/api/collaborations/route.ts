// app/api/collaborations/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
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

    const collaborations = await prisma.collaboration.findMany({
      where: {
        influencerId: user.influencer.id,
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
  } catch (error) {
    console.error("Error fetching collaborations:", error);
    return NextResponse.json(
      { error: "Failed to fetch collaborations" },
      { status: 500 },
    );
  }
}
