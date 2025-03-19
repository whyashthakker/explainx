"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { cn } from "@repo/ui/lib/utils";

const guarantees = [
  {
    icon: "/images/icons/delivery/fast.svg",
    title: "Rapid Agent Development",
    description: "Deploy your first AI agent within 2-4 weeks, with our efficient development and integration process.",
  },
  {
    icon: "/images/icons/delivery/scalable.svg",
    title: "Scalable Architecture",
    description: "Build agents that can handle growing workloads, with infrastructure that scales seamlessly with your needs.",
  },
  {
    icon: "/images/icons/delivery/analytics.svg",
    title: "Performance Analytics",
    description: "Comprehensive dashboards tracking agent performance, efficiency metrics, and automation success rates.",
  },
  {
    icon: "/images/icons/delivery/team.svg",
    title: "Expert Training & Support",
    description: "Dedicated AI specialists providing hands-on training and continuous support for your team.",
  },
  {
    icon: "/images/icons/delivery/safe.svg",
    title: "Security & Compliance",
    description: "Enterprise-grade security protocols and compliance with industry standards for all AI implementations.",
  },
  {
    icon: "/images/icons/delivery/design.svg",
    title: "Intuitive Interfaces",
    description: "User-friendly interfaces designed for maximum adoption and minimal learning curve.",
  },
  {
    icon: "/images/icons/delivery/flexible.svg",
    title: "Customization Freedom",
    description: "Fully customizable agents that adapt to your specific workflows and business processes.",
  },
  {
    icon: "/images/icons/delivery/support.svg",
    title: "24/7 Technical Support",
    description: "Round-the-clock support for critical agent operations and immediate issue resolution.",
  },
  {
    icon: "/images/icons/delivery/money.svg",
    title: "ROI-Driven Development",
    description: "Guaranteed positive return on investment through measurable automation efficiency gains.",
  },
];

export function GuaranteesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative bg-background">
      {/* Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-cal font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Guarantees to You
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              We commit to excellence in AI agent development, training, and support
            </p>
          </div>
        </div>

        <div className="mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 mt-8 md:mt-12">
          {guarantees.map((guarantee, index) => (
            <Card
              key={index}
              className={cn(
                "relative overflow-hidden border border-border/50",
                "bg-gradient-to-b from-background/90 to-background/80",
                "backdrop-blur-sm",
                "transition-all duration-300",
                "hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5",
              )}
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Image
                    src={guarantee.icon}
                    alt={guarantee.title}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>
                <h3 className="font-cal text-xl font-bold tracking-tight">
                  {guarantee.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {guarantee.description}
                </p>

                {/* Decorative gradient */}
                <div
                  className="absolute inset-x-0 bottom-0 h-px opacity-50"
                  style={{
                    background: "linear-gradient(90deg, var(--primary) 0%, transparent 100%)",
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Background gradients */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[300px] rounded-full bg-primary/30 blur-[128px] opacity-20" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-primary/30 blur-[128px] opacity-20" />
    </section>
  );
}

export default GuaranteesSection;