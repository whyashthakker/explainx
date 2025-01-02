"use client";

// app/demo/_components/demo-booking-form.tsx
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
  monthlyBudget: string;
  goals: string;
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
    monthlyBudget: "",
    goals: "",
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
      // Validate first step
      if (!formData.name || !formData.email || !formData.company) {
        return;
      }
      setStep(2);
      return;
    }

    setIsLoading(true);
    try {
      // Send form data to your API
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

      // Show Calendly after successful submission
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
        {/* Replace YOUR_CALENDLY_URL with your actual Calendly URL */}
        <iframe
          src="https://calendly.com/explainx/discussion?name=${formData.name}&email=${formData.email}"
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
                  <SelectItem value="marketing">Marketing Manager</SelectItem>
                  <SelectItem value="growth">Growth Lead</SelectItem>
                  <SelectItem value="social">Social Media Manager</SelectItem>
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
              <Label htmlFor="teamSize">Team Size</Label>
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
                  <SelectItem value="1">Just me</SelectItem>
                  <SelectItem value="2-5">2-5 people</SelectItem>
                  <SelectItem value="6-10">6-10 people</SelectItem>
                  <SelectItem value="11-50">11-50 people</SelectItem>
                  <SelectItem value="50+">50+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyBudget">Monthly Marketing Budget</Label>
              <Select
                name="monthlyBudget"
                value={formData.monthlyBudget}
                onValueChange={(value) =>
                  handleInputChange({
                    target: { name: "monthlyBudget", value },
                  } as any)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                  <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                  <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10000+">$10,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">What are your main goals?</Label>
              <Input
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                placeholder="e.g., Increase brand awareness, drive sales..."
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