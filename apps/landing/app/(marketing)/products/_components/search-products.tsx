'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@repo/ui/components/ui/card'
import { Input } from '@repo/ui/components/ui/input'
import { Search } from 'lucide-react'

interface Product {
  title: string;
  file: string;
  description: string;
}

export default function SearchProducts({ products }: { products: Product[] }) {
  const [searchTerm, setSearchTerm] = React.useState('')

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.file} href={`/products/${product.file}`}>
            <Card className="h-full hover:shadow-lg transition-all duration-200">
              <div className="relative w-full h-40">
                <Image
                  src="/olly_home.png"
                  alt={product.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{product.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {product.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}