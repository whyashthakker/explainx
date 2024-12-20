import React from 'react';

const LoadingPulse = () => {
  return (
    <div className="animate-pulse">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex">
          <div className="flex-1">
            {/* Title Skeleton */}
            <div className="h-12 bg-gray-200 rounded-lg w-3/4 mb-6"></div>
            
            {/* Meta Info Skeleton */}
            <div className="flex items-center space-x-4 mb-8">
              {/* Author Avatar */}
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              {/* Author Name & Date */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4">
              {/* Paragraph blocks */}
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-11/12"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              
              {/* Image placeholder */}
              <div className="h-64 bg-gray-200 rounded-lg w-full my-8"></div>
              
              {/* More paragraphs */}
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-10/12"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-9/12"></div>
            </div>
          </div>

          {/* Sidebar Skeleton (hidden on mobile) */}
          <div className="ml-8 w-80 hidden md:block">
            <div className="sticky top-20">
              <div className="bg-gray-100 rounded-lg p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Loading() {
  return (
      <LoadingPulse />
  );
}