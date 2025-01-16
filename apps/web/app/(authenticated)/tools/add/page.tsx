"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Label } from "@repo/ui/components/ui/label";
import { Button } from "@repo/ui/components/ui/button";

type ToolType = "simple" | "custom";

export default function AddToolPage() {
  const router = useRouter();
  const [toolType, setToolType] = useState<ToolType>("simple");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      ...(toolType === "custom" && {
        apiEndpoint: formData.get("apiEndpoint") as string,
        apiKey: formData.get("apiKey") as string,
        parameters: formData.get("parameters") ? 
          JSON.parse(formData.get("parameters") as string) : 
          undefined
      })
    };

    try {
      const response = await fetch("/api/tools/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create tool");

      router.push("/tools");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create tool");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Label>Tool Type</Label>
          <Select
            value={toolType}
            onValueChange={(value) => setToolType(value as ToolType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tool type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple Tool</SelectItem>
              <SelectItem value="custom">Custom API Tool</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="e.g., web_search, market_data"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Describe what this tool does"
            />
          </div>

          {toolType === "custom" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="apiEndpoint">API Endpoint</Label>
                <Input
                  id="apiEndpoint"
                  name="apiEndpoint"
                  placeholder="https://api.example.com/v1/endpoint"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  name="apiKey"
                  type="password"
                  placeholder="Your API key"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parameters">Parameters (JSON)</Label>
                <Textarea
                  id="parameters"
                  name="parameters"
                  className="font-mono"
                  placeholder='{"param1": "value1"}'
                />
              </div>
            </>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Creating..." : "Create Tool"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 