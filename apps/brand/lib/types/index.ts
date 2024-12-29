import type { User as PrismaUser, Brand as PrismaBrand } from "@prisma/client";
// Enums
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

// Base Types
export interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Auth Related Types

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

// YouTube Related Types
export interface YouTubeAccount {
  id: string;
  influencerId: string;
  channelId: string;
  channelTitle: string;
  description: string | null;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  videos: YouTubeVideo[];
  analytics: YouTubeAnalytics[];
}

export interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  description: string | null;
  thumbnailUrl: string;
  publishedAt: Date;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export interface YouTubeAnalytics {
  id: string;
  date: Date;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

// Brand Related Types
export interface Brand extends BaseModel {
  userId: string;
  name: string;
  logo?: string | null;
  website?: string | null;
  industry: string;
  description?: string | null;
  targetDemographic?: string | null;
  preferredCategories?: string[];
  minFollowers?: number | null;
  maxBudget?: number | null;
  preferredPlatforms?: Platform[];

  // Relations
  user: User;
  team?: BrandTeam | null;
  campaigns?: Campaign[];
  collaborations?: Collaboration[];
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
  youtubeAccount?: YouTubeAccount;

  // Relations
  user: User;
  team?: InfluencerTeam | null;
  collaborations?: Collaboration[];
}

// Team Related Types
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

// Metrics Related Types
export interface InfluencerMetrics {
  avgViews: number;
  totalViews: number;
  subscriberGrowth: number;
  viewGrowth: number;
  engagement: string;
}

export interface AnalyticsDataPoint {
  date: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

export interface VideoMetrics {
  id: string;
  title: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
  thumbnailUrl: string;
}

export interface PlatformMetrics {
  platform: string;
  followers: number;
  engagement: number;
  posts: number;
  reach: number;
}

export interface CollaborationMetrics {
  totalCollaborations: number;
  successRate: number;
  averageBudget: number;
  completedCampaigns: number;
  activeProjects: number;
}

export interface MetricsResponse {
  success: boolean;
  data?: {
    influencer: {
      metrics: InfluencerMetrics;
      analytics: AnalyticsDataPoint[];
      recentVideos: VideoMetrics[];
      platformMetrics: PlatformMetrics[];
      collaborationMetrics: CollaborationMetrics;
    };
  };
  error?: string;
}

// Input Types
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

export interface TeamInviteInput {
  email: string;
  role: TeamRole;
}

export interface TeamMemberUpdate {
  userId: string;
  role: TeamRole;
}

export type PrismaUserWithBrand = PrismaUser & {
  brand:
    | (PrismaBrand & {
        user: {
          id: string;
          email: string;
          image: string | null;
        };
      })
    | null;
};
