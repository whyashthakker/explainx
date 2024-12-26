// lib/types/index.ts
export enum Platform {
    INSTAGRAM = "INSTAGRAM",
    YOUTUBE = "YOUTUBE",
    TIKTOK = "TIKTOK",
    TWITTER = "TWITTER",
    LINKEDIN = "LINKEDIN",
  }
  
  export enum UserType {
    BRAND = "BRAND",
    INFLUENCER = "INFLUENCER",
  }
  
  export enum TeamRole {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
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
  
  export interface User {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    userType: UserType | null;
  }
  
  export interface Influencer {
    id: string;
    userId: string;
    name: string;
    avatar: string | null;
    bio: string | null;
    category: string;
    followers: number;
    platforms: Platform[];
    youtubeAccount?: YouTubeAccount;
  }
  
  export interface Brand {
    id: string;
    userId: string;
    name: string;
    logo: string | null;
    website: string | null;
    industry: string;
    description: string | null;
    targetDemographic: string | null;
    preferredCategories: string[];
    minFollowers: number | null;
    maxBudget: number | null;
    preferredPlatforms: Platform[];
  }
  
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
  
  export interface Campaign {
    id: string;
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
  }
  
  export interface Collaboration {
    id: string;
    campaignId: string;
    brandId: string;
    influencerId: string;
    status: CollaborationStatus;
    terms: string;
    deliverables: string[];
    compensation: number;
    chatRoom?: ChatRoom;
  }
  
  export interface ChatRoom {
    id: string;
    collaborationId: string;
    messages: Message[];
  }
  
  export interface Message {
    id: string;
    content: string;
    chatRoomId: string;
    senderId: string;
    receiverId: string;
    read: boolean;
    createdAt: Date;
  }

  // lib/types/metrics.ts
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