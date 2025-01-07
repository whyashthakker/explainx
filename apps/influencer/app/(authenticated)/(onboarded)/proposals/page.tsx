// app/proposals/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CampaignProposal, Platform } from "@prisma/client";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { ApplicationDialog } from "./_components/application-dialog";
import { Badge } from "@repo/ui/components/ui/badge";

export default function ProposalsPage() {
  const { data: session } = useSession();
  const [proposals, setProposals] = useState<CampaignProposal[]>([]);
  const [selectedProposal, setSelectedProposal] =
    useState<CampaignProposal | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProposals = async () => {
      const response = await fetch("/api/proposals/available");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProposals(data);
      }
    };

    if (session?.user?.id) {
      fetchProposals();
    }
  }, [session?.user?.id]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Available Campaign Proposals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{proposal.title}</CardTitle>
              <CardDescription>{proposal.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Budget:</p>
                  <p>{proposal.budget.toNumber()}</p>
                </div>

                <div>
                  <p className="font-semibold">Platforms:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {proposal.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-semibold">Requirements:</p>
                  <ul className="list-disc list-inside">
                    {proposal.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    setSelectedProposal(proposal);
                    setIsDialogOpen(true);
                  }}
                >
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProposal && (
        <ApplicationDialog
          proposal={selectedProposal}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </div>
  );
}
