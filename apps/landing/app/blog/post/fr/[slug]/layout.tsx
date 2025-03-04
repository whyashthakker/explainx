"use client"

import React from 'react'

const FRLayout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    document.documentElement.lang = 'fr'
    document.documentElement.dir = 'ltr'
  }, [])

  return (
    <div dir="ltr" lang="fr">
      <div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default FRLayout