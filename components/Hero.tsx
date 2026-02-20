'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Github, Linkedin, FileText, ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'

/* ── Matrix Rain Canvas ─────────────────────────────── */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ{}[]<>/|\\=+-*#@$%^&'
    const fontSize = 13
    let cols: number
    let drops: number[]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      cols = Math.floor(canvas.width / fontSize)
      drops = Array(cols).fill(1)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px JetBrains Mono, monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const brightness = Math.random()
        if (brightness > 0.97) {
          ctx.fillStyle = '#ffffff'
        } else if (brightness > 0.9) {
          ctx.fillStyle = '#00f5ff'
        } else {
          ctx.fillStyle = 'rgba(0, 245, 255, 0.35)'
        }
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const loop = () => {
      draw()
      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.07 }}
      aria-hidden="true"
    />
  )
}

/* ── Typing Animation Hook ──────────────────────────── */
function useTyping(texts: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setTextIdx((i) => (i + 1) % texts.length)
    }

    setDisplayed(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, textIdx, texts, speed, pause])

  return displayed
}

/* ── Social Link ────────────────────────────────────── */
interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  color: string
}

function SocialLink({ href, icon, label, color }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative w-11 h-11 rounded-xl glass-card flex items-center justify-center text-white/50 transition-all duration-300 group"
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.9 }}
      style={{ '--hover-color': color } as React.CSSProperties}
    >
      <span
        className="transition-all duration-300 group-hover:text-white"
        style={{ filter: undefined }}
      >
        {icon}
      </span>
      <span
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 0 15px ${color}60, 0 0 30px ${color}30`, border: `1px solid ${color}50` }}
      />
    </motion.a>
  )
}

/* ── Hero ───────────────────────────────────────────── */
export default function Hero() {
  const t = useTranslations('hero')
  
  const roles = [
    t('roles.frontend'),
    t('roles.react'),
    t('roles.vue'),
    t('roles.ui'),
  ]
  const typedRole = useTyping(roles, 75, 2200)

  const scrollToProjects = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
    >
      {/* Matrix rain background */}
      <MatrixRain />

      {/* Ambient glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#00f5ff]" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#00f5ff] uppercase">
            &lt; {t('hello')} /&gt;
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#00f5ff]" />
        </motion.div>

        {/* Name with glitch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <h1
            className="glitch-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none"
            data-text="YUNUS EMRE GÜRLÜ"
          >
            YUNUS EMRE GÜRLÜ
          </h1>
        </motion.div>

        {/* Typed role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-1 mb-6 h-10"
        >
          <span className="font-mono text-base sm:text-lg md:text-xl text-white/70">
            {typedRole}
          </span>
          <span className="cursor-blink h-5 w-0.5 bg-[#00f5ff] inline-block" />
        </motion.div>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {['React', 'Next.js', 'Vue', 'Nuxt', 'TypeScript', 'Tailwind'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono border border-white/10 rounded-full text-white/50 hover:border-[#00f5ff]/50 hover:text-[#00f5ff] transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto text-sm sm:text-base text-white/50 leading-relaxed mb-10"
        >
          {t('bio')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={scrollToProjects}
            className="btn-secondary px-8 py-3.5 rounded-full font-bold text-sm tracking-wide"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,245,255,0.5)' }}
            whileTap={{ scale: 0.97 }}
          >
            {t('viewProjects')}
          </motion.button>
          <motion.button
            onClick={scrollToContact}
            className="btn-primary px-8 py-3.5 rounded-full font-bold text-sm tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {t('contactMe')}
          </motion.button>
        </motion.div>
      </div>

      {/* Floating social links — bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="fixed right-6 bottom-12 z-20 flex flex-col gap-3"
      >
        <SocialLink
          href="https://www.linkedin.com/in/yunusemregurlu"
          icon={<Linkedin size={18} />}
          label="LinkedIn"
          color="#00f5ff"
        />
        <SocialLink
          href="https://github.com/yunusemrgrl"
          icon={<Github size={18} />}
          label="GitHub"
          color="#a855f7"
        />
        <SocialLink
          href="https://medium.com/@yunusemregurlu"
          icon={<ExternalLink size={18} />}
          label="Medium"
          color="#00f5ff"
        />
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
          {t('scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
