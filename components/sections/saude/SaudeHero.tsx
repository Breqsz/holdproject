'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { formatWhatsAppLink } from '@/lib/utils'
import { useLocale } from '@/lib/i18n'
import { Reveal } from '@/components/motion/Reveal'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import RotatingText from '@/components/motion/RotatingText'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const HERO_PHOTOS = [
  {
    src: '/images/Saude/empresarial.jpg',
    altKey: 'saudeV2.hero.image.empresarial.alt',
    chipKey: 'saudeV2.hero.chip.empresarial',
    objectPosition: '68% 8%',
    desktopScale: 1,
    desktopLeftOffset: '22%',
  },
  {
    src: '/images/Saude/pessoal.jpg',
    altKey: 'saudeV2.hero.image.pessoal.alt',
    chipKey: 'saudeV2.hero.chip.pessoal',
    objectPosition: '0% 40%',
    desktopScale: 1,
    desktopLeftOffset: '34%',
  },
] as const

// Diagonal slice tokens — desktop only. Keep in sync if you tweak angle/line.
const DIAGONAL_ANGLE = 115
const DIAGONAL_CUT = 42
const DIAGONAL_SLICE_BG = `linear-gradient(${DIAGONAL_ANGLE}deg, #0d2240 0%, #142f54 30%, #0f2548 ${DIAGONAL_CUT - 0.1}%, transparent ${DIAGONAL_CUT + 0.1}%)`
const DIAGONAL_LINE_BG = `linear-gradient(${DIAGONAL_ANGLE}deg, transparent ${DIAGONAL_CUT - 0.14}%, #ae251c ${DIAGONAL_CUT - 0.09}%, #ae251c ${DIAGONAL_CUT + 0.09}%, transparent ${DIAGONAL_CUT + 0.14}%)`
const DIAGONAL_DARKEN = 'linear-gradient(180deg, rgba(7,22,42,0.10) 0%, rgba(7,22,42,0.50) 100%)'

export default function SaudeHero() {
  const { t } = useLocale()
  const wa = formatWhatsAppLink(WHATSAPP, t('saudeV2.hero.wa.message'))
  const rotating = t('saudeV2.hero.rotating').split('|')
  const [rotationCount, setRotationCount] = useState(0)
  const photoIndex = Math.floor(rotationCount / 3) % HERO_PHOTOS.length
  const photo = HERO_PHOTOS[photoIndex]
  const photoNum = String(photoIndex + 1).padStart(2, '0')

  return (
    <section
      className="relative overflow-hidden"
      style={{ fontFamily: 'var(--font-outfit)', background: '#0d2240' }}
    >
      {/* ============ MOBILE photo pane (top) ============ */}
      <div className="lg:hidden relative h-[340px] sm:h-[420px] overflow-hidden bg-[#07162a]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`m-${photo.src}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={photo.src}
              alt={t(photo.altKey)}
              fill
              priority={photoIndex === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: photo.objectPosition }}
            />
          </motion.div>
        </AnimatePresence>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(13,34,64,0.45) 0%, rgba(20,47,84,0.12) 40%, rgba(7,22,42,0.40) 100%)',
            mixBlendMode: 'multiply',
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-2 border border-white/[0.08]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4"
          style={{ background: 'linear-gradient(to top, rgba(7,22,42,0.65), transparent)' }}
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(7,22,42,0.65)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d8e0ec] backdrop-blur">
          <span className="font-bold text-[#ae251c]" style={{ letterSpacing: 0 }}>{photoNum}</span>
          {t(photo.chipKey)}
        </div>
      </div>

      {/* ============ DESKTOP photo background ============ */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden bg-[#07162a]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`d-${photo.src}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0"
            style={{ left: photo.desktopLeftOffset }}
          >
            <Image
              src={photo.src}
              alt={t(photo.altKey)}
              fill
              priority={photoIndex === 0}
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: photo.objectPosition,
                transform: photo.desktopScale !== 1 ? `scale(${photo.desktopScale})` : undefined,
                transformOrigin: 'center',
              }}
            />
          </motion.div>
        </AnimatePresence>
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: DIAGONAL_DARKEN }} />
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: DIAGONAL_SLICE_BG }} />
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: DIAGONAL_LINE_BG }} />
        <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-12 h-72 w-72 rounded-full bg-[#1a4b8a] opacity-[.20] blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-10 h-56 w-56 rounded-full bg-[#ae251c] opacity-[.14] blur-[90px]"
        />
        <div
          className="absolute top-6 right-8 z-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-white"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
        >
          <span aria-hidden className="block h-px w-6 bg-white/60" />
          <span className="font-extrabold text-[#ae251c]" style={{ letterSpacing: 0 }}>{photoNum}</span>
          {t(photo.chipKey)}
        </div>
      </div>

      {/* ============ Text content (single source of truth for rotation) ============ */}
      <div className="relative lg:min-h-[940px]">
        {/* Mobile-only navy gradient background under text */}
        <div
          aria-hidden
          className="lg:hidden absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0d2240 0%, #142f54 60%, #0f2548 100%)' }}
        />
        <div aria-hidden className="lg:hidden dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div
          aria-hidden
          className="lg:hidden pointer-events-none absolute -left-16 top-6 h-56 w-56 rounded-full bg-[#1a4b8a] opacity-[.20] blur-[100px]"
        />
        <div
          aria-hidden
          className="lg:hidden pointer-events-none absolute -bottom-10 left-10 h-40 w-40 rounded-full bg-[#ae251c] opacity-[.14] blur-[80px]"
        />

        <div className="relative z-10 px-6 sm:px-10 lg:pl-16 xl:pl-24 lg:pr-8 pt-12 pb-16 lg:flex lg:items-center lg:py-24 lg:min-h-[940px]">
          <div className="lg:max-w-[560px]">
            <Reveal delay={0.08}>
              <h1
                className="text-display text-white text-pretty"
                style={{ fontSize: 'clamp(1.85rem, 4vw, 3.25rem)' }}
              >
                {t('saudeV2.hero.title.prefix')}
                <RotatingText
                  texts={rotating}
                  mainClassName="mt-3 w-fit px-3 sm:px-4 md:px-5 bg-[#ae251c] text-white overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-lg"
                  staggerFrom="last"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  rotationInterval={3200}
                  onNext={() => setRotationCount((c) => c + 1)}
                />
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p
                className="mt-6 max-w-[44ch] text-pretty text-lg leading-relaxed text-[#cbd5e1]"
                style={{ textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}
              >
                {t('saudeV2.hero.subtitle')}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] px-6 py-3 text-sm font-semibold text-white transition-colors"
                >
                  <WhatsAppIcon size={16} />
                  {t('saudeV2.hero.cta.wa')}
                </a>
                <a
                  href="#saude-form"
                  className="group inline-flex items-center gap-2 rounded-full bg-white/[0.08] ring-1 ring-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.12]"
                >
                  {t('saudeV2.hero.cta.compare')}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
