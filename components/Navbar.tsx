'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Terminal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  
  const navLinks = [
    { label: t('about'), href: '#about' },
    { label: t('skills'), href: '#skills' },
    { label: t('experience'), href: '#experience' },
    { label: t('education'), href: '#education' },
    { label: t('contact'), href: '#contact' },
  ]

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section detection
  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #00f5ff, #a855f7)',
        }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/50'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 rounded-lg border border-[#00f5ff]/40 flex items-center justify-center group-hover:border-[#00f5ff] group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-300">
              <Terminal size={14} className="text-[#00f5ff]" />
            </div>
            <span className="font-mono text-sm font-bold tracking-wider text-white/80 group-hover:text-white transition-colors">
              YEG<span className="text-[#00f5ff]">.</span>
            </span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                {/* Active / hover underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[#00f5ff] to-[#a855f7] transition-all duration-300 ${
                    activeSection === link.href.slice(1) ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
                  }`}
                />
                {activeSection === link.href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00f5ff] shadow-[0_0_6px_#00f5ff]" />
                )}
              </motion.button>
            ))}
            <LanguageSwitcher />
            <motion.a
              href="mailto:yunusemregurlu@gmail.com"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-3 px-5 py-2 rounded-full text-sm font-semibold border border-[#00f5ff]/50 text-[#00f5ff] hover:bg-[#00f5ff]/10 hover:border-[#00f5ff] hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-300"
            >
              {t('hireMe')}
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white/80 hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5"
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-left px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-[#00f5ff] bg-[#00f5ff]/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </>
  )
}
