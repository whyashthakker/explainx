// app/proposals/[id]/page.tsx
// app/proposals/[id]/page.tsx
import ProposalPage from "./_components/ProposalPage";
import prisma from "@repo/db/client";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page(props: Props) {
  const params = await props.params;

  const proposal = await prisma.campaignProposal.findUnique({
    where: { id: params.id },
    include: {
      campaign: {
        include: {
          brand: true,
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
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!proposal) {
    notFound();
  }

  // Serialize Decimal values
  const serializedProposal = {
    ...proposal,
    budget: proposal.budget.toNumber(),
    applications: proposal.applications.map((app: any) => ({
      ...app,
      proposedBudget: app.proposedBudget?.toNumber(),
    })),
  };

  //  @ts-ignore
  return <ProposalPage proposal={serializedProposal} />;
}
