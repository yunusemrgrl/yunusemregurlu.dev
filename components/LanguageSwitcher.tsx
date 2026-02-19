'use client'

import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

const locales = ['en', 'tr'] as const
type Locale = (typeof locales)[number]

const languageNames: Record<Locale, string> = {
  en: 'EN',
  tr: 'TR',
}

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale

  const switchLocale = (newLocale: Locale) => {
    // Save to localStorage
    localStorage.setItem('locale', newLocale)
    // Reload page to apply new locale
    window.location.reload()
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
