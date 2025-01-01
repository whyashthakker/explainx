// app/use-cases/[slug]/_components/use-case-cta.tsx
import Link from 'next/link';

interface UseCaseCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function UseCaseCTA({ title, description, buttonText, buttonLink }: UseCaseCTAProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {description}
          </p>
        </div>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <Link
            href={buttonLink}
            className="rounded-md bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {buttonText}
          </Link>
          <Link
            href="/demo"
            className="text-base font-semibold leading-6 text-gray-900 hover:text-gray-700"
          >
            Schedule a demo <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}