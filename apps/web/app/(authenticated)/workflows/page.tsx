"use client";

import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Switch } from "@repo/ui/components/ui/switch";
import { WorkflowCanvas } from "./components/WorkflowCanvas";
import { AgentCard } from "./components/AgentCard";
import { Task, TaskStatus } from "@prisma/client";
import { JsonValue } from '@prisma/client/runtime/library';

interface Tool {
  id: string;
  name: string;
  description: string;
  apiEndpoint: string | null;
  apiKey: string | null;
  parameters: JsonValue;
  createdAt: Date;
  updatedAt: Date;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  role: string;
  price: number;
  isActive: boolean;
  goal: string;
  backstory: string;
  verbose: boolean;
  createdAt: Date;
  updatedAt: Date;
  tools?: Tool[];
}

interface WorkflowConfig {
  name: string;
  description: string;
  agents: string[];
  tasks: {
    id: string;
    description: string;
    expectedOutput: string;
    asyncExecution: boolean;
    agentId: string | null;
    crewId: string | null;
    status: TaskStatus;
    result: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
  process_type: "sequential" | "parallel";
  verbose: boolean;
  agentTools: Record<string, string[]>;
  taskTools: Record<string, string[]>;
}

export default function WorkflowsPage() {
  const [workflow, setWorkflow] = useState<{config: WorkflowConfig}>({
    config: {
      name: "",
      description: "",
      agents: [],
      tasks: [],
      process_type: "sequential",
      verbose: true,
      agentTools: {},
      taskTools: {}
    }
  });

  const [availableAgents, setAvailableAgents] = useState<Agent[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);
  const [availableTools, setAvailableTools] = useState<Tool[]>([]);
  const [customApiEndpoint, setCustomApiEndpoint] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsRes, toolsRes] = await Promise.all([
          fetch('/api/agents'),
          fetch('/api/tools')
        ]);
        
        if (agentsRes.ok) {
          const agentsData = await agentsRes.json();
          setAvailableAgents(agentsData);
        }
        
        if (toolsRes.ok) {
          const toolsData = await toolsRes.json();
          setAvailableTools(toolsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const workflowData = {
        ...workflow,
        config: {
          ...workflow.config,
          customApiEndpoint: customApiEndpoint || undefined,
          agentTools: workflow.config.agentTools
        }
      };

      const response = await fetch("/api/workflows/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workflowData),
      });

      if (!response.ok) {
        throw new Error("Failed to create workflow");
      }

      // Handle success - could redirect or show success message
    } catch (error) {
      console.error("Error creating workflow:", error);
    }
  };

  const handleWorkflowChange = (field: string, value: any) => {
    setWorkflow(prev => ({
      ...prev,
      config: {
        ...prev.config,
        [field]: value
      }
    }));
  };

  const handleToolAssignment = (agentId: string, toolId: string, assigned: boolean) => {
    setWorkflow(prev => {
      const currentTools = prev.config.agentTools[agentId] || [];
      const updatedTools = assigned 
        ? [...new Set([...currentTools, toolId])]
        : currentTools.filter(t => t !== toolId);
      
      return {
        ...prev,
        config: {
          ...prev.config,
          agentTools: {
            ...prev.config.agentTools,
            [agentId]: updatedTools
          }
        }
      };
    });
  };

  const handleTaskToolAssignment = (taskId: string, toolId: string, assigned: boolean) => {
    setWorkflow(prev => {
      const currentTools = prev.config.taskTools[taskId] || [];
      const updatedTools = assigned 
        ? [...currentTools, toolId]
        : currentTools.filter((t: string) => t !== toolId);
      
      return {
        ...prev,
        config: {
          ...prev.config,
          taskTools: {
            ...prev.config.taskTools,
            [taskId]: updatedTools
          }
        }
      };
    });
  };

  const handleAgentSelection = (agent: Agent, selected: boolean) => {
    setSelectedAgents(prev => 
      selected 
        ? [...prev, agent]
        : prev.filter(a => a.id !== agent.id)
    );

    setWorkflow(prev => {
      const updatedAgents = selected 
        ? [...prev.config.agents, agent.id]
        : prev.config.agents.filter(id => id !== agent.id);
      
      // Initialize agent tools if selected
      const updatedAgentTools = { ...prev.config.agentTools };
      if (selected) {
        updatedAgentTools[agent.id] = [];
      } else {
        delete updatedAgentTools[agent.id];
      }

      return {
        ...prev,
        config: {
          ...prev.config,
          agents: updatedAgents,
          agentTools: updatedAgentTools
        }
      };
    });
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setWorkflow(prev => ({
      ...prev,
      config: {
        ...prev.config,
        tasks: prev.config.tasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        )
      }
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Create Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Workflow Name</Label>
                    <Input
                      id="name"
                      value={workflow.config.name}
                      onChange={(e) => handleWorkflowChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={workflow.config.description}
                      onChange={(e) => handleWorkflowChange("description", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="customApi">Custom API Endpoint (Optional)</Label>
                    <Input
                      id="customApi"
                      value={customApiEndpoint}
                      onChange={(e) => setCustomApiEndpoint(e.target.value)}
                      placeholder="https://api.example.com/custom-endpoint"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="verbose"
                      checked={workflow.config.verbose}
                      onCheckedChange={(checked) => handleWorkflowChange("verbose", checked)}
                    />
                    <Label htmlFor="verbose">Verbose Mode</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Process Type</Label>
                  <select
                    value={workflow.config.process_type}
                    onChange={(e) => handleWorkflowChange("process_type", e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="sequential">Sequential</option>
                    <option value="parallel">Parallel</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Agents</h3>
                  <div className="space-y-4">
                    {availableAgents.map((agent) => (
                      <div key={agent.id} className="space-y-2">
                        <AgentCard
                          agent={agent}
                          onSelect={(selected) => handleAgentSelection(agent, selected)}
                          selected={selectedAgents.some(a => a.id === agent.id)}
                        />
                        {selectedAgents.some(a => a.id === agent.id) && (
                          <div className="ml-4">
                            <Label>Assign Tools to Agent</Label>
                            <div className="space-y-2 mt-2">
                              {availableTools.map(tool => (
                                <div key={tool.id} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`tool-${agent.id}-${tool.id}`}
                                    checked={workflow.config.agentTools[agent.id]?.includes(tool.id)}
                                    onChange={(e) => handleToolAssignment(agent.id, tool.id, e.target.checked)}
                                  />
                                  <Label htmlFor={`tool-${agent.id}-${tool.id}`}>{tool.name}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <WorkflowCanvas
                  selectedAgents={selectedAgents}
                  tasks={workflow.config.tasks}
                  availableTools={availableTools}
                  taskTools={workflow.config.taskTools}
                  onTaskToolAssignment={handleTaskToolAssignment}
                  onUpdateWorkflow={(agents, tasks) => {
                    handleWorkflowChange("agents", agents);
                    handleWorkflowChange("tasks", tasks);
                  }}
                  workflowConfig={workflow.config}
                  onUpdateTask={handleTaskUpdate}
                />
              </div>

              <Button type="submit">Create Workflow</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DndProvider>
  );
}
