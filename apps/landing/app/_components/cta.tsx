import React from 'react';

export default function CTA() {
  return (
    <div className="relative mt-12 px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Find Your Next Creator in Seconds
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
          Our AI matches you with the perfect creators for your brand, from a network of thousands. 
          Connect with verified creators who can deliver real results and only pay for actual performance.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Join Waitlist
          </a>
          <a href="#" className="text-lg font-semibold leading-6 text-gray-900 hover:text-gray-600">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}