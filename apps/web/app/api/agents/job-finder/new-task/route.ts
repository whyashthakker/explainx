// /app/api/agents/new-task/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma'; // Adjust import path as needed
import { auth } from '../../../../../auth'; // Adjust path to match your auth file location

export async function POST(req: Request) {
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

    const body = await req.json();
    const { job_title, location, experience_years, skills, job_category } = body;

    // Validate required fields
    if (!job_title || !location || !experience_years || !skills || !job_category) {
      return NextResponse.json(
        { message: 'Missing required fields' }, 
        { status: 400 }
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

    // Prepare data for the AI agent
    const agentData = {
      agent_type: "job-hunter",
      parameters: {
        job_title,
        location,
        experience_years,
        skills,
        job_category
      },
      webhook: {
        url: process.env.WEBHOOK_URL || "https://agents.explainx.ai/api/agents/job-finder/webhook",
        headers: {
          Authorization: "Bearer 1234"
        }
      }
    };

    // Call the AI agent API
    const response = await fetch('https://ai-agents-explainx-backend-production.up.railway.app/api/v1/agents/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Create a new task in our database, now with userId
    const newTask = await prisma.jobFinderTask.create({
      data: {
        task_id: data.task_id,
        status: 'processing',
        message: `Searching for ${job_title} jobs in ${location} with ${experience_years} years experience`,
        parameters: {
          job_title,
          location,
          experience_years,
          skills,
          job_category
        },
        userId: user.id, // Associate task with the current user
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