'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, HandHeart, Layers, ArrowRight } from 'lucide-react'
import { formatWhatsAppLink } from '@/lib/utils'
import { useLocale } from '@/lib/i18n'
import { Reveal } from '@/components/motion/Reveal'
import { ServiceLeadForm } from '@/components/forms/ServiceLeadForm'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import RotatingText from '@/components/motion/RotatingText'
import SaudeModalidades from '@/components/sections/saude/SaudeModalidades'
import SaudeOperadoras from '@/components/sections/saude/SaudeOperadoras'
import SaudeFAQ from '@/components/sections/saude/SaudeFAQ'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const DIFERENCIAIS_ICONS = [Search, HandHeart, Layers]

const HERO_PHOTOS = [
  {
    src: '/images/Saude/empresarial.jpg',
    altKey: 'saudeV2.hero.image.empresarial.alt',
    objectPosition: 'center 30%',
  },
  {
    src: '/images/Saude/pessoal.jpg',
    altKey: 'saudeV2.hero.image.pessoal.alt',
    objectPosition: 'center 50%',
  },
] as const

function HeroSection() {
  const { t } = useLocale()
  const wa = formatWhatsAppLink(WHATSAPP, t('saudeV2.hero.wa.message'))
  const rotating = t('saudeV2.hero.rotating').split('|')
  const [rotationCount, setRotationCount] = useState(0)
  const photoIndex = Math.floor(rotationCount / 3) % HERO_PHOTOS.length
  const photo = HERO_PHOTOS[photoIndex]

  return (
    <section
      className="relative overflow-hidden"
      style={{
        fontFamily: 'var(--font-outfit)',
        background: '#0d2240',
      }}
    >
      <div className="grid lg:grid-cols-2 lg:min-h-[720px]">
        {/* Left: text panel */}
        <div
          className="relative flex items-center px-6 sm:px-10 lg:pl-20 xl:pl-24 lg:pr-12 pt-28 pb-16 lg:py-24"
          style={{ background: 'linear-gradient(135deg, #0d2240 0%, #142f54 60%, #0f2548 100%)' }}
        >
          <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 top-12 h-72 w-72 rounded-full bg-[#1a4b8a] opacity-[.20] blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 left-10 h-56 w-56 rounded-full bg-[#ae251c] opacity-[.14] blur-[90px]"
          />

          <div className="relative z-10 max-w-full sm:max-w-[600px]">
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
              <p className="mt-6 max-w-[58ch] text-pretty text-lg leading-relaxed text-[#7a9ab8]">
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

        {/* Right: photo panel */}
        <div className="relative h-[340px] sm:h-[420px] lg:h-auto lg:min-h-[720px] overflow-hidden bg-[#07162a]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={photo.src}
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
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: photo.objectPosition }}
              />
            </motion.div>
          </AnimatePresence>
          {/* Subtle left edge fade so it blends into the text panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0d2240]/55 to-transparent hidden lg:block"
          />
        </div>
      </div>
    </section>
  )
}

function SobreSection() {
  const { t } = useLocale()
  const chips = t('saudeV2.sobre.chips').split('|')

  return (
    <section
      id="saude-sobre"
      className="section-pad bg-[#07162a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8 saude-sobre-stage">
        <p className="saude-sobre-eyebrow">{t('saudeV2.sobre.eyebrow')}</p>
        <h2 className="saude-sobre-h2">{t('saudeV2.sobre.title')}</h2>
        <p className="saude-sobre-body">{t('saudeV2.sobre.body')}</p>
        <ol className="saude-sobre-values">
          {chips.map((chip, i) => (
            <li key={chip} className="saude-sobre-value">
              <span className="saude-sobre-value-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="saude-sobre-value-label">{chip}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function DiferenciaisSection() {
  const { t } = useLocale()
  const items = DIFERENCIAIS_ICONS.map((Icon, i) => ({
    Icon,
    title: t(`saudeV2.dif.item.${i + 1}.title`),
    desc: t(`saudeV2.dif.item.${i + 1}.desc`),
  }))

  return (
    <section id="saude-diferenciais" className="saude-dif">
      <div className="saude-dif-wrap">
        <div className="saude-dif-text">
          <p className="saude-dif-eyebrow">{t('saudeV2.dif.eyebrow')}</p>
          <h2 className="saude-dif-headline">
            {t('saudeV2.dif.headline.before')}
            <span className="saude-dif-headline-accent">{t('saudeV2.dif.headline.accent')}</span>
            {t('saudeV2.dif.headline.after')}
          </h2>
          <ul className="saude-dif-list">
            {items.map((d, i) => {
              const Icon = d.Icon
              return (
                <li key={d.title} className="saude-dif-item" style={{ ['--i' as never]: i }}>
                  <span className="saude-dif-chip" aria-hidden>
                    <Icon size={19} strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="saude-dif-title">{d.title}</h3>
                    <p className="saude-dif-desc">{d.desc}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="saude-dif-pane" aria-hidden>
          <span className="saude-dif-pane-glow" />
          <span className="saude-dif-pane-floor" />
          <Image
            src="/personagem/Saude.png"
            alt={t('saudeV2.dif.image.alt')}
            width={520}
            height={780}
            sizes="(max-width: 1023px) 0px, 40vw"
            loading="lazy"
            quality={92}
            className="saude-dif-pane-figure"
          />
        </div>
      </div>
    </section>
  )
}

function CtaFinalSection() {
  const { t } = useLocale()
  const wa = formatWhatsAppLink(WHATSAPP, t('saudeV2.hero.wa.message'))

  return (
    <section
      id="saude-form"
      className="section-tight relative overflow-hidden"
      style={{
        fontFamily: 'var(--font-outfit)',
        background:
          'linear-gradient(115deg, #142f54 0%, #0d2240 55%, #07162a 100%)',
      }}
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[520px] w-[520px] rounded-full bg-[#1a4b8a] opacity-[.22] blur-[120px]"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            {t('saudeV2.cta.eyebrow')}
          </p>
          <h2
            className="mt-4 text-display text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
          >
            {t('saudeV2.cta.title')}
          </h2>
          <p className="mt-6 max-w-[58ch] text-pretty text-[#7a9ab8] leading-relaxed">
            {t('saudeV2.cta.body')}
          </p>
          <div className="mt-8 rule-accent h-px w-24" />
          <p className="mt-6 text-sm text-[#7a9ab8]">{t('saudeV2.cta.meta')}</p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-6 py-3 transition-colors"
          >
            <WhatsAppIcon size={16} />
            {t('saudeV2.cta.wa.button')}
          </a>

          <div className="mt-10 hidden md:flex items-end gap-6">
            <Image
              src="/personagem/formulario_saude.png"
              alt=""
              width={220}
              height={340}
              quality={95}
              className="w-28 lg:w-32 h-auto shrink-0"
              style={{ filter: 'drop-shadow(0 18px 36px rgba(0,0,0,0.42))' }}
            />
            <ul className="flex flex-col gap-2.5 pb-3 flex-1 min-w-0">
              {[1, 2, 3].map((n) => (
                <li
                  key={n}
                  className="flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-white/72"
                >
                  <span
                    aria-hidden
                    className="mt-[7px] block h-[5px] w-[5px] rounded-full shrink-0"
                    style={{ background: '#ae251c' }}
                  />
                  <span>{t(`saudeV2.cta.bullet.${n}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <ServiceLeadForm
            service={t('saudeV2.cta.form.service')}
            introTitle={t('saudeV2.cta.form.introTitle')}
            introBody={t('saudeV2.cta.form.introBody')}
          />
        </Reveal>
      </div>
    </section>
  )
}

export default function SaudeClient() {
  return (
    <>
      <HeroSection />
      <SobreSection />
      <SaudeModalidades />
      <DiferenciaisSection />
      <SaudeOperadoras />
      <SaudeFAQ />
      <CtaFinalSection />
    </>
  )
}
