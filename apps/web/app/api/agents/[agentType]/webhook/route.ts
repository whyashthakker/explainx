// /app/api/agents/[agentType]/webhook/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { isValidAgentType } from '../new-task/config';

// Using the Promise type pattern for params
type Props = {
    params: Promise<{
        agentType: string
    }>
}

export async function POST(
    req: Request,
    props: Props
) {
    try {
        // Await the params from the Promise
        const params = await props.params;
        const { agentType } = params;

        // Validate agent type
        if (!isValidAgentType(agentType)) {
            return NextResponse.json(
                { message: 'Invalid agent type' },
                { status: 400 }
            );
        }

        const body = await req.json();
        const { task_id, status, result } = body;

        // Validate required fields
        if (!task_id || !status) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Update the task in the unified Tasks table
        const updatedTask = await prisma.tasks.update({
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