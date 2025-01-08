import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { proposalId, coverLetter, proposedBudget, proposedTerms } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        influencers: true,
        brands: true,
      },
    });

    if (!user?.influencers?.[0]) {
      return new NextResponse("Influencer profile not found", { status: 404 });
    }

    // Check if the proposal belongs to user's own brand
    const proposal = await prisma.campaignProposal.findUnique({
      where: { id: proposalId },
      include: {
        campaign: {
          include: {
            brand: true,
          },
        },
      },
    });

    if (!proposal) {
      return new NextResponse("Proposal not found", { status: 404 });
    }

    const isSelfApplication = user.brands.some(
      (brand) => brand.id === proposal.campaign.brand.id,
    );

    if (isSelfApplication) {
      return new NextResponse("Cannot apply to your own brand's proposal", {
        status: 400,
      });
    }

    const application = await prisma.proposalApplication.create({
      data: {
        proposalId,
        influencerId: user.influencers[0].id,
        coverLetter,
        proposedBudget,
        proposedTerms,
        status: "PENDING",
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error("Failed to submit application:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
