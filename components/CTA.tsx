'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Download, Sparkles, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function CTA() {
  const t = useTranslations('contact')
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(0,245,255,0.08) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div className="grid-bg absolute inset-0 opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles size={16} className="text-[#00f5ff]" />
            <span className="section-tag">{t('tag')}</span>
            <Sparkles size={16} className="text-[#a855f7]" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
            {t('title')}
          </h2>

          <p className="mt-6 text-white/50 text-base max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {/* Email */}
          <motion.a
            href="mailto:yunusemregurlu@gmail.com"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4, boxShadow: '0 0 30px rgba(0,245,255,0.2)' }}
            className="glass-card rounded-2xl p-6 border border-white/5 hover:border-[#00f5ff]/30 group flex items-center gap-5 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]"
              style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.2)' }}>
              <Mail size={22} className="text-[#00f5ff]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/40 text-xs font-mono mb-1">{t('email')}</p>
              <p className="text-white/90 text-sm font-semibold truncate">yunusemregurlu@gmail.com</p>
            </div>
            <ArrowRight size={16} className="text-white/20 group-hover:text-[#00f5ff] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+905394627446"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -4, boxShadow: '0 0 30px rgba(168,85,247,0.2)' }}
            className="glass-card rounded-2xl p-6 border border-white/5 hover:border-[#a855f7]/30 group flex items-center gap-5 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
              <Phone size={22} className="text-[#a855f7]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/40 text-xs font-mono mb-1">{t('phone')}</p>
              <p className="text-white/90 text-sm font-semibold">+90 539 462 74 46</p>
            </div>
            <ArrowRight size={16} className="text-white/20 group-hover:text-[#a855f7] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
          </motion.a>
        </div>

        {/* Download CV buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="mb-5 text-white/40 text-xs font-mono uppercase tracking-widest">{t('downloadCV')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="/Yunus_Emre_Gurlu_Frontend_Developer.pdf"
              download
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base tracking-wide relative overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #00f5ff, #0ea5e9)' }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(0,245,255,0.5)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                  transform: 'skewX(-20deg)',
                }}
              />
              <Download size={18} className="text-[#0a0a0a]" />
              <span className="text-[#0a0a0a]">{t('downloadFrontend')}</span>
            </motion.a>

            <motion.a
              href="/YunusEmreGurlu_FullStack_Developer_CV.pdf"
              download
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base tracking-wide relative overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(168,85,247,0.5)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                  transform: 'skewX(-20deg)',
                }}
              />
              <Download size={18} className="text-[#0a0a0a]" />
              <span className="text-[#0a0a0a]">{t('downloadFullstack')}</span>
            </motion.a>
          </div>

          <p className="mt-4 text-white/25 text-xs font-mono">
            {t('cvFormat')}
          </p>
        </motion.div>

        {/* Decorative separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 h-px origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), rgba(168,85,247,0.3), transparent)' }}
        />
      </div>
    </section>
  )
}
