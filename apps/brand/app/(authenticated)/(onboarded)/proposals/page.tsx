// app/(authenticated)/(onboarded)/proposals/page.tsx
import { redirect } from "next/navigation";
import { Metadata } from "next";
import prisma from "@repo/db/client";
import { ProposalsClient } from "./_components/ProposalClient";
import { auth } from "../../../../auth";
import type { CampaignProposal, PaginationData } from "./_components/types";
import { Platform } from "@prisma/client";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface Props {
  searchParams: SearchParams;
}

interface PaginationProps extends PaginationData {
  totalItems: number;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  return {
    title: "Campaign Proposals | Infloq",
    description:
      "Create and manage your campaign proposals for influencer collaborations",
  };
}

export default async function ProposalsPage(props: Props) {
  const searchParams = await props.searchParams;
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  // Get the current user's brand
  const brand = await prisma.brand.findFirst({
    where: { userId: session.user.id },
  });

  if (!brand) {
    redirect("/onboarding");
  }

  // Get page number from search params or default to 1
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const limit = 10; // Items per page

  // Define the type for campaign query result
  type CampaignSelect = {
    id: string;
    title: string;
  };

  // Fetch campaigns and proposals with pagination
  const [campaignsData, proposalsData, totalProposals] = await Promise.all([
    prisma.campaign.findMany({
      where: { brandId: brand.id },
      select: {
        id: true,
        title: true,
      },
    }),
    prisma.campaignProposal.findMany({
      where: {
        campaign: {
          brandId: brand.id,
        },
      },
      include: {
        campaign: {
          select: {
            title: true,
          },
        },
        applications: {
          include: {
            influencer: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.campaignProposal.count({
      where: {
        campaign: {
          brandId: brand.id,
        },
      },
    }),
  ]);

  // Transform the data to match our types
  const campaigns = campaignsData as CampaignSelect[];
  const proposals = proposalsData.map((proposal) => ({
    ...proposal,
    budget: proposal.budget.toNumber(),
    platforms: proposal.platforms as Platform[],
    targetPlatforms: proposal.targetPlatforms as Platform[],
    applications: proposal.applications.map((app) => ({
      id: app.id,
      status: app.status,
      createdAt: app.createdAt,
      proposedBudget: app.proposedBudget?.toNumber(),
      influencer: {
        id: app.influencer.id,
        name: app.influencer.name,
        avatar: app.influencer.avatar,
      },
    })),
  })) satisfies CampaignProposal[];
  console.log(proposals);

  const pagination: PaginationProps = {
    currentPage: page,
    totalPages: Math.ceil(totalProposals / limit),
    totalItems: totalProposals,
  };

  console.log("campaigns" + JSON.stringify(campaigns));

  return (
    <ProposalsClient
      campaigns={campaigns}
      initialProposals={proposals}
      pagination={pagination}
    />
  );
}
