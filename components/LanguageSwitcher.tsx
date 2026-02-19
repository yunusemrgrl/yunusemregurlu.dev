'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { locales, type Locale } from '@/i18n/request'

const languageNames: Record<Locale, string> = {
  en: 'EN',
  tr: 'TR',
}

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: Locale) => {
    // Remove the current locale prefix from pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '')
    // Navigate to the new locale
    router.push(`/${newLocale}${pathnameWithoutLocale || ''}`)
  }

  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full glass-card border border-white/5">
      <Globe size={14} className="text-white/40 ml-1" />
      {locales.map((loc) => (
        <motion.button
          key={loc}
          onClick={() => switchLocale(loc)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-2.5 py-1 text-xs font-mono rounded-full transition-all duration-200 ${
            locale === loc
              ? 'text-[#00f5ff] bg-[#00f5ff]/10 font-bold'
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          {languageNames[loc]}
        </motion.button>
      ))}
    </div>
  )
}
