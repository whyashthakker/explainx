import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Content } from "./content";
import fs from 'fs';
import path from 'path';
import { StructuredData } from "../../StructuredData";
import matter from 'gray-matter';

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
        const postsDirectory = path.join(process.cwd(), 'app/blog/_posts/ko');
        const filePath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Use gray-matter to parse YAML frontmatter
        const { data } = matter(fileContent);
        
        return {
            title: data.title,
            description: data.description,
            date: data.date,
            author: data.author
        };
    } catch (error) {
        console.error('Error reading post metadata:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const post = await getPostMetadata(params.slug);
    
    if (!post) {
        return {
            title: 'Post Not Found',
            robots: { index: false },
        };
    }
    
    return {
        title: post.title,
        description: post.description,
        alternates: {
            canonical: `/blog/post/ko/${params.slug}`,
        },
        robots: { index: true, follow: true },
    };
}

export async function generateStaticParams(): Promise<Array<Params>> {
    // Remove the SKIP_BUILD_STATIC_GENERATION check as it's not needed for ISR
    const postsDirectory = path.join(process.cwd(), 'app/blog/_posts/nl');
    const posts = fs.readdirSync(postsDirectory)
        .filter(file => file.endsWith('.mdx'))
        .sort((a, b) => b.localeCompare(a));
        
    return posts.map((post) => ({
        slug: post.replace(/\.mdx$/, ''),
    }));
}

// For ISR, we want to allow dynamic parameters
export const dynamicParams = true;

// Use the Next.js 13+ segment configuration
export const revalidate = 3600; // Revalidate every hour

export default async function Page({ params }: { params: Params }) {
    const postMetadata = await getPostMetadata(params.slug);
    
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
            <Content slug={params.slug} metadata={postMetadata} />
        </>
    );
}