// app/api/onboarding/route.ts
// app/api/onboarding/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";
import { z } from "zod";
import { Platform, UserType } from "@prisma/client";

const profileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().min(10),
  category: z.string().min(1),
  platforms: z.array(z.nativeEnum(Platform)),
});

type ProfileData = z.infer<typeof profileSchema>;

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = profileSchema.parse(body);

    // Get existing user with all profiles
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        influencers: true,
        brands: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Start a transaction to handle all updates atomically
    const result = await prisma.$transaction(async (prisma) => {
      // Check if at least one platform is connected
      const hasInstagram = await prisma.instagramAccount.findFirst({
        where: { influencerId: user.influencers[0]?.id },
      });

      const hasYoutube = await prisma.youTubeAccount.findFirst({
        where: { influencerId: user.influencers[0]?.id },
      });

      // Set isOnboarded based on platform connection
      const isOnboarded = !!(hasInstagram || hasYoutube);
      console.log(isOnboarded);
      console.log(user.id, validatedData);
      // Create influencer profile
      const influencer = await prisma.influencer.create({
        data: {
          userId: user.id,
          name: validatedData.name,
          bio: validatedData.bio,
          category: validatedData.category,
          platforms: validatedData.platforms,
          followers: 0,
          isOnboarded: isOnboarded, // Set the onboarding status
        },
      });

      console.log(influencer);

      // Determine user type based on existing profiles
      let userType: UserType = UserType.INFLUENCER;
      if (user.brands && user.brands.length > 0) {
        userType = UserType.BOTH;
      }

      // Update user with name, type, and portal
      await prisma.user.update({
        where: { id: user.id },
        data: {
          name: validatedData.name,
          userType: userType,
        },
      });

      return influencer;
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Profile creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid data",
          details: error.errors,
        },
        { status: 400 },
      );
    }

    // Handle unique constraint violations
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "Profile already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 },
    );
  }
}
