"use client"

import React from 'react'

const ARLayout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    document.documentElement.lang = 'ar'
    document.documentElement.dir = 'rtl'
  }, [])

  return (
    <div dir="rtl" lang="ar">
      <div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ARLayout