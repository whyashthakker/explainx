import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const agents = await prisma.agent.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        role: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 