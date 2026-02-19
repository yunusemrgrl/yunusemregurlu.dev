import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n/request'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yunus Emre GÜRLÜ | Frontend Developer',
  description:
    'Highly motivated Frontend Developer specializing in React.js/Next.js and Vue.js/Nuxt.js. Building scalable, performance-oriented frontend architectures.',
  keywords: [
    'Frontend Developer',
    'React',
    'Next.js',
    'Vue.js',
    'Nuxt.js',
    'TypeScript',
    'Tailwind CSS',
    'Yunus Emre Gürlü',
  ],
  authors: [{ name: 'Yunus Emre GÜRLÜ' }],
  openGraph: {
    title: 'Yunus Emre GÜRLÜ | Frontend Developer',
    description: 'Frontend Developer specializing in React & Vue ecosystems.',
    type: 'website',
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrains.variable} bg-[#0a0a0a] text-gray-100 antialiased`}
      >
        {/* Subtle noise overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
