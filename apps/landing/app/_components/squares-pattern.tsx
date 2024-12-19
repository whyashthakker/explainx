import React from 'react';

export function SquaresPattern() {
  return (
    <svg
      className="absolute inset-0 -z-10 h-full w-full stroke-gray-300 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="social-network-pattern"
          width={200}
          height={200}
          x="50%"
          y={-1}
          patternUnits="userSpaceOnUse"
        >
          <path d="M100 200V.5M.5 .5H200" fill="none" />
          <circle cx="0" cy="0" r="3" fill="rgba(59, 130, 246, 0.1)" />
          <circle cx="100" cy="0" r="3" fill="rgba(59, 130, 246, 0.1)" />
          <circle cx="200" cy="0" r="3" fill="rgba(59, 130, 246, 0.1)" />
          <circle cx="0" cy="100" r="3" fill="rgba(59, 130, 246, 0.1)" />
          <circle cx="200" cy="100" r="3" fill="rgba(59, 130, 246, 0.1)" />
          <circle cx="0" cy="200" r="3" fill="rgba(59, 130, 246, 0.1)" />
          <circle cx="100" cy="200" r="3" fill="rgba(59, 130, 246, 0.1)" />
          <circle cx="200" cy="200" r="3" fill="rgba(59, 130, 246, 0.1)" />
          <path d="M0 0L100 100M200 0L100 100M0 200L100 100M200 200L100 100" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
          
          {/* Animated particle */}
          <circle r="1" fill="rgba(59, 130, 246, 0.2)">
            <animateMotion dur="15s" repeatCount="indefinite">
              <mpath href="#particle-path" />
            </animateMotion>
          </circle>
          
          {/* Particle path */}
          <path id="particle-path" d="M0 0 L100 100 M100 100 L200 0 M200 0 L100 100 M100 100 L0 200 M0 200 L100 100 M100 100 L200 200" stroke="none">
            <animate attributeName="d" dur="30s" repeatCount="indefinite" 
              values="M0 0 L100 100 M100 100 L200 0 M200 0 L100 100 M100 100 L0 200 M0 200 L100 100 M100 100 L200 200;
                      M50 50 L150 150 M150 150 L250 50 M250 50 L150 150 M150 150 L50 250 M50 250 L150 150 M150 150 L250 250;
                      M0 0 L100 100 M100 100 L200 0 M200 0 L100 100 M100 100 L0 200 M0 200 L100 100 M100 100 L200 200" />
          </path>
        </pattern>
      </defs>
      <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
        <path
          d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
          strokeWidth={0}
        />
      </svg>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill="url(#social-network-pattern)"
      />
    </svg>
  );
}