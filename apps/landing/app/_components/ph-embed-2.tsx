import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PHBadge = () => {
  return (
    <div className="flex justify-center">
      <Link href="https://www.producthunt.com/products/olly-2#olly-2" target="_blank" rel="noopener noreferrer">
        <Image 
          src="/ph-daily5.svg" 
          alt="Olly - Product Hunt Badge" 
          width={125} 
          height={27} 
          priority
        />
      </Link>
    </div>
  )
}

export default PHBadge