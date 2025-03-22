// /app/api/agents/job-finder/new-task/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma'; // Adjust import path as needed
import { auth } from '../../../../../auth'; // Adjust path to match your auth file location

export async function POST(req: Request) {
  try {
    // Get the user session using your auth function
    const session = await auth();
    
    // Check if user is authenticated
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { message: 'Authentication required' }, 
        { status: 401 }
      );
    }

    const body = await req.json();
    const { job_title, location, experience_years, skills, job_category } = body;

    // Validate required fields
    if (!job_title || !location || experience_years === undefined || !skills || !job_category) {
      return NextResponse.json(
        { message: 'Missing required fields' }, 
        { status: 400 }
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

    // Prepare data for the AI agent
    const agentData = {
      agent_type: "job-hunting",
      parameters: {
        job_title,
        location,
        experience_years: Number(experience_years),
        skills: Array.isArray(skills) ? skills : skills.split(',').map((s: string) => s.trim()),
        job_category
      },
      webhook: {
        url: process.env.WEBHOOK_URL || "https://agents.explainx.ai/api/agents/job-finder/webhook",
        headers: {
          Authorization: `Bearer ${process.env.WEBHOOK_AUTH_TOKEN || "your-secret-token"}`
        }
      }
    };

    // Log the agent data before sending (for debugging)
    console.log('Sending agent data:', JSON.stringify(agentData));

    try {
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
          // If response is not JSON, use the text as is
          errorMessage = `API error: ${errorText || response.statusText}`;
        }
        
        console.error('External API error:', errorMessage, 'Status:', response.status);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('External API response:', data);
      
      // Create a new task in our database
      const newTask = await prisma.jobFinderTask.create({
        data: {
          task_id: data.task_id,
          status: 'processing',
          message: `Searching for ${job_title} jobs in ${location} with ${experience_years} years experience`,
          parameters: {
            job_title,
            location,
            experience_years: Number(experience_years),
            skills: Array.isArray(skills) ? skills : skills.split(',').map((s: string) => s.trim()),
            job_category
          },
          userId: user.id, // Associate task with the current user
        },
      });

      return NextResponse.json(
        { message: 'Task created successfully', task: newTask }, 
        { status: 201 }
      );
    } catch (apiError: any) {
      console.error('Error calling external API:', apiError);
      return NextResponse.json(
        { message: 'Error communicating with AI agent service', error: apiError.message }, 
        { status: 502 }
      );
    }
  } catch (error: any) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message }, 
      { status: 500 }
    );
  }
}