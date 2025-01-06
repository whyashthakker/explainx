interface HeadingSectionProps {
    title: string;
    subtitle: string;
    image?: string;
  }
  
  export function HeadingSection({ title, subtitle, image }: HeadingSectionProps) {
    return (
      <div className="relative bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="font-cal text-5xl lg:text-6xl mb-6">{title}</h1>
              <p className="text-xl text-gray-600">{subtitle}</p>
            </div>
            {image && (
              <div className="flex-1">
                <img
                  src={image}
                  alt={title}
                  className="rounded-lg shadow-xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }