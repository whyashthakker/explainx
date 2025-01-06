// app/()authenticated)/(onboarded)/proposals/_components/types.ts
import {
  Prisma,
  Platform,
  ProposalStatus,
  ApplicationStatus,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

// Pagination Types
export interface PaginationData {
  currentPage: number;
  totalPages: number;
}

// Form Data Types
export interface ProposalFormData {
  campaignId: string;
  title: string;
  description: string;
  requirements: string[];
  deliverables: string[];
  budget: number;
  timeframe: number;
  platforms: Platform[];
  minFollowers: number;
  maxFollowers?: number | null;
  targetCategories: string[];
  targetPlatforms: Platform[];
}

// Component Props Types
export interface ProposalFormProps {
  onSubmit: (data: ProposalFormData) => Promise<void>;
  campaigns: Campaign[];
  initialData?: Partial<ProposalFormData>;
  isSubmitting?: boolean;
}

// Type definitions based on Prisma schema
export interface Campaign {
  id: string;
  title: string;
}

export interface Influencer {
  id: string;
  name: string;
  avatar: string | null;
}

export interface ProposalApplication {
  id: string;
  influencer: Influencer;
  status: ApplicationStatus;
  createdAt: Date;
}

export interface CampaignProposal {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  deliverables: string[];
  budget: Decimal;
  timeframe: number;
  platforms: Platform[];
  minFollowers: number;
  maxFollowers: number | null;
  targetCategories: string[];
  targetPlatforms: Platform[];
  status: ProposalStatus;
  campaign: {
    title: string;
  };
  applications: ProposalApplication[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProposalsClientProps {
  campaigns: Campaign[];
  initialProposals: CampaignProposal[];
  pagination: PaginationData;
}

export interface ProposalListProps {
  proposals: CampaignProposal[];
}

export interface ProposalCardProps {
  proposal: CampaignProposal;
}
