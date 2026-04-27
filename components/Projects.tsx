'use client'

import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Bot,
  Camera,
  Code2,
  ExternalLink,
  GitFork,
  Github,
  Layers,
  Star,
} from 'lucide-react'
import { useLocale } from 'next-intl'

type Locale = 'en' | 'tr'

interface Project {
  name: string
  repo: string
  live?: string
  image: string
  accent: string
  icon: React.ReactNode
  stars: number
  forks: number
  language: string
  tags: string[]
  title: Record<Locale, string>
  description: Record<Locale, string>
  highlights: Record<Locale, string[]>
}

const copy = {
  en: {
    tag: '03 / Open Source',
    title: 'Featured',
    titleHighlight: 'Projects',
    subtitle:
      'Selected public repositories from GitHub, focused on production-minded UI work, developer tools, and browser automation.',
    sourceLabel: 'GitHub',
    liveLabel: 'Live',
    allRepos: 'View all repositories',
    moreTitle: 'More public work',
    moreSubtitle: 'Additional repos worth scanning from the same GitHub profile.',
  },
  tr: {
    tag: '03 / Açık Kaynak',
    title: 'Öne Çıkan',
    titleHighlight: 'Projeler',
    subtitle:
      'GitHub üzerindeki public repolardan seçilmiş; üretim odaklı arayüz, geliştirici aracı ve browser automation işleri.',
    sourceLabel: 'GitHub',
    liveLabel: 'Canlı',
    allRepos: 'Tüm repoları gör',
    moreTitle: 'Diğer public işler',
    moreSubtitle: 'Aynı GitHub profilinden hızlıca incelenebilecek ek repolar.',
  },
} as const

const featuredProjects: Project[] = [
  {
    name: 'claudedash',
    repo: 'https://github.com/yunusemrgrl/claudedash',
    live: 'https://yunusemrgrl.github.io/claudedash/',
    image:
      'https://raw.githubusercontent.com/yunusemrgrl/claudedash/main/docs/marketing/github-og.png',
    accent: '#00f5ff',
    icon: <Bot size={18} />,
    stars: 3,
    forks: 0,
    language: 'TypeScript',
    tags: ['AI agents', 'CLI', 'Next.js', 'MCP'],
    title: {
      en: 'Local control plane for AI coding agents',
      tr: 'AI kodlama ajanları için local control plane',
    },
    description: {
      en: 'A dashboard and CLI workflow for monitoring agent sessions, context health, task queues, quality gates, and recovery snapshots.',
      tr: 'Ajan oturumlarını, context sağlığını, task queue’ları, quality gate sonuçlarını ve recovery snapshot’larını izleyen dashboard ve CLI akışı.',
    },
    highlights: {
      en: ['Real-time session visibility', 'Plan mode task tracking', 'Context rollback workflow'],
      tr: ['Gerçek zamanlı oturum görünürlüğü', 'Plan mode task takibi', 'Context rollback akışı'],
    },
  },
  {
    name: 'Element Snap',
    repo: 'https://github.com/yunusemrgrl/element-snap',
    image:
      'https://raw.githubusercontent.com/yunusemrgrl/element-snap/main/assets/hero_image.png',
    accent: '#f59e0b',
    icon: <Camera size={18} />,
    stars: 0,
    forks: 0,
    language: 'JavaScript',
    tags: ['Chrome Extension', 'Canvas 2D', 'Manifest V3', 'Export'],
    title: {
      en: 'Browser extension for precise element screenshots',
      tr: 'HTML elementleri için hassas ekran görüntüsü eklentisi',
    },
    description: {
      en: 'Capture a specific page element, annotate it with drawing tools, crop, copy, or export it as PNG, JPG, and PDF.',
      tr: 'Sayfadaki belirli bir elementi yakalayan, çizim araçlarıyla annotate eden, kırpan, kopyalayan veya PNG, JPG ve PDF olarak export eden Chrome eklentisi.',
    },
    highlights: {
      en: ['Hover-based element selection', 'Object-based annotation editor', 'Clipboard and multi-format export'],
      tr: ['Hover ile element seçimi', 'Object tabanlı annotation editor', 'Clipboard ve çok formatlı export'],
    },
  },
]

const moreProjects = [
  {
    name: 'filament-storybook',
    href: 'https://github.com/yunusemrgrl/filament-storybook',
    icon: <Layers size={16} />,
    language: 'PHP',
    copy: {
      en: 'Laravel / Filament component exploration repo.',
      tr: 'Laravel / Filament component keşif reposu.',
    },
  },
  {
    name: 'front-end-test-case',
    href: 'https://github.com/yunusemrgrl/front-end-test-case',
    live: 'https://frontend-test-case.netlify.app/',
    icon: <Code2 size={16} />,
    language: 'Vue',
    copy: {
      en: 'Nuxt and Vue based frontend case study.',
      tr: 'Nuxt ve Vue tabanlı frontend case study.',
    },
  },
  {
    name: 'marvel',
    href: 'https://github.com/yunusemrgrl/marvel',
    live: 'https://marvel-one-azure.vercel.app/',
    icon: <Code2 size={16} />,
    language: 'Vue',
    copy: {
      en: 'Marvel comics app with Vue, Vuex, router, and API integration.',
      tr: 'Vue, Vuex, router ve API entegrasyonlu Marvel comics uygulaması.',
    },
  },
]

function getLocale(locale: string): Locale {
  return locale === 'tr' ? 'tr' : 'en'
}

function ProjectCard({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  const t = copy[locale]

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="glass-card group relative overflow-hidden rounded-lg border border-white/5"
      whileHover={{ y: -6, borderColor: `${project.accent}45` }}
    >
      <div
        className="absolute left-0 top-0 h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
      />

      <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.02]">
        <img
          src={project.image}
          alt={`${project.name} preview`}
          className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono font-semibold backdrop-blur-md"
            style={{
              color: project.accent,
              borderColor: `${project.accent}45`,
              background: `${project.accent}14`,
            }}
          >
            {project.icon}
            {project.language}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] font-mono text-white/70 backdrop-blur-md">
            <span className="inline-flex items-center gap-1">
              <Star size={12} /> {project.stars}
            </span>
            <span className="inline-flex items-center gap-1">
              <GitFork size={12} /> {project.forks}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide text-white/45"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-black text-white">{project.name}</h3>
        <p className="mt-2 text-sm font-semibold" style={{ color: project.accent }}>
          {project.title[locale]}
        </p>
        <p className="mt-4 min-h-[72px] text-sm leading-relaxed text-white/55">
          {project.description[locale]}
        </p>

        <ul className="mt-5 space-y-2">
          {project.highlights[locale].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-white/60">
              <span
                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: project.accent, boxShadow: `0 0 8px ${project.accent}` }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-[#0a0a0a] transition hover:scale-105"
              style={{ background: project.accent, boxShadow: `0 0 20px ${project.accent}35` }}
            >
              <ExternalLink size={15} />
              {t.liveLabel}
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/75 transition hover:border-white/25 hover:text-white"
          >
            <Github size={15} />
            {t.sourceLabel}
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const locale = getLocale(useLocale())
  const t = copy[locale]

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-28">
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      <div
        className="absolute left-0 top-0 h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.25), rgba(168,85,247,0.2), transparent)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="section-tag mb-3">{t.tag}</p>
            <h2 className="text-4xl font-black text-white md:text-5xl">
              {t.title} <span className="gradient-text">{t.titleHighlight}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/45">
              {t.subtitle}
            </p>
            <div className="mt-4 h-0.5 w-16 bg-gradient-to-r from-[#00f5ff] to-transparent" />
          </div>

          <a
            href="https://github.com/yunusemrgrl?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00f5ff]/35 px-5 py-2.5 text-sm font-bold text-[#00f5ff] transition hover:border-[#00f5ff] hover:bg-[#00f5ff]/10"
          >
            <Github size={16} />
            {t.allRepos}
            <ArrowUpRight size={15} />
          </a>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} locale={locale} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-8 rounded-lg border border-white/5 bg-white/[0.025] p-5"
        >
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-black text-white">{t.moreTitle}</h3>
              <p className="mt-1 text-sm text-white/40">{t.moreSubtitle}</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {moreProjects.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-white/5 bg-black/20 p-4 transition hover:-translate-y-1 hover:border-[#a855f7]/35 hover:bg-white/[0.04]"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                    <span className="text-[#a855f7]">{project.icon}</span>
                    {project.name}
                  </span>
                  <ArrowUpRight size={15} className="text-white/25 transition group-hover:text-[#a855f7]" />
                </div>
                <p className="min-h-[40px] text-xs leading-relaxed text-white/45">
                  {project.copy[locale]}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-mono text-white/45">
                    {project.language}
                  </span>
                  {project.live && (
                    <span className="rounded-full border border-[#00f5ff]/20 px-2 py-1 text-[10px] font-mono text-[#00f5ff]/75">
                      {t.liveLabel}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
