import { PERSONAL_INFO, BLOG_INFO } from '@/data/blogMetaData'
import Link from 'next/link'
import SocialIcon from './social-icons'

export default function FooterSection() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${PERSONAL_INFO.email}`} size="6" />
          <SocialIcon kind="github" href={PERSONAL_INFO.github} size="6" />
        </div>
        <div className="mb-8 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{BLOG_INFO.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{BLOG_INFO.siteTitle}</Link>
        </div>
      </div>
    </footer>
  )
}