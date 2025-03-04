"use client"

import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
  }, [])

  return (
    <div dir="ltr" lang="en">
      <div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout