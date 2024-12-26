import prisma from "@repo/db/client";
import { auth } from "../../../../../auth";
import { NextResponse } from "next/server";

//@ts-ignore
export const DELETE = auth(async function DELETE(
  req,
  { params }: { params: { memberId: string } },
) {
  try {
    if (!req.auth?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { memberId } = await params;
    const currentUser = await prisma.user.findUnique({
      where: { email: req.auth.user.email },
      include: {
        influencer: {
          include: { team: true },
        },
      },
    });

    if (!currentUser?.influencer?.team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Get member to be deleted
    const memberToDelete = await prisma.influencerTeamMember.findUnique({
      where: { id: params.memberId },
      include: { team: true },
    });

    if (!memberToDelete) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Check if current user has permission (must be OWNER or ADMIN)
    const currentMember = await prisma.influencerTeamMember.findFirst({
      where: {
        teamId: currentUser.influencer.team.id,
        userId: currentUser.id,
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

    // Delete member
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
});

//@ts-ignore
// Update member role
export const PATCH = auth(async function PATCH(
  req,
  { params }: { params: { memberId: string } },
) {
  try {
    if (!req.auth?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { memberId } = await params;
    const { role } = await req.json();

    if (!["ADMIN", "MEMBER"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: req.auth.user.email },
      include: {
        influencer: {
          include: { team: true },
        },
      },
    });

    if (!currentUser?.influencer?.team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Check if current user is OWNER (only OWNER can promote to ADMIN)
    const currentMember = await prisma.influencerTeamMember.findFirst({
      where: {
        teamId: currentUser.influencer.team.id,
        userId: currentUser.id,
        role: "OWNER",
      },
    });

    if (!currentMember) {
      return NextResponse.json(
        { error: "Only team owner can change roles" },
        { status: 403 },
      );
    }

    // Get member to update
    const memberToUpdate = await prisma.influencerTeamMember.findUnique({
      where: { id: memberId },
    });

    if (!memberToUpdate) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Can't change OWNER's role
    if (memberToUpdate.role === "OWNER") {
      return NextResponse.json(
        { error: "Cannot change owner's role" },
        { status: 403 },
      );
    }

    // Update member role
    const updatedMember = await prisma.influencerTeamMember.update({
      where: { id: params.memberId },
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
});
