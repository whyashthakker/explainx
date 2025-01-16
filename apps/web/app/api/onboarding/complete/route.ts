// app/api/onboarding/complete/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";
export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userMembership = await prisma.organizationTeamMember.findFirst({
      where: {
        userId: session.user.id,
        role: "OWNER",
      },
      include: {
        team: {
          include: {
            organization: true,
          },
        },
      },
    });

    if (!userMembership) {
      return new NextResponse("Organization not found", { status: 404 });
    }

    // Update organization setup status
    await prisma.organization.update({
      where: { id: userMembership.team.organization.id },
      data: {
        setupCompleted: true,
        setupStep: null,
      },
    });

    // Update user onboarding status
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        isOnboarded: true,
        onboardingStep: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
