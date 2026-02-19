import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/request'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
  
  // Don't use a locale prefix by default (e.g., /en or /tr)
  // Users will access the site at / and can switch language via the switcher
  localePrefix: 'as-needed'
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|tr)/:path*']
}
