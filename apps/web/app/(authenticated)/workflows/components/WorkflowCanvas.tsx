import { useDrop } from 'react-dnd';
import { TaskCard } from './TaskCard';
import { Agent, Task, Tool } from '@prisma/client';
import { Label } from '@repo/ui/components/ui/label';
import { Input } from '@repo/ui/components/ui/input';
import { Textarea } from '@repo/ui/components/ui/textarea';
import type { RefCallback } from 'react';
import { Button } from '@repo/ui/components/ui/button';

interface WorkflowCanvasProps {
  selectedAgents: Agent[];
  tasks: Task[];
  availableTools: Tool[];
  taskTools: Record<string, string[]>;
  onUpdateWorkflow: (agents: string[], tasks: Task[]) => void;
  onTaskToolAssignment: (taskId: string, toolId: string, assigned: boolean) => void;
  workflowConfig: {
    agentTools: Record<string, string[]>;
  };
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

export function WorkflowCanvas({
  selectedAgents,
  tasks,
  availableTools,
  taskTools,
  onUpdateWorkflow,
  onTaskToolAssignment,
  workflowConfig,
  onUpdateTask,
}: WorkflowCanvasProps) {
  const [, drop] = useDrop(() => ({
    accept: 'AGENT',
    drop: (item: Agent) => {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        description: `Task for ${item.name}`,
        agentId: item.id,
        expectedOutput: "",
        asyncExecution: false,
        crewId: null,
        status: "PENDING",
        result: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      onUpdateWorkflow(selectedAgents.map(agent => agent.id), [...tasks, newTask]);
    },
  }));

  const handleRemoveTask = (taskId: string) => {
    onUpdateWorkflow(
      selectedAgents.map(agent => agent.id),
      tasks.filter(task => task.id !== taskId)
    );
  };

  return (
    <div
      ref={(node) => {
        (drop as (node: HTMLDivElement | null) => void)(node);
      }}
      className="border-2 border-dashed rounded-lg p-4 min-h-[400px]"
    >
      <h3 className="text-lg font-semibold mb-4">Workflow Canvas</h3>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={task.id} className="border p-4 rounded bg-white shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium">Task {index + 1}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveTask(task.id)}
              >
                Remove
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Task Description</Label>
                <Textarea
                  value={task.description}
                  onChange={(e) => onUpdateTask(task.id, { description: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Expected Output</Label>
                <Input
                  value={task.expectedOutput || ''}
                  onChange={(e) => onUpdateTask(task.id, { expectedOutput: e.target.value })}
                  className="mt-1"
                />
              </div>

              {task.agentId && (
                <div>
                  <Label>Available Tools</Label>
                  <div className="space-y-2 mt-2">
                    {availableTools.map(tool => (
                      <div key={tool.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`task-tool-${task.id}-${tool.id}`}
                          checked={taskTools[task.id]?.includes(tool.id)}
                          onChange={(e) => onTaskToolAssignment(task.id, tool.id, e.target.checked)}
                        />
                        <Label htmlFor={`task-tool-${task.id}-${tool.id}`}>{tool.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {tasks.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            onClick={() => onUpdateWorkflow(selectedAgents.map(agent => agent.id), tasks)}
          >
            Save Tasks
          </Button>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Drag agents here to create tasks
        </div>
      )}
    </div>
  );
} 