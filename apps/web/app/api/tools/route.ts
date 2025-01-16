import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tools = await prisma.tool.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        apiEndpoint: true,
        apiKey: true,
        parameters: true
      }
    });

    return NextResponse.json(tools);

  } catch (error) {
    console.error("Error fetching tools:", error);
    return NextResponse.json(
      { error: "Failed to fetch tools" },
      { status: 500 }
    );
  }
}
