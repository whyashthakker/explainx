import type { 
    User as PrismaUser, 
    Influencer as PrismaInfluencer,
    Platform,
    UserType,
    TeamRole,
    InviteStatus
  } from "@prisma/client";
  
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
    userType: UserType | null;
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
  
  // Re-export Prisma types
  export { Platform, UserType, TeamRole, InviteStatus };
  
  export type PrismaUserWithInfluencer = PrismaUser & {
    influencer: (PrismaInfluencer & {
      user: {
        email: string;
        image: string | null;
      };
    }) | null;
  };