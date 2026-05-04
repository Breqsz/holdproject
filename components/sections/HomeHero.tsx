'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { useAudience } from '@/lib/audience'
import { AudienceToggle } from '@/components/AudienceToggle'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { formatWhatsAppLink } from '@/lib/utils'
import RotatingText from '@/components/motion/RotatingText'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
const ROTATION_INTERVAL_MS = 2400

const FRENTES = ['Consórcio', 'Seguros', 'Saúde', 'Investimentos']
const VALORES = ['inteligência', 'confiança', 'estratégia', 'clareza', 'método', 'visão', 'propósito']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT_EXPO } },
}

function MagneticCTA({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) {
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
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="magnetic group inline-flex items-center gap-2 rounded-full bg-[#ae251c] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_18px_rgba(174,37,28,0.4)] transition-colors duration-200 hover:bg-[#c42d23]"
    >
      {icon}
      {label}
    </motion.a>
  )
}

export default function HomeHero() {
  const { t } = useLocale()
  const { audience } = useAudience()

  // Synced rotation index — single source of truth shared by both RotatingText instances.
  const [rotationIndex, setRotationIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setRotationIndex((prev) => (prev + 1) % Math.max(FRENTES.length, VALORES.length))
    }, ROTATION_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  const wa = formatWhatsAppLink(
    WHATSAPP,
    audience === 'pj'
      ? 'Olá! Sou de uma empresa/escritório e quero conversar com a Hold.'
      : 'Olá! Quero conversar com um especialista da Hold.',
  )

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-[#07162a] via-[#0a1c36] to-[#0b1f3a]"
    >
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-[480px] w-[480px] rounded-full bg-[#1a4b8a] opacity-[.18] blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-12 left-12 h-[280px] w-[280px] rounded-full bg-[#ae251c] opacity-[.10] blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute -left-8 top-32 h-[220px] w-[220px] rounded-full bg-[#3b6cb5] opacity-[.16] blur-[80px]" />
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.06]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-16 md:pt-40 md:pb-20 min-h-[100dvh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-12 items-center">

          {/* Left — text block */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-[#ae251c]/30 bg-[#ae251c]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]">
                {t('hero.eyebrow')}
              </span>
              <div className="rule-gold h-px max-w-[140px] flex-1" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-8 text-display text-pretty leading-[1.05]"
              style={{ fontSize: 'clamp(2.5rem, 6.4vw, 4.75rem)' }}
            >
              <span className="block text-[#ae251c]">
                <RotatingText
                  texts={FRENTES}
                  controlledIndex={rotationIndex % FRENTES.length}
                  staggerFrom="last"
                  staggerDuration={0.025}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  splitLevelClassName="overflow-hidden pb-0.5"
                />
              </span>
              <span className="block text-white">{t('hero.middle')}</span>
              <span className="block text-[#ae251c]">
                <RotatingText
                  texts={VALORES}
                  controlledIndex={rotationIndex % VALORES.length}
                  staggerFrom="last"
                  staggerDuration={0.025}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  splitLevelClassName="overflow-hidden pb-0.5"
                />
                <span className="text-white">.</span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-[58ch] text-pretty text-lg leading-relaxed text-[#7a9ab8]"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8">
              <AudienceToggle variant="dark" />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              <MagneticCTA href={wa} label="Falar no WhatsApp" icon={<WhatsAppIcon size={16} />} />
              <Link
                href="#solucoes"
                className="group inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Conhecer soluções
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — Jacimar 3D avatar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.3 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* glow ring behind avatar */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 m-auto h-[380px] w-[380px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(174,37,28,0.18) 0%, transparent 60%)', filter: 'blur(40px)' }}
            />
            <img
              src="/personagem/jacimar-avatar-3d.png"
              alt={t('hero.character.alt')}
              className="h-[320px] md:h-[420px] lg:h-[520px] w-auto object-contain pointer-events-none select-none"
              draggable={false}
            />
            {/* shadow under */}
            <div
              aria-hidden
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-2/3 rounded-full bg-black/40 blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
