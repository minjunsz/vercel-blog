import { PERSONAL_INFO, BLOG_INFO } from '@/data/blogMetaData'
import Link from 'next/link'
import SocialIcon from './SocialIcons'
import { MdRssFeed } from 'react-icons/md'

export default function FooterSection() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${PERSONAL_INFO.email}`} size="1.5rem" />
          <SocialIcon kind="github" href={PERSONAL_INFO.github} size="1.5rem" />
          <SocialIcon kind="discord" href={PERSONAL_INFO.discord} size="1.5rem" />
        </div>
        <div className="mb-3 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{BLOG_INFO.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{BLOG_INFO.siteTitle}</Link>
        </div>
        <div className="mb-8 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <MdRssFeed size="1.5rem" />
          <Link href="/rss.xml" className='px-1' > rss 2.0</Link>
          <Link href="/rss.json" className='px-1 border-l border-gray-500 dark:border-gray-400' > json </Link>
          <Link href="/atom.xml" className='px-1 border-l border-gray-500 dark:border-gray-400' > atom 1.0</Link>
        </div>
      </div>
    </footer >
  )
}