"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { handleSignOut } from "../../../../lib/actions";
import {
  Users,
  Mail,
  Link as LinkIcon,
  MapPin,
  Instagram,
  Youtube,
  Twitter,
  Settings,
  Edit,
  LucideIcon,
} from "lucide-react";
import {
  ProfilePageProps,
  Platform,
  ProfileSocialLinkProps,
  TeamRole,
} from "../../../types/profile-types";

const ProfileSocialLink: React.FC<ProfileSocialLinkProps> = ({
  icon: Icon,
  label,
  link,
}) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </a>
);

const SocialIcon = ({ platform }: { platform: Platform }) => {
  switch (platform) {
    case Platform.INSTAGRAM:
      return <Instagram className="h-5 w-5 text-pink-500" />;
    case Platform.YOUTUBE:
      return <Youtube className="h-5 w-5 text-red-500" />;
    case Platform.TWITTER:
      return <Twitter className="h-5 w-5 text-blue-500" />;
    default:
      return null;
  }
};

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  influencer,
  teamMembers: initialTeamMembers,
}) => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleAddMember = () => {
    console.log("Add member clicked");
  };

  const handleSocialEdit = (platform: Platform) => {
    console.log(`Edit ${platform} clicked`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Card className="flex-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center md:text-left md:flex-row md:items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={
                      influencer.avatar ||
                      user.image ||
                      "/api/placeholder/100/100"
                    }
                    alt={influencer.name}
                  />
                  <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center md:justify-between gap-4">
                      <h2 className="text-2xl font-bold">{influencer.name}</h2>
                      <Badge variant="secondary">{influencer.category}</Badge>
                    </div>
                    <p className="text-gray-500">{influencer.bio}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <ProfileSocialLink
                      icon={Mail}
                      label={user.email}
                      link={`mailto:${user.email}`}
                    />
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>
                        {influencer.followers.toLocaleString()} followers
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleEditProfile}
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="team" className="space-y-6">
          <TabsList>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      Manage your team and their roles
                    </CardDescription>
                  </div>
                  <Button onClick={handleAddMember}>
                    <Users className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src={member.user.image || "/api/placeholder/32/32"}
                            alt={member.user.name || "Team member"}
                          />
                          <AvatarFallback>
                            {member.user.name?.[0] || "T"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.user.name}</p>
                          <p className="text-sm text-gray-500">
                            {member.user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            member.role === TeamRole.OWNER
                              ? "default"
                              : "secondary"
                          }
                        >
                          {member.role}
                        </Badge>
                        {member.inviteStatus !== "ACCEPTED" && (
                          <Badge variant="outline" className="text-yellow-600">
                            {member.inviteStatus}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms">
            <Card>
              <CardHeader>
                <CardTitle>Connected Platforms</CardTitle>
                <CardDescription>
                  Manage your social media presence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {influencer.platforms.map((platform) => (
                    <div
                      key={platform}
                      className="flex items-center gap-4 p-4 rounded-lg border"
                    >
                      <SocialIcon platform={platform} />
                      <div className="flex-1">
                        <p className="font-medium">{platform}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSocialEdit(platform)}
                      >
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your profile settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                  <form action={handleSignOut}>
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full justify-start text-red-600 hover:text-red-700"
                    >
                      Sign Out
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
