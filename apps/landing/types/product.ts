// types/product.ts
export interface Review {
    id: string;
    productSlug: string;
    rating: number;
    reviewBody: string;
    authorName: string;
    authorId: string | null;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
  }

  export interface Product {
    title: string;
    file: string;
    description: string;
    datetime: string;
    url: string;
  }
  
  export interface ReviewData {
    id: string;
    authorName: string;
    rating: number;
    reviewBody: string;
    createdAt: string;
    isVerified: boolean;
  }