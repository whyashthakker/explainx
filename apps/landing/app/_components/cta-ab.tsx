import React from 'react';
import { ChromeIcon, SparklesIcon } from 'lucide-react';
import { Button } from './Button';

export function CTAButtons() {
  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-y-4 mb-5">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="flex flex-col items-center">
          <Button
            size="2xl"
            color="premium"
            className="shadow-lg"
            link={{href: '/waitlist'}}
          >
            <SparklesIcon className="mr-2 h-5 w-5" />
            Join Waitlist
          </Button>
        </div>
        <Button
          size="2xl"
          color="white"
          className="shadow-md shadow-[#33dfa0]/100"
          link={{href: '/signup'}}
        >
          <ChromeIcon className="mr-2 h-4 w-4" />
          Start for Free
        </Button>
      </div>
    </div>
  );
}