'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { useAudience } from '@/lib/audience'
import { AudienceToggle } from '@/components/AudienceToggle'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { formatWhatsAppLink } from '@/lib/utils'
import RotatingText from '@/components/motion/RotatingText'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
const ROTATION_INTERVAL_MS = 3800

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
  const isPF = audience === 'pf'

  const frentes = t('hero.frentes').split('|')
  const valores = t('hero.valores').split('|')
  const subtitle = isPF ? t('hero.subtitle.pf') : t('hero.subtitle.pj')
  const wa = formatWhatsAppLink(WHATSAPP, isPF ? t('hero.wa.pf') : t('hero.wa.pj'))

  return (
    <section id="home" className="relative bg-[#07162a] overflow-hidden">
      {/* Atmosphere orbs — hidden on mobile (GPU-intensive blur) */}
      <div aria-hidden className="hidden md:block pointer-events-none absolute -right-20 -top-20 h-[480px] w-[480px] rounded-full bg-[#1a4b8a] opacity-[.18] blur-[110px]" />
      <div aria-hidden className="hidden md:block pointer-events-none absolute bottom-0 left-12 h-[280px] w-[280px] rounded-full bg-[#ae251c] opacity-[.10] blur-[90px]" />
      <div aria-hidden className="hidden md:block pointer-events-none absolute -left-8 top-32 h-[220px] w-[220px] rounded-full bg-[#3b6cb5] opacity-[.16] blur-[80px]" />

      {/* Hero card — full-width, height reserves space for floating CardNav */}
      <div
        className="relative overflow-hidden"
        style={{ height: 'calc(100dvh - 90px)' }}
      >
        <Image
          src="/images/hero/family-hero.webp"
          alt={isPF ? 'Pessoa atendida pela Hold Corretora' : ''}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
          style={{ opacity: isPF ? 1 : 0, transition: 'opacity 650ms ease' }}
        />
        <Image
          src="/images/hero/office-hero.webp"
          alt={isPF ? '' : 'Escritório corporativo atendido pela Hold Corretora'}
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={{ opacity: isPF ? 0 : 1, transition: 'opacity 650ms ease' }}
        />

        {/* Gradient overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(to bottom, rgba(7,22,42,.55) 0%, rgba(7,22,42,.25) 25%, rgba(7,22,42,.55) 60%, rgba(7,22,42,.92) 100%)' }}
        />

        {/* Content — centrado horizontal e verticalmente */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center px-6 md:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-2xl text-center"
          >
            <motion.div variants={itemVariants} className="mb-5 flex justify-center">
              <AudienceToggle variant="hero" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-display leading-[1.15] font-gellix"
              style={{ fontSize: 'clamp(2.5rem, 6.4vw, 4.75rem)' }}
            >
              <span className="flex justify-center mb-1">
                <RotatingText
                  texts={frentes}
                  rotationInterval={ROTATION_INTERVAL_MS}
                  splitBy="words"
                  mainClassName="text-white justify-center"
                  staggerFrom="last"
                  staggerDuration={0.06}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  transition={{ type: 'spring', damping: 45, stiffness: 150 }}
                  splitLevelClassName="overflow-hidden pb-0.5"
                />
              </span>
              <span className="block text-white">{t('hero.middle')}</span>
              <span className="flex justify-center items-baseline gap-1 mt-1">
                <RotatingText
                  texts={valores}
                  rotationInterval={ROTATION_INTERVAL_MS}
                  splitBy="words"
                  mainClassName="text-white justify-center"
                  staggerFrom="last"
                  staggerDuration={0.06}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  transition={{ type: 'spring', damping: 45, stiffness: 150 }}
                  splitLevelClassName="overflow-hidden pb-0.5"
                />
                <span className="text-white">.</span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-5 mx-auto max-w-[44ch] text-pretty text-base leading-relaxed min-h-[5rem] sm:min-h-[3.5rem]"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              {subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-7 flex flex-wrap justify-center gap-3">
              <MagneticCTA href={wa} label={t('hero.cta.whatsapp')} icon={<WhatsAppIcon size={16} />} />
              <Link
                href={isPF ? '#solucoes' : '#para-escritorios'}
                className="group inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                {isPF ? t('hero.cta.solutions') : t('hero.cta.offices')}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
