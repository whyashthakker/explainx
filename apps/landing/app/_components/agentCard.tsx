import React from "react";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const templates = [
  { title: "Chatbot for Marketing", description: "Provide recommendations and process transactions in a chat." },
  { title: "Chatbot for HR", description: "Find talent and interact with candidates in an innovative way." },
  { title: "Chatbot for Support", description: "Optimize your customer support experience with AI." },
];

const TemplateSlider = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 px-12 py-12 bg-gray-900 text-white">
      {/* Left Section */}
      <div className="md:w-1/3">
        <h2 className="text-4xl font-bold">
          Use <span className="px-2 rounded text-gray-300">templates</span> to get started
          <br />
          your project
        </h2>
        <div className="flex flex-wrap gap-2 mt-4">
          {["E-Commerce", "Education", "Health Care", "Financial", "HR", "Tourism"].map((category) => (
            <span key={category} className="border border-gray-700 px-3 py-1 rounded-lg text-sm text-gray-300">
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Right Slider Section with Hover Effect */}
      <div className="md:w-2/3 relative group">
        {/* Left Navigation Button */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="text-white" />
        </button>

        {/* Scrollable Slider */}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
          {templates.map((template, index) => (
            <Card key={index} className="min-w-[300px] bg-gray-800 border border-gray-700">
              <CardContent className="p-4">
                <div className="h-32 bg-gray-700 rounded-lg"></div>
                <h3 className="text-lg font-semibold mt-3">{template.title}</h3>
                <p className="text-gray-400 text-sm">{template.description}</p>
                <Button className="w-full mt-3 bg-gray-700 hover:bg-gray-600 text-white">Try template for free</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Navigation Button */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default TemplateSlider;