'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'
import { Reveal } from '@/components/motion/Reveal'
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA'

const HERO_IMAGE = {
  src: '/images/hero/investimentos.webp',
  objectPosition: '52% 42%',
  objectPositionMobile: '58% 45%',
} as const

export default function InvestimentosHero() {
  const { t } = useLocale()

  return (
    <section
      className="relative flex flex-col md:block md:min-h-[100dvh] md:overflow-hidden"
      style={{
        fontFamily: 'var(--font-outfit)',
        background: 'linear-gradient(135deg, #2a0f0d 0%, #0b1f3a 55%, #07162a 100%)',
      }}
    >
      <div className="relative h-[58vh] min-h-[420px] w-full overflow-hidden md:absolute md:inset-0 md:h-auto md:min-h-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGE.src}
            alt={t('investimentosV2.hero.image.alt')}
            fill
            priority
            quality={100}
            sizes="100vw"
            className="saude-hero-photo object-cover"
            style={{
              ['--obj-mob' as never]: HERO_IMAGE.objectPositionMobile,
              ['--obj-dsk' as never]: HERO_IMAGE.objectPosition,
              filter: 'brightness(0.82) contrast(1.05)',
            }}
          />
        </motion.div>

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
              'linear-gradient(90deg, rgba(20,8,8,0.92) 0%, rgba(42,15,13,0.6) 32%, rgba(7,22,42,0.25) 70%, rgba(7,22,42,0.05) 100%)',
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
        {t('investimentosV2.hero.eyebrow')}
      </div>

      <div className="relative z-10 flex w-full px-6 pt-5 pb-14 md:absolute md:inset-0 md:min-h-[100dvh] md:items-center md:px-10 md:pt-20 md:pb-20 lg:pl-16 xl:pl-24 lg:pr-8 lg:py-24">
        <div className="w-full max-w-[640px]">
          <div className="md:hidden mb-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.24em] text-white/90">
            <span aria-hidden className="block h-px w-5 bg-white/50" />
            {t('investimentosV2.hero.eyebrow')}
          </div>

          <Reveal delay={0.08}>
            <h1
              className="text-display text-white text-pretty"
              style={{ fontSize: 'clamp(1.85rem, 4vw, 3.25rem)' }}
            >
              {t('investimentosV2.hero.title.prefix')}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p
              className="mt-5 md:mt-6 max-w-[48ch] text-pretty text-base md:text-lg leading-relaxed text-[#cbd5e1]"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}
            >
              {t('investimentosV2.hero.subtitle')}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
              <WhatsAppCTA
                href={formatWhatsAppLink(
                  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
                  t('investimentosV2.hero.wa.message'),
                )}
                label={t('investimentosV2.hero.cta.wa')}
              />
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p
              className="mt-5 md:mt-6 inline-flex items-center gap-2 text-[14px] md:text-[15px] text-white/80"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
            >
              <ShieldCheck size={14} className="text-[#ae251c]" />
              {t('investimentosV2.hero.assurance')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
