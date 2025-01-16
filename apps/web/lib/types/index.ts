// types/onboarding.ts
import { TeamRole } from "@repo/db";

export type OnboardingUser = {
  id: string;
  name: string | null;
  email: string;
  onboardingStep: string | null;
  organizationTeamMemberships: {
    role: TeamRole;
    team: {
      organization: {
        id: string;
        name: string;
        setupCompleted: boolean;
      };
    };
  }[];
};

export type AuthSearchParams = Promise<{
  invite?: string;
  email?: string;
}>;
