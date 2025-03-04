"use client"

import React from 'react'

const ESLayout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    document.documentElement.lang = 'es'
    document.documentElement.dir = 'ltr'
  }, [])

  return (
    <div dir="ltr" lang="es">
      <div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ESLayout