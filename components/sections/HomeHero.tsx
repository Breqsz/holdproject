'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT_EXPO } },
}

const SERVICES = [
  { key: 'hero.service.saude',       color: '#22c55e' },
  { key: 'hero.service.seguros',     color: '#3b82f6' },
  { key: 'hero.service.consorcios',  color: '#a855f7' },
  { key: 'hero.service.financas',    color: '#c9a84c' },
] as const

function MagneticCTA({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 })

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ x: sx, y: sy }}
      className="group inline-flex items-center rounded-full bg-[#ae251c] pl-5 pr-1.5 h-10 text-sm font-bold text-white shadow-[0_4px_18px_rgba(174,37,28,0.35)] transition-colors duration-300 hover:bg-[#c42d23]"
    >
      {label}
      <span className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
        <ArrowRight size={13} />
      </span>
    </motion.a>
  )
}

export default function HomeHero() {
  const { t } = useLocale()
  const wa = formatWhatsAppLink(WHATSAPP, t('hero.wa.pf'))

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ background: 'linear-gradient(125deg,#040d1a 0%,#071528 45%,#0a1c36 100%)' }}
    >
      {/* Atmosphere orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-16 h-[480px] w-[480px] rounded-full bg-[#1a3f7a] opacity-[.20] blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-12 h-[240px] w-[240px] rounded-full bg-[#ae251c] opacity-[.07] blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute right-[12%] top-[40%] h-[280px] w-[280px] rounded-full bg-[#2a5ca0] opacity-[.12] blur-[80px]" />

      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,.055) 1px,transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="relative z-10 grid min-h-[100dvh] grid-cols-1 lg:grid-cols-[1.1fr_1fr]">

        {/* ── Left — copy ── */}
        <div className="flex flex-col justify-center px-6 pb-10 pt-32 sm:px-10 lg:pl-16 lg:pr-10 xl:pl-20">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col">

            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
              <div className="h-px w-4" style={{ background: 'linear-gradient(to right,rgba(174,37,28,.8),transparent)' }} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'rgba(174,37,28,.9)' }}>
                {t('hero.eyebrow')}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              className="font-extrabold leading-[1.08] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(2.4rem,5.2vw,3.8rem)' }}
            >
              <span className="block text-[#e8eef5]">{t('hero.title.line1')}</span>
              <span className="block text-[#e8eef5]">{t('hero.title.line2')}</span>
              <span
                className="mt-1.5 block font-medium tracking-[-0.02em] text-[#e8eef5]/42"
                style={{ fontSize: 'clamp(1.1rem,2.2vw,1.45rem)' }}
              >
                {t('hero.title.line3')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-[46ch] text-pretty text-[0.9rem] leading-[1.75] text-[#e8eef5]/38"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Services */}
            <motion.div variants={itemVariants} className="mt-5 flex flex-wrap items-center gap-y-2">
              {SERVICES.map(({ key, color }, i) => (
                <span
                  key={key}
                  className="flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.04em] text-[#e8eef5]/50"
                  style={
                    i < SERVICES.length - 1
                      ? { paddingRight: '12px', marginRight: '12px', borderRight: '1px solid rgba(255,255,255,.07)' }
                      : undefined
                  }
                >
                  <span className="h-[4px] w-[4px] shrink-0 rounded-full" style={{ background: color }} />
                  {t(key)}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="mt-6 flex flex-wrap items-center gap-3">
              <MagneticCTA href={wa} label={t('hero.cta.specialist')} />
              <Link
                href="#solucoes"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 text-sm font-semibold text-white/60 transition-colors duration-300 hover:border-white/[0.22] hover:text-white/85"
              >
                {t('hero.cta.solutions')}
                <ArrowRight size={14} />
              </Link>
            </motion.div>

          </motion.div>
        </div>

        {/* ── Right — photo double-bezel (desktop) ── */}
        <div className="hidden lg:flex items-center p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: EASE_OUT_EXPO }}
            className="relative h-[calc(100dvh-8rem)] w-full max-h-[680px]"
          >
            {/* Outer bezel shell */}
            <div
              className="absolute inset-0 rounded-[18px] border border-white/[0.08] bg-white/[0.025] p-[5px]"
              style={{ boxShadow: '0 0 40px rgba(174,37,28,.06)' }}
            >
              {/* Red corner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-5 -right-5 h-20 w-20 rounded-full"
                style={{ background: 'radial-gradient(circle,rgba(174,37,28,.22),transparent 70%)' }}
              />
              {/* Inner bezel core */}
              <div
                className="relative h-full w-full overflow-hidden rounded-[14px]"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.07)' }}
              >
                <Image
                  src="/images/hero/family-hero.webp"
                  alt={t('hero.photo.alt')}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                {/* Dark overlay */}
                <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(160deg,rgba(6,15,30,.42),rgba(10,24,48,.15) 50%,rgba(6,15,30,.50))' }} />
                {/* Left fade */}
                <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(to right,#060f1e 0%,rgba(6,15,30,.55) 28%,transparent 58%)' }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Mobile photo ── */}
        <div className="lg:hidden mx-6 mb-10 aspect-[4/3]">
          <div
            className="relative h-full w-full rounded-[14px] border border-white/[0.08] bg-white/[0.025] p-[4px]"
            style={{ boxShadow: '0 0 30px rgba(174,37,28,.05)' }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-[11px]"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06)' }}
            >
              <Image
                src="/images/hero/family-hero.webp"
                alt={t('hero.photo.alt')}
                fill
                quality={85}
                sizes="100vw"
                className="object-cover object-center"
              />
              <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(160deg,rgba(6,15,30,.35),rgba(10,24,48,.1) 50%,rgba(6,15,30,.45))' }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
