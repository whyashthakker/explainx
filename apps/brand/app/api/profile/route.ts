// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { auth } from "../../../auth";

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get current user and brand
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        brands: true,
      },
    });

    if (!user || !user.brands[0]) {
      return new NextResponse("Brand not found", { status: 404 });
    }

    const brandId = user.brands[0].id;
    const formData = await req.formData();

    // Parse maxBudget if it exists
    let maxBudget: number | null = null;
    const maxBudgetStr = formData.get("maxBudget");
    if (maxBudgetStr) {
      const parsed = parseFloat(maxBudgetStr as string);
      if (!isNaN(parsed)) {
        maxBudget = parsed;
      }
    }

    // Parse preferred categories
    let preferredCategories: string[] = [];
    const categoriesStr = formData.get("preferredCategories");
    if (categoriesStr) {
      preferredCategories = (categoriesStr as string)
        .split(",")
        .map((cat) => cat.trim())
        .filter(Boolean);
    }

    // Update brand profile
    const updatedBrand = await prisma.brand.update({
      where: {
        id: brandId,
      },
      data: {
        name: formData.get("name") as string,
        industry: formData.get("industry") as string,
        description: (formData.get("description") as string) ?? null,
        website: (formData.get("website") as string) ?? null,
        targetDemographic:
          (formData.get("targetDemographic") as string) ?? null,
        maxBudget,
        preferredCategories,
        logo: (formData.get("logo") as string) ?? null,
      },
      include: {
        team: {
          include: {
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedBrand);
  } catch (error) {
    console.error("[BRAND_PROFILE_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
