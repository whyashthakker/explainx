"use client"

import React from 'react'

const DELayout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    document.documentElement.lang = 'de'
    document.documentElement.dir = 'ltr'
  }, [])

  return (
    <div dir="ltr" lang="de">
      <div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DELayout