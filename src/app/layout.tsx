import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import HeaderSection from '@/components/HeaderSection'
import FooterSection from '@/components/FooterSection'
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Minjun Blog',
    default: 'Minjun Blog',
  },
  description: 'Welcome! This is Minjun &apos;s personal blog.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <HeaderSection />
            <main className="mb-auto">{children}</main>
            <FooterSection />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
