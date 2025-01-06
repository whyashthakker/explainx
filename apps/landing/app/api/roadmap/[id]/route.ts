// app/api/roadmap/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { type NextRequest } from "next/server";

// PUT: Update roadmap item
export async function PUT(
  request: NextRequest,
  segmentData: { params: Promise<{ id: string }> }
) {
  try {
    const params = await segmentData.params;
    const data = await request.json();
    const { id } = params;

    const updatedItem = await prisma.roadmapItem.update({
      where: { id },
      data: {
        ...data,
        implementationDate: data.implementationDate ? new Date(data.implementationDate) : null
      }
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Failed to update roadmap item:", error);
    return NextResponse.json(
      { error: "Failed to update roadmap item" },
      { status: 500 }
    );
  }
}

// DELETE: Delete roadmap item
export async function DELETE(
  _request: NextRequest,
  segmentData: { params: Promise<{ id: string }> }
) {
  try {
    const params = await segmentData.params;
    const { id } = params;
    
    await prisma.roadmapItem.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete roadmap item:", error);
    return NextResponse.json(
      { error: "Failed to delete roadmap item" },
      { status: 500 }
    );
  }
}