'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

const SPRING = { type: 'spring', stiffness: 100, damping: 20 } as const

function EmbrowPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#7a9ab8]">
      {children}
    </span>
  )
}

function SoonBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-current/70 ring-1 ring-white/10">
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
      className="py-24 md:py-32 bg-[#07162a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <EmbrowPill>{t('services.eyebrow')}</EmbrowPill>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            {t('services.title')}
          </h2>
        </div>

        {/* Card grid — Layout B */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
          {/* ── Left: Consórcio (featured) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ ...SPRING, delay: 0 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-1.5 cursor-default"
          >
            {/* Double-Bezel inner */}
            <div
              className="rounded-[calc(1rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] p-8 h-full flex flex-col"
              style={{ background: 'linear-gradient(135deg, #020c30, #142f54)' }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#a0c4ff]">
                {t('services.consortium.title')}
              </p>

              <h3 className="text-2xl font-bold text-white mt-3">
                {t('services.consortium.title')}
              </h3>

              <p className="text-[#7a9ab8] mt-4 leading-relaxed flex-1">
                {t('services.consortium.desc')}
              </p>

              <motion.a
                href="#para-clientes"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
                className="mt-8 self-start inline-flex items-center gap-2 rounded-full bg-[#ae251c] hover:bg-[#c42d22] text-white font-semibold text-sm px-6 py-3 transition-colors duration-200"
              >
                {t('services.consortium.cta')}
                <ArrowRight size={15} />
              </motion.a>
            </div>
          </motion.div>

          {/* ── Right column: 3 smaller cards ── */}
          <div className="flex flex-col gap-6">
            {/* Seguros */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ ...SPRING, delay: 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-1.5 cursor-default"
            >
              <div
                className="rounded-[calc(1rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] p-6 flex flex-col gap-3"
                style={{ background: 'linear-gradient(135deg, #4a0808, #7a1010)' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#ffaaaa]">
                      {t('services.insurance.title')}
                    </p>
                    <h3 className="text-lg font-bold text-[#ffd4d4] mt-1">
                      {t('services.insurance.title')}
                    </h3>
                  </div>
                  <SoonBadge label={t('services.insurance.soon').split('—')[0].trim()} />
                </div>
                <p className="text-[#c98888] text-sm leading-relaxed">
                  {t('services.insurance.desc')}
                </p>
              </div>
            </motion.div>

            {/* Saúde */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ ...SPRING, delay: 0.16 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-1.5 cursor-default"
            >
              <div
                className="rounded-[calc(1rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] p-6 flex flex-col gap-3"
                style={{ background: '#f0f6ff' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#142f54]">
                      {t('services.health.title')}
                    </p>
                    <h3 className="text-lg font-bold text-[#07162a] mt-1">
                      {t('services.health.title')}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#07162a]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#07162a]/70 ring-1 ring-[#07162a]/10">
                    <Clock size={10} />
                    {t('services.health.soon').split('—')[0].trim()}
                  </span>
                </div>
                <p className="text-[#142f54] text-sm leading-relaxed">
                  {t('services.health.desc')}
                </p>
              </div>
            </motion.div>

            {/* Investimentos */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ ...SPRING, delay: 0.24 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white/5 ring-1 ring-[#c9a84c]/20 p-1.5 cursor-default"
            >
              <div
                className="rounded-[calc(1rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] p-6 flex flex-col gap-3"
                style={{ background: 'linear-gradient(135deg, #111122, #1a1a2e)' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c9a84c]">
                      {t('services.invest.title')}
                    </p>
                    <h3 className="text-lg font-bold text-[#e8d5a3] mt-1">
                      {t('services.invest.title')}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#c9a84c]/80 ring-1 ring-[#c9a84c]/20">
                    <Clock size={10} />
                    {t('services.invest.soon').split('—')[0].trim()}
                  </span>
                </div>
                <p className="text-[#c9a84c]/60 text-sm leading-relaxed">
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
