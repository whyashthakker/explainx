"use client"

import React from 'react'

const NLLayout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    document.documentElement.lang = 'nl'
    document.documentElement.dir = 'ltr'
  }, [])

  return (
    <div dir="ltr" lang="nl">
      <div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default NLLayout