'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { Reveal } from '@/components/motion/Reveal'

const HERO_PHOTOS = [
  { src: '/images/hero/consorcios-chaves.webp', objectPosition: '65% 45%', objectPositionMobile: '70% 45%' },
  { src: '/images/hero/consorcios-produtos.webp', objectPosition: '50% 52%', objectPositionMobile: '50% 55%' },
] as const

export default function ConsorciosHero() {
  const { t } = useLocale()
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhotoIndex((i) => (i + 1) % HERO_PHOTOS.length)
    }, 6400)
    return () => window.clearInterval(id)
  }, [])

  const photo = HERO_PHOTOS[photoIndex]

  return (
    <section
      className="relative flex flex-col bg-[#07162a] md:block md:min-h-[100dvh] md:overflow-hidden"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
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
              alt={t('consorciosV2.hero.image.alt')}
              fill
              priority
              quality={100}
              sizes="100vw"
              className="saude-hero-photo object-cover"
              style={{
                ['--obj-mob' as never]: photo.objectPositionMobile,
                ['--obj-dsk' as never]: photo.objectPosition,
                filter: 'brightness(0.84) contrast(1.05)',
              }}
            />
          </motion.div>
        </AnimatePresence>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 md:hidden"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(7,22,42,0.85) 70%, #07162a 100%)',
          }}
        />

        <div
          aria-hidden
          className="hidden md:block pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,22,42,0.92) 0%, rgba(7,22,42,0.64) 35%, rgba(7,22,42,0.25) 70%, rgba(7,22,42,0.05) 100%)',
          }}
        />

        <div
          aria-hidden
          className="hidden md:block dot-grid pointer-events-none absolute inset-0 opacity-[0.04]"
        />
      </div>

      <div
        className="hidden md:flex absolute top-8 right-10 z-10 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-white"
        style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
      >
        <span aria-hidden className="block h-px w-6 bg-white/60" />
        {t('consorciosV2.hero.eyebrow')}
      </div>

      <div className="relative z-10 flex w-full px-6 pt-5 pb-14 md:absolute md:inset-0 md:min-h-[100dvh] md:items-center md:px-10 md:pt-20 md:pb-20 lg:pl-16 xl:pl-24 lg:pr-8 lg:py-24">
        <div className="w-full max-w-[640px]">
          <Reveal delay={0.08}>
            <h1 className="text-display text-white text-pretty leading-[1.04]">
              <span
                className="block font-bold uppercase tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4rem)' }}
              >
                {t('consorciosV2.hero.title.line1')}
              </span>
              <span
                className="block font-semibold uppercase tracking-tight text-white/95"
                style={{ fontSize: 'clamp(1.35rem, 2.8vw, 2.1rem)' }}
              >
                {t('consorciosV2.hero.title.line2')}
              </span>
              <span
                className="block mt-1.5 text-[#d2a866]"
                style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.75rem, 3.6vw, 2.8rem)' }}
              >
                {t('consorciosV2.hero.title.line3')}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p
              className="mt-5 md:mt-6 max-w-[48ch] text-pretty text-base md:text-lg leading-relaxed text-[#cbd5e1]"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}
            >
              {t('consorciosV2.hero.subtitle')}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#consorcios-form"
                className="inline-flex items-center gap-2 rounded-full bg-[#ae251c] hover:bg-[#8f1f17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                {t('consorciosV2.hero.cta.wa')}
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
              {t('consorciosV2.hero.assurance')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
