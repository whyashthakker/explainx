// app/api/onboarding/personal-info/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { personalInfoSchema } from "../../../../lib/schema";
import prisma from "@repo/db/client";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const data = personalInfoSchema.parse(json);

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        onboardingStep: "ORGANIZATION_DETAILS",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating personal info:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
