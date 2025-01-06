// app/api/roadmap/vote/route.ts
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { itemId } = await request.json();

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    // Simply increment the votes counter
    const updatedItem = await prisma.roadmapItem.update({
      where: { id: itemId },
      data: {
        votes: {
          increment: 1
        }
      }
    });

    return NextResponse.json({ success: true, updatedItem });
  } catch (error) {
    console.error("Failed to vote for roadmap item:", error);
    return NextResponse.json(
      { error: "Failed to vote for roadmap item" },
      { status: 500 }
    );
  }
}