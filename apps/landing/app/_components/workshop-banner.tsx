'use client'
import { useState, useEffect } from 'react'
import { X, Calendar, Clock } from 'lucide-react'
import { Button } from '@repo/ui/components/ui/button'
import Link from 'next/link'
import { cn } from '@repo/ui/lib/utils'

// Facebook Pixel tracking function
const trackWorkshopEvent = (eventName: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, {
      content_name: 'Prompt Engineering Workshop',
      event_date: 'June 24, 2025',
      event_time: '11:30 AM IST'
    });
  }
};

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const WorkshopBanner = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Calculate time left until June 24, 2025, 7:30 PM
  useEffect(() => {
    const targetDate = new Date('2025-06-24T19:30:00+05:30').getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleJoinClick = () => {
    trackWorkshopEvent('Lead');
  };

  const handleCloseClick = () => {
    trackWorkshopEvent('WorkshopBannerClosed');
    setIsVisible(false);
  };

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="block sm:hidden py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">
                🚀 FREE Prompt Engineering Workshop
              </div>
            </div>
            <button
              onClick={handleCloseClick}
              className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs text-purple-100">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Jun 24, 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>11:30 AM IST</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Mobile Timer */}
              <div className="bg-white/10 rounded px-2 py-1 text-xs font-mono font-semibold">
                {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m
              </div>
              
              <Button
                asChild
                size="sm"
                className="bg-white text-purple-600 hover:bg-purple-50 font-medium text-xs px-3 py-1 h-auto"
                onClick={handleJoinClick}
              >
                <Link href="/workshops/ai/prompt-engineering">
                  Join
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between py-3 sm:py-2">
          {/* Content */}
          <div className="flex flex-row items-center space-x-4 flex-1 min-w-0">
            {/* Main Text */}
            <div className="flex items-center space-x-2 min-w-0">
              <Calendar className="h-4 w-4 text-purple-200 flex-shrink-0" />
              <div className="truncate">
                <span className="font-semibold text-base">
                  🚀 Join our FREE Prompt Engineering Workshop
                </span>
              </div>
            </div>
            
            {/* Date & Time */}
            <div className="flex items-center space-x-4 text-sm text-purple-100">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>June 24, 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>11:30 AM IST</span>
              </div>
            </div>

            {/* Desktop Countdown Timer */}
            <div className="flex items-center space-x-2 text-sm bg-white/10 rounded-full px-3 py-1">
              <span className="text-purple-100">⏰</span>
              <div className="flex space-x-2 font-mono font-semibold">
                <span className="text-white">{timeLeft.days}d</span>
                <span className="text-purple-200">:</span>
                <span className="text-white">{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span className="text-purple-200">:</span>
                <span className="text-white">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span className="text-purple-200">:</span>
                <span className="text-white">{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
          </div>

          {/* CTA Button & Close */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Button
              asChild
              size="sm"
              className="bg-white text-purple-600 hover:bg-purple-50 font-medium text-sm px-4 py-2 h-auto"
              onClick={handleJoinClick}
            >
              <Link href="/workshops/ai/prompt-engineering">
                Join Free
              </Link>
            </Button>
            
            <button
              onClick={handleCloseClick}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Animated border */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  )
}

// Add global type for Facebook Pixel
declare global {
  interface Window {
    fbq: (action: string, eventName: string, parameters?: Record<string, any>) => void;
  }
} 