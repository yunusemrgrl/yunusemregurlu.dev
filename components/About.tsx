'use client'

import { motion } from 'framer-motion'
import { Code2, Zap, Globe, Coffee } from 'lucide-react'
import { useTranslations } from 'next-intl'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function About() {
  const t = useTranslations('about')
  
  const badges = [
    { icon: <Code2 size={14} />, text: t('badges.currentlyBuilding') },
    { icon: <Zap size={14} />, text: t('badges.performance') },
    { icon: <Globe size={14} />, text: t('badges.remote') },
    { icon: <Coffee size={14} />, text: t('badges.open') },
  ]

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Subtle gradient bg */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,245,255,0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-tag mb-3">{t('tag')}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {t('title')} <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-[#00f5ff] to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <p className="text-white/70 leading-relaxed text-base">
              Highly motivated and hands-on{' '}
              <span className="text-[#00f5ff] font-semibold">Frontend Developer</span> with
              strong experience building{' '}
              <span className="text-white/90">production-ready user interfaces</span> using
              modern JavaScript frameworks such as{' '}
              <span className="text-[#a855f7] font-semibold">React.js / Next.js</span> and{' '}
              <span className="text-[#a855f7] font-semibold">Vue.js / Nuxt.js</span>.
            </p>
            <p className="text-white/70 leading-relaxed text-base">
              Skilled in developing scalable, maintainable, and{' '}
              <span className="text-white/90">performance-oriented frontend architectures</span>,
              with solid experience in state management, API integration (REST & GraphQL),
              and component-driven UI development.
            </p>
            <p className="text-white/70 leading-relaxed text-base">
              Passionate about clean code, performance optimization, and translating design
              systems into reusable frontend components. Experienced in collaborative
              development environments using Git and modern workflows, with practical exposure
              to CI/CD processes.
            </p>
            <p className="text-white/70 leading-relaxed text-base">
              Known for strong analytical problem-solving skills, adaptability, and a{' '}
              <span className="text-[#00f5ff]">continuous drive to learn and grow</span> within
              frontend-focused teams.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 pt-4">
              {[
                { value: '3+', label: t('stats.experience') },
                { value: '5+', label: t('stats.companies') },
                { value: '10+', label: t('stats.technologies') },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black gradient-text">{stat.value}</div>
                  <div className="text-xs text-white/40 mt-1 font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Identity card */}
            <div className="glass-card rounded-2xl p-6 border border-white/8 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />
              <div className="flex items-start gap-4">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-xl text-[#0a0a0a] relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #00f5ff, #a855f7)' }}>
                  YEG
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight">Yunus Emre GÜRLÜ</h3>
                  <p className="text-[#00f5ff] text-sm font-mono mt-0.5">Frontend Developer</p>
                  <p className="text-white/40 text-xs mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                    Sakarya, TR — Available for remote
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-white/5 grid grid-cols-2 gap-3 text-xs">
                {[
                  { label: 'Email', value: 'yunusemregurlu@gmail.com' },
                  { label: 'Phone', value: '+90 539 462 74 46' },
                  { label: 'LinkedIn', value: 'in/yunusemregurlu' },
                  { label: 'GitHub', value: 'yunusemrgrl' },
                ].map((item) => (
                  <div key={item.label}>
                    <span className="text-white/30 block font-mono">{item.label}</span>
                    <span className="text-white/70 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-2.5">
              {badges.map((badge, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl glass-card border border-white/5 hover:border-[#00f5ff]/20 hover:bg-[#00f5ff]/5 transition-all duration-300 cursor-default"
                >
                  <span className="text-[#00f5ff]">{badge.icon}</span>
                  <span className="text-white/60 text-sm">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
