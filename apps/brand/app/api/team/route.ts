// app/api/team/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";
import { type NextRequest } from "next/server";

interface TeamUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

interface TeamMember {
  id: string;
  role: string;
  inviteStatus: string;
  user: TeamUser;
}

interface Team {
  id: string;
  members: TeamMember[];
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user with all influencer profiles
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        influencers: {
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
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check user type and portal access
    if (user.userType !== "INFLUENCER" && user.userType !== "BOTH") {
      return NextResponse.json(
        { error: "Not authorized to access influencer portal" },
        { status: 403 },
      );
    }

    if (user.activePortal !== "INFLUENCER") {
      return NextResponse.json(
        { error: "Please switch to influencer portal" },
        { status: 403 },
      );
    }

    // Get active influencer profile
    const activeInfluencer = user.influencers[0]; // You might want to modify this logic
    if (!activeInfluencer) {
      return NextResponse.json(
        { error: "Influencer profile not found" },
        { status: 404 },
      );
    }

    // Create team if it doesn't exist
    if (!activeInfluencer.team) {
      const team = (await prisma.influencerTeam.create({
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
      })) as Team;

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
}

