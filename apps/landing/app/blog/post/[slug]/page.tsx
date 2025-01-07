import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Content } from "./content";
import fs from 'fs/promises';
import path from 'path';
import { StructuredData } from "../StructuredData";

type Params = {
    slug: string;
};

type BlogPostMetadata = {
    title: string;
    description: string;
    date: string;
    author: string;
    language: string; // Added language field
};

async function getPostMetadata(slug: string): Promise<BlogPostMetadata | null> {
    try {
        // Check all language directories
        const baseDirectory = path.join(process.cwd(), 'app/blog/_posts');
        const languageDirectories = await fs.readdir(baseDirectory);
        
        let filePath;
        let language = 'en'; // Default language
        
        // Search for the post in each language directory
        for (const dir of languageDirectories) {
            const testPath = path.join(baseDirectory, dir, `${slug}.mdx`);
            try {
                await fs.access(testPath);
                filePath = testPath;
                // Extract language from directory name
                language = dir === '(en)' ? 'en' : dir;
                break;
            } catch {
                continue;
            }
        }
        
        if (!filePath) return null;
        
        const fileContent = await fs.readFile(filePath, 'utf8');
        const metadataMatch = fileContent.match(/export const metadata = ({[\s\S]*?})/);
        if (!metadataMatch) return null;
        
        const metadata = eval(`(${metadataMatch[1]})`) as Omit<BlogPostMetadata, 'language'>;
        return {
            ...metadata,
            language
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
            canonical: `/blog/post/${slug}`,
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
        metadataBase: new URL('https://www.infloq.com'),
        openGraph: {
            type: 'article',
            locale: post.language.replace('zh-cn', 'zh'),
            url: `/blog/post/${slug}`,
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
            'html-lang': post.language,
        }
    };
}

export async function generateStaticParams(): Promise<Array<Params>> {
    const postsDirectory = path.join(process.cwd(), 'app/blog/_posts/(en)');
    const posts = await fs.readdir(postsDirectory)
        .then(files => 
            files.filter(file => file.endsWith('.mdx'))
                 .sort((a, b) => b.localeCompare(a))
        );
        
    return posts.map((post) => ({
        slug: post.replace(/\.mdx$/, ''),
    }));
}

export const dynamicParams = true;
export const revalidate = 3600; // Revalidate every hour

export default async function Page({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const postMetadata = await getPostMetadata(slug);
    
    if (!postMetadata) {
        notFound();
    }

    // Define default image path
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