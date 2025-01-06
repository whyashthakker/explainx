// lib/validations/proposal.ts
import { z } from "zod";
import { Platform } from "@prisma/client";

export const proposalFormSchema = z.object({
  campaignId: z.string().cuid(),
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000),
  requirements: z
    .array(z.string())
    .min(1, "At least one requirement is needed"),
  deliverables: z
    .array(z.string())
    .min(1, "At least one deliverable is needed"),
  budget: z.number().positive("Budget must be greater than 0"),
  timeframe: z.number().int().positive("Timeframe must be greater than 0"),
  platforms: z
    .array(z.nativeEnum(Platform))
    .min(1, "Select at least one platform"),
  minFollowers: z
    .number()
    .int()
    .positive("Minimum followers must be greater than 0"),
  maxFollowers: z.number().int().nullable().optional(),
  targetCategories: z
    .array(z.string())
    .min(1, "At least one target category is needed"),
});

export const campaignSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  budget: z.number().positive("Budget must be greater than 0"),
  requirements: z.string().array().min(1, "At least one requirement is needed"),
  platforms: z
    .array(z.nativeEnum(Platform))
    .min(1, "Select at least one platform"),
  startDate: z.string(),
  endDate: z.string(),
});

export type ProposalFormData = z.infer<typeof proposalFormSchema>;
