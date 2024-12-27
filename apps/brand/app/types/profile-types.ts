// app/(authenticated)/authenticated/profile/types.ts
import { LucideIcon } from "lucide-react";

export enum Platform {
  YOUTUBE = "YOUTUBE",
  INSTAGRAM = "INSTAGRAM",
  TWITTER = "TWITTER"
}

export enum TeamRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER"
}

export enum InviteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED"
}

export interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseModel {
  name: string | null;
  email: string;
  image: string | null;
}

export interface Influencer extends BaseModel {
  name: string;
  bio: string | null;
  avatar: string | null;
  category: string;
  followers: number;
  platforms: Platform[];
  userId: string;
}

export interface InfluencerTeamMember extends BaseModel {
  role: TeamRole;
  inviteStatus: InviteStatus;
  teamId: string;
  userId: string;
  user: Pick<User, "id" | "name" | "email" | "image">;
}

export interface ProfileSocialLinkProps {
  icon: LucideIcon;
  label: string;
  link: string;
}

export interface ProfilePageProps {
  user: User & {
    influencer: Influencer | null;
  };
  influencer: Influencer;
  teamMembers: InfluencerTeamMember[];
}