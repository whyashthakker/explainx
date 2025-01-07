// app/api/team/invite/[token]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import prisma from "@repo/db/client";
import { UserType } from "../../../../../lib/types";
type Params = Promise<{ token: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const { token } = await params;
    const invite = await prisma.influencerTeamMember.findFirst({
      where: {
        inviteToken: token,
        inviteStatus: "PENDING",
      },
      include: {
        team: {
          include: {
            influencer: true,
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

    console.log("invite from the server", invite);
    return NextResponse.json({ invite });
  } catch (error) {
    console.error("Invite fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch invite" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updateUserType = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        userType: UserType.INFLUENCER,
      },
    });

    const { token } = await params;
    const { action } = await req.json();

    console.log("getting token in the server " + token);

    if (!["accept", "decline"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    console.log(session.user.email);
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const invite = await prisma.influencerTeamMember.findFirst({
      where: {
        inviteToken: token,
        inviteStatus: "PENDING",
      },
    });

    console.log("invite", invite);

    if (!invite || !user) {
      return NextResponse.json(
        { error: "Invalid or expired invite" },
        { status: 404 },
      );
    }

    const updatedMember = await prisma.influencerTeamMember.update({
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
