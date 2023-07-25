import { Feed, FeedOptions } from 'feed';
import { BLOG_INFO, PERSONAL_INFO } from '@/data/blogMetaData';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import path from 'path';
import fs from 'fs';

const POST_DIR = 'mlpost'
const root = process.cwd()
const feedPath = (filename: string) => path.join(root, "public", filename)

export default async function generateRSSFeed() {
  const allPosts = await getAllFilesFrontMatter(POST_DIR)

  const feedOptions: FeedOptions = {
    title: "Minjun Park's Blog Posts | RSS Feed",
    description: "Welcome to this blog posts!",
    id: BLOG_INFO.siteUrl,
    link: BLOG_INFO.siteUrl,
    image: BLOG_INFO.siteUrl + "/logo.jpg",
    copyright: `Copyright © ${new Date().getFullYear()}, Minjun Park`,
    updated: new Date(),
    feedLinks: {
      rss: `${BLOG_INFO.siteUrl}/rss.xml`,
      json: `${BLOG_INFO.siteUrl}/rss.json`,
      atom: `${BLOG_INFO.siteUrl}/atom.xml`,
    },
  }
  // const feed = new RSS(feedOptions);
  const feed = new Feed(feedOptions)
  feed.addCategory("Machine Learning")
  feed.addCategory("Python")

  allPosts.map((post) => {
    feed.addItem({
      title: post.title,
      description: post.summary,
      id: `${BLOG_INFO.siteUrl}/blog/${post.slug}`,
      link: `${BLOG_INFO.siteUrl}/blog/${post.slug}`,
      date: post.date,
      author: [{
        name: BLOG_INFO.author,
        email: PERSONAL_INFO.email,
        link: BLOG_INFO.siteUrl,
      }],
      image: post.image ?? BLOG_INFO.siteUrl + "/logo.jpg",
    });
  });

  fs.writeFileSync(feedPath("rss.xml"), feed.rss2());
  fs.writeFileSync(feedPath("rss.json"), feed.json1());
  fs.writeFileSync(feedPath("atom.xml"), feed.atom1());
}