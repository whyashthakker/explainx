// app/(authenticated)/influencer/[slug]/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import prisma from "@repo/db/client";
import InfluencerProfile from "../_components/InfluencerProfile";
import type { Brand } from "../../../../../lib/types";
import type { User, Influencer, YouTubeAccount } from "@prisma/client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Using Prisma's generated types for consistency
type BrandUser = User & {
  brand: Brand | null;
  brands: {
    id: string;
    name: string;
    logo: string | null;
  }[];
};

type YouTubeVideo = {
  id: string;
  publishedAt: Date;
  title: string;
  description: string | null;
  thumbnailUrl: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
};

type YouTubeAnalytics = {
  date: Date;
  subscriberCount: number;
  viewCount: number;
};

type ExtendedYouTubeAccount = YouTubeAccount & {
  videos: YouTubeVideo[];
  analytics: YouTubeAnalytics[];
};

type ExtendedInfluencer = Influencer & {
  user: Pick<User, "email" | "image">;
  youtubeAccount: ExtendedYouTubeAccount | null;
};

export default async function InfluencerPage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }

  const { slug } = await params;
  if (!slug) {
    redirect("/dashboard");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      brands: {
        select: {
          id: true,
          name: true,
          logo: true,
        },
      },
    },
  });

  if (!currentUser || !currentUser.brands.length) {
    redirect("/onboarding");
  }

  const influencer = await prisma.influencer.findUnique({
    where: {
      id: slug,
    },
    include: {
      user: {
        select: {
          email: true,
          image: true,
        },
      },
      youtubeAccount: {
        include: {
          videos: {
            orderBy: {
              publishedAt: "desc",
            },
            take: 6,
          },
          analytics: {
            orderBy: {
              date: "desc",
            },
            take: 30,
          },
        },
      },
    },
  });

  if (!influencer) {
    redirect("/dashboard");
  }

  if (!currentUser?.brands?.[0]) {
    redirect("/onboarding");
  }

  const activeBrand = {
    id: currentUser.brands[0].id,
    name: currentUser.brands[0].name,
    logo: currentUser.brands[0].logo,
  };

  const brandUserData: BrandUser = {
    ...currentUser,
    //    @ts-ignore
    brand: activeBrand,
    brands: currentUser.brands,
  };

  return (
    <InfluencerProfile
      //    @ts-ignore
      influencer={influencer as ExtendedInfluencer}
      brand={brandUserData}
    />
  );
}
