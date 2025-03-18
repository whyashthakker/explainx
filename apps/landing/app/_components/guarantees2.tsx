import { cn } from "@repo/ui/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
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
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">Our Guarantees</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              We commit to excellence in AI agent development, training, and support
            </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10">
        {features.slice(0, 8).map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: string | React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {typeof icon === 'string' ? <img src={icon} alt={title} className="h-6 w-6" /> : icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-white transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};