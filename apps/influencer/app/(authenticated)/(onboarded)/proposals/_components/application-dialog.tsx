// app/proposals/components/application-dialog.tsx
"use client";

import { useState } from "react";
import { CampaignProposal } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { useToast } from "@repo/ui/hooks/use-toast";

interface ApplicationDialogProps {
  proposal: CampaignProposal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationDialog({
  proposal,
  open,
  onOpenChange,
}: ApplicationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    coverLetter: "",
    proposedBudget: proposal.budget.toString(),
    proposedTerms: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/proposals/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proposalId: proposal.id,
          ...formData,
          proposedBudget: parseFloat(formData.proposedBudget),
        }),
      });

      if (response.ok) {
        toast({
          title: "Application Submitted",
          description: "Your application has been submitted successfully.",
        });
        onOpenChange(false);
      } else {
        throw new Error("Failed to submit application");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply to {proposal.title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              placeholder="Tell the brand why you're a great fit..."
              value={formData.coverLetter}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  coverLetter: e.target.value,
                }))
              }
              className="h-32"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proposedBudget">Proposed Budget ($)</Label>
            <Input
              id="proposedBudget"
              type="number"
              min="0"
              step="0.01"
              value={formData.proposedBudget}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  proposedBudget: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proposedTerms">Additional Terms (Optional)</Label>
            <Textarea
              id="proposedTerms"
              placeholder="Any additional terms or conditions..."
              value={formData.proposedTerms}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  proposedTerms: e.target.value,
                }))
              }
              className="h-24"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
