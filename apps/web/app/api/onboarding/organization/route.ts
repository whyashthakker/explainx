import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { organizationSchema } from "../../../../lib/schema";
import prisma from "@repo/db/client";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const data = organizationSchema.parse(json);

    const organization = await prisma.organization.create({
      data: {
        name: data.name,
        industry: data.industry,
        size: data.size,
        website: data.website || null,
        team: {
          create: {
            members: {
              create: {
                userId: session.user.id,
                role: "OWNER",
                inviteStatus: "ACCEPTED",
              },
            },
          },
        },
      },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { onboardingStep: "TEAM_INVITES" },
    });

    return NextResponse.json({ organizationId: organization.id });
  } catch (error) {
    console.error("Error creating organization:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
