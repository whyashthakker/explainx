import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Content } from "./content";
import fs from 'fs/promises';
import path from 'path';
import { StructuredData } from "../../StructuredData";

type Params = {
    slug: string;
};

type BlogPostMetadata = {
    title: string;
    description: string;
    date: string;
    author: string;
    language: string;
};

async function getPostMetadata(slug: string): Promise<BlogPostMetadata | null> {
    try {
        const postsDirectory = path.join(process.cwd(), 'app/blog/_posts/ar');
        const filePath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContent = await fs.readFile(filePath, 'utf8');
        
        const metadataMatch = fileContent.match(/export const metadata = ({[\s\S]*?})/);
        if (!metadataMatch) return null;
        
        const metadata = eval(`(${metadataMatch[1]})`) as Omit<BlogPostMetadata, 'language'>;
        return {
            ...metadata,
            language: 'ar' // Set Arabic as the language
        };
    } catch (error) {
        console.error('Error reading post metadata:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostMetadata(slug);
    
    if (!post) {
        return {
            title: 'Post Not Found',
            robots: { index: false }
        };
    }
    
    const defaultImage = '/images/main/landing.png';
    
    return {
        title: post.title,
        description: post.description,
        alternates: {
            canonical: `/blog/post/ar/${slug}`,
            languages: {
                'en': `/blog/post/${slug}`,
                'ar': `/blog/post/ar/${slug}`,
                'de': `/blog/post/de/${slug}`,
                'es': `/blog/post/es/${slug}`,
                'fr': `/blog/post/fr/${slug}`,
                'hi': `/blog/post/hi/${slug}`,
                'it': `/blog/post/it/${slug}`,
                'ja': `/blog/post/ja/${slug}`,
                'ko': `/blog/post/ko/${slug}`,
                'nl': `/blog/post/nl/${slug}`,
                'ru': `/blog/post/ru/${slug}`,
                'zh-CN': `/blog/post/zh-cn/${slug}`,
            }
        },
        robots: { index: true, follow: true },
        metadataBase: new URL('https://www.explainx.ai'),
        openGraph: {
            type: 'article',
            locale: 'ar',
            url: `/blog/post/ar/${slug}`,
            title: post.title,
            description: post.description,
            images: [
                {
                    url: defaultImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [defaultImage],
        },
        other: {
            'html-lang': 'ar',
        }
    };
}

export async function generateStaticParams(): Promise<Array<Params>> {
    const postsDirectory = path.join(process.cwd(), 'app/blog/_posts/ar');
    const posts = await fs.readdir(postsDirectory)
        .then(files => 
            files.filter(file => file.endsWith('.mdx'))
                 .sort((a, b) => b.localeCompare(a))
        );
        
    return posts.map((post) => ({
        slug: post.replace(/\.mdx$/, ''),
    }));
}

// Use the Next.js 15 segment configuration
export const dynamic = 'force-static'; // Prefer static generation
export const revalidate = 3600; // Revalidate every hour

export default async function Page({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const postMetadata = await getPostMetadata(slug);
    
    if (!postMetadata) {
        notFound();
    }

    const defaultImage = ['/images/main/landing.png'];

    return (
        <>
            <StructuredData
                headline={postMetadata.title}
                datePublished={postMetadata.date}
                dateModified={postMetadata.date}
                authorName={postMetadata.author}
                authorUrl="https://goyashy.com"
                image={defaultImage}
                language={postMetadata.language}
            />
            <Content slug={slug} metadata={postMetadata} />
        </>
    );
}