import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";

// Add this interface before the POST function
interface TaskConfig {
  description?: string;
  expectedOutput?: string;
  asyncExecution?: boolean;
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const body = await req.json();
    
    // Validate the request body has required config
    if (!body.config) {
      return NextResponse.json(
        { error: "Missing config in request body" },
        { status: 400 }
      );
    }

    const { config } = body;

    // Basic validation of required fields
    if (!config.name || !config.description) {
      return NextResponse.json(
        { error: "Missing required fields: name and description" },
        { status: 400 }
      );
    }

    // Create the agent in the database
    const agent = await prisma.agent.create({
      data: {
        name: config.name,
        description: config.description,
        price: 0, // Default price
        category: "general", // Default category
        role: "assistant", // Default role
        goal: "To help users with their tasks", // Default goal
        backstory: "I am an AI assistant", // Default backstory
        verbose: true, // Default verbose setting
      }
    });
    // Create tasks if they exist in the config
    if (config.tasks && Array.isArray(config.tasks)) {
      await prisma.task.createMany({
        data: config.tasks.map((task: TaskConfig) => ({
          description: task.description || "Default task description",
          expectedOutput: task.expectedOutput || "Expected output not specified",
          agentId: agent.id,
          asyncExecution: task.asyncExecution || false,
          status: "PENDING"
        }))
      });
    }

    return NextResponse.json({ agent }, { status: 201 });

  } catch (error) {
    console.error("Error adding agent:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
