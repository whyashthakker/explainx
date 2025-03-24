// /app/api/agents/[agentType]/task/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { auth } from '../../../../../auth';
import { isValidAgentType } from '../new-task/config';

export async function POST(
    req: Request,
    { params }: { params: { agentType: string } }
) {
    try {
        const { agentType } = await params;

        // Validate agent type
        if (!isValidAgentType(agentType)) {
            return NextResponse.json(
                { message: 'Invalid agent type' },
                { status: 400 }
            );
        }

        // Authenticate the user
        const session = await auth();

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { message: 'Authentication required' },
                { status: 401 }
            );
        }

        // Get the current user from the database
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
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

        // Fetch the task by ID and ensure it belongs to the current user and matches the agent type
        const task = await prisma.tasks.findFirst({
            where: {
                task_id: id,
                userId: user.id,
                agentType
            },
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