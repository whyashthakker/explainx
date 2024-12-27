// app/api/team/invite/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";
import { TeamRole } from "../../../../lib/types";
import { randomBytes } from "crypto";

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
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        influencer: {
          include: {
            team: true,
          },
        },
      },
    });
    console.log("Current user:", currentUser);

    if (!currentUser?.influencer) {
      console.log("❌ No influencer profile found");
      return NextResponse.json(
        { error: "Influencer profile not found" },
        { status: 404 },
      );
    }

    // 4. Handle Team
    console.log("👥 Checking team...");
    let team = currentUser.influencer.team;
    if (!team) {
      console.log("Creating new team...");
      team = await prisma.influencerTeam.create({
        data: {
          influencerId: currentUser.influencer.id,
          members: {
            create: {
              userId: currentUser.id,
              role: "OWNER",
              inviteStatus: "ACCEPTED",
            },
          },
        },
      });
      console.log("New team created:", team);
    }

    // 5. Check Authorization
    console.log("🔑 Checking user authorization...");
    const currentMember = await prisma.influencerTeamMember.findFirst({
      where: {
        teamId: team.id,
        userId: currentUser.id,
        role: { in: ["OWNER", "ADMIN"] },
      },
    });
    console.log("Current member status:", currentMember);

    if (!currentMember) {
      console.log("❌ User not authorized to invite");
      return NextResponse.json(
        { error: "Not authorized to invite members" },
        { status: 403 },
      );
    }

    // 6. Check Existing Invite
    console.log("🔍 Checking for existing invite...");
    const existingInvite = await prisma.influencerTeamMember.findFirst({
      where: {
        teamId: team.id,
        inviteEmail: email,
        inviteStatus: "PENDING",
      },
    });
    console.log("Existing invite:", existingInvite);

    if (existingInvite) {
      console.log("❌ Invite already exists");
      return NextResponse.json(
        { error: "Invite already exists for this email" },
        { status: 400 },
      );
    }

    // 7. Generate Token
    console.log("🔑 Generating invite token...");
    const inviteToken = randomBytes(32).toString("hex");
    console.log("Generated token:", inviteToken);

    // 8. Create Team Member
    console.log("👥 Creating team member invite...");
    console.log("Team member creation data:", {
      teamId: team.id,
      inviteEmail: email,
      role,
      inviteStatus: "PENDING",
      inviteToken,
    });

    const teamMember = await prisma.influencerTeamMember.create({
      data: {
        team: { connect: { id: team.id } },
        inviteEmail: email,
        role: role as TeamRole,
        inviteStatus: "PENDING",
        inviteToken,
      },
    });
    console.log("✅ Team member created:", teamMember);

    // generate invite email from here
    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${inviteToken}`;
    console.log(inviteUrl);
    // 9. Send Response
    console.log("📤 Sending success response");
    return NextResponse.json({
      success: true,
      teamMember,
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
