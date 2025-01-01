// app/use-cases/[slug]/_components/use-case-features.tsx
import { 
    Search, 
    LayoutDashboard, 
    ChartBar, 
    Settings, 
    Users, 
    TrendingUp 
  } from "lucide-react";
import { Benefit, Feature } from "../../../../../types/use-cases";
  
  const iconMap = {
    SearchIcon: Search,
    LayoutIcon: LayoutDashboard,
    ChartIcon: ChartBar,
    SettingsIcon: Settings,
    UsersIcon: Users,
    TrendingIcon: TrendingUp
  } as const;
  
  interface UseCaseFeaturesProps {
    features: Feature[];
    benefits: Benefit[];
  }
  
  export function UseCaseFeatures({ features, benefits }: UseCaseFeaturesProps) {
    return (
      <div className="py-24 bg-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Features Section */}
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform provides all the tools and features you need to run successful influencer marketing campaigns.
            </p>
          </div>
  
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = iconMap[feature.icon];
                return (
                  <div key={feature.title} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <Icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
  
          {/* Benefits Section */}
          <div className="mx-auto mt-32 max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Benefits
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Real results for your business
            </p>
          </div>
  
          <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex flex-col bg-gray-400/5 p-8">
                    <dt className="text-sm font-semibold leading-6 text-gray-600">
                      {benefit.title}
                    </dt>
                    {benefit.stats && (
                      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                        {benefit.stats}
                      </dd>
                    )}
                    <dd className="mt-4 text-base leading-7 text-gray-600">
                      {benefit.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }