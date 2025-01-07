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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        brands: {
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

    if (user.userType !== "BRAND" && user.userType !== "BOTH") {
      return NextResponse.json(
        { error: "Not authorized to access brand portal" },
        { status: 403 },
      );
    }

    const activeBrand = user.brands[0];
    if (!activeBrand) {
      return NextResponse.json(
        { error: "Brand profile not found" },
        { status: 404 },
      );
    }

    if (!activeBrand.team) {
      const team = await prisma.brandTeam.create({
        data: {
          brandId: activeBrand.id,
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

    return NextResponse.json({ team: activeBrand.team });
  } catch (error) {
    console.error("Team fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch team" },
      { status: 500 },
    );
  }
}
