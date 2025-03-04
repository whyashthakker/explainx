"use client"

import React from 'react'

const JALayout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    document.documentElement.lang = 'ja'
    document.documentElement.dir = 'ltr'
  }, [])

  return (
    <div dir="ltr" lang="ja">
      <div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default JALayout