'use client'

import { useEffect, useRef, useState } from 'react'
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
  const [rotationIndex, setRotationIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setRotationIndex((prev) => (prev + 1) % Math.max(FRENTES.length, VALORES.length)),
      ROTATION_INTERVAL_MS,
    )
    return () => clearInterval(id)
  }, [])

  const isPF = audience === 'pf'

  const wa = formatWhatsAppLink(
    WHATSAPP,
    isPF
      ? 'Olá! Quero conversar com um especialista da Hold.'
      : 'Olá! Sou de uma empresa/escritório e quero conversar com a Hold.',
  )

  const subtitle = isPF
    ? 'Proteção inteligente para o que mais importa na sua vida e família.'
    : 'Soluções corporativas de proteção e crescimento patrimonial para o seu negócio.'

  return (
    <section id="home" className="relative bg-[#07162a] overflow-hidden">
      {/* Atmosphere orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-[480px] w-[480px] rounded-full bg-[#1a4b8a] opacity-[.18] blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-12 h-[280px] w-[280px] rounded-full bg-[#ae251c] opacity-[.10] blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute -left-8 top-32 h-[220px] w-[220px] rounded-full bg-[#3b6cb5] opacity-[.16] blur-[80px]" />

      {/* Hero card — 90px accounts for CardNav height (≈56px) + outer section top padding */}
      <div
        className="relative mx-[10px] rounded-2xl overflow-hidden"
        style={{ height: 'calc(100dvh - 90px)' }}
      >
        <Image
          src="/images/hero/persona_hero.jpg"
          alt={isPF ? 'Pessoa atendida pela Hold Corretora' : ''}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
          style={{ opacity: isPF ? 1 : 0, transition: 'opacity 650ms ease' }}
        />
        <Image
          src="/images/hero/office_hero.avif"
          alt={isPF ? '' : 'Escritório corporativo atendido pela Hold Corretora'}
          fill
          sizes="100vw"
          className="object-cover object-top"
          style={{ opacity: isPF ? 0 : 1, transition: 'opacity 650ms ease' }}
        />

        {/* Gradient overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(to top, rgba(7,22,42,.95) 0%, rgba(7,22,42,.55) 38%, rgba(7,22,42,.18) 100%)' }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-[2] p-6 md:p-[22px_24px]">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="mb-3">
              <AudienceToggle variant="hero" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-display text-pretty leading-[1.05] font-gellix"
              style={{ fontSize: 'clamp(2.5rem, 6.4vw, 4.75rem)' }}
            >
              <span className="block text-[#ae251c] overflow-hidden">
                <RotatingText
                  texts={FRENTES}
                  controlledIndex={rotationIndex % FRENTES.length}
                  staggerFrom="last"
                  staggerDuration={0.04}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  transition={{ type: 'spring', damping: 45, stiffness: 150 }}
                  splitLevelClassName="overflow-hidden pb-0.5"
                />
              </span>
              <span className="block text-white">{t('hero.middle')}</span>
              <span className="block text-[#ae251c] overflow-hidden">
                <RotatingText
                  texts={VALORES}
                  controlledIndex={rotationIndex % VALORES.length}
                  staggerFrom="last"
                  staggerDuration={0.04}
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
              className="mt-4 max-w-[52ch] text-pretty text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              {subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-3">
              <MagneticCTA href={wa} label="Falar no WhatsApp" icon={<WhatsAppIcon size={16} />} />
              <Link
                href={isPF ? '#solucoes' : '#para-escritorios'}
                className="group inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                {isPF ? 'Conhecer soluções' : 'Para escritórios'}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
