// app/use-cases/[slug]/_components/use-case-hero.tsx
import Image from 'next/image';

interface UseCaseHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export function UseCaseHero({ title, subtitle, description, image }: UseCaseHeroProps) {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">{title}</span>
              </h1>
              <h2 className="mt-3 text-base text-indigo-600 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                {subtitle}
              </h2>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                {description}
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  >
                    Get started
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          src={image}
          alt={title}
          width={1920}
          height={1080}
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
        />
      </div>
    </div>
  );
}