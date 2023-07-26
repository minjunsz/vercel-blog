import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({ subsets: ['latin', 'greek', 'cyrillic'] })

interface CodeProps extends React.ComponentProps<'code'> { }

const Code = ({ children, ...rest }: CodeProps) => {
  return <code className={firaCode.className} {...rest} >{children}</code>
}

export default Code