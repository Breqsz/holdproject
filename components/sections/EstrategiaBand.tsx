'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLocale } from '@/lib/i18n'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function EstrategiaBand() {
  const { t } = useLocale()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <section
      ref={ref}
      aria-label={t('band.aria')}
      className="relative overflow-hidden"
      style={{
        background: '#07162a',
        fontFamily: 'var(--font-outfit)',
      }}
    >
      {/* Top + bottom hairlines */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--hairline-accent) 50%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--hairline-accent) 50%, transparent 100%)',
        }}
      />

      {/* Subtle radial highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(122,154,184,0.10), transparent 65%)',
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-10 lg:py-14">
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-8 text-center md:text-left">
          {/* Eyebrow phrase */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="text-[12px] md:text-[13px] font-semibold uppercase text-[#7a9ab8] whitespace-nowrap"
            style={{ letterSpacing: '0.28em' }}
          >
            {t('band.eyebrow')}
          </motion.span>

          {/* Vertical hairline divider (desktop) */}
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            className="hidden md:block w-px h-8"
            style={{
              background: 'var(--hairline-accent)',
              transformOrigin: 'center',
            }}
          />

          {/* Horizontal hairline divider (mobile) */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            className="md:hidden block h-px w-16"
            style={{
              background: 'var(--hairline-accent)',
              transformOrigin: 'center',
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.35, ease: EASE }}
            className="text-white text-balance"
            style={{
              fontFamily: 'var(--font-gellix)',
              fontWeight: 500,
              fontSize: 'clamp(1.25rem, 2.2vw, 1.875rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.012em',
            }}
          >
            {t('band.tagline')}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
