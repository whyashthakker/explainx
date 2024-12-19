import React, { useEffect, useState } from "react";
import { GiftIcon } from "lucide-react";

const RefundOption = () => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [activeLicenses, setActiveLicenses] = useState<number | null>(null);
  const [remainingCoupons, setRemainingCoupons] = useState<number | null>(null);
  const landingCopy = "100 TAKA REFUND."

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 1000);

    return () => clearInterval(blinkInterval);
  }, []);


  const Skeleton = () => (
    <div className="inline-block h-4 w-8 bg-green-200 animate-pulse rounded"></div>
  );

  return (
    <div className="mt-2 text-sm font-semibold text-green-600 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-1 sm:gap-2">
        <div className="flex items-center">
          <GiftIcon 
            className={`mr-1 h-4 w-4 ${isBlinking ? 'opacity-100' : 'opacity-50'} transition-opacity duration-500`} 
          />
          <span>
            {2 === null ? <Skeleton /> : 2} customers
          </span>
        </div>
        
        <div className="flex items-center">
          <span className="hidden sm:inline mx-1">•</span>
          <span>
            $20 off for next{' '}
            <strong>
              {10 === null ? <Skeleton /> : 10} &nbsp;
            </strong>
            customers.
          </span>
        </div>
        
        <div className="flex items-center">
          <span className="hidden sm:inline mx-1">•</span>
          <span>7-day refund</span>
        </div>
      </div>
    </div>
  );
};

export default RefundOption;