// app/api/proposals/applications/[id]/status/route.ts
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";

type Params = Promise<{ id: string }>;

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { status } = await request.json();

    const updatedApplication = await prisma.proposalApplication.update({
      where: { id: resolvedParams.id },
      data: { status },
    });

    return NextResponse.json(updatedApplication);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update application status" },
      { status: 500 },
    );
  }
}
