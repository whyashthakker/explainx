import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import prisma from "@repo/db/client";
import InfluencerProfile from "../_components/influencer-profile";

interface PageProps {
    params: Promise<{ slug: string }>;  // Note the Promise type
  }
  
  export default async function InfluencerPage({ params }: PageProps) {
    const session = await auth();
    if (!session?.user?.email) {
      redirect("/");
    }
  
    // Await the params before accessing
    const { slug } = await params;
    
    if (!slug) {
      redirect("/authenticated/dashboard");
    }
  
    // Get the current brand user
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { 
        brand: true,
      }
    });
  
    // Fetch the influencer data using the awaited slug
    const influencer = await prisma.influencer.findUnique({
      where: { 
        id: slug 
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