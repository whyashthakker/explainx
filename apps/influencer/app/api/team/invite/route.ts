import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";
import { TeamRole } from "../../../../lib/types";
import { randomBytes } from "crypto";

async function handleBrandInvite(
  userId: string,
  email: string,
  role: TeamRole,
) {
  const brand = await prisma.brand.findFirst({
    where: { userId },
    include: { team: true },
  });

  if (!brand) {
    return { error: "Brand profile not found", status: 404 };
  }

  let team = brand.team;
  if (!team) {
    team = await prisma.brandTeam.create({
      data: {
        brandId: brand.id,
        members: {
          create: {
            userId,
            role: "OWNER",
            inviteStatus: "ACCEPTED",
          },
        },
      },
    });
  }

  const currentMember = await prisma.brandTeamMember.findFirst({
    where: {
      teamId: team.id,
      userId,
      role: { in: ["OWNER", "ADMIN"] },
    },
  });

  if (!currentMember) {
    return { error: "Not authorized to invite members", status: 403 };
  }

  const existingMember = await prisma.brandTeamMember.findFirst({
    where: {
      teamId: team.id,
      OR: [
        { user: { email } },
        { inviteStatus: "PENDING", inviteEmail: email },
      ],
    },
  });

  if (existingMember) {
    return {
      error: "User already a member or has pending invite",
      status: 400,
    };
  }

  const inviteToken = randomBytes(32).toString("hex");
  const teamMember = await prisma.brandTeamMember.create({
    data: {
      teamId: team.id,
      role,
      inviteStatus: "PENDING",
      inviteToken,
      inviteEmail: email,
      userId: null,
    },
  });

  return { success: true, teamMember, inviteToken };
}

async function handleInfluencerInvite(
  userId: string,
  email: string,
  role: TeamRole,
) {
  const influencer = await prisma.influencer.findFirst({
    where: { userId },
    include: { team: true },
  });

  if (!influencer) {
    return { error: "Influencer profile not found", status: 404 };
  }

  let team = influencer.team;
  if (!team) {
    team = await prisma.influencerTeam.create({
      data: {
        influencerId: influencer.id,
        members: {
          create: {
            userId,
            role: "OWNER",
            inviteStatus: "ACCEPTED",
          },
        },
      },
    });
  }

  const currentMember = await prisma.influencerTeamMember.findFirst({
    where: {
      teamId: team.id,
      userId,
      role: { in: ["OWNER", "ADMIN"] },
    },
  });

  if (!currentMember) {
    return { error: "Not authorized to invite members", status: 403 };
  }

  const existingMember = await prisma.influencerTeamMember.findFirst({
    where: {
      teamId: team.id,
      OR: [
        { userId: { not: null }, user: { email } },
        { inviteStatus: "PENDING", inviteEmail: email },
      ],
    },
  });

  if (existingMember) {
    return {
      error: "User already a member or has pending invite",
      status: 400,
    };
  }

  const inviteToken = randomBytes(32).toString("hex");
  const teamMember = await prisma.influencerTeamMember.create({
    data: {
      teamId: team.id,
      role,
      inviteStatus: "PENDING",
      inviteToken,
      inviteEmail: email,
      userId: null,
    },
  });

  return { success: true, teamMember, inviteToken };
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, role } = await req.json();
    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        brands: true,
        influencers: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let result;
    const hasInfluencer = user.influencers.length > 0;

    if (hasInfluencer) {
      result = await handleInfluencerInvite(user.id, email, role as TeamRole);
    } else {
      return NextResponse.json(
        { error: "No valid profile found" },
        { status: 404 },
      );
    }

    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }

    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${result.inviteToken}`;
    return NextResponse.json({
      success: true,
      teamMember: result.teamMember,
      inviteUrl,
    });
  } catch (error) {
    console.error("Failed to send invite:", error);
    return NextResponse.json(
      { error: "Failed to send invite" },
      { status: 500 },
    );
  }
}
