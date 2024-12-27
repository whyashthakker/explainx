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

    // Update the influencer profile
    const updatedInfluencer = await prisma.influencer.update({
      where: { id: user.influencer.id },
      data: {
        name: data.name,
        bio: data.bio,
        category: data.category,
        avatar: data.avatar,
      },
    });

    return NextResponse.json(updatedInfluencer);
  } catch (error) {
    console.error("Error updating profile:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
