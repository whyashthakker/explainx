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
};

async function getPostMetadata(slug: string): Promise<BlogPostMetadata | null> {
    try {
        const postsDirectory = path.join(process.cwd(), 'app/blog/_posts/es');
        const filePath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContent = await fs.readFile(filePath, 'utf8');
        
        const metadataMatch = fileContent.match(/export const metadata = ({[\s\S]*?})/);
        if (!metadataMatch) return null;
        
        const metadata = eval(`(${metadataMatch[1]})`) as BlogPostMetadata;
        return metadata;
    } catch (error) {
        console.error('Error reading post metadata:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    // Await the params promise
    const { slug } = await params;
    
    const post = await getPostMetadata(slug);
    
    if (!post) {
        return {
            title: 'Post Not Found',
            robots: { index: false }
        };
    }
    
    return {
        title: post.title,
        description: post.description,
        alternates: {
            canonical: `/blog/post/${slug}`,
        },
        robots: { index: true, follow: true },
    };
}

export async function generateStaticParams(): Promise<Array<Params>> {
    const postsDirectory = path.join(process.cwd(), 'app/blog/_posts/es');
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
    // Await the params promise 
    const { slug } = await params;

    const postMetadata = await getPostMetadata(slug);
    
    if (!postMetadata) {
        notFound();
    }

    return (
        <>
            <StructuredData
                headline={postMetadata.title}
                datePublished={postMetadata.date}
                dateModified={postMetadata.date}
                authorName={postMetadata.author}
                authorUrl="https://goyashy.com"
                image={[]}
            />
            <Content slug={slug} metadata={postMetadata} />
        </>
    );
}