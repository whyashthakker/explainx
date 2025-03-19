import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma'; // Adjust import path as needed
import { auth } from '../../../../auth'; // Adjust path to match your auth file location

export async function GET() {
  try {
    // Get the user session using your auth function
    const session = await auth();
    
    // Check if user is authenticated
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

    // Get only tasks that belong to the current user, ordered by creation date (newest first)
    const tasks = await prisma.realEstateTask.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(tasks);
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message }, 
      { status: 500 }
    );
  }
}