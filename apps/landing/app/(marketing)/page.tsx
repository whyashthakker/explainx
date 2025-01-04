"use client";

import { Suspense, useEffect, useState } from "react";
import FAQSection from "../_components/faq-section";
import {
  Features,
  FeaturesAiPersonalities,
  FeaturesAutomation,
  FeaturesCustomActions,
  FeaturesCustomPanels,
  FeaturesStats,
  FeaturesUnsubscribe,
} from "../_components/features";
import { Heading } from "../_components/heading";
import { Testimonials } from "../_components/testimonials";
import ProfileCarousel from "../_components/profile-carousel";
import Pricing from "../_components/infloq-pricing";
import CTA from "../_components/cta";

const MarketingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [discountActivated, setDiscountActivated] = useState(false);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleBuyClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discountCode: discountActivated ? 'I2MDM5MG' : undefined }),
      });
      const data = await response.json();
      if (data.checkoutUrl) window.location.href = data.checkoutUrl;
      else console.error('Error creating checkout:', data.error);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isChatOpen && event.key.toLowerCase() === 'b') {
        setDiscountActivated(true);
        handleBuyClick();
      }
    };

    const handleScroll = () => {
      const headingElement = document.querySelector('.heading');
      if (headingElement) {
        const headingRect = headingElement.getBoundingClientRect();
        setShowStickyButton(headingRect.bottom <= 0);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isChatOpen]); // Add isChatOpen as a dependency

  return (
    <div className="min-h-full flex flex-col">
      <Heading />
      <ProfileCarousel />
      <Testimonials />
      <Features />
      <FeaturesAiPersonalities />
      <FeaturesUnsubscribe />
      <FeaturesStats />
      <FeaturesCustomPanels />
      <FeaturesAutomation />
      <FeaturesCustomActions />
      {/* <CTA /> */}
      <Suspense>
        <Pricing />
      </Suspense>
      <FAQSection />
      <CTA />
    </div>
  );
}

export default MarketingPage;