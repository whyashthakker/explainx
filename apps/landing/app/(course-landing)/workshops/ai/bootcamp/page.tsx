import { Metadata } from "next";
import BootcampHero from "./components/BootcampHero";
import BootcampCurriculum from "./components/BootcampCurriculum";
import BootcampPricing from "./components/BootcampPricing";
import BootcampInstructor from "./components/BootcampInstructor";
import BootcampFeatures from "./components/BootcampFeatures";
import BootcampTestimonials from "./components/BootcampTestimonials";
import BootcampFAQ from "./components/BootcampFAQ";
import BootcampCTA from "./components/BootcampCTA";

export const metadata: Metadata = {
  title: "5-Week AI Bootcamp - Complete AI Mastery Program | ExplainX",
  description: "Master AI in 5 weeks with our comprehensive bootcamp. Learn prompting, text generation, image/video generation, and build AI apps. Early bird pricing available!",
  keywords: ["AI bootcamp", "AI training", "ChatGPT", "Claude AI", "AI tools", "AI course", "machine learning"],
  openGraph: {
    title: "5-Week AI Bootcamp - Complete AI Mastery Program",
    description: "Transform your career with our comprehensive AI bootcamp. 5 weeks, 20 hours of hands-on learning.",
    type: "website",
  },
};

export default function AIBootcampPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <BootcampHero />
      <BootcampFeatures />
      <BootcampCurriculum />
      <BootcampInstructor />
      <BootcampPricing />
      <BootcampTestimonials />
      <BootcampFAQ />
      <BootcampCTA />
    </div>
  );
}
