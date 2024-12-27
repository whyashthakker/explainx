// lib/products.ts
import productsData from '../../data/products.json';
import { Product } from '../../types/product';

export const products = productsData as Product[];

export const getProductBySlug = (slug: string) => {
  return products.find(product => product.file === slug);
};

export const productSlugs = products.map(product => product.file);