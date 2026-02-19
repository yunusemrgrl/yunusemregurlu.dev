'use client'

import { NextIntlClientProvider } from 'next-intl'
import { useState, useEffect, ReactNode } from 'react'
import enMessages from '@/messages/en.json'
import trMessages from '@/messages/tr.json'

const messages = {
  en: enMessages,
  tr: trMessages,
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<'en' | 'tr'>('en')

  useEffect(() => {
    // Get locale from localStorage or browser
    const savedLocale = localStorage.getItem('locale') as 'en' | 'tr' | null
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'tr')) {
      setLocale(savedLocale)
    } else {
      // Default to English
      setLocale('en')
    }
  }, [])

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      {children}
    </NextIntlClientProvider>
  )
}
