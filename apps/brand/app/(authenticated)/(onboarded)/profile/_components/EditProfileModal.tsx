"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@repo/ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Button } from "@repo/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Loader2 } from "lucide-react";
import { BrandTeamMember, Prisma, User, type Brand } from "@prisma/client";

// Define industry options
const INDUSTRY_OPTIONS = [
  "TECHNOLOGY",
  "FASHION",
  "BEAUTY",
  "FOOD_BEVERAGE",
  "HEALTH_WELLNESS",
  "TRAVEL",
  "ENTERTAINMENT",
  "RETAIL",
  "AUTOMOTIVE",
  "EDUCATION",
  "FINANCE",
  "SPORTS",
] as const;

// Zod schema for form validation
const brandFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  industry: z.enum(INDUSTRY_OPTIONS, {
    required_error: "Please select an industry",
  }),
  description: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  logo: z.string().url("Invalid logo URL").optional().or(z.literal("")),
  targetDemographic: z.string().optional(),
  maxBudget: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return null;
      const num = parseFloat(val);
      return isNaN(num) ? null : num;
    }),
  preferredCategories: z.string().optional(),
});

type BrandFormValues = {
  name: string;
  industry: (typeof INDUSTRY_OPTIONS)[number];
  description?: string;
  website?: string;
  logo?: string;
  targetDemographic?: string;
  maxBudget?: string; // Change this to string since it's an input value
  preferredCategories?: string;
};

interface ExtendedTeamMember extends Omit<BrandTeamMember, "user"> {
  user: Pick<User, "id" | "name" | "email" | "image"> | null;
}

interface ExtendedBrandTeam {
  id: string;
  brandId: string;
  members: ExtendedTeamMember[];
}

interface ExtendedBrand extends Omit<Brand, "team" | "maxBudget"> {
  team?: ExtendedBrandTeam | null;
  maxBudget: Prisma.Decimal | null;
  preferredCategories: string[];
}

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  brand: ExtendedBrand;
  onSave: (data: FormData) => Promise<void>;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  onClose,
  brand,
  onSave,
}) => {
  // Initialize form with react-hook-form and zod resolver
  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: brand?.name || "",
      industry:
        (brand?.industry as (typeof INDUSTRY_OPTIONS)[number]) || undefined,
      description: brand?.description || "",
      website: brand?.website || "",
      logo: brand?.logo || "",
      targetDemographic: brand?.targetDemographic || "",
      maxBudget: brand?.maxBudget ? brand.maxBudget.toString() : "",
      preferredCategories: brand?.preferredCategories?.join(", ") || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: BrandFormValues) => {
    try {
      // Convert form data to FormData
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={isSubmitting ? undefined : onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Brand Profile</DialogTitle>
          <DialogDescription>
            Update your brand profile information
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your brand name"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INDUSTRY_OPTIONS.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your brand"
                      className="h-32"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://your-website.com"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="URL to your brand logo"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="targetDemographic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Demographic</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Describe your target audience"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="maxBudget"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Maximum Budget</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter maximum budget"
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredCategories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Categories</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter categories, separated by commas"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
