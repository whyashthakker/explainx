// app/(authenticated)/(onboarded)/proposals/_components/ProposalsClient.tsx
"use client";
import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { ProposalForm } from "./ProposalForm";
import { ProposalList } from "./ProposalList";
import { Pagination } from "./Pagination";
import type {
  ProposalsClientProps,
  ProposalFormData,
  CampaignProposal,
} from "./types";
import { useToast } from "@repo/ui/hooks/use-toast";

export function ProposalsClient({
  campaigns,
  initialProposals,
  pagination,
}: ProposalsClientProps) {
  const [proposals, setProposals] =
    useState<CampaignProposal[]>(initialProposals);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const handleCreateProposal = async (formData: ProposalFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create proposal");
      }

      const newProposal: CampaignProposal = await response.json();
      setProposals((prev) => [newProposal, ...prev]);
      setIsCreateDialogOpen(false);

      toast({
        title: "Success",
        description: "Proposal created successfully",
      });
    } catch (error) {
      console.error("Error creating proposal:", error);
      toast({
        title: "Error",
        description: "Failed to create proposal",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Campaign Proposals</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your proposals for influencer collaborations
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Create New Proposal</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Proposal</DialogTitle>
            </DialogHeader>
            <ProposalForm
              //@ts-ignore
              onSubmit={handleCreateProposal}
              campaigns={campaigns}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>

      {proposals.length > 0 ? (
        <div className="space-y-6">
          <ProposalList proposals={proposals} />
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No proposals yet. Create your first proposal to start collaborating
            with influencers.
          </p>
        </div>
      )}
    </div>
  );
}
