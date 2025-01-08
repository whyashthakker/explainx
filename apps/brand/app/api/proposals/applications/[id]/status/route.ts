// app/api/proposals/applications/[id]/status/route.ts
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { auth } from "../../../../../../auth";

type Params = Promise<{ id: string }>;

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const resolvedParams = await params;
    const { status } = await request.json();

    // Get the application with related data
    const application = await prisma.proposalApplication.findUnique({
      where: { id: resolvedParams.id },
      include: {
        proposal: {
          include: {
            campaign: {
              include: {
                brand: true,
              },
            },
          },
        },
        influencer: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    // Check if user owns the brand
    const isBrandOwner =
      application.proposal.campaign.brand.userId === session.user.id;

    // Check if user owns the influencer profile
    const isInfluencerOwner = application.influencer.userId === session.user.id;

    // Prevent self-interaction
    if (isBrandOwner && isInfluencerOwner) {
      return NextResponse.json(
        {
          error: "Cannot update application status for own influencer profile",
        },
        { status: 400 },
      );
    }

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
