import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@repo/ui/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Large Text */}
        <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
        
        {/* Main Message */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Page Not Found
        </h2>
        
        {/* Supportive Text */}
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you&apos;re looking for seems to have gone on vacation. 
          Let&apos;s get you back on track.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-sm text-gray-500">
          <p>Need assistance? <a href="/contact" className="text-blue-600 hover:underline">Contact our support team</a></p>
        </div>
      </div>
    </div>
  );
}