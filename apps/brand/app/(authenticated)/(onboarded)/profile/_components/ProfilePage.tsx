// app/(authenticated)/(onboarded)/profile/_components/ProfilePage.tsx
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
import { useToast } from "@repo/ui/hooks/use-toast";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { handleSignOut } from "../../../../../lib/actions";
import {
  Users,
  Mail,
  Link as LinkIcon,
  Settings,
  Edit,
  Building,
  Globe,
  Target,
  DollarSign,
  Package,
  Hash,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  User,
  Platform,
  TeamRole,
  Brand,
  BrandTeamMember,
  Prisma,
} from "@prisma/client";
import { TeamSection } from "./team/TeamSection";
import EditProfileModal from "./EditProfileModal";
import { Separator } from "@repo/ui/components/ui/separator";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";

// Extended types for nested data
interface ExtendedBrandTeam {
  id: string;
  brandId: string;
  members: ExtendedTeamMember[];
}

interface ExtendedTeamMember extends Omit<BrandTeamMember, "user"> {
  user: Pick<User, "id" | "name" | "email" | "image"> | null;
}

interface ExtendedBrand extends Omit<Brand, "team" | "maxBudget"> {
  team?: ExtendedBrandTeam | null;
  maxBudget: Prisma.Decimal | null;
  preferredCategories: string[];
}

interface ProfileDetailProps {
  icon: LucideIcon;
  label: string;
  value?: string | number | null;
}

interface ProfilePageProps {
  user: User;
  brand: ExtendedBrand;
  teamMembers: ExtendedTeamMember[];
}

interface TeamSectionProps {
  profileVersion: number;
  onError: (error: string) => void;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="flex items-center gap-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
    <Icon className="h-4 w-4" />
    <span className="font-medium min-w-[140px]">{label}:</span>
    <span className="text-gray-900">{value || "Not specified"}</span>
  </div>
);

const BrandMetrics = ({ brand }: { brand: ExtendedBrand }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Total Campaigns</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <Package className="h-8 w-8 text-gray-400" />
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">
              Active Campaigns
            </p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <Target className="h-8 w-8 text-gray-400" />
        </div>
      </CardContent>
    </Card>
    {/* Add more metric cards as needed */}
  </div>
);

const PreferredCategories = ({ categories }: { categories: string[] }) => (
  <div className="space-y-2">
    <h3 className="text-sm font-medium text-gray-500">Preferred Categories</h3>
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge key={category} variant="secondary">
          {category}
        </Badge>
      ))}
    </div>
  </div>
);

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  brand,
  teamMembers: initialTeamMembers,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<ExtendedBrand>(brand);
  const [profileVersion, setProfileVersion] = useState(0);
  const router = useRouter();
  const { toast } = useToast();

  const handleSaveProfile = async (formData: FormData) => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const updatedBrand = await response.json();

      // Update local state
      setCurrentBrand((prev) => ({
        ...prev,
        ...updatedBrand,
        maxBudget: updatedBrand.maxBudget
          ? new Prisma.Decimal(updatedBrand.maxBudget)
          : null,
      }));
      setProfileVersion((prev) => prev + 1);
      setIsEditModalOpen(false);

      // Refresh the page data
      router.refresh();

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("[PROFILE_UPDATE_ERROR]", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header Card */}
        <Card className="flex-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center md:text-left md:flex-row md:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={brand?.logo || "/api/placeholder/100/100"}
                  alt={brand?.name}
                />
                <AvatarFallback>{brand?.name?.[0]}</AvatarFallback>
              </Avatar>

              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <div className="flex items-center justify-center md:justify-between gap-4 flex-wrap">
                    <h2 className="text-2xl font-bold">{brand?.name}</h2>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{brand?.industry}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => setIsEditModalOpen(true)}
                      >
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-500">{brand?.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <ProfileDetail
                      icon={Mail}
                      label="Email"
                      value={user?.email}
                    />
                    <ProfileDetail
                      icon={Globe}
                      label="Website"
                      value={brand?.website || undefined}
                    />
                  </div>
                  <div className="space-y-4">
                    <ProfileDetail
                      icon={Target}
                      label="Target Demographic"
                      value={brand?.targetDemographic || undefined}
                    />
                    <ProfileDetail
                      icon={DollarSign}
                      label="Max Budget"
                      value={
                        brand?.maxBudget
                          ? Number(brand.maxBudget).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })
                          : undefined
                      }
                    />
                  </div>
                </div>

                {brand.preferredCategories &&
                  brand.preferredCategories.length > 0 && (
                    <>
                      <Separator />
                      <PreferredCategories
                        categories={brand.preferredCategories}
                      />
                    </>
                  )}
              </div>
            </div>
          </CardContent>
        </Card>

        <BrandMetrics brand={currentBrand} />

        {/* Tabs Section */}
        <Tabs defaultValue="team" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="team">
            <TeamSection
              profileVersion={profileVersion}
              onError={(error) => {
                toast({
                  title: "Error",
                  description: error,
                  variant: "destructive",
                });
              }}
            />
          </TabsContent>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Campaign Management</CardTitle>
                    <CardDescription>
                      View and manage your marketing campaigns
                    </CardDescription>
                  </div>
                  <Button onClick={() => router.push("/campaigns/create")}>
                    Create Campaign
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  No campaigns yet. Create your first campaign to get started!
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collaborations">
            <Card>
              <CardHeader>
                <CardTitle>Collaborations</CardTitle>
                <CardDescription>
                  Track your ongoing and past collaborations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  No active collaborations yet.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Brand Settings</CardTitle>
                <CardDescription>
                  Manage your brand settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push("/settings")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Brand Settings
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

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        brand={currentBrand}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default ProfilePage;
