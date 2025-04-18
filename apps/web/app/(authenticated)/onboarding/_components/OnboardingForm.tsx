// components/onboarding/OnboardingForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Input } from "@repo/ui/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { useToast } from "@repo/ui/hooks/use-toast";
import {
  personalInfoSchema,
  organizationSchema,
  teamInvitesSchema,
  type PersonalInfoFormData,
  type OrganizationFormData,
  type TeamInvitesFormData,
} from "../../../../lib/schema";

const STEPS = {
  PERSONAL_INFO: "PERSONAL_INFO",
  ORGANIZATION_DETAILS: "ORGANIZATION_DETAILS",
  TEAM_INVITES: "TEAM_INVITES",
} as const;

type Step = (typeof STEPS)[keyof typeof STEPS];

export default function OnboardingForm({ user }: { user: any }) {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>(STEPS.PERSONAL_INFO);

  // Personal Info Form
  const personalInfoForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user.name || "",
    },
  });

  // Organization Form
  const organizationForm = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "assfs",
      industry: undefined,
      size: undefined,
      website: "",
    },
  });

  // Team Invites Form
  const teamInvitesForm = useForm<TeamInvitesFormData>({
    resolver: zodResolver(teamInvitesSchema),
    defaultValues: {
      invites: [{ email: "", role: "MEMBER" }],
    },
  });

  const onPersonalInfoSubmit = async (data: PersonalInfoFormData) => {
    try {
      const response = await fetch("/api/onboarding/personal-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update personal info");

      setStep(STEPS.ORGANIZATION_DETAILS);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save personal information. Please try again.",
      });
    }
  };

  const onOrganizationSubmit = async (data: OrganizationFormData) => {
    try {
      const response = await fetch("/api/onboarding/organization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create organization");

      setStep(STEPS.TEAM_INVITES);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create organization. Please try again.",
      });
    }
  };

  const onTeamInvitesSubmit = async (data: TeamInvitesFormData) => {
    try {
      // Only send invites if there are any
      if (data.invites?.length > 0) {
        const response = await fetch("/api/onboarding/team-invites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data.invites),
        });

        if (!response.ok) throw new Error("Failed to send invites");
      }

      // Complete onboarding
      const completeResponse = await fetch("/api/onboarding/complete", {
        method: "POST",
      });

      if (!completeResponse.ok)
        throw new Error("Failed to complete onboarding");

      toast({
        title: "Success",
        description: "Onboarding completed successfully!",
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to complete setup. Please try again.",
      });
    }
  };
  const renderStep = () => {
    switch (step) {
      case STEPS.PERSONAL_INFO:
        return (
          <Form {...personalInfoForm}>
            <form
              onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)}
              className="space-y-6"
            >
              <FormField
                control={personalInfoForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </Form>
        );

      case STEPS.ORGANIZATION_DETAILS:
        return (
          <Form {...organizationForm}>
            <form
              onSubmit={organizationForm.handleSubmit(onOrganizationSubmit)}
              className="space-y-6"
            >
              <FormField
                control={organizationForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={organizationForm.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={organizationForm.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-1000">
                          201-1000 employees
                        </SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={organizationForm.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" placeholder="https://" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </Form>
        );

      case STEPS.TEAM_INVITES:
        return (
          <Form {...teamInvitesForm}>
            <form
              onSubmit={teamInvitesForm.handleSubmit(onTeamInvitesSubmit)}
              className="space-y-6"
            >
              {teamInvitesForm.watch("invites")?.map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>Team Member {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={teamInvitesForm.control}
                      name={`invites.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={teamInvitesForm.control}
                      name={`invites.${index}.role`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ADMIN">Admin</SelectItem>
                              <SelectItem value="MEMBER">Member</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        const currentInvites =
                          teamInvitesForm.getValues("invites") || [];
                        teamInvitesForm.setValue(
                          "invites",
                          currentInvites.filter((_, i) => i !== index),
                        );
                      }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <div className="flex flex-col gap-4">
                {teamInvitesForm.watch("invites")?.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center">
                    No team members added yet. Add team members or skip this
                    step.
                  </p>
                )}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const currentInvites =
                      teamInvitesForm.getValues("invites") || [];
                    teamInvitesForm.setValue("invites", [
                      ...currentInvites,
                      { email: "", role: "MEMBER" },
                    ]);
                  }}
                >
                  Add Team Member
                </Button>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={async () => {
                      // Skip team invites and complete onboarding
                      const completeResponse = await fetch(
                        "/api/onboarding/complete",
                        {
                          method: "POST",
                        },
                      );

                      if (!completeResponse.ok) {
                        throw new Error("Failed to complete onboarding");
                      }

                      toast({
                        title: "Success",
                        description: "Onboarding completed successfully!",
                      });

                      router.push("/dashboard");
                    }}
                  >
                    Skip & Complete
                  </Button>

                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={!teamInvitesForm.watch("invites")?.length}
                  >
                    {teamInvitesForm.watch("invites")?.length
                      ? "Send Invites & Complete"
                      : "Complete Setup"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        );
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {step === STEPS.PERSONAL_INFO && "Personal Information"}
            {step === STEPS.ORGANIZATION_DETAILS && "Organization Details"}
            {step === STEPS.TEAM_INVITES && "Invite Team Members"}
          </CardTitle>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>
    </div>
  );
}
