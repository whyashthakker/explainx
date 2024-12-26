'use client';

import Script from 'next/script'

export function AhrefsAnalytics() {
  return (
    <Script
      src="https://analytics.ahrefs.com/analytics.js"
      data-key="w/LY2DzcaZu63ac9PGzswQ"
      defer
      strategy="afterInteractive"
      onError={(e) => {
        console.error('Script failed to load', e)
      }}
    />
  )
}