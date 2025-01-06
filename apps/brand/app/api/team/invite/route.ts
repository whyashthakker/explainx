// app/api/team/invite/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";
import { TeamRole } from "../../../../lib/types";
import { randomBytes } from "crypto";
import { type NextRequest } from "next/server";

interface InviteRequestBody {
  email: string;
  role: TeamRole;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    console.log("Session:", session);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, role } = (await request.json()) as InviteRequestBody;
    console.log("Request payload:", { email, role });

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        brands: {
          include: {
            team: true,
          },
        },
      },
    });
    console.log("Current user:", currentUser);

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (currentUser.userType !== "BRAND" && currentUser.userType !== "BOTH") {
      return NextResponse.json(
        { error: "Not authorized to access brand portal" },
        { status: 403 },
      );
    }

    const activeBrand = currentUser.brands[0];
    console.log("Active brand:", activeBrand);
    if (!activeBrand) {
      return NextResponse.json(
        { error: "Brand profile not found" },
        { status: 404 },
      );
    }
    let team = activeBrand.team;
    console.log("Existing team:", team);

    if (!team) {
      team = await prisma.brandTeam.create({
        data: {
          brandId: activeBrand.id,
          members: {
            create: {
              userId: currentUser.id,
              role: "OWNER",
              inviteStatus: "ACCEPTED",
            },
          },
        },
      });
      console.log("Created new team:", team);
    }

    const currentMember = await prisma.brandTeamMember.findFirst({
      where: {
        teamId: team.id,
        userId: currentUser.id,
        role: { in: ["OWNER", "ADMIN"] },
      },
    });
    console.log("Current team member:", currentMember);

    const existingInvite = await prisma.brandTeamMember.findFirst({
      where: {
        teamId: team.id,
        inviteEmail: email,
        inviteStatus: "PENDING",
      },
    });
    console.log("Existing invite:", existingInvite);

    const inviteToken = randomBytes(32).toString("hex");
    console.log("Generated invite token:", inviteToken);

    const teamMember = await prisma.brandTeamMember.create({
      data: {
        teamId: team.id,
        userId: null,
        inviteEmail: email,
        role: role,
        inviteStatus: "PENDING",
        inviteToken,
      },
    });
    console.log("Created team member:", teamMember);

    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${inviteToken}`;
    console.log("Invite URL:", inviteUrl);

    return NextResponse.json({
      success: true,
      teamMember,
    });
  } catch (error) {
    console.error("Invite error:", error);
    return NextResponse.json(
      { error: "Failed to send invite" },
      { status: 500 },
    );
  }
}
