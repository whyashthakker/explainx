// app/(authenticated)/authenticated/profile/page.tsx
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import ProfilePage from "./_components/ProfilePage";
import { Metadata } from "next";
import { User, Brand, BrandTeamMember } from "../../../../lib/types";
export const metadata: Metadata = {
  title: "Brand Profile | Dashboard",
  description: "Manage your brand profile and team settings",
};
interface ProfilePageProps {
  user: User & {
    brand: Brand | null;
  };
  brand: Brand;
  teamMembers: BrandTeamMember[];
}
export default async function Page() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email || "", // Handle null case with empty string
    },
    include: {
      brands: {
        include: {
          team: {
            include: {
              members: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      image: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  // Since users can have multiple brands, we'll use the first brand for now
  // You might want to add logic to determine which brand's profile to show
  const activeBrand = user?.brands?.[0];
  if (!activeBrand) {
    redirect("/onboarding");
  }
  // Cast the data to match our component types
  const typedUser: ProfilePageProps["user"] = {
    ...user,
    //@ts-ignore
    brand: activeBrand, // Set the active brand
  };
  //@ts-ignore

  const typedBrand: ProfilePageProps["brand"] = activeBrand;
  //@ts-ignore

  const typedTeamMembers: ProfilePageProps["teamMembers"] =
    activeBrand?.team?.members || [];
  return (
    <ProfilePage
      user={typedUser}
      brand={typedBrand}
      teamMembers={typedTeamMembers}
    />
  );
}
