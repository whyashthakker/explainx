// packages/types/index.ts
import type {
  User as PrismaUser,
  Influencer as PrismaInfluencer,
} from "@prisma/client";
// Enums
export enum UserType {
  BRAND = "BRAND",
  INFLUENCER = "INFLUENCER",
}

export enum TeamRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export enum InviteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export enum Platform {
  INSTAGRAM = "INSTAGRAM",
  YOUTUBE = "YOUTUBE",
  TIKTOK = "TIKTOK",
  TWITTER = "TWITTER",
  LINKEDIN = "LINKEDIN",
}

export enum CampaignStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  COMPLETED = "COMPLETED",
}

export enum CollaborationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface InfluencerFormData {
  name: string;
  avatar?: string;
  bio?: string;
  category: string;
  followers: number;
  platforms: Platform[];
}

// Base Types
export interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Auth Related Types
export interface User extends BaseModel {
  name?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  userType?: UserType | null;

  // Relations
  accounts?: Account[];
  sessions?: Session[];
  authenticators?: Authenticator[];
  brand?: Brand | null;
  influencer?: Influencer | null;
  brandTeamMemberships?: BrandTeamMember[];
  influencerTeamMemberships?: InfluencerTeamMember[];
  sentMessages?: Message[];
  receivedMessages?: Message[];
}

export interface Account extends BaseModel {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;

  user: User;
}

export interface Session extends BaseModel {
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface Authenticator {
  credentialID: string;
  userId: string;
  providerAccountId: string;
  credentialPublicKey: string;
  counter: number;
  credentialDeviceType: string;
  credentialBackedUp: boolean;
  transports?: string | null;

  user: User;
}

// Brand Related Types
export interface Brand extends BaseModel {
  userId: string;
  name: string;
  logo?: string | null;
  website?: string | null;
  industry: string;
  description?: string | null;

  // Relations
  user: User;
  team?: BrandTeam | null;
  campaigns?: Campaign[];
  collaborations?: Collaboration[];
}

export interface BrandTeam extends BaseModel {
  brandId: string;
  brand: Brand;
  members?: BrandTeamMember[];
}

export interface BrandTeamMember extends BaseModel {
  teamId: string;
  userId: string;
  role: TeamRole;
  inviteStatus: InviteStatus;
  inviteToken?: string | null;

  team: BrandTeam;
  user: User;
}

// Influencer Related Types
export interface Influencer extends BaseModel {
  userId: string;
  name: string;
  avatar?: string | null;
  bio?: string | null;
  category: string;
  followers: number;
  platforms: Platform[];

  // Relations
  user: User;
  team?: InfluencerTeam | null;
  collaborations?: Collaboration[];
}

export interface InfluencerTeam extends BaseModel {
  influencerId: string;
  influencer: Influencer;
  members?: InfluencerTeamMember[];
}

export interface InfluencerTeamMember extends BaseModel {
  teamId: string;
  userId: string;
  role: TeamRole;
  inviteStatus: InviteStatus;
  inviteToken?: string | null;

  team: InfluencerTeam;
  user: User;
}

// Campaign Related Types
export interface Campaign extends BaseModel {
  brandId: string;
  createdById: string;
  title: string;
  description: string;
  budget: number;
  requirements: string[];
  platforms: Platform[];
  status: CampaignStatus;
  startDate: Date;
  endDate: Date;

  // Relations
  brand: Brand;
  collaborations?: Collaboration[];
}

// Collaboration and Chat Related Types
export interface Collaboration extends BaseModel {
  campaignId: string;
  brandId: string;
  influencerId: string;
  status: CollaborationStatus;
  terms: string;
  deliverables: string[];
  compensation: number;

  // Relations
  campaign: Campaign;
  brand: Brand;
  influencer: Influencer;
  chatRoom?: ChatRoom | null;
}

export interface ChatRoom extends BaseModel {
  collaborationId: string;
  collaboration: Collaboration;
  messages?: Message[];
}

export interface Message extends BaseModel {
  content: string;
  chatRoomId: string;
  senderId: string;
  receiverId: string;
  read: boolean;

  // Relations
  chatRoom: ChatRoom;
  sender: User;
  receiver: User;
}

// Input Types for Forms and API Requests
export interface CreateBrandInput {
  name: string;
  logo?: string;
  website?: string;
  industry: string;
  description?: string;
}

export interface CreateInfluencerInput {
  name: string;
  avatar?: string;
  bio?: string;
  category: string;
  followers: number;
  platforms: Platform[];
}

export interface CreateCampaignInput {
  title: string;
  description: string;
  budget: number;
  requirements: string[];
  platforms: Platform[];
  startDate: Date;
  endDate: Date;
}

export interface CreateCollaborationInput {
  campaignId: string;
  influencerId: string;
  terms: string;
  deliverables: string[];
  compensation: number;
}

export interface CreateMessageInput {
  content: string;
  chatRoomId: string;
  receiverId: string;
}

// Team Management Types
export interface TeamInviteInput {
  email: string;
  role: TeamRole;
}

export interface TeamMemberUpdate {
  userId: string;
  role: TeamRole;
}

export type PrismaUserWithInfluencer = PrismaUser & {
  influencer:
    | (PrismaInfluencer & {
        user: {
          id: string;
          email: string;
          image: string | null;
        };
      })
    | null;
};
