import prisma from "@repo/db/client";
import { auth } from "../../../../../auth";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ memberId: string }>;

async function getCurrentTeamMember(userId: string) {
  const influencer = await prisma.influencer.findFirst({
    where: { userId },
    include: { team: true },
  });
  if (!influencer?.team) return null;

  return prisma.influencerTeamMember.findFirst({
    where: {
      teamId: influencer.team.id,
      userId,
    },
  });
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { memberId } = await params;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.userType !== "INFLUENCER" && user.userType !== "BOTH") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const memberToDelete = await prisma.influencerTeamMember.findUnique({
      where: { id: memberId },
      include: { team: true },
    });

    if (!memberToDelete) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Check if current user has permission
    const currentMember = await prisma.influencerTeamMember.findFirst({
      where: {
        teamId: memberToDelete.teamId,
        userId: user.id,
        role: { in: ["OWNER", "ADMIN"] },
      },
    });

    if (!currentMember) {
      return NextResponse.json(
        { error: "Not authorized to remove members" },
        { status: 403 },
      );
    }

    // Can't delete OWNER
    if (memberToDelete.role === "OWNER") {
      return NextResponse.json(
        { error: "Cannot remove team owner" },
        { status: 403 },
      );
    }

    await prisma.influencerTeamMember.delete({
      where: { id: memberId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete member error:", error);
    return NextResponse.json(
      { error: "Failed to delete member" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { memberId } = await params;
    const { role } = await req.json();

    if (!["ADMIN", "MEMBER"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
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

    const memberToUpdate = await prisma.influencerTeamMember.findUnique({
      where: { id: memberId },
    });

    if (!memberToUpdate) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Check if current user is OWNER
    const currentMember = await prisma.influencerTeamMember.findFirst({
      where: {
        teamId: memberToUpdate.teamId,
        userId: user.id,
        role: "OWNER",
      },
    });

    if (!currentMember) {
      return NextResponse.json(
        { error: "Only team owner can change roles" },
        { status: 403 },
      );
    }

    // Can't change OWNER's role
    if (memberToUpdate.role === "OWNER") {
      return NextResponse.json(
        { error: "Cannot change owner's role" },
        { status: 403 },
      );
    }

    const updatedMember = await prisma.influencerTeamMember.update({
      where: { id: memberId },
      data: { role },
    });

    return NextResponse.json({ success: true, member: updatedMember });
  } catch (error) {
    console.error("Update role error:", error);
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 },
    );
  }
}
