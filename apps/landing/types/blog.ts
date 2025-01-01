export interface Author {
    name: string;
    role: string;
    href: string;
    imageUrl: string;
  }
  
  export interface Post {
    title: string;
    file: string;
    description: string;
    date: string;
    datetime: string;
    author: Author;
    language: string;
    url: string;
    categories: string[];
  }