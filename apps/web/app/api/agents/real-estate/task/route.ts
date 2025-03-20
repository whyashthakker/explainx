import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma'; // Adjust import path as needed
import { auth } from '../../../../../auth'; // Adjust path to match your auth file location

export async function POST(req: Request) {
  try {
    // Authenticate the user
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get the current user from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Get task ID from request body
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: 'Task ID is required' },
        { status: 400 }
      );
    }

    // Fetch the task by ID and ensure it belongs to the current user
    const task = await prisma.realEstateTask.findUnique({
      where: { task_id:id, userId: user.id },
    });

    if (!task) {
      return NextResponse.json(
        { message: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { task },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error retrieving task:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
