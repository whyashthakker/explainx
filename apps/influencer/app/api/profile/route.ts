import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { auth } from "../../../auth";

type Params = Promise<{
  email: string;
}>;

export interface UpdateProfileRequest {
  name: string;
  bio?: string | null;
  category: string;
  avatar?: string | null;
}

export async function PUT(request: Request, segmentData: { params: Params }) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = (await request.json()) as UpdateProfileRequest;

    // Get the user's influencer profile
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { influencer: true },
    });

    if (!user?.influencer) {
      return new NextResponse("Influencer profile not found", { status: 404 });
    }

    // Store the influencer ID outside the transaction since we've confirmed it exists
    const influencerId = user.influencer.id;
    const userId = user.id;

    // Update both the influencer and user profiles in a transaction
    const updatedInfluencer = await prisma.$transaction(async (prisma) => {
      // Update the influencer profile
      const updatedInfluencer = await prisma.influencer.update({
        where: { id: influencerId },
        data: {
          name: data.name,
          bio: data.bio,
          category: data.category,
          avatar: data.avatar,
        },
      });

      // Update the corresponding user profile
      await prisma.user.update({
        where: { id: userId },
        data: {
          name: data.name,
          image: data.avatar, // Sync the avatar with user's image field
        },
      });

      return updatedInfluencer;
    });

    return NextResponse.json(updatedInfluencer);
  } catch (error) {
    console.error("Error updating profile:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
