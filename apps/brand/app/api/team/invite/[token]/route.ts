import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";

// app/api/team/invite/[token]/route.ts
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ token: string }> },
) {
  try {
    const { token } = await context.params;

    const invite = await prisma.brandTeamMember.findFirst({
      where: {
        inviteToken: token,
        inviteStatus: "PENDING",
      },
      include: {
        team: {
          include: {
            brand: true,
          },
        },
      },
    });

    if (!invite) {
      return NextResponse.json(
        { error: "Invalid or expired invite" },
        { status: 404 },
      );
    }

    return NextResponse.json({ invite });
  } catch (error) {
    console.error("Invite fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch invite" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ token: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { token } = await context.params;
    const { action } = (await request.json()) as {
      action: "accept" | "decline";
    };

    if (!["accept", "decline"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const invite = await prisma.brandTeamMember.findFirst({
      where: {
        inviteToken: token,
        inviteStatus: "PENDING",
      },
    });

    if (!invite || !user) {
      return NextResponse.json(
        { error: "Invalid or expired invite" },
        { status: 404 },
      );
    }

    const updatedMember = await prisma.brandTeamMember.update({
      where: { id: invite.id },
      data: {
        userId: user.id,
        inviteStatus: action === "accept" ? "ACCEPTED" : "DECLINED",
        inviteToken: null,
      },
    });

    return NextResponse.json({ success: true, member: updatedMember });
  } catch (error) {
    console.error("Invite response error:", error);
    return NextResponse.json(
      { error: "Failed to process invite" },
      { status: 500 },
    );
  }
}

