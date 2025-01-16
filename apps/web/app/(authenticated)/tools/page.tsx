"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";

interface Tool {
  id: string;
  name: string;
  description: string;
  apiEndpoint?: string;
  parameters?: any;
  createdAt: string;
  updatedAt: string;
}

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch("/api/tools");
        if (!response.ok) {
          throw new Error("Failed to fetch tools");
        }
        const data = await response.json();
        setTools(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tools");
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading tools...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tools</h1>
        <Link href="/tools/add">
          <Button>Add New Tool</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card key={tool.id}>
            <CardHeader>
              <CardTitle>{tool.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{tool.description}</p>
              {tool.apiEndpoint && (
                <p className="mt-2 text-sm text-gray-500">
                  API Endpoint: {tool.apiEndpoint}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-400">
                Created: {new Date(tool.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No tools found. Add your first tool!</p>
        </div>
      )}
    </div>
  );
}
