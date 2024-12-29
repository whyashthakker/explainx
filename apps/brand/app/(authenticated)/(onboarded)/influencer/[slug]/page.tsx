// app/(authenticated)/authenticated/influencer/[slug]/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import prisma from "@repo/db/client";
import InfluencerProfile from "../_components/influencer-profile";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type BrandUser = {
  email: string;
  image: string | null;
  brand: {
    id: string;
    name: string;
    logo: string | null;
  } | null;
};

type InfluencerData = {
  id: string;
  name: string;
  avatar: string | null;
  category: string;
  followers: number;
  platforms: ("YOUTUBE" | "INSTAGRAM" | "TIKTOK")[];
  user: {
    email: string;
    image: string | null;
  };
  youtubeAccount?: {
    id: string;
    channelId: string;
    channelTitle: string;
    viewCount: number;
    subscriberCount: number;
    videoCount: number;
    videos: {
      id: string;
      publishedAt: Date;
      title: string;
      description: string | null;
      thumbnailUrl: string;
      viewCount: number;
      likeCount: number;
      commentCount: number;
    }[];
    analytics: {
      date: Date;
      subscriberCount: number;
      viewCount: number;
    }[];
  } | null;
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

  const currentUser = (await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      brand: true,
    },
  })) as BrandUser | null;

  const influencer = (await prisma.influencer.findUnique({
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
  })) as InfluencerData | null;

  if (!influencer) {
    redirect("/authenticated/dashboard");
  }

  return <InfluencerProfile influencer={influencer} brand={currentUser} />;
}
