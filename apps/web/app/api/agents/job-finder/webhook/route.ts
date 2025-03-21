import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma'; // Adjust import path as needed

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { task_id, status, result } = body;

    // Validate required fields
    if (!task_id || !status) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update the task in the database
    const updatedTask = await prisma.jobFinderTask.update({
      where: { task_id },
      data: {
        status,
        result: result || undefined,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: 'Webhook processed successfully', task: updatedTask },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
