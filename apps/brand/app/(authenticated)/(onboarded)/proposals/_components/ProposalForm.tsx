"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Platform } from "@prisma/client";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Loader2, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { useToast } from "@repo/ui/hooks/use-toast";
import {
  proposalFormSchema,
  type ProposalFormData,
} from "../../../../../lib/schema";
import { CampaignForm } from "../../campaigns/_components/CampaignForm";

interface ProposalFormProps {
  campaigns: { id: string; title: string }[];
  onSubmit: (data: ProposalFormData) => Promise<void>;
  initialData?: Partial<ProposalFormData>;
  isSubmitting?: boolean;
}

export function ProposalForm({
  campaigns,
  onSubmit,
  initialData,
  isSubmitting = false,
}: ProposalFormProps) {
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const { toast } = useToast();
  const [selectedCampaign, setSelectedCampaign] = useState<string>(
    campaigns[0]?.id || "",
  );

  const form = useForm<ProposalFormData>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      campaignId: selectedCampaign,
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      requirements: initialData?.requirements ?? [],
      deliverables: initialData?.deliverables ?? [],
      budget: initialData?.budget ?? 0,
      timeframe: initialData?.timeframe ?? 0,
      minFollowers: initialData?.minFollowers ?? 0,
      maxFollowers: initialData?.maxFollowers ?? 0,
      targetCategories: initialData?.targetCategories ?? [],
      platforms: initialData?.platforms ?? [],
    },
  });

  const handleCreateCampaign = async (campaignData: any) => {
    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignData),
      });

      if (!response.ok) {
        throw new Error("Failed to create campaign");
      }

      const newCampaign = await response.json();
      campaigns.push(newCampaign);
      setSelectedCampaign(newCampaign.id);
      form.setValue("campaignId", newCampaign.id);
      setIsCreateCampaignOpen(false);

      toast({
        title: "Success",
        description: "Campaign created successfully",
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (data: ProposalFormData) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">
          You need to create a campaign before creating a proposal
        </p>
        <Button onClick={() => setIsCreateCampaignOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Your First Campaign
        </Button>
        <Dialog
          open={isCreateCampaignOpen}
          onOpenChange={setIsCreateCampaignOpen}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <CampaignForm
              onSubmit={handleCreateCampaign}
              onCancel={() => setIsCreateCampaignOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h3 className="text-lg font-medium">Create Proposal</h3>
          <Button
            variant="outline"
            onClick={() => setIsCreateCampaignOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>

        <div className="h-[600px] overflow-y-auto pr-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {/* Rest of the form content remains the same */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="campaignId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a campaign" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {campaigns.map((campaign) => (
                            <SelectItem key={campaign.id} value={campaign.id}>
                              {campaign.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-sm">
                        Select the campaign this proposal is for
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter proposal title" />
                      </FormControl>
                      <FormDescription className="text-sm">
                        A clear, descriptive title for your proposal
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe your proposal"
                        className="min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirements</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value.join("\n")}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value.split("\n").filter(Boolean),
                            )
                          }
                          placeholder="Enter requirements (one per line)"
                          className="min-h-[80px]"
                        />
                      </FormControl>
                      <FormDescription className="text-sm">
                        Enter each requirement on a new line
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliverables"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deliverables</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value.join("\n")}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value.split("\n").filter(Boolean),
                            )
                          }
                          placeholder="Enter deliverables (one per line)"
                          className="min-h-[80px]"
                        />
                      </FormControl>
                      <FormDescription className="text-sm">
                        Enter each deliverable on a new line
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="targetCategories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Categories</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value.join(", ")}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean),
                            )
                          }
                          placeholder="Fashion, Beauty, Tech"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>Budget ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={value === 0 ? "" : value}
                          onChange={(e) =>
                            onChange(
                              e.target.value ? Number(e.target.value) : 0,
                            )
                          }
                          placeholder="Enter budget"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>Timeframe (days)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={value || ""}
                          onChange={(e) => onChange(e.target.valueAsNumber)}
                          placeholder="Enter timeframe"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="platforms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platforms</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(Platform).map((platform) => (
                        <Button
                          key={platform}
                          type="button"
                          variant={
                            field.value.includes(platform)
                              ? "default"
                              : "outline"
                          }
                          onClick={() => {
                            const newValue = field.value.includes(platform)
                              ? field.value.filter((p) => p !== platform)
                              : [...field.value, platform];
                            field.onChange(newValue);
                          }}
                          className="px-3 py-1 text-sm"
                        >
                          {platform}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minFollowers"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>Minimum Followers</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={value || ""}
                          onChange={(e) => onChange(e.target.valueAsNumber)}
                          placeholder="Min followers"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxFollowers"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>Maximum Followers</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={typeof value === "number" ? value : ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            onChange(val ? Number(val) : null);
                          }}
                          placeholder="Max followers (optional)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? "Creating..." : "Create Proposal"}
              </Button>
            </form>
          </Form>
        </div>

        <Dialog
          open={isCreateCampaignOpen}
          onOpenChange={setIsCreateCampaignOpen}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <CampaignForm
              onSubmit={handleCreateCampaign}
              onCancel={() => setIsCreateCampaignOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
