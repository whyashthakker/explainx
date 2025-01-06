// app/api/roadmap/route.ts
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { type NextRequest } from "next/server";
import { RoadmapItemStatus, RoadmapCategory } from "@repo/db";

// GET: Fetch all roadmap items
export async function GET() {
  try {
    const items = await prisma.roadmapItem.findMany({
      orderBy: [
        {
          votes: 'desc'
        },
        {
          createdAt: 'desc'
        }
      ]
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch roadmap items:", error);
    return NextResponse.json(
      { error: "Failed to fetch roadmap items" },
      { status: 500 }
    );
  }
}

// POST: Create new roadmap item (admin only)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.feature || !data.status || !data.category || !data.description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const item = await prisma.roadmapItem.create({
      data: {
        feature: data.feature,
        status: data.status as RoadmapItemStatus,
        category: data.category as RoadmapCategory,
        description: data.description,
        implementationDate: data.implementationDate ? new Date(data.implementationDate) : null
      }
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Failed to create roadmap item:", error);
    return NextResponse.json(
      { error: "Failed to create roadmap item" },
      { status: 500 }
    );
  }
}