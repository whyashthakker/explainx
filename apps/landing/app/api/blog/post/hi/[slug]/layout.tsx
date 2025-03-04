"use client"

import React from 'react'

const HILayout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    document.documentElement.lang = 'hi'
    document.documentElement.dir = 'ltr'
  }, [])

  return (
    <div dir="ltr" lang="hi">
      <div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default HILayout