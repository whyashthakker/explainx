// app/use-cases/_components/available-tools.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Youtube, ChevronRight } from 'lucide-react';
import { tools } from '../../../../../data/tool-data';

const platformIcons = {
  Instagram: Instagram,
  TikTok: Youtube,
};

export function AvailableTools() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Free Marketing Tools
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Goal is to help you learn AI Agents Fast!
          </p>
        </div>

        {/* Platform Filter */}
        <div className="mt-10 flex justify-center gap-4">
          {Object.keys(platformIcons).map((platform) => (
            <button
              key={platform}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium 
                       bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tools.map((tool) => {
            const PlatformIcon = platformIcons[tool.platform as keyof typeof platformIcons];
            
            return (
              <Link 
                key={tool.id} 
                href={`/tools/${tool.id}`}
                className="relative isolate flex flex-col justify-between overflow-hidden rounded-2xl bg-gray-50 px-6 pb-8 pt-16 shadow-sm transition-all hover:shadow-md"
              >
                <div>
                  {/* Platform Badge */}
                  <div className="flex items-center gap-2 absolute top-4 left-6">
                    {PlatformIcon && <PlatformIcon className="h-5 w-5" />}
                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                      {tool.platform}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                      Free
                    </span>
                  </div>

                  {/* Tool Content */}
                  <h3 className="mt-8 text-lg font-semibold leading-7 tracking-tight text-gray-900">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600 line-clamp-3">
                    {tool.description}
                  </p>
                </div>

                {/* Key Features */}
                <div className="mt-6">
                  <ul className="space-y-2">
                    {tool.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="mr-2 h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-6 flex items-center text-sm font-semibold text-indigo-600">
                  {tool.ctaText}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Tools CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View All Tools
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}