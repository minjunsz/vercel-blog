import SocialIcon from '@/components/social-icons'
import Image from 'next/image'
import { PERSONAL_INFO } from '@/data/blogMetaData'
import { defaultSEO } from '@/data/supportSEO'

export const metadata = defaultSEO('About | Minjun Blog', "About me - Minjun Park")

export default function AuthorLayout() {
  const { name, occupation, company, email, github } = PERSONAL_INFO

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About Me
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Image
              src="https://github.com/minjunsz.png"
              alt="avatar"
              width={192}
              height={192}
              className="h-48 w-48 rounded-full border dark:border-gray-500"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} size='8' />
              <SocialIcon kind="github" href={github} size='8' />
            </div>
          </div>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
            <p>Hello, my name is Minjun Park. I majored <i>Chemistry</i> and double-majored <i>Computer Science and Engineering</i> during my Bachelor at POSTECH.
              From September 2023, I&apos;ll start the Master&apos;s degree at Seoul National University with <a href='http://ailab.snu.ac.kr/'>Prof. Sungroh Yoon</a>.
              My broad research interest is about Graph generative models, interpretable AI, and 3D structural data.</p>

            <p>My posts will be about the paper reviews and programming concepts focused on python. I hope my posts to be helpful to someone😊.
              If you need my help or questions on my posts, feel free to contact me! I would be glad to help you.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}