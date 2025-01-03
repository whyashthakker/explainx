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
import { handleSignOut } from "../../../../../lib/actions";
import {
  Users,
  Mail,
  Link as LinkIcon,
  MapPin,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Settings,
  Edit,
  Building2,
  LucideIcon,
} from "lucide-react";
import {
  Platform,
  User,
  Brand,
  BrandTeamMember,
  TeamRole,
} from "../../../../../lib/types";

interface ProfilePageProps {
  user: User & {
    brand: Brand | null;
  };
  brand: Brand;
  teamMembers: BrandTeamMember[];
}

interface ProfileLinkProps {
  icon: LucideIcon;
  label: string;
  link?: string;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({
  icon: Icon,
  label,
  link,
}) => {
  const Component = link ? "a" : "div";
  const props = link
    ? {
        href: link,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <Component
      {...props}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Component>
  );
};

const SocialIcon = ({ platform }: { platform: Platform }) => {
  switch (platform) {
    case Platform.INSTAGRAM:
      return <Instagram className="h-5 w-5 text-pink-500" />;
    case Platform.YOUTUBE:
      return <Youtube className="h-5 w-5 text-red-500" />;
    case Platform.TWITTER:
      return <Twitter className="h-5 w-5 text-blue-500" />;
    case Platform.LINKEDIN:
      return <Linkedin className="h-5 w-5 text-blue-700" />;
    default:
      return null;
  }
};

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  brand,
  teamMembers: initialTeamMembers,
}) => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleAddMember = () => {
    console.log("Add member clicked");
  };

  const handlePlatformEdit = (platform: Platform) => {
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
                    src={brand.logo || user.image || "/api/placeholder/100/100"}
                    alt={brand.name}
                  />
                  <AvatarFallback>{brand.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center md:justify-between gap-4">
                      <h2 className="text-2xl font-bold">{brand.name}</h2>
                      <Badge variant="secondary">{brand.industry}</Badge>
                    </div>
                    <p className="text-gray-500">{brand.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <ProfileLink
                      icon={Mail}
                      label={user.email}
                      link={`mailto:${user.email}`}
                    />
                    {brand.website && (
                      <ProfileLink
                        icon={LinkIcon}
                        label="Website"
                        link={brand.website}
                      />
                    )}
                    <ProfileLink
                      icon={Building2}
                      label={`Budget: ${brand.maxBudget ? `$${brand.maxBudget}` : "Not specified"}`}
                    />
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
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
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
                            src={member.user?.image || "/api/placeholder/32/32"}
                            alt={member.user?.name || "Team member"}
                          />
                          <AvatarFallback>
                            {member.user?.name?.[0] || "T"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.user?.name}</p>
                          <p className="text-sm text-gray-500">
                            {member.user?.email || member.inviteEmail}
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

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Brand Preferences</CardTitle>
                <CardDescription>
                  Manage your targeting and collaboration preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Preferred Platforms</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {brand.preferredPlatforms.map((platform) => (
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
                            onClick={() => handlePlatformEdit(platform)}
                          >
                            Edit
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Target Demographics</h3>
                    <div className="p-4 rounded-lg border">
                      <p>{brand.targetDemographic || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {brand.preferredCategories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
