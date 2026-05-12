'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const enter = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT_EXPO } },
}

function EyebrowPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#7a9ab8]">
      {children}
    </span>
  )
}

function SoonBadge({ label, tone = 'light' }: { label: string; tone?: 'light' | 'dark' | 'gold' }) {
  const styles = {
    light: 'bg-white/10 text-white/70 ring-white/15',
    dark:  'bg-[#07162a]/10 text-[#07162a]/70 ring-[#07162a]/15',
    gold:  'bg-white/10 text-white/85 ring-white/20',
  }[tone]
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ring-1 ${styles}`}>
      <Clock size={10} />
      {label}
    </span>
  )
}

export default function ServicoPillars() {
  const { t } = useLocale()

  return (
    <section
      id="servicos"
      className="section-pad bg-[#07162a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — left-aligned, asymmetric */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={enter}
          className="max-w-3xl mb-14"
        >
          <EyebrowPill>{t('services.eyebrow')}</EyebrowPill>
          <h2
            className="mt-5 text-display text-white"
            style={{ fontSize: 'clamp(2rem, 4.4vw, 3.25rem)' }}
          >
            {t('services.title')}
          </h2>
        </motion.div>

        {/* Asymmetric grid — Layout B */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">

          {/* ── Consórcio: featured single-panel, magnetic-feel hover ── */}
          <motion.a
            href="#para-clientes"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl block"
            style={{ background: 'linear-gradient(135deg, #020c30 0%, #142f54 100%)' }}
          >
            {/* Inner spotlight on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(600px circle at 30% 20%, rgba(174,37,28,0.18), transparent 60%)',
              }}
            />
            <div className="relative p-8 md:p-10 h-full flex flex-col">
              <div className="flex items-center gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a0c4ff]">
                  Pilar Principal
                </p>
                <div className="rule-accent h-px w-16 opacity-70" />
              </div>

              <h3
                className="mt-5 text-display text-white"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
              >
                {t('services.consortium.title')}
              </h3>

              <p className="mt-5 max-w-[48ch] text-pretty text-[#7a9ab8] leading-relaxed flex-1">
                {t('services.consortium.desc')}
              </p>

              <span className="mt-10 self-start inline-flex items-center gap-2 rounded-full bg-[#ae251c] text-white font-semibold text-sm px-6 py-3 transition-colors duration-200 group-hover:bg-[#921e16]">
                {t('services.consortium.cta')}
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </motion.a>

          {/* ── 3 smaller cards: opacity-only hover ── */}
          <div className="flex flex-col gap-6">

            {/* Seguros — brand red */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.08 }}
              whileHover={{ y: -2 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #6e1a14 0%, #ae251c 100%)' }}
            >
              <div className="p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">
                    {t('services.insurance.title')}
                  </h3>
                  <SoonBadge label={t('services.insurance.soon').split('—')[0].trim()} tone="light" />
                </div>
                <p className="text-white/75 text-sm leading-relaxed">
                  {t('services.insurance.desc')}
                </p>
              </div>
            </motion.div>

            {/* Saúde — light */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.16 }}
              whileHover={{ y: -2 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: '#f0f6ff' }}
            >
              <div className="p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-[#07162a]">
                    {t('services.health.title')}
                  </h3>
                  <SoonBadge label={t('services.health.soon').split('—')[0].trim()} tone="dark" />
                </div>
                <p className="text-[#142f54] text-sm leading-relaxed">
                  {t('services.health.desc')}
                </p>
              </div>
            </motion.div>

            {/* Investimentos — graphite + gold */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.24 }}
              whileHover={{ y: -2 }}
              className="rounded-2xl overflow-hidden ring-1 ring-white/10"
              style={{ background: 'linear-gradient(135deg, #111122 0%, #1a1a2e 100%)' }}
            >
              <div className="p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">
                    {t('services.invest.title')}
                  </h3>
                  <SoonBadge label={t('services.invest.soon').split('—')[0].trim()} tone="gold" />
                </div>
                <p className="text-white/65 text-sm leading-relaxed">
                  {t('services.invest.desc')}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
