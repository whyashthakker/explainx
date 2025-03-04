import { NextRequest, NextResponse } from "next/server";
import prismadb from "@repo/db";

type Params = Promise<{ id: string }>;

// GET /api/blog/[id] - Get a single blog post by ID and all related posts with the same slug
export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
    }

    // First, get the main post
    const mainPost = await prismadb.blogPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (!mainPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Then, get all related posts with the same slug
    const relatedPosts = await prismadb.blogPost.findMany({
      where: {
        slug: mainPost.slug,
        id: { not: mainPost.id }, // Exclude the main post
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    // Return both the main post and related posts
    return NextResponse.json({
      mainPost,
      relatedPosts,
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 },
    );
  }
}
