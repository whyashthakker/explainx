import { NextRequest, NextResponse } from "next/server";
import prismadb from "@repo/db";
import { auth } from "../../../../auth";
// Helper function to check if user is authenticated
async function isAuthenticated(request: NextRequest): Promise<boolean> {
  try {
    const { user } = await auth();

    if (!user?.isAdmin) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}

// PATCH /api/blog/publish - Toggle publish status of a blog post
export async function PATCH(request: NextRequest) {
  try {
    // Check if user is authenticated
    const isUserAuthenticated = await isAuthenticated(request);
    if (!isUserAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { id, isPublished } = data;

    if (!id) {
      return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
    }

    // Check if post exists
    const existingPost = await prismadb.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Update publish status
    const updatedPost = await prismadb.blogPost.update({
      where: { id },
      data: {
        isPublished:
          isPublished !== undefined ? isPublished : !existingPost.isPublished,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error toggling publish status:", error);
    return NextResponse.json(
      { error: "Failed to toggle publish status" },
      { status: 500 },
    );
  }
}

