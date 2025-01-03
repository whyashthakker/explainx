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
  console.log("🏢 Processing brand team invite...");

  const brand = await prisma.brand.findFirst({
    where: { userId },
    include: { team: true },
  });

  if (!brand) {
    console.log("❌ No brand profile found");
    return { error: "Brand profile not found", status: 404 };
  }

  let team = brand.team;
  if (!team) {
    console.log("Creating new brand team...");
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
    console.log("New brand team created:", team);
  }

  // Check authorization
  const currentMember = await prisma.brandTeamMember.findFirst({
    where: {
      teamId: team.id,
      userId,
      role: { in: ["OWNER", "ADMIN"] },
    },
  });

  if (!currentMember) {
    console.log("❌ User not authorized to invite");
    return { error: "Not authorized to invite members", status: 403 };
  }

  // Check existing invite using OR condition to check both userId and inviteEmail
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
    console.log("❌ Member or invite already exists");
    return {
      error: "User already a member or has pending invite",
      status: 400,
    };
  }

  // Create invite
  const inviteToken = randomBytes(32).toString("hex");
  const teamMember = await prisma.brandTeamMember.create({
    data: {
      teamId: team.id,
      role,
      inviteStatus: "PENDING",
      inviteToken,
      inviteEmail: email,
      //@ts-ignore
      userId: null, // Leave userId undefined for pending invites
    },
  });

  return { success: true, teamMember, inviteToken };
}

async function handleInfluencerInvite(
  userId: string,
  email: string,
  role: TeamRole,
) {
  console.log("👤 Processing influencer team invite...");

  const influencer = await prisma.influencer.findFirst({
    where: { userId },
    include: { team: true },
  });

  if (!influencer) {
    console.log("❌ No influencer profile found");
    return { error: "Influencer profile not found", status: 404 };
  }

  let team = influencer.team;
  if (!team) {
    console.log("Creating new influencer team...");
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
    console.log("New influencer team created:", team);
  }

  // Check authorization
  const currentMember = await prisma.influencerTeamMember.findFirst({
    where: {
      teamId: team.id,
      userId,
      role: { in: ["OWNER", "ADMIN"] },
    },
  });

  if (!currentMember) {
    console.log("❌ User not authorized to invite");
    return { error: "Not authorized to invite members", status: 403 };
  }

  // Check existing invite using OR condition to check both userId and inviteEmail
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
    console.log("❌ Member or invite already exists");
    return {
      error: "User already a member or has pending invite",
      status: 400,
    };
  }

  // Create invite
  const inviteToken = randomBytes(32).toString("hex");
  const teamMember = await prisma.influencerTeamMember.create({
    data: {
      teamId: team.id,
      role,
      inviteStatus: "PENDING",
      inviteToken,
      inviteEmail: email,
      userId: null, // Explicitly set userId to null for pending invites
    },
  });

  return { success: true, teamMember, inviteToken };
}

export const POST = async function POST(req: Request) {
  console.log("🚀 Starting invite process");

  try {
    // 1. Auth Check
    console.log("👤 Checking authentication...");
    const session = await auth();
    console.log("Session data:", session);

    if (!session?.user?.email) {
      console.log("❌ No authenticated user found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse Body
    console.log("📝 Parsing request body...");
    const body = await req.json();
    const { email, role } = body;
    console.log("Request data:", { email, role });

    if (!email || !role) {
      console.log("❌ Missing required fields");
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 },
      );
    }

    // 3. Get Current User
    console.log("🔍 Finding current user...");
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    console.log("Current user:", user);

    if (!user) {
      console.log("❌ User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.activePortal) {
      console.log("❌ No active portal");
      return NextResponse.json(
        { error: "No active portal selected" },
        { status: 400 },
      );
    }

    // 4. Handle Portal-Specific Invite
    let result;
    if (user.activePortal === "BRAND") {
      if (user.userType !== "BRAND" && user.userType !== "BOTH") {
        return NextResponse.json(
          { error: "Not authorized for brand portal" },
          { status: 403 },
        );
      }
      result = await handleBrandInvite(user.id, email, role as TeamRole);
    } else if (user.activePortal === "INFLUENCER") {
      if (user.userType !== "INFLUENCER" && user.userType !== "BOTH") {
        return NextResponse.json(
          { error: "Not authorized for influencer portal" },
          { status: 403 },
        );
      }
      result = await handleInfluencerInvite(user.id, email, role as TeamRole);
    } else {
      console.log("❌ Invalid portal");
      return NextResponse.json(
        { error: "Invalid portal selection" },
        { status: 400 },
      );
    }

    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }

    // Generate invite URL
    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${result.inviteToken}`;
    console.log("Invite URL:", inviteUrl);

    // Return success response
    console.log("📤 Sending success response");
    return NextResponse.json({
      success: true,
      teamMember: result.teamMember,
    });
  } catch (error: any) {
    console.log("❌ ERROR DETAILS:");
    console.log("Error name:", error.name);
    console.log("Error message:", error.message);
    console.log("Error stack:", error.stack);
    console.log("Full error object:", error);

    return NextResponse.json(
      { error: "Failed to send invite" },
      { status: 500 },
    );
  }
};
