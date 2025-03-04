"use client"

import React from 'react'

const KOLayout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    document.documentElement.lang = 'ko'
    document.documentElement.dir = 'ltr'
  }, [])

  return (
    <div dir="ltr" lang="ko">
      <div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default KOLayout