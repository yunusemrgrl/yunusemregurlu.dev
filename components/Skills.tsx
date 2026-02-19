'use client'

import { useRef, useState, MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface Skill {
  name: string
  category: string
  icon: string
  color: string
  desc: string
}

const skills: Skill[] = [
  { name: 'React', category: 'UI Library', icon: '⚛️', color: '#61DAFB', desc: 'SPA, hooks, context, RSC' },
  { name: 'Next.js', category: 'Framework', icon: '▲', color: '#ffffff', desc: 'SSR, SSG, App Router' },
  { name: 'Vue.js', category: 'UI Framework', icon: '💚', color: '#42B883', desc: 'Composition API, SFCs' },
  { name: 'Nuxt.js', category: 'Framework', icon: '🟢', color: '#00DC82', desc: 'Universal rendering, modules' },
  { name: 'TypeScript', category: 'Language', icon: '🔷', color: '#3178C6', desc: 'Type safety, generics' },
  { name: 'Tailwind CSS', category: 'Styling', icon: '🌊', color: '#06B6D4', desc: 'Utility-first CSS' },
  { name: 'Pinia', category: 'State', icon: '🍍', color: '#FFD859', desc: 'Vue state management' },
  { name: 'Zustand', category: 'State', icon: '🐻', color: '#FF6B6B', desc: 'React state management' },
  { name: 'TanStack Query', category: 'Data Fetching', icon: '🔄', color: '#FF4154', desc: 'Async state, caching' },
  { name: 'GraphQL', category: 'API', icon: '◈', color: '#E10098', desc: 'Query language for APIs' },
  { name: 'Laravel', category: 'Backend', icon: '🔴', color: '#FF2D20', desc: 'PHP framework, Eloquent ORM' },
  { name: 'Livewire', category: 'Full-stack', icon: '⚡', color: '#FB70A9', desc: 'Real-time Laravel components' },
  { name: 'Firebase', category: 'Cloud', icon: '🔥', color: '#FFA000', desc: 'FCM, Realtime DB, Auth' },
  { name: 'PWA', category: 'Web Tech', icon: '📱', color: '#5A0FC8', desc: 'Service Workers, offline-first' },
]

/* ── 3D Tilt Card ─────────────────────────────────── */
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = ((e.clientX - cx) / (rect.width / 2)) * 12
    const dy = ((e.clientY - cy) / (rect.height / 2)) * 12
    setTilt({ x: -dy, y: dx })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="relative group cursor-default"
    >
      <div
        className={`relative p-5 rounded-2xl glass-card border transition-all duration-300 overflow-hidden ${
          hovered ? 'border-opacity-60' : 'border-white/5'
        }`}
        style={{
          borderColor: hovered ? `${skill.color}50` : undefined,
          boxShadow: hovered
            ? `0 0 20px ${skill.color}20, 0 0 40px ${skill.color}10, inset 0 0 20px ${skill.color}05`
            : 'none',
        }}
      >
        {/* Background glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${skill.color}15 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <motion.span
            className="text-3xl"
            animate={{ scale: hovered ? 1.2 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {skill.icon}
          </motion.span>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
            style={{
              color: skill.color,
              borderColor: `${skill.color}30`,
              background: `${skill.color}10`,
            }}
          >
            {skill.category}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-bold text-base text-white mb-1 transition-all duration-200 group-hover:text-white">
          {skill.name}
        </h3>

        {/* Desc */}
        <p className="text-white/40 text-xs leading-relaxed">{skill.desc}</p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
          style={{
            width: hovered ? '100%' : '0%',
            background: `linear-gradient(90deg, ${skill.color}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const t = useTranslations('skills')
  
  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden">
      {/* bg radial */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(168,85,247,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left"
        >
          <p className="section-tag mb-3">{t('tag')}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {t('title')} <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p className="mt-4 text-white/40 text-sm max-w-xl mx-auto md:mx-0">
            {t('subtitle')}
          </p>
          <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-[#a855f7] to-transparent mx-auto md:mx-0" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
