import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { auth } from '../../../../../auth';
import { getConfig, isValidAgentType } from './config';

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

        // Authentication
        const session = await auth();
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { message: 'Authentication required' },
                { status: 401 }
            );
        }

        const body = await req.json();

        // Get user
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Validate parameters
        const agentConfig = getConfig(agentType);
        if (!agentConfig) {
            return NextResponse.json(
                { message: 'Agent configuration not found' },
                { status: 500 }
            );
        }

        const validation = agentConfig.validateParams(body);
        if (!validation.valid) {
            return NextResponse.json(
                { message: validation.message || 'Invalid parameters' },
                { status: 400 }
            );
        }

        // Check daily search limit (skip for admin users)
        if (!user.isAdmin) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const searchCount = await prisma.tasks.count({
                where: {
                    userId: user.id,
                    agentType,
                    createdAt: {
                        gte: today
                    }
                }
            });

            if (searchCount >= 2) {
                return NextResponse.json(
                    { message: 'Daily search limit reached (2 searches per day)' },
                    { status: 429 }
                );
            }
        }

        // Format agent request
        const { agentTypeForAPI, webhookPath, message, parameters } =
            agentConfig.formatAgentRequest(validation.parameters);

        // Prepare data for the AI agent
        const agentData = {
            agent_type: agentTypeForAPI,
            parameters,
            webhook: {
                url: process.env.WEBHOOK_URL || `https://f6be-45-249-40-106.ngrok-free.app/api/agents/${webhookPath}/webhook`,
                headers: {
                    Authorization: `Bearer ${process.env.WEBHOOK_AUTH_TOKEN || "your-secret-token"}`
                }
            }
        };

        // Call the AI agent API
        const response = await fetch('https://ai-agents-explainx-backend-production.up.railway.app/api/v1/agents/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AI_AGENT_API_KEY || ""}`
            },
            body: JSON.stringify(agentData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `API error: ${response.statusText}`;

            try {
                const errorData = JSON.parse(errorText);
                errorMessage = `API error: ${errorData.message || response.statusText}`;
            } catch {
                errorMessage = `API error: ${errorText || response.statusText}`;
            }

            console.error('External API error:', errorMessage, 'Status:', response.status);
            throw new Error(errorMessage);
        }

        const data = await response.json();

        // Create a new task in the unified Tasks table
        const newTask = await prisma.tasks.create({
            data: {
                task_id: data.task_id,
                agentType,
                status: 'processing',
                message,
                parameters,
                userId: user.id,
            },
        });

        return NextResponse.json(
            { message: 'Task created successfully', task: newTask },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating task:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}