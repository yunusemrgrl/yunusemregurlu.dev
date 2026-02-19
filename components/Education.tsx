'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Award, ExternalLink, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'

const education = [
  {
    school: 'Anadolu University',
    degree: "Associate's Degree",
    field: 'Computer Programming',
    period: '2022 – 2024',
    location: 'Eskişehir, TR',
    icon: '🎓',
    color: '#00f5ff',
    note: 'Transitioned into software development with a focused CS education.',
  },
  {
    school: 'Eskişehir Osmangazi University',
    degree: "Bachelor's Degree",
    field: 'Civil Engineering',
    period: '2017 – 2021',
    location: 'Eskişehir, TR',
    icon: '🏛️',
    color: '#a855f7',
    note: 'Strong analytical and problem-solving foundations from engineering.',
  },
]

const certificates = [
  {
    name: 'FMSS Bilişim Front-end Practicum',
    issuer: 'Patika.dev',
    date: 'Jun 2023',
    color: '#00f5ff',
    credentialUrl: '#',
  },
  {
    name: 'Advanced React',
    issuer: 'Meta',
    date: 'Apr 2023',
    color: '#a855f7',
    credentialUrl: '#',
  },
  {
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'May 2022',
    color: '#f59e0b',
    credentialUrl: '#',
  },
  {
    name: 'Beginner Level Frontend Web Development Path',
    issuer: 'Patika.dev',
    date: 'Apr 2022',
    color: '#10b981',
    credentialUrl: '#',
  },
]

export default function Education() {
  const t = useTranslations('education')
  
  return (
    <section id="education" className="relative py-28 px-6 overflow-hidden">
      {/* bg */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
          <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-[#a855f7] to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* ─── Education ─────────────────────────────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <GraduationCap size={20} className="text-[#00f5ff]" />
              <h3 className="font-bold text-lg text-white">{t('educationTitle')}</h3>
            </motion.div>

            <div className="space-y-5">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 border border-white/5 hover:border-white/10 group relative overflow-hidden transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  {/* Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 0% 0%, ${edu.color}10 0%, transparent 60%)`,
                    }}
                    aria-hidden="true"
                  />
                  {/* Left border accent */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
                    style={{ background: `linear-gradient(180deg, ${edu.color}, transparent)` }}
                  />

                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{edu.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-base leading-tight">{edu.school}</h4>
                      <p className="font-semibold text-sm mt-0.5" style={{ color: edu.color }}>
                        {edu.degree}
                      </p>
                      <p className="text-white/60 text-sm">{edu.field}</p>
                      <div className="flex items-center gap-3 mt-2 text-white/30 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {edu.period}
                        </span>
                        <span>{edu.location}</span>
                      </div>
                      <p className="text-white/40 text-xs mt-3 leading-relaxed italic">
                        {edu.note}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── Certificates ───────────────────────────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <Award size={20} className="text-[#a855f7]" />
              <h3 className="font-bold text-lg text-white">{t('certificatesTitle')}</h3>
            </motion.div>

            <div className="space-y-3">
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass-card rounded-xl p-4 border border-white/5 group hover:border-white/10 relative overflow-hidden transition-all duration-300 flex items-start gap-3"
                  whileHover={{ y: -2, x: 2 }}
                >
                  {/* Colored dot */}
                  <div
                    className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: cert.color, boxShadow: `0 0 8px ${cert.color}60` }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-white/90 leading-snug">{cert.name}</h4>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                          style={{
                            color: cert.color,
                            background: `${cert.color}15`,
                            border: `1px solid ${cert.color}25`,
                          }}
                        >
                          {cert.issuer}
                        </span>
                        <span className="text-white/30 text-xs font-mono flex items-center gap-1">
                          <Calendar size={10} />
                          {cert.date}
                        </span>
                      </div>
                      <a
                        href={cert.credentialUrl}
                        className="text-white/20 hover:text-[#00f5ff] transition-colors duration-200"
                        aria-label="View credential"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>

                  {/* Bottom border on hover */}
                  <div
                    className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Extra info card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-5 p-4 rounded-xl border border-dashed border-white/10 text-center"
            >
              <p className="text-white/30 text-xs font-mono">
                {t('continuousLearning')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
