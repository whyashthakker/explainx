// /app/api/agents/[agentType]/tasks/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { auth } from '../../../../../auth';
import { isValidAgentType } from '../new-task/config';

// Fix the function signature for Next.js App Router dynamic routes
export async function GET(
    request: Request,
    { params }: { params: { agentType: string } }
) {
    try {
        const { agentType } = await params
        // Validate agent type
        if (!isValidAgentType(agentType)) {
            return NextResponse.json(
                { message: 'Invalid agent type' },
                { status: 400 }
            );
        }

        // Get the user session
        const session = await auth();

        // Check if user is authenticated
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

        // Use Tasks instead of tasks (case-sensitive model name)
        const tasks = await prisma.tasks.findMany({
            where: {
                userId: user.id,
                agentType
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