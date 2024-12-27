import React from 'react';
import { ChromeIcon, ShieldQuestion, SparklesIcon, TvIcon } from 'lucide-react';
import { Button } from './Button';

export function CTAButtonsProducts() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 my-8">
      <Button
        size="2xl"
        color="premium"
        className="shadow-lg w-full sm:w-auto"
        link={{href: '/waitlist'}}
      >
        <SparklesIcon className="mr-2 h-5 w-5" />
        Join Waitlist
      </Button>
      
      <Button
        size="2xl"
        color="white"
        className="shadow-md shadow-[#33dfa0]/100 w-full sm:w-auto"
        link={{href: '/demo'}}
      >
        <ShieldQuestion className="mr-2 h-4 w-4" />
        How it works?
      </Button>
    </div>
  );
}