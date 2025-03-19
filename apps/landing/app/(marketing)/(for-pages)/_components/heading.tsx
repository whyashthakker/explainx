interface HeadingSectionProps {
  title: string;
  subtitle: string;
  image?: string;
}

export function HeadingSection({ title, subtitle, image }: HeadingSectionProps) {
  return (
    <div className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-20 text-white mt-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="font-cal text-5xl lg:text-6xl mb-6">{title}</h1>
            <p className="text-xl text-gray-300">{subtitle}</p>
          </div>
          {image && (
            <div className="flex-1">
              <img
                src={image}
                alt={title}
                className="rounded-lg shadow-2xl border border-gray-800"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}