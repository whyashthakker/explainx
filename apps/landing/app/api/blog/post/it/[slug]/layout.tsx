"use client"

import React from 'react'

const ITLayout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    document.documentElement.lang = 'it'
    document.documentElement.dir = 'ltr'
  }, [])

  return (
    <div dir="ltr" lang="it">
      <div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ITLayout