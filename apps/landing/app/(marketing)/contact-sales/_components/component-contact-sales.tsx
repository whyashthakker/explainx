"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Loader2, Building2, Users, Code, CalendarDays } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  teamSize: string;
  message: string;
}

interface SelectChangeEvent {
  target: {
    name: string;
    value: string;
  }
}

// Main Sales Contact Form Component
const SalesContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    teamSize: '',
    message: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <CalendarDays className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
              <p className="text-muted-foreground mb-6">
                Schedule a meeting with our solutions team to discuss your AI agent requirements.
              </p>
            </div>
            <div 
              className="calendly-inline-widget" 
              data-url={`https://calendly.com/explainx/discussion?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&a1=${encodeURIComponent(formData.company)}&a2=${encodeURIComponent(formData.teamSize)}`} 
              style={{ minWidth: '320px', height: '700px' }} 
            />
            <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Enterprise Solutions</h1>
        <p className="text-lg text-muted-foreground">
          Discover how ExplainX can transform your business with custom AI agents
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6">
          <Building2 className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Custom AI Agents</h3>
          <p className="text-muted-foreground">Tailored solutions for your specific business needs</p>
        </Card>

        <Card className="p-6">
          <Users className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Team Integration</h3>
          <p className="text-muted-foreground">Seamless deployment across your organization</p>
        </Card>

        <Card className="p-6">
          <Code className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">API Access</h3>
          <p className="text-muted-foreground">Enterprise-grade API and development support</p>
        </Card>
      </div>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Work Email"
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  name="company"
                  placeholder="Company Name"
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <Select 
              name="teamSize" 
              onValueChange={(value: string) => handleChange({ 
                target: { name: 'teamSize', value } 
              } as SelectChangeEvent)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Team Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201+">201+ employees</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              name="message"
              placeholder="Tell us about your AI agent requirements and use cases"
              onChange={handleChange}
              required
              className="h-32"
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Contact Solutions Team'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// CompactSalesContact component
const CompactSalesContact: React.FC = () => {
  return (
    <div className="my-16 px-4">
      <div className="max-w-3xl mx-auto bg-gradient-to-b p-8 rounded-xl shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <Building2 className="h-8 w-8 text-primary" />
          <h3 className="text-2xl font-semibold text-foreground font-cal">
            Transform Your Business with Custom AI Agents
          </h3>
          <p className="text-muted-foreground mb-2 font-extralight">
            Get enterprise features, dedicated support, and custom AI agent development
          </p>
          <Link href="/contact-sales">
            <Button className="px-8 py-2 h-11">
              Contact Solutions Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { SalesContactForm, CompactSalesContact };