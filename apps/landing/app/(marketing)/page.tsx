"use client";

import { Suspense, useEffect, useState } from "react";
import FAQSection from "../_components/faq-section";
import { Heading } from "../_components/heading";
import { Testimonials } from "../_components/testimonials";
import CTA from "../_components/cta";
import { HomePageStructuredData } from './StructuredData';
import ServicesPage from "../_components/explainx-services";
import DeliveryStats from "../_components/impact2";
import GuaranteesSection from "../_components/guarantees";

import PricingSection from "../_components/explainx-pricing";
import HeroSection from "../_components/hero";
import ServicesSection from "../_components/service2";
import TeamSection from "../_components/team";
import TemplateSlider from "../_components/agentCard";
import Services2 from "../_components/service2";
import { HeroHeader } from "../_components/hero5-header";
import { FeaturesSectionWithHoverEffects } from "../_components/guarantees2";

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
      <HomePageStructuredData />
      <HeroSection />
      <ServicesSection />



      <DeliveryStats />
      {/* <Testimonials /> */}
      {/* <GuaranteesSection />
       */}
       <div className="min-h-screen w-full  bg-[#0B0B0B] py-16">
     <FeaturesSectionWithHoverEffects />
    </div>
      {/* <TemplateSlider /> */}
      <TeamSection />
      {/* <CTA /> */}
      <Suspense>
        <PricingSection />
      </Suspense>
      <FAQSection />
      <CTA />
    </div>
  );
}

export default MarketingPage;