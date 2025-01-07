import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";

export const GET = async function GET(_req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.userType !== "INFLUENCER" && user.userType !== "BOTH") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const activeInfluencer = await prisma.influencer.findFirst({
      where: { userId: user.id },
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
    });

    if (!activeInfluencer) {
      return NextResponse.json(
        { error: "Influencer profile not found" },
        { status: 404 },
      );
    }

    if (!activeInfluencer.team) {
      const team = await prisma.influencerTeam.create({
        data: {
          influencerId: activeInfluencer.id,
          members: {
            create: {
              userId: user.id,
              role: "OWNER",
              inviteStatus: "ACCEPTED",
            },
          },
        },
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
      });
      return NextResponse.json({ team });
    }

    return NextResponse.json({ team: activeInfluencer.team });
  } catch (error) {
    console.error("Team fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch team" },
      { status: 500 },
    );
  }
};
