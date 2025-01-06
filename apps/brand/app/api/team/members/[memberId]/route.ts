import prisma from "@repo/db/client";
import { auth } from "../../../../../auth";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

interface UpdateRoleBody {
  role: "ADMIN" | "MEMBER";
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ memberId: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { memberId } = await context.params;

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        brands: {
          include: { team: true },
        },
      },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (currentUser.userType !== "BRAND" && currentUser.userType !== "BOTH") {
      return NextResponse.json(
        { error: "Not authorized to access brand portal" },
        { status: 403 },
      );
    }

    if (currentUser.activePortal !== "BRAND") {
      return NextResponse.json(
        { error: "Please switch to brand portal" },
        { status: 403 },
      );
    }

    const activeBrand = currentUser.brands[0];
    if (!activeBrand?.team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const memberToDelete = await prisma.brandTeamMember.findUnique({
      where: { id: memberId },
      include: { team: true },
    });

    if (!memberToDelete) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    if (memberToDelete.teamId !== activeBrand.team.id) {
      return NextResponse.json(
        { error: "Member not in your team" },
        { status: 403 },
      );
    }

    const currentMember = await prisma.brandTeamMember.findFirst({
      where: {
        teamId: activeBrand.team.id,
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

    if (memberToDelete.role === "OWNER") {
      return NextResponse.json(
        { error: "Cannot remove team owner" },
        { status: 403 },
      );
    }

    await prisma.brandTeamMember.delete({
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

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ memberId: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { memberId } = await context.params;
    const { role } = (await request.json()) as UpdateRoleBody;

    if (!["ADMIN", "MEMBER"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        brands: {
          include: { team: true },
        },
      },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (currentUser.userType !== "BRAND" && currentUser.userType !== "BOTH") {
      return NextResponse.json(
        { error: "Not authorized to access brand portal" },
        { status: 403 },
      );
    }

    if (currentUser.activePortal !== "BRAND") {
      return NextResponse.json(
        { error: "Please switch to brand portal" },
        { status: 403 },
      );
    }

    const activeBrand = currentUser.brands[0];
    if (!activeBrand?.team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const memberToUpdate = await prisma.brandTeamMember.findUnique({
      where: { id: memberId },
    });

    if (!memberToUpdate) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    if (memberToUpdate.teamId !== activeBrand.team.id) {
      return NextResponse.json(
        { error: "Member not in your team" },
        { status: 403 },
      );
    }

    const currentMember = await prisma.brandTeamMember.findFirst({
      where: {
        teamId: activeBrand.team.id,
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

    if (memberToUpdate.role === "OWNER") {
      return NextResponse.json(
        { error: "Cannot change owner's role" },
        { status: 403 },
      );
    }

    const updatedMember = await prisma.brandTeamMember.update({
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
