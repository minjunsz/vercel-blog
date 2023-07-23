import { getAllFilesFrontMatter, getPostFromSlug } from "@/lib/mdx"
import { getFilesFromDir } from "@/lib/utils/files"
import path from "path"
import { MDXPage } from "@/components/mdx-components"
import ScrollTop from "@/components/ScrollTop"
import Image from "next/image"
import Link from "next/link"
import Tag from "@/components/Tag"
import { formatDate } from "@/lib/utils/format-data"
import "./prism-night-owl.css"
import "./syntax-highlight.css"
import 'katex/dist/katex.min.css'

export const dynamicParams = false;

const POST_DIR = "mlpost"
const AUTHOR_DETAILS = [{
  name: "Minjun Park",
  avatar: "https://github.com/minjunsz.png",
  discord: "https://discordapp.com/users/minjunsz"
}]

type Parameters = {
  slug: string
}

export async function generateStaticParams(): Promise<Parameters[]> {
  const files = getFilesFromDir(POST_DIR)

  return files.map((file) => {
    const slug = path.parse(file).name
    return { slug }
  })
}

export default async function Blog({ params }: { params: Parameters }) {
  const allPosts = await getAllFilesFrontMatter(POST_DIR)
  const postIndex = allPosts.findIndex((post) => post.slug === params.slug)
  const prev = allPosts[postIndex + 1] ?? null
  const next = allPosts[postIndex - 1] ?? null
  const { mdxSource, toc, frontMatter } = await getPostFromSlug(POST_DIR, params.slug)
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <ScrollTop />
        <article>
          <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
            <header className="pt-6 xl:pb-6">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={frontMatter.date.toISOString()}>{formatDate(frontMatter.date)}</time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                    {frontMatter.title}
                  </h1>
                </div>
              </div>
            </header>
            <div
              className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
              style={{ gridTemplateRows: 'auto 1fr' }}
            >
              <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                    {AUTHOR_DETAILS.map((author) => (
                      <li className="flex items-center space-x-2" key={author.name}>
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-10 w-10 rounded-full border dark:border-gray-500"
                          />
                        )}
                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                          <dt className="sr-only">Twitter</dt>
                          <dd>
                            {author.discord && (
                              <Link
                                href={author.discord}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {author.discord.replace('https://discordapp.com/users/', '@')}
                              </Link>
                            )}
                          </dd>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
              <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                  <MDXPage mdxSource={mdxSource} toc={toc} />
                </div>
                {/* <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(slug)} rel="nofollow">
                  {'Discuss on Twitter'}
                </Link>
                {` • `}
                <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
              </div> */}
              </div>
              <footer>
                <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                  {frontMatter.tags && (
                    <div className="py-4 xl:py-8">
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Tags
                      </h2>
                      <div className="flex flex-wrap">
                        {frontMatter.tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  )}
                  {(next || prev) && (
                    <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                      {prev && (
                        <div>
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Previous Article
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                          </div>
                        </div>
                      )}
                      {next && (
                        <div>
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Next Article
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="pt-4 xl:pt-8">
                  <Link
                    href="/blog"
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    &larr; Back to the blog
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}