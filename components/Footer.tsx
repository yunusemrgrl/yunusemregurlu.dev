'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, ExternalLink, Heart, Coffee, ArrowUp } from 'lucide-react'

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yunusemregurlu',
    icon: <Linkedin size={16} />,
    color: '#00f5ff',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/yunusemrgrl',
    icon: <Github size={16} />,
    color: '#a855f7',
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@yunusemregurlu',
    icon: <ExternalLink size={16} />,
    color: '#00f5ff',
  },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative py-12 px-6 border-t border-white/5 overflow-hidden">
      {/* Very subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,245,255,0.02), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-1"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-sm font-bold text-white/80">
                YEG<span className="text-[#00f5ff]">.</span>
              </span>
              <span className="text-white/20 text-xs">|</span>
              <span className="text-white/40 text-xs font-mono">Frontend Developer</span>
            </div>
            <p className="text-white/25 text-xs font-mono text-center md:text-left">
              © 2025 Yunus Emre GÜRLÜ &nbsp;•&nbsp; Made with{' '}
              <Heart size={10} className="inline text-red-400" /> and lots of{' '}
              <Coffee size={10} className="inline text-amber-400" />
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-lg glass-card border border-white/5 flex items-center justify-center text-white/40 transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                style={
                  {
                    '--social-color': social.color,
                  } as React.CSSProperties
                }
              >
                <span
                  className="group-hover:text-white transition-colors duration-200"
                  style={{ color: 'inherit' }}
                >
                  {social.icon}
                </span>
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `0 0 12px ${social.color}40`,
                    border: `1px solid ${social.color}40`,
                  }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-white/30 hover:text-[#00f5ff] text-xs font-mono transition-colors duration-300 group"
            whileHover={{ y: -2 }}
          >
            <span>Back to top</span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ArrowUp size={13} />
            </motion.span>
          </motion.button>
        </div>

        {/* Bottom gradient line */}
        <div
          className="mt-8 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(0,245,255,0.2), rgba(168,85,247,0.2), transparent)',
          }}
        />
        <p className="mt-4 text-center text-white/15 text-[10px] font-mono">
          Built with Next.js 15 · TypeScript · Tailwind CSS · Framer Motion
        </p>
      </div>
    </footer>
  )
}
