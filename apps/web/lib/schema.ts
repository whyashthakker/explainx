import { z } from "zod";
export const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const organizationSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
  industry: z.enum(["ecommerce", "retail", "technology", "other"], {
    required_error: "Please select an industry",
  }),
  size: z.enum(["1-10", "11-50", "51-200", "201-1000", "1000+"], {
    required_error: "Please select company size",
  }),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
});

export const teamInviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["ADMIN", "MEMBER"], {
    required_error: "Please select a role",
  }),
});

export const teamInvitesSchema = z.object({
  invites: z.array(teamInviteSchema).optional().default([]), // Provide default empty array
});

// Types based on schemas
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type OrganizationFormData = z.infer<typeof organizationSchema>;
export type TeamInvitesFormData = z.infer<typeof teamInvitesSchema>;
