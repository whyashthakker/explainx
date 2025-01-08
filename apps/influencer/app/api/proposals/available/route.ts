// app/api/proposals/available/route.ts
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { auth } from "../../../../auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        influencers: true,
        brands: true,
      },
    });

    if (!user?.influencers?.[0]) {
      return new NextResponse("Influencer profile not found", { status: 404 });
    }

    const influencer = user.influencers[0];
    const userBrandIds = user.brands.map((brand) => brand.id);

    const proposals = await prisma.campaignProposal.findMany({
      where: {
        status: "OPEN",
        campaign: {
          brandId: {
            notIn: userBrandIds,
          },
        },
      },
      include: {
        campaign: {
          include: {
            brand: {
              select: {
                name: true,
                logo: true,
                industry: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(proposals);
  } catch (error) {
    console.error("Failed to fetch proposals:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
//for production
// export async function GET() {
//   const session = await auth();

//   if (!session?.user?.email) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }

//   try {
//     // Get the influencer profile
//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email },
//       include: { influencers: true },
//     });

//     if (!user?.influencers?.[0]) {
//       return new NextResponse("Influencer profile not found", { status: 404 });
//     }

//     const influencer = user.influencers[0];

//     // Get matching proposals
//     const proposals = await prisma.campaignProposal.findMany({
//       where: {
//         status: "OPEN",
//         minFollowers: { lte: influencer.followers },
//         OR: [
//           { maxFollowers: null },
//           { maxFollowers: { gte: influencer.followers } },
//         ],
//         targetPlatforms: {
//           hasSome: influencer.platforms,
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json(proposals);
//   } catch (error) {
//     console.error("Failed to fetch proposals:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
