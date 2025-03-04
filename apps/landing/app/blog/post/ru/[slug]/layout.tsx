"use client"

import React from 'react'

const RULayout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    document.documentElement.lang = 'ru'
    document.documentElement.dir = 'ltr'
  }, [])

  return (
    <div dir="ltr" lang="ru">
      <div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default RULayout