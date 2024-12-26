import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import prisma from "@repo/db/client";
// GET team details and members
export const GET = auth(async function GET(req) {
  try {
    if (!req.auth?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: req.auth.user.email },
      include: {
        influencer: {
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

    if (!user?.influencer) {
      return NextResponse.json(
        { error: "Influencer profile not found" },
        { status: 404 },
      );
    }

    // Create team if it doesn't exist
    if (!user.influencer.team) {
      const team = await prisma.influencerTeam.create({
        data: {
          influencerId: user.influencer.id,
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

    return NextResponse.json({ team: user.influencer.team });
  } catch (error) {
    console.error("Team fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch team" },
      { status: 500 },
    );
  }
});
