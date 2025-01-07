// app/api/proposals/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { auth } from "../../../../auth";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const session = await auth();
    const proposalId = (await params).id;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const brand = await prisma.brand.findFirst({
      where: { userId: session.user.id },
    });

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    const proposal = await prisma.campaignProposal.findFirst({
      where: {
        id: proposalId,
        campaign: {
          brandId: brand.id,
        },
      },
      include: {
        applications: {
          include: {
            influencer: true,
          },
        },
        campaign: true,
      },
    });

    if (!proposal) {
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(proposal);
  } catch (error) {
    console.error("Error fetching proposal:", error);
    return NextResponse.json(
      { error: "Failed to fetch proposal" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const session = await auth();
    const proposalId = (await params).id;
    const json = await request.json();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const brand = await prisma.brand.findFirst({
      where: { userId: session.user.id },
    });

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    // Verify proposal belongs to brand's campaign
    const existingProposal = await prisma.campaignProposal.findFirst({
      where: {
        id: proposalId,
        campaign: {
          brandId: brand.id,
        },
      },
    });

    if (!existingProposal) {
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 },
      );
    }

    // Update proposal
    const updatedProposal = await prisma.campaignProposal.update({
      where: {
        id: proposalId,
      },
      data: json,
      include: {
        applications: true,
      },
    });

    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error("Error updating proposal:", error);
    return NextResponse.json(
      { error: "Failed to update proposal" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const session = await auth();
    const proposalId = (await params).id;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const brand = await prisma.brand.findFirst({
      where: { userId: session.user.id },
    });

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    // Verify proposal belongs to brand's campaign
    const proposal = await prisma.campaignProposal.findFirst({
      where: {
        id: proposalId,
        campaign: {
          brandId: brand.id,
        },
      },
    });

    if (!proposal) {
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 },
      );
    }

    // Delete proposal
    await prisma.campaignProposal.delete({
      where: {
        id: proposalId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting proposal:", error);
    return NextResponse.json(
      { error: "Failed to delete proposal" },
      { status: 500 },
    );
  }
}
