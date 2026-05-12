'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Shield, BarChart2, Eye, TrendingUp } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
}

const badges = [
  { key: 'hero.badge.security',   icon: Shield     },
  { key: 'hero.badge.planning',   icon: BarChart2  },
  { key: 'hero.badge.monitoring', icon: Eye        },
  { key: 'hero.badge.results',    icon: TrendingUp },
] as const

/* Magnetic primary CTA — pulls toward the cursor with spring physics.
   Uses motion values (no React re-renders during pointer move). */
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
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="magnetic group inline-flex items-center gap-2 rounded-full bg-[#ae251c] px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(174,37,28,0.18)] transition-colors duration-200 hover:bg-[#921e16]"
    >
      {label}
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/20 transition-transform duration-300 group-hover:translate-x-0.5">
        <ArrowRight size={12} />
      </span>
    </motion.a>
  )
}

export default function Hero() {
  const { t } = useLocale()

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-[#07162a] via-[#0a1c36] to-[#0b1f3a]"
    >
      {/* Mesh gradient blobs — desaturated */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-[440px] w-[440px] rounded-full bg-[#1a4b8a] opacity-[.18] blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-12 left-16  h-[260px] w-[260px] rounded-full bg-[#ae251c] opacity-[.10] blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute -left-8   top-32    h-[200px] w-[200px] rounded-full bg-[#3b6cb5] opacity-[.14] blur-[80px]" />

      {/* Dot grid overlay */}
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.06]" />

      {/* Content grid — asymmetric 1.1fr / 1fr */}
      <div className="relative z-10 grid min-h-[100dvh] grid-cols-1 lg:grid-cols-[1.1fr_1fr]">

        {/* Left — copy */}
        <div className="flex flex-col justify-center px-6 pb-16 pt-32 sm:px-10 lg:pl-20 lg:pr-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Eyebrow + gold rule */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-[#ae251c]/30 bg-[#ae251c]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]">
                {t('hero.eyebrow')}
              </span>
              <div className="rule-accent h-px max-w-[120px] flex-1" />
            </motion.div>

            {/* H1 — three lines, fluid clamp scale */}
            <motion.h1
              variants={itemVariants}
              className="mt-8 text-display"
              style={{ fontSize: 'clamp(2.5rem, 5.6vw, 4rem)' }}
            >
              <span className="block text-white">{t('hero.title.line1')}</span>
              <span className="block text-[#ae251c]">{t('hero.title.line2')}</span>
              <span className="block text-white/75">{t('hero.title.line3')}</span>
            </motion.h1>

            {/* Subtitle — capped at 52ch */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-[52ch] text-pretty text-lg leading-relaxed text-[#7a9ab8]"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="mt-9">
              <div className="inline-flex flex-wrap items-center gap-1 rounded-full bg-[#142f54]/70 p-1.5 ring-1 ring-white/10 backdrop-blur-sm">
                <MagneticCTA href="#para-clientes" label={t('hero.cta.clients')} />
                <a
                  href="#para-escritorios"
                  className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white/75 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  {t('hero.cta.partners')}
                </a>
              </div>
            </motion.div>

            {/* Badge pills */}
            <motion.div variants={itemVariants} className="mt-9 flex flex-wrap gap-2">
              {badges.map(({ key, icon: Icon }) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#142f54]/70 px-3 py-1.5 text-xs text-[#7a9ab8] ring-1 ring-white/[0.07] backdrop-blur-sm"
                >
                  <Icon size={12} />
                  {t(key)}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right — character circle */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="relative flex h-[520px] w-[520px] items-center justify-center">

            {/* Decorative rings */}
            <div aria-hidden className="pointer-events-none absolute h-[430px] w-[430px] rounded-full border border-white/[0.06]" />
            <div aria-hidden className="pointer-events-none absolute h-[348px] w-[348px] rounded-full border border-[#ae251c]/20" />

            {/* Perpetual breathing dot */}
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.4, 1], opacity: [0.85, 0.45, 0.85] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute"
              style={{
                width: 10,
                height: 10,
                top: 'calc(50% - 174px)',
                left: 'calc(50% + 160px)',
                borderRadius: '50%',
                background: '#ae251c',
                boxShadow: '0 0 14px 3px rgba(174,37,28,0.7)',
              }}
            />

            {/* Stat — top left (glass justified: floats over imagery) */}
            <motion.div
              initial={{ opacity: 0, x: -28, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.95, duration: 0.85, ease: EASE_OUT_EXPO }}
              className="glass-card absolute left-4 top-12 z-20 rounded-2xl px-5 py-3.5"
            >
              <div className="tabular text-[1.7rem] font-bold leading-none tracking-tight text-white">+19</div>
              <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7a9ab8]">
                {t('about.stat.years')}
              </div>
            </motion.div>

            {/* Character */}
            <div
              className="relative z-10 h-[290px] w-[290px] overflow-hidden rounded-full bg-white"
              style={{
                isolation: 'isolate',
                boxShadow:
                  '0 0 0 2px rgba(255,255,255,0.14), 0 0 0 14px rgba(20,47,84,0.32), 0 0 0 28px rgba(20,47,84,0.14)',
              }}
            >
              <Image
                src="/personagem/jacimar-avatar-3d.png"
                alt={t('hero.character.alt')}
                fill
                quality={100}
                priority
                sizes="290px"
                style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle, transparent 44%, #0b1f3a 76%)' }}
              />
            </div>

            {/* Stat — bottom right */}
            <motion.div
              initial={{ opacity: 0, x: 28, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.15, duration: 0.85, ease: EASE_OUT_EXPO }}
              className="glass-card absolute bottom-12 right-4 z-20 rounded-2xl px-5 py-3.5"
            >
              <div className="tabular text-[1.7rem] font-bold leading-none tracking-tight text-white">+60</div>
              <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7a9ab8]">
                {t('about.stat.partners')}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
