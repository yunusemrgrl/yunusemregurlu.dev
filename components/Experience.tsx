'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, ChevronDown, ExternalLink } from 'lucide-react'

interface Experience {
  company: string
  role: string
  location: string
  period: string
  type: string
  color: string
  bullets: string[]
  techs: string[]
}

const experiences: Experience[] = [
  {
    company: 'Energetisch.fit',
    role: 'Full Stack Developer',
    location: 'Remote, AT',
    period: 'Oct 2024 – July 2025',
    type: 'Remote',
    color: '#00f5ff',
    bullets: [
      'Resolved critical UI and data integrity issues using robust client-side validation, structured error handling, and try-catch logic',
      'Built responsive and modular UI components with Bootstrap, Sass, and BEM, creating reusable Livewire partials',
      'Delivered dynamic Livewire features with real-time state synchronization, reducing unnecessary re-renders through debounce strategies',
      'Streamlined deployment and collaboration workflows using GitLab CI/CD pipelines and Cloud Panel',
    ],
    techs: ['Laravel', 'Livewire', 'MySQL', 'Bootstrap', 'Sass', 'Cloud Panel', 'GitLab', 'Jira'],
  },
  {
    company: 'Payzec',
    role: 'Full Stack Developer',
    location: 'Remote, TR',
    period: 'Aug 2023 – July 2025',
    type: 'Remote',
    color: '#a855f7',
    bullets: [
      'Built a seamless one-click checkout flow with Vue.js and Pinia, using reusable components and real-time validation',
      'Developed a centralized, responsive dashboard improving abandoned cart recovery by consolidating multi-platform cart data',
      'Integrated WordPress plugins using RESTful APIs, custom Vue composables, and Axios interceptors',
      'Added offline-first capabilities and PWA enhancements using Service Workers and Firebase Cloud Messaging',
      'Represented the product at international events (Web Summit, Worldef), presenting the scalable frontend architecture',
    ],
    techs: ['Vue.js', 'Pinia', 'Laravel', 'MySQL', 'MongoDB', 'Tailwind CSS', 'Firebase', 'PWA', 'Mailgun'],
  },
  {
    company: 'Alışgidiş',
    role: 'Frontend Developer',
    location: 'Istanbul, TR',
    period: 'Mar 2024 – July 2024',
    type: 'On-site',
    color: '#f59e0b',
    bullets: [
      'Developed core e-commerce features for a high-traffic marketplace using Next.js, focusing on scalability and performance',
      'Translated pixel-perfect Figma designs into responsive, reusable UI components using Atomic Design principles',
      'Implemented advanced client-side state with Zustand, React Context API, and TanStack Query/SWR, ensuring data consistency',
    ],
    techs: ['Next.js', 'Tailwind CSS', 'Figma', 'Zustand', 'TanStack Query', 'Azure', 'Jira'],
  },
  {
    company: 'Patara Soft',
    role: 'Full Stack Developer',
    location: 'Remote, TR',
    period: 'Nov 2023 – Feb 2024',
    type: 'Remote',
    color: '#10b981',
    bullets: [
      'Contributed to a modular admin panel frontend using Blade and jQuery, enhancing usability with dynamic tables and filtering',
      'Integrated RESTful APIs for dynamic CRUD operations via AJAX for seamless data handling',
      'Added multi-language (i18n) support and SEO-friendly improvements using semantic HTML and dynamic meta tags',
    ],
    techs: ['Laravel', 'MySQL', 'Blade', 'jQuery', 'Ajax', 'Bootstrap', 'Eloquent ORM'],
  },
  {
    company: 'Kodlooper',
    role: 'Full Stack Developer',
    location: 'Sakarya, TR',
    period: 'Aug 2022 – Feb 2023',
    type: 'On-site',
    color: '#f97316',
    bullets: [
      'Developed and maintained web applications using Nuxt.js, Vue.js, and React.js with SSR and SPA architectures',
      'Applied scalable client-side state management with Vuex and Redux Toolkit for complex application data',
      'Designed user interfaces with Tailwind CSS, Bootstrap, and Material UI, ensuring responsiveness and visual consistency',
      'Integrated GraphQL and RESTful APIs using modern data fetching strategies for efficient frontend-backend communication',
    ],
    techs: ['Nuxt.js', 'Vue.js', 'React.js', 'GraphQL', 'Vuex', 'Redux Toolkit', 'Laravel', 'MySQL'],
  },
]

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-[-5px] top-2 w-3 h-3 rounded-full border-2 border-[#0a0a0a] z-10"
        style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}80` }}
      />

      {/* Card */}
      <motion.div
        className="glass-card rounded-2xl border border-white/5 overflow-hidden cursor-pointer"
        whileHover={{ x: -4, borderColor: `${exp.color}30` }}
        onClick={() => setExpanded((v) => !v)}
        style={{ '--exp-color': exp.color } as React.CSSProperties}
      >
        {/* Card header */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-black text-lg text-white">{exp.company}</h3>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{
                    color: exp.color,
                    background: `${exp.color}15`,
                    border: `1px solid ${exp.color}30`,
                  }}
                >
                  {exp.type}
                </span>
              </div>
              <p className="font-semibold text-sm" style={{ color: exp.color }}>
                {exp.role}
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="flex items-center gap-1 text-white/40 text-xs">
                  <MapPin size={11} />
                  {exp.location}
                </span>
                <span className="flex items-center gap-1 text-white/40 text-xs">
                  <Calendar size={11} />
                  {exp.period}
                </span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-white/30 mt-1 flex-shrink-0"
            >
              <ChevronDown size={18} />
            </motion.div>
          </div>

          {/* Tech tags — always visible */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {exp.techs.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 text-white/50 hover:border-white/20 hover:text-white/70 transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
            {exp.techs.length > 5 && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/5 text-white/30">
                +{exp.techs.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Expandable bullets */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div
                className="px-6 pb-6 border-t"
                style={{ borderColor: `${exp.color}15` }}
              >
                <ul className="mt-4 space-y-3">
                  {exp.bullets.map((bullet, bi) => (
                    <motion.li
                      key={bi}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: bi * 0.06 }}
                      className="flex items-start gap-3 text-sm text-white/60 leading-relaxed"
                    >
                      <span
                        className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: exp.color }}
                      />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>

                {/* All tech tags */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {exp.techs.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-1 rounded-full transition-all duration-200 cursor-default hover:scale-105"
                      style={{
                        color: exp.color,
                        background: `${exp.color}15`,
                        border: `1px solid ${exp.color}25`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left accent border */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
          style={{ background: `linear-gradient(180deg, ${exp.color}, transparent)` }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 overflow-hidden">
      {/* bg gradient */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-tag mb-3">03 / Experience</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Career <span className="gradient-text">Journey</span>
          </h2>
          <p className="mt-4 text-white/40 text-sm">
            Click any card to expand the details.
          </p>
          <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-[#00f5ff] to-transparent" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-0 w-px timeline-line" />

          {/* Cards */}
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
