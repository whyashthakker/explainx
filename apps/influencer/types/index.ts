// lib/types/index.ts
import type { 
    User as PrismaUser, 
    Influencer as PrismaInfluencer, 
    Platform as PrismaPlatform, 
    UserType as PrismaUserType,
    TeamRole as PrismaTeamRole,
    InviteStatus as PrismaInviteStatus
  } from "@prisma/client";
  
  // Export Prisma enums directly to ensure type compatibility
  export const Platform = {
    INSTAGRAM: 'INSTAGRAM',
    YOUTUBE: 'YOUTUBE',
    TIKTOK: 'TIKTOK',
    TWITTER: 'TWITTER',
    LINKEDIN: 'LINKEDIN'
  } as const;
  
  export const TeamRole = {
    OWNER: 'OWNER',
    ADMIN: 'ADMIN',
    MEMBER: 'MEMBER'
  } as const;
  
  export const InviteStatus = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    DECLINED: 'DECLINED'
  } as const;
  
  export const UserType = {
    BRAND: 'BRAND',
    INFLUENCER: 'INFLUENCER'
  } as const;
  
  export type Platform = typeof Platform[keyof typeof Platform];
  export type TeamRole = typeof TeamRole[keyof typeof TeamRole];
  export type InviteStatus = typeof InviteStatus[keyof typeof InviteStatus];
  export type UserType = typeof UserType[keyof typeof UserType];
  
  // Base model for shared properties
  export interface BaseModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // User type that matches the data structure
  export interface User extends BaseModel {
    email: string;
    emailVerified: Date | null;
    name: string | null;
    image: string | null;
    userType: UserType | null | undefined;
  }
  
  // Team member interface
  export interface InfluencerTeamMember extends BaseModel {
    userId: string | null;
    teamId: string;
    role: TeamRole;
    inviteStatus: InviteStatus;
    inviteToken: string | null;
    inviteEmail: string | null;
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
    } | null;
  }
  
  // Influencer interface
  export interface Influencer extends BaseModel {
    userId: string;
    name: string;
    bio: string | null;
    avatar: string | null;
    category: string;
    followers: number;
    platforms: Platform[];
    user: User;
  }
  
  export interface Team extends BaseModel {
    name: string;
    members: InfluencerTeamMember[];
  }
  
  export type PrismaUserWithInfluencer = PrismaUser & {
    influencer: (PrismaInfluencer & {
      user: {
        email: string;
        image: string | null;
      };
    }) | null;
  };