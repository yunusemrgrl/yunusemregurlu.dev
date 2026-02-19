import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  // Trailing slash for static hosting compatibility
  trailingSlash: true,
  // Next.js Image Optimization doesn't work on GitHub Pages
  images: {
    unoptimized: true,
  },
}

export default withNextIntl(nextConfig)
