'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { Reveal } from '@/components/motion/Reveal'
import RotatingText from '@/components/motion/RotatingText'

type HeroPhoto = {
  src: string
  altKey: string
  chipKey: string
  objectPosition: string
  objectPositionMobile: string
}

const HERO_PHOTOS: readonly HeroPhoto[] = [
  {
    src: '/images/Saude/family.png',
    altKey: 'saudeV2.hero.image.pessoal.alt',
    chipKey: 'saudeV2.hero.chip.pessoal',
    objectPosition: '50% 10%',
    objectPositionMobile: '50% 30%',
  },
  {
    src: '/images/Saude/image_Pippit_202605261343.png',
    altKey: 'saudeV2.hero.image.empresarial.alt',
    chipKey: 'saudeV2.hero.chip.empresarial',
    objectPosition: '50% 28%',
    objectPositionMobile: '50% 35%',
  },
] as const

export default function SaudeHero() {
  const { t } = useLocale()
  const rotating = t('saudeV2.hero.rotating').split('|')
  const [rotationCount, setRotationCount] = useState(0)
  const photoIndex = Math.floor(rotationCount / 3) % HERO_PHOTOS.length
  const photo = HERO_PHOTOS[photoIndex]
  const photoNum = String(photoIndex + 1).padStart(2, '0')

  return (
    <section
      className="relative flex flex-col bg-[#07162a] md:block md:min-h-[100dvh] md:overflow-hidden"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      {/* Photo — stacked block on mobile, absolute overlay on desktop */}
      <div className="relative h-[58vh] min-h-[420px] w-full overflow-hidden md:absolute md:inset-0 md:h-auto md:min-h-0">
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
              quality={100}
              sizes="100vw"
              className="saude-hero-photo object-cover"
              style={{
                ['--obj-mob' as never]: photo.objectPositionMobile,
                ['--obj-dsk' as never]: photo.objectPosition,
                filter: 'brightness(0.86) contrast(1.05)',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Mobile bottom fade into text block */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 md:hidden"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(7,22,42,0.85) 70%, #07162a 100%)',
          }}
        />

        {/* Desktop left vignette — smooth fade, no hard dividing line */}
        <div
          aria-hidden
          className="hidden md:block pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,22,42,0.90) 0%, rgba(7,22,42,0.62) 35%, rgba(7,22,42,0.25) 70%, rgba(7,22,42,0.05) 100%)',
          }}
        />

        <div
          aria-hidden
          className="hidden md:block dot-grid pointer-events-none absolute inset-0 opacity-[0.04]"
        />
      </div>

      {/* Top-right eyebrow chip — desktop only */}
      <div
        className="hidden md:flex absolute top-8 right-10 z-10 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-white"
        style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
      >
        <span aria-hidden className="block h-px w-6 bg-white/60" />
        <span className="font-extrabold text-[#ae251c]" style={{ letterSpacing: 0 }}>
          {photoNum}
        </span>
        {t(photo.chipKey)}
      </div>

      {/* Text content */}
      <div className="relative z-10 flex w-full px-6 pt-5 pb-14 md:absolute md:inset-0 md:min-h-[100dvh] md:items-center md:px-10 md:pt-20 md:pb-20 lg:pl-16 xl:pl-24 lg:pr-8 lg:py-24">
        <div className="w-full max-w-[640px]">
          {/* Mobile inline chip — above title */}
          <div className="md:hidden mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/75">
            <span className="font-extrabold text-[#ae251c]" style={{ letterSpacing: 0 }}>
              {photoNum}
            </span>
            {t(photo.chipKey)}
          </div>

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
              className="mt-5 md:mt-6 max-w-[48ch] text-pretty text-base md:text-lg leading-relaxed text-[#cbd5e1]"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}
            >
              {t('saudeV2.hero.subtitle')}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#saude-form"
                className="inline-flex items-center gap-2 rounded-full bg-[#ae251c] hover:bg-[#8f1f17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                {t('saudeV2.hero.cta.wa')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p
              className="mt-5 md:mt-6 inline-flex items-center gap-2 text-[14px] md:text-[15px] text-white/80"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
            >
              <ShieldCheck size={14} className="text-[#ae251c]" />
              {t('saudeV2.hero.assurance')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
