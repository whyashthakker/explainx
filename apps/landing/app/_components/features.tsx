import clsx from "clsx";
import {
  BarChart2Icon,
  Database,
  DollarSign,
  EyeIcon,
  GlobeIcon,
  LayoutPanelLeftIcon,
  LineChart,
  LucideIcon,
  MousePointer2Icon,
  MousePointerClickIcon,
  Music2,
  Orbit,
  SmileIcon,
  Sparkles,
  SparklesIcon,
  UsersIcon,
  AirVent,
} from "lucide-react";
import Image from "next/image";

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-cal text-base leading-7 text-blue-600">
            Data-Driven Results
          </h2>
          <p className="mt-2 font-cal text-3xl text-gray-900 sm:text-4xl">
            Pay Per Click. Not Per Campaign.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Connect your analytics to showcase real results. Our platform analyzes engagement,
            audience quality, and conversion rates to ensure brands get the highest ROI from
            their influencer marketing investments.
          </p>
        </div>
      </div>
    </div>
  );
}

const featuresPlatform = [
  {
    name: "AI-Powered Matching",
    description:
      "Our AI analyzes brand requirements and influencer metrics to create perfect matches based on data, not guesswork.",
    icon: DollarSign,
  },
  {
    name: "Analytics Integration",
    description:
      "Connect your social media analytics to showcase real engagement and conversion metrics to potential brands.",
    icon: SmileIcon,
  },
  {
    name: "Verified Profiles",
    description:
      "All influencers go through our verification process to ensure quality and authenticity.",
    icon: AirVent,
  },
];

export function FeaturesAutomation() {
  return (
    <FeaturesWithImage
      imageSide="right"
      title="Intelligent Matchmaking 🛠️"
      subtitle="Data-driven influencer selection for maximum ROI"
      description="Our platform uses advanced analytics and AI to match brands with the perfect influencers based on real performance data."
      image="/features/data-driven-influencers.png"
      features={featuresPlatform}
    />
  );
}

const featuresAnalytics = [
  {
    name: "Deep Analytics",
    description:
      "Get detailed insights into audience demographics, engagement patterns, and conversion rates.",
    icon: Sparkles,
  },
  {
    name: "Performance Tracking",
    description:
      "Track campaign metrics, click-through rates, and ROI in real-time.",
    icon: Database,
  },
  {
    name: "Optimization Engine",
    description:
      "Our AI continuously analyzes performance data to optimize campaign results.",
    icon: Orbit,
  },
];

export function FeaturesStats() {
  return (
    <FeaturesWithImage
      imageSide="right"
      title="Real Results 🔥"
      subtitle="Performance Metrics That Matter"
      description="Get comprehensive insights into campaign performance, audience engagement, and conversion metrics to maximize your ROI."
      image="/features/performance-metrics-that-matter.png"
      features={featuresAnalytics}
    />
  );
}

const featuresInfluencers = [
  {
    name: "Easy Campaign Management",
    description:
      "Manage all your brand collaborations, content schedules, and payments in one place.",
    icon: MousePointer2Icon,
  },
  {
    name: "Fair Compensation",
    description:
      "Get paid based on actual performance with our click-based payment system.",
    icon: Music2,
  },
  {
    name: "Growth Insights",
    description:
      "Access detailed analytics about your audience and content performance.",
    icon: BarChart2Icon,
  },
];

export function FeaturesUnsubscribe() {
  return (
    <FeaturesWithImage
      imageSide="left"
      title="For Influencers"
      subtitle="Grow Your Personal Brand"
      description="Connect with brands that value your authentic influence and get paid fairly for your impact."
      image="/features/grow-personal-brand.png"
      features={featuresInfluencers}
    />
  );
}

const featuresBrands = [
  {
    name: "Smart Campaign Setup",
    description:
      "Define your target audience and goals, and let our AI find the perfect influencers.",
    icon: LayoutPanelLeftIcon,
  },
  {
    name: "Performance-Based Pricing",
    description:
      "Only pay for actual clicks and conversions, ensuring ROI on every campaign.",
    icon: MousePointerClickIcon,
  },
  {
    name: "Real-Time Optimization",
    description:
      "Get AI-powered suggestions to optimize your campaigns for better performance.",
    icon: SparklesIcon,
  },
];

export function FeaturesCustomPanels() {
  return (
    <FeaturesWithImage
      imageSide="left"
      title="For Brands 💼"
      subtitle="Maximum ROI Guaranteed"
      description="Connect with verified influencers who can deliver real results for your brand. Pay only for actual performance."
      image="/features/maximum-roi-guaranteed.png"
      features={featuresBrands}
    />
  );
}

const featuresVerification = [
  {
    name: "Profile Verification",
    description:
      "We verify every influencer's metrics, audience quality, and past performance.",
    icon: UsersIcon,
  },
  {
    name: "Global Reach",
    description:
      "Access verified influencers across different platforms and regions.",
    icon: GlobeIcon,
  },
  {
    name: "Quick Matching",
    description:
      "Our AI matches you with relevant opportunities based on your profile and performance.",
    icon: MousePointer2Icon,
  },
];

export function FeaturesAiPersonalities() {
  return (
    <FeaturesWithImage
      imageSide="right"
      title="Quality Assured ✨"
      subtitle="Verified Influencers Only"
      description="Every influencer on explainx.ai goes through our thorough verification process to ensure quality and authenticity."
      image="/features/verified-creators-only.png"
      features={featuresVerification}
    />
  );
}

const featuresIntegration = [
  {
    name: "Connect Analytics",
    description:
      "Easily connect your social media and analytics accounts to showcase your true influence.",
    icon: LayoutPanelLeftIcon,
  },
  {
    name: "Automated Reporting",
    description:
      "Get detailed performance reports and insights automatically generated for each campaign.",
    icon: SmileIcon,
  },
  {
    name: "Easy Integration",
    description:
      "Simple one-click integration with major social media platforms and analytics tools.",
    icon: AirVent,
  },
];

export function FeaturesCustomActions() {
  return (
    <FeaturesWithImage
      imageSide="left"
      title="Seamless Integration 🔄"
      subtitle="Connect Your Analytics"
      description="Connect your social media accounts and analytics tools to showcase your true influence and track campaign performance."
      image="/features/connect-your-analytics.png"
      features={featuresIntegration}
    />
  );
}

export function FeaturesWithImage(props: {
  imageSide: "left" | "right";
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: {
    name: string;
    description: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div
            className={clsx(
              "lg:pt-4",
              props.imageSide === "left"
                ? "lg:ml-auto lg:pl-4"
                : "lg:mr-auto lg:pr-4",
            )}
          >
            <div className="lg:max-w-lg">
              <h2 className="font-cal text-base leading-7 text-blue-600">
                {props.title}
              </h2>
              <p className="mt-2 font-cal text-3xl text-gray-900 sm:text-4xl">
                {props.subtitle}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {props.description}
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {props.features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-blue-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div
            className={clsx(
              "flex items-start",
              props.imageSide === "left"
                ? "justify-end lg:order-first"
                : "justify-start lg:order-last",
            )}
          >
            <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4">
              <Image
                src={props.image}
                alt="ExplainX features"
                className="w-[48rem] max-w-none rounded-xl shadow-2xl shadow-blue-500/50 ring-1 ring-gray-400/10 sm:w-[57rem]"
                width={2400}
                height={1800}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}