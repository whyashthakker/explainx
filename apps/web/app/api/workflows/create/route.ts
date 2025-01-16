import { auth } from "../../../../auth";
import prisma from "@repo/db/client";

interface AgentConfig {
  role: string;
  goal: string;
  backstory: string;
  tools: string[];
  verbose: boolean;
}

interface WorkflowConfig {
  name: string;
  description?: string;
  agents: AgentConfig[];
  tasks: {
    description: string;
    expected_output?: string;
    agent_name?: string;
    async_execution?: boolean;
  }[];
  process_type?: string;
  verbose?: boolean;
}

export async function POST(req: Request) {
  try {
    const workflowData = await req.json();
    
    // Transform the data to match the desired API structure
    const apiConfig = {
      config: {
        name: workflowData.config.name,
        description: workflowData.config.description,
        agents: workflowData.config.agents.map((agentId: string) => ({
          id: agentId,
          tools: workflowData.config.agentTools[agentId] || [],
          verbose: workflowData.config.verbose
        })),
        tasks: workflowData.config.tasks.map((task: any) => ({
          description: task.description,
          expected_output: task.expectedOutput,
          agent_id: task.agentId,
          async_execution: task.asyncExecution
        })),
        process_type: workflowData.config.process_type,
        verbose: workflowData.config.verbose
      }
    };

    // Create the workflow in your database
    const workflow = await prisma.workflow.create({
      data: {
        name: workflowData.config.name,
        description: workflowData.config.description,
        processType: workflowData.config.process_type,
        verbose: workflowData.config.verbose,
        customApiEndpoint: workflowData.config.customApiEndpoint,
        config: apiConfig,
        agents: {
          create: workflowData.config.agents.map((agentId: string) => ({
            agentId
          }))
        },
        tasks: {
          create: workflowData.config.tasks.map((task: any) => ({
            description: task.description,
            expectedOutput: task.expectedOutput,
            agentId: task.agentId,
            asyncExecution: task.asyncExecution
          }))
        }
      }
    });

    return new Response(JSON.stringify(workflow), {
      headers: { 'Content-Type': 'application/json' },
      status: 201
    });
  } catch (error) {
    console.error('Error creating workflow:', error);
    return new Response(JSON.stringify({ error: 'Failed to create workflow' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}