'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
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
    objectPosition: '60% 30%',
  },
  {
    src: '/images/Saude/pessoal.jpg',
    altKey: 'saudeV2.hero.image.pessoal.alt',
    chipKey: 'saudeV2.hero.chip.pessoal',
    objectPosition: '50% 35%',
  },
] as const

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
      className="relative min-h-[100dvh] overflow-hidden bg-[#07162a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      {/* Background photo (full-bleed, with crossfade rotation) */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={photo.src}
              alt={t(photo.altKey)}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: photo.objectPosition }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic readability gradient (left-heavy) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(7,22,42,0.85) 0%, rgba(13,34,64,0.55) 45%, rgba(7,22,42,0.30) 100%)',
          }}
        />

        <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-12 h-72 w-72 rounded-full bg-[#1a4b8a] opacity-[.20] blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-10 h-56 w-56 rounded-full bg-[#ae251c] opacity-[.14] blur-[90px]"
        />
      </div>

      {/* Top-right eyebrow chip (photo seq + label) */}
      <div
        className="absolute top-6 right-6 sm:top-8 sm:right-10 z-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-white"
        style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
      >
        <span aria-hidden className="hidden sm:block h-px w-6 bg-white/60" />
        <span className="font-extrabold text-[#ae251c]" style={{ letterSpacing: 0 }}>{photoNum}</span>
        {t(photo.chipKey)}
      </div>

      {/* Text content overlay */}
      <div className="relative z-10 flex min-h-[100dvh] items-center">
        <div className="w-full px-6 sm:px-10 lg:pl-16 xl:pl-24 lg:pr-8 py-20 lg:py-24">
          <div className="max-w-[640px]">
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
                className="mt-6 max-w-[48ch] text-pretty text-lg leading-relaxed text-[#cbd5e1]"
                style={{ textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}
              >
                {t('saudeV2.hero.subtitle')}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#saude-form"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ae251c] hover:bg-[#8f1f17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors"
                >
                  {t('saudeV2.hero.cta.wa')}
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('saudeV2.hero.cta.wa.aria')}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-colors"
                >
                  <WhatsAppIcon size={18} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <p
                className="mt-6 inline-flex items-center gap-2 text-[12.5px] text-white/80"
                style={{ textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
              >
                <ShieldCheck size={14} className="text-[#ae251c]" />
                {t('saudeV2.hero.assurance')}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
