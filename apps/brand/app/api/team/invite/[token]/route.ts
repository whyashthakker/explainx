// app/api/team/invite/[token]/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import prisma from "@repo/db/client";

export const GET = auth(async function GET(
  req: Request,
  { params }: { params: { token: string } },
) {
  try {
    // if (!req.auth?.user?.email) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
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
    console.log("invite form the server", invite);
    return NextResponse.json({ invite });
  } catch (error) {
    console.error("Invite fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch invite" },
      { status: 500 },
    );
  }
});

export const POST = auth(async function POST(
  req: Request,
  { params }: { params: { token: string } },
) {
  try {
    if (!req.auth?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { token } = await params;
    const { action } = await req.json();
    console.log("getting token in the server " + token);
    if (!["accept", "decline"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
    console.log(req.auth.user.email);
    const user = await prisma.user.findUnique({
      where: { email: req.auth.user.email },
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
});
