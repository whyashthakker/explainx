"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Label } from "@repo/ui/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Task {
  description: string;
  expectedOutput: string;
  asyncExecution: boolean;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
}

export default function CreateAgent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    config: {
      name: "",
      description: "",
      tasks: [{ description: "", expectedOutput: "", asyncExecution: false }] as Task[]
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/agents/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/marketplace");
      } else {
        console.error("Failed to create agent");
      }
    } catch (error) {
      console.error("Error creating agent:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [name]: value
      }
    }));
  };

  const handleTaskChange = (index: number, field: keyof Task, value: string | boolean) => {
    setFormData((prev) => {
      const newTasks = [...prev.config.tasks];
      newTasks[index] = {
        description: newTasks[index]?.description || "",
        expectedOutput: newTasks[index]?.expectedOutput || "",
        asyncExecution: newTasks[index]?.asyncExecution || false,
        ...newTasks[index],
        [field]: value
      };
      return {
        ...prev,
        config: {
          ...prev.config,
          tasks: newTasks
        }
      };
    });
  };

  const addTask = () => {
    setFormData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        tasks: [...prev.config.tasks, { description: "", expectedOutput: "", asyncExecution: false }]
      }
    }));
  };

  const removeTask = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        tasks: prev.config.tasks.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Agent with Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.config.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.config.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Tasks</Label>
                <Button type="button" variant="outline" size="sm" onClick={addTask}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>

              {formData.config.tasks.map((task, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <Label>Task {index + 1}</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTask(index)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`task-${index}-description`}>Description</Label>
                        <Textarea
                          id={`task-${index}-description`}
                          value={task.description}
                          onChange={(e) => handleTaskChange(index, "description", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`task-${index}-expected`}>Expected Output</Label>
                        <Textarea
                          id={`task-${index}-expected`}
                          value={task.expectedOutput}
                          onChange={(e) => handleTaskChange(index, "expectedOutput", e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`task-${index}-async`}
                          checked={task.asyncExecution}
                          onChange={(e) => handleTaskChange(index, "asyncExecution", e.target.checked)}
                        />
                        <Label htmlFor={`task-${index}-async`}>Async Execution</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button type="submit">Create Agent</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
