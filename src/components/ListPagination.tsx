"use client"

import Tag from '@/components/Tag'
import { FrontMatter } from '@/lib/mdx/schemas'
import { formatDate } from '@/lib/utils/format-data'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export const POSTS_PER_PAGE = 5

type BlogPosts = {
  title: string;
  posts: FrontMatter[];
}

export default function ListPagination({ posts, title }: BlogPosts) {
  const searchParams = useSearchParams()
  const lastPage = Math.floor((posts.length - 1) / POSTS_PER_PAGE)

  const currentPage = useMemo(() => {
    const pageInParams = searchParams.get('page')
    if (pageInParams === null)
      return 0;

    const parsedPageInParams = parseInt(pageInParams)
    if (parsedPageInParams < 0) return 0;
    if (parsedPageInParams > lastPage) return lastPage;
    return parsedPageInParams
  }, [lastPage, searchParams])

  const [searchValue, setSearchValue] = useState('')

  const prevPageExist = currentPage > 0
  const nextPageExist = currentPage < lastPage

  const pagedPosts = useMemo(() => posts.slice(POSTS_PER_PAGE * currentPage, POSTS_PER_PAGE * (currentPage + 1)), [posts, currentPage])
  const filteredPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts = pagedPosts.length > 0 && !searchValue ? pagedPosts : filteredPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date.toISOString()}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {summary}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {lastPage > 0 && !searchValue && (
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <nav className="flex justify-between">
            {prevPageExist
              ? (<Link
                rel="previous"
                href={`/blog?page=${currentPage - 1}`}
              >
                Previous
              </Link>)
              : (<button
                className='cursor-auto disabled:opacity-50'
                rel='previous'
                disabled={true}
              >
                Previous
              </button>)}
            <span>
              {currentPage + 1} of {lastPage + 1}
            </span>
            {nextPageExist
              ? (<Link
                rel="next"
                href={`/blog?page=${currentPage + 1}`}
              >
                Next
              </Link>)
              : (<button
                className='cursor-auto disabled:opacity-50'
                rel='next'
                disabled={true}
              >
                Next
              </button>)}
          </nav>
        </div>
      )}
    </>
  )
}