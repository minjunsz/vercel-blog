import { Metadata } from "next";
import { BLOG_INFO } from "./blogMetaData"
import { ParsedMDXFrontMatter } from "@/lib/mdx/schemas";

export const defaultSEO = (title: string, description?: string): Metadata => {
  const baseURL = process.env.NODE_ENV === 'production' ? `https://${BLOG_INFO.siteUrl}` : `http://localhost:${process.env.PORT || 3000}`;
  return {
    metadataBase: new URL(baseURL),
    title,
    robots: { index: true, follow: true },
    description,
    openGraph: {
      url: `${BLOG_INFO.siteUrl}`,
      type: "website",
      siteName: `${BLOG_INFO.siteTitle}`,
      description,
      title,
      images: '/logo.jpg',
    },
    twitter: {
      card: "summary_large_image",
      site: `${BLOG_INFO.siteUrl}`,
      title,
      description,
      images: "/logo.jpg",
    },
  }
}

interface BlogSEOInput {
  frontMatter: ParsedMDXFrontMatter;
  url: string;
}

export const blogSEO = ({ frontMatter, url }: BlogSEOInput): Metadata => {
  const publishedAt = frontMatter.date.toISOString()
  const modifiedAt = frontMatter.date.toISOString()

  const defaultSEOTemplate = defaultSEO(frontMatter.title, frontMatter.summary)

  return {
    ...defaultSEOTemplate,
    openGraph: {
      ...(defaultSEOTemplate.openGraph),
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      authors: BLOG_INFO.author,
      url,
    },
    twitter: {
      ...(defaultSEOTemplate.twitter),
      site: url,
      creator: BLOG_INFO.author,
    },
    keywords: frontMatter.tags,
  }
}