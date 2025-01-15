"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  teamSize: string;
  useCase: string;
  requirements: string;
}

export function DemoBookingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    role: "",
    teamSize: "",
    useCase: "",
    requirements: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.company) {
        return;
      }
      setStep(2);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStep(3);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="h-[600px]">
        <iframe
          src={`https://calendly.com/explainx/discussion?name=${formData.name}&email=${formData.email}&a1=${formData.company}&a2=${formData.useCase}`}
          width="100%"
          height="100%"
          frameBorder="0"
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 ? (
        <>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company Inc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <Select
                name="role"
                value={formData.role}
                onValueChange={(value) =>
                  handleInputChange({
                    target: { name: "role", value },
                  } as any)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="founder">Founder/CEO</SelectItem>
                  <SelectItem value="cto">CTO/Technical Lead</SelectItem>
                  <SelectItem value="product">Product Manager</SelectItem>
                  <SelectItem value="engineering">Engineering Manager</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Next Step
          </Button>
        </>
      ) : (
        <>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teamSize">Development Team Size</Label>
              <Select
                name="teamSize"
                value={formData.teamSize}
                onValueChange={(value) =>
                  handleInputChange({
                    target: { name: "teamSize", value },
                  } as any)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Solo Developer</SelectItem>
                  <SelectItem value="2-5">2-5 developers</SelectItem>
                  <SelectItem value="6-20">6-20 developers</SelectItem>
                  <SelectItem value="21-50">21-50 developers</SelectItem>
                  <SelectItem value="50+">50+ developers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="useCase">Primary Use Case</Label>
              <Select
                name="useCase"
                value={formData.useCase}
                onValueChange={(value) =>
                  handleInputChange({
                    target: { name: "useCase", value },
                  } as any)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select primary use case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom AI Agents</SelectItem>
                  <SelectItem value="integration">System Integration</SelectItem>
                  <SelectItem value="automation">Process Automation</SelectItem>
                  <SelectItem value="api">API Development</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Specific Requirements</Label>
              <Input
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="e.g., Custom AI agent for data analysis, API integration needs..."
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="w-full"
            >
              Back
            </Button>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Schedule Demo"
              )}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}