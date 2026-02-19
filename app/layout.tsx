import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrains.variable} bg-[#0a0a0a] text-gray-100 antialiased`}
      >
        {/* Subtle noise overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
