'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  FlaskConical,
  Globe,
  Gauge,
  Maximize2,
  Clapperboard,
} from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

type Locale = 'en' | 'tr'

interface ClientProject {
  slug: string
  name: string
  accent: string
  icon: React.ReactNode
  tags: string[]
  screenshots: number
  hasVideo: boolean
  title: Record<Locale, string>
  description: Record<Locale, string>
}

const projects: ClientProject[] = [
  {
    slug: 'betakimya',
    name: 'Beta Kimya',
    accent: '#00f5ff',
    icon: <FlaskConical size={18} />,
    tags: ['Corporate', 'Marketing Site', 'Production'],
    screenshots: 4,
    hasVideo: true,
    title: {
      en: 'Adhesive & chemical solutions provider',
      tr: 'Yapıştırıcı ve kimyasal çözümler sağlayıcısı',
    },
    description: {
      en: 'Corporate website for an adhesive & chemical solutions company, presenting products and technical documentation with a clean, industrial interface.',
      tr: 'Yapıştırıcı ve kimyasal çözümler firması için ürünleri ve teknik dokümantasyonu temiz, endüstriyel bir arayüzle sunan kurumsal web sitesi.',
    },
  },
  {
    slug: 'crusline',
    name: 'Crusline',
    accent: '#a855f7',
    icon: <Globe size={18} />,
    tags: ['Web App', 'Multi-section', 'Production'],
    screenshots: 6,
    hasVideo: true,
    title: {
      en: 'Multi-page web interface',
      tr: 'Çok sayfalı web arayüzü',
    },
    description: {
      en: 'Client web project with a multi-section interface — explore the full screenshot gallery and demo recording below.',
      tr: 'Çok bölümlü arayüze sahip kurumsal web projesi — tüm ekran görüntüsü galerisini ve demo kaydını aşağıdan inceleyin.',
    },
  },
  {
    slug: 'intifa',
    name: 'İntifa',
    accent: '#f59e0b',
    icon: <Gauge size={18} />,
    tags: ['Dashboard', 'IoT', 'SaaS'],
    screenshots: 2,
    hasVideo: true,
    title: {
      en: 'Smart station management system',
      tr: 'Akıllı istasyon yönetim sistemi',
    },
    description: {
      en: 'Operations dashboard for smart station management, monitoring and controlling station activity in real time.',
      tr: 'İstasyon aktivitesini gerçek zamanlı izleyen ve kontrol eden akıllı istasyon yönetim sistemi paneli.',
    },
  },
]

function getLocale(locale: string): Locale {
  return locale === 'tr' ? 'tr' : 'en'
}

function buildScreenshotPaths(slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/${slug}/${String(i + 1).padStart(2, '0')}.png`)
}

function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [active])
}

function useFocusTrap(active: boolean, containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!active) return
    const node = containerRef.current
    if (!node) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusables = node.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    node.addEventListener('keydown', handleKey)
    return () => node.removeEventListener('keydown', handleKey)
  }, [active, containerRef])
}

interface LightboxProps {
  project: ClientProject
  index: number
  locale: Locale
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ project, index, locale, onClose, onPrev, onNext }: LightboxProps) {
  const t = useTranslations('work')
  const containerRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const paths = buildScreenshotPaths(project.slug, project.screenshots)
  const currentSrc = paths[index]
  const total = paths.length

  useBodyScrollLock(true)
  useFocusTrap(true, containerRef)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onPrev()
      else if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${t('screenshotLabel')} ${index + 1} ${t('ofLabel')} ${total} — ${project.name}`}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-md p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="relative flex h-full w-full max-w-6xl flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono font-semibold"
              style={{
                color: project.accent,
                borderColor: `${project.accent}45`,
                background: `${project.accent}14`,
              }}
            >
              {project.icon}
              {project.name}
            </span>
            <span className="font-mono text-xs text-white/40">
              {index + 1} {t('ofLabel')} {total}
            </span>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t('closeLabel')}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/30 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black/40">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSrc}
              src={currentSrc}
              alt={`${project.name} — ${t('screenshotLabel')} ${index + 1}`}
              className="max-h-full max-w-full object-contain"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>

          {index > 0 && (
            <button
              type="button"
              onClick={onPrev}
              aria-label={t('prevLabel')}
              className="absolute left-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/70 text-white/80 backdrop-blur-md transition hover:border-white/40 hover:text-white"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          {index < total - 1 && (
            <button
              type="button"
              onClick={onNext}
              aria-label={t('nextLabel')}
              className="absolute right-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/70 text-white/80 backdrop-blur-md transition hover:border-white/40 hover:text-white"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

interface VideoModalProps {
  project: ClientProject
  locale: Locale
  onClose: () => void
}

function VideoModal({ project, locale, onClose }: VideoModalProps) {
  const t = useTranslations('work')
  const containerRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoSrc = `/${project.slug}/demo.mp4`

  useBodyScrollLock(true)
  useFocusTrap(true, containerRef)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} — ${t('demoVideoLabel')}`}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-md p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-5xl flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono font-semibold"
            style={{
              color: project.accent,
              borderColor: `${project.accent}45`,
              background: `${project.accent}14`,
            }}
          >
            <Clapperboard size={14} />
            {project.name} — {t('demoVideoLabel')}
          </span>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t('closeLabel')}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/30 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-hidden rounded-lg border border-white/5 bg-black">
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            playsInline
            className="aspect-video w-full"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function ClientWork() {
  const t = useTranslations('work')
  const locale = getLocale(useLocale())
  const [activeIdx, setActiveIdx] = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [videoOpen, setVideoOpen] = useState(false)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  const project = projects[activeIdx]
  const screenshots = buildScreenshotPaths(project.slug, project.screenshots)

  const selectProject = useCallback((idx: number) => {
    setActiveIdx(idx)
    setLightboxIdx(null)
    setVideoOpen(false)
  }, [])

  const openLightbox = useCallback((idx: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement
    setLightboxIdx(idx)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null)
    lastFocusedRef.current?.focus()
  }, [])

  const openVideo = useCallback(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement
    setVideoOpen(true)
  }, [])

  const closeVideo = useCallback(() => {
    setVideoOpen(false)
    lastFocusedRef.current?.focus()
  }, [])

  const prevShot = useCallback(() => {
    setLightboxIdx((i) => (i === null ? null : (i - 1 + project.screenshots) % project.screenshots))
  }, [project.screenshots])

  const nextShot = useCallback(() => {
    setLightboxIdx((i) => (i === null ? null : (i + 1) % project.screenshots))
  }, [project.screenshots])

  return (
    <section id="work" className="relative overflow-hidden px-6 py-28">
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />
      <div
        className="absolute left-0 top-0 h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,245,255,0.25), rgba(168,85,247,0.2), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="section-tag mb-3">{t('tag')}</p>
          <h2 className="text-4xl font-black text-white md:text-5xl">
            {t('title')} <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/45">{t('subtitle')}</p>
          <div className="mt-4 h-0.5 w-16 bg-gradient-to-r from-[#00f5ff] to-transparent" />
        </motion.div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t('title')}>
          {projects.map((p, i) => {
            const isActive = i === activeIdx
            return (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`work-panel-${p.slug}`}
                id={`work-tab-${p.slug}`}
                onClick={() => selectProject(i)}
                className="group relative inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-300"
                style={{
                  color: isActive ? p.accent : 'rgba(255,255,255,0.55)',
                  borderColor: isActive ? `${p.accent}55` : 'rgba(255,255,255,0.08)',
                  background: isActive ? `${p.accent}12` : 'transparent',
                  boxShadow: isActive ? `0 0 20px ${p.accent}25` : 'none',
                }}
              >
                <span style={{ color: isActive ? p.accent : 'rgba(255,255,255,0.4)' }}>
                  {p.icon}
                </span>
                {p.name}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            role="tabpanel"
            id={`work-panel-${project.slug}`}
            aria-labelledby={`work-tab-${project.slug}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]"
          >
            <motion.article
              className="glass-card relative overflow-hidden rounded-lg border border-white/5 p-6"
              whileHover={{ borderColor: `${project.accent}30` }}
            >
              <div
                className="absolute left-0 top-0 h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
              />

              <div className="flex items-center gap-3">
                <div
                  className="inline-flex size-11 items-center justify-center rounded-xl"
                  style={{
                    color: project.accent,
                    background: `${project.accent}14`,
                    border: `1px solid ${project.accent}33`,
                  }}
                >
                  {project.icon}
                </div>
                <h3 className="text-2xl font-black text-white">{project.name}</h3>
              </div>

              <p
                className="mt-4 text-sm font-semibold"
                style={{ color: project.accent }}
              >
                {project.title[locale]}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {project.description[locale]}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide text-white/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.hasVideo && (
                <motion.button
                  type="button"
                  onClick={openVideo}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-[#0a0a0a] transition"
                  style={{
                    background: project.accent,
                    boxShadow: `0 0 20px ${project.accent}35`,
                  }}
                >
                  <Play size={15} />
                  {t('watchDemo')}
                </motion.button>
              )}
            </motion.article>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {screenshots.map((src, i) => (
                <motion.button
                  key={src}
                  type="button"
                  onClick={() => openLightbox(i)}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  aria-label={`${t('openImageLabel')} ${i + 1}`}
                  className="group relative aspect-video overflow-hidden rounded-lg border border-white/5 bg-white/[0.02]"
                  whileHover={{ y: -4, borderColor: `${project.accent}40` }}
                >
                  <img
                    src={src}
                    alt={`${project.name} — ${t('screenshotLabel')} ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
                  <span
                    className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/70 text-white/0 backdrop-blur-md transition group-hover:text-white/90"
                    style={{ boxShadow: `0 0 12px ${project.accent}30` }}
                  >
                    <Maximize2 size={14} />
                  </span>
                  <span
                    className="absolute bottom-2 left-2 font-mono text-[10px] text-white/0 transition group-hover:text-white/70"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            project={project}
            index={lightboxIdx}
            locale={locale}
            onClose={closeLightbox}
            onPrev={prevShot}
            onNext={nextShot}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {videoOpen && <VideoModal project={project} locale={locale} onClose={closeVideo} />}
      </AnimatePresence>
    </section>
  )
}
