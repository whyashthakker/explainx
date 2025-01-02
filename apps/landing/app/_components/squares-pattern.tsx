import React from 'react';

interface SquaresPatternProps {
  className?: string;
}

export function SquaresPattern({ className = '' }: SquaresPatternProps) {
  return (
    <svg
      className={`absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="minimal-grid"
          width={40}
          height={40}
          patternUnits="userSpaceOnUse"
        >
          <path d="M20 40V0M0 20h40" fill="none" />
          <circle cx="20" cy="20" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill="url(#minimal-grid)"
      />
    </svg>
  );
}

export default SquaresPattern;