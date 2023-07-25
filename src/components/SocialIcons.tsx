import { HiMail } from 'react-icons/hi'
import { FaDiscord, FaGithub } from 'react-icons/fa'

const icons = {
  mail: HiMail,
  github: FaGithub,
  discord: FaDiscord,
}

interface SocialIconProps {
  kind: 'mail' | 'github' | 'discord',
  href: string,
  size: string | number | undefined,
}

const SocialIcon = ({ kind, href, size }: SocialIconProps) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SelectedIcon = icons[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SelectedIcon size={size} className={`fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400`} />
    </a>
  )
}

export default SocialIcon