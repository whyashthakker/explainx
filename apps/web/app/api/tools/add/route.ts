import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";
import { z } from "zod";

const toolSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  apiEndpoint: z.string().optional(),
  apiKey: z.string().optional(),
  parameters: z.record(z.any()).optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = toolSchema.parse(body);

    const tool = await prisma.tool.create({
      data: validatedData
    });

    return NextResponse.json(tool);

  } catch (error) {
    console.error("Error creating tool:", error);
    return NextResponse.json(
      { error: "Failed to create tool" },
      { status: 500 }
    );
  }
} 