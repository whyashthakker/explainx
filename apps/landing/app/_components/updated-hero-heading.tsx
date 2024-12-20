import React from 'react';
import { AnimatedBeamMultipleOutputDemo } from './animated-beam-demo';
import { cn } from '@repo/ui/lib/utils';

interface EnhancedHeroHeadingProps {
  className?: string;
}

const EnhancedHeroHeading: React.FC<EnhancedHeroHeadingProps> = ({ className }) => {
  return (
    <div className={cn(
      "w-full h-full flex items-center justify-center",
      className
    )}>
      <AnimatedBeamMultipleOutputDemo />
    </div>
  );
};

export default EnhancedHeroHeading;