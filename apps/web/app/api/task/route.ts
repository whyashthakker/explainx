import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { TaskStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // First, store the task in our database
    const task = await prisma.task.create({
      data: {
        description: `Real estate search for ${body.parameters.city} with max price ${body.parameters.max_price}`,
        expectedOutput: `Properties matching search criteria: ${body.parameters.property_category} ${body.parameters.property_type} in ${body.parameters.city}`,
        status: TaskStatus.PENDING,
        // You can link this to an agent if you've created one in your database
        // agentId: "your-real-estate-agent-id", 
        
        // Store the parameters as part of the result for reference
        result: JSON.stringify({
          parameters: body.parameters,
          status: "pending",
        }),
      },
    });

    // Add the task_id to the request body when forwarding to the external API
    const apiRequestBody = {
      ...body,
      task_id: task.id, // Include the task ID from our database
      webhook_url: `https://b6a8-45-249-40-106.ngrok-free.app/api/agents/webhook`, // Your webhook URL
    };

    // Forward the request to the external API
    const response = await fetch(
      "https://ai-agents-explainx-backend-production.up.railway.app/api/v1/agents/run",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AGENTS_API_KEY}`,
        },
        body: JSON.stringify(apiRequestBody),
      }
    );

    if (!response.ok) {
      // Update the task status to FAILED if the external API request fails
      await prisma.task.update({
        where: { id: task.id },
        data: {
          status: TaskStatus.FAILED,
          result: JSON.stringify({
            parameters: body.parameters,
            status: "failed",
            error: "Failed to process request with external API",
          }),
        },
      });

      return NextResponse.json(
        { error: "Failed to process request", task_id: task.id },
        { status: response.status }
      );
    }

    // Get the data from the external API
    const apiData = await response.json();

    // Update the task with the initial response (still in progress)
    await prisma.task.update({
      where: { id: task.id },
      data: {
        status: TaskStatus.IN_PROGRESS,
        result: JSON.stringify({
          parameters: body.parameters,
          status: "processing",
          apiResponse: apiData,
        }),
      },
    });

    // Return both the external API response and our task ID
    return NextResponse.json({
      ...apiData,
      task_id: task.id
    });
  } catch (error) {
    console.error("Error in /api/task:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}