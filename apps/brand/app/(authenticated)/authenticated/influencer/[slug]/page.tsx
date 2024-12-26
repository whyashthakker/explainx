// app/(authenticated)/authenticated/influencer/[slug]/page.tsx
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import { auth } from "../../../../../auth";
import InfluencerProfile from "../_components/influencer-profile";

interface PageProps {
  params: { slug: string };
}

export default async function InfluencerPage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }

  if (!params?.slug) {
    redirect("/authenticated/brand/dashboard");
  }

  // Get the current brand user
  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { 
      brand: true,
    }
  });

  // Fetch the influencer data
  const influencer = await prisma.influencer.findUnique({
    where: { 
      id: params.slug 
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
              publishedAt: 'desc'
            },
            take: 6
          },
          analytics: {
            orderBy: {
              date: 'desc'
            },
            take: 30
          }
        }
      }
    }
  });

  return (
    <InfluencerProfile 
      influencer={influencer} 
      brand={currentUser} 
    />
  );
}