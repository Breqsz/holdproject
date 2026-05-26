'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Users, ClipboardList, RefreshCw, ShieldCheck, ArrowRight } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useLocale } from '@/lib/i18n'
import { Reveal } from '@/components/motion/Reveal'
import { ServiceLeadForm } from '@/components/forms/ServiceLeadForm'
import SaudeHero from '@/components/sections/saude/SaudeHero'
import SaudeModalidades from '@/components/sections/saude/SaudeModalidades'
import SaudeOperadoras from '@/components/sections/saude/SaudeOperadoras'
import SaudeFAQ from '@/components/sections/saude/SaudeFAQ'

const SOBRE_ICONS = [Users, ClipboardList, RefreshCw, ShieldCheck]

function SobreSection() {
  const { t } = useLocale()
  const chips = t('saudeV2.sobre.chips').split('|')
  const chipsBody = t('saudeV2.sobre.chipsBody').split('|')
  const chipsRef = useRef<HTMLDivElement>(null)
  const chipsInView = useInView(chipsRef, { once: true, amount: 0.35 })

  return (
    <section
      id="saude-sobre"
      className="relative overflow-hidden"
      style={{
        fontFamily: 'var(--font-outfit)',
        background:
          'radial-gradient(ellipse 60% 80% at 78% 40%, rgba(30,72,160,0.55) 0%, rgba(14,38,100,0.28) 45%, transparent 70%), linear-gradient(180deg, #020b1a 0%, #051324 30%, #071a30 60%, #07162a 100%)',
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_300px] items-end min-h-0 lg:min-h-[80dvh]">

          {/* Left — text + icons */}
          <div className="pt-14 pb-14 lg:pt-28 lg:pb-52 pr-0 lg:pr-16">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7a9ab8] mb-4">
                {t('saudeV2.sobre.eyebrow')}
              </p>
              <h2
                className="font-bold text-white leading-[1.15] text-pretty"
                style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)' }}
              >
                {t('saudeV2.sobre.title')}
              </h2>
              <p className="mt-5 max-w-[54ch] text-[15.5px] leading-[1.75] text-[#8aabb8]">
                {t('saudeV2.sobre.body')}
              </p>
            </Reveal>

            {/* 4 icon items */}
            <Reveal delay={0.14}>

              <div className="saude-sobre-chips" ref={chipsRef} data-inview={chipsInView ? 'true' : 'false'}>
                {chips.map((chip, i) => {
                  const Icon = SOBRE_ICONS[i]
                  return (
                    <div key={chip} className="saude-sobre-chips-cell" style={{ ['--i' as never]: i }}>
                      <span className="saude-sobre-chips-icon" aria-hidden>
                        <Icon size={16} strokeWidth={1.7} className="saude-sobre-chips-glyph" />
                      </span>
                      <div className="saude-sobre-chips-text">
                        <h3 className="saude-sobre-chips-title">{chip}</h3>
                        <p className="saude-sobre-chips-body">{chipsBody[i]}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

            </Reveal>
          </div>

          {/* Right — doctor character, pinned to bottom of section */}
          <div className="hidden lg:block self-end">
            <Image
              src="/personagem/Saude.png"
              alt="Especialista HOLD Saúde"
              width={300}
              height={450}
              quality={95}
              loading="lazy"
              className="h-auto w-full"
              style={{ filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.45))' }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

function CtaFinalSection() {
  const { t } = useLocale()

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

      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[220px_minmax(0,1.2fr)_minmax(0,1.3fr)] gap-8 lg:gap-6 items-start"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="hidden lg:block self-start -ml-20 xl:-ml-32">
          <Image
            src="/personagem/formulario_saude.png"
            alt=""
            width={320}
            height={480}
            quality={95}
            loading="lazy"
            className="h-auto w-full"
            style={{ filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.45))' }}
          />
        </div>
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            {t('saudeV2.cta.eyebrow')}
          </p>
          <h2
            className="mt-3 lg:mt-4 text-display text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
          >
            {t('saudeV2.cta.title')}
          </h2>
          <p className="mt-5 lg:mt-6 max-w-[58ch] text-pretty text-[#7a9ab8] leading-relaxed">
            {t('saudeV2.cta.body')}
          </p>
          <div className="mt-6 lg:mt-8 rule-accent h-px w-24" />

          <div className="mt-6 lg:mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#saude-form-card"
              className="inline-flex items-center gap-2 rounded-full bg-[#ae251c] hover:bg-[#8f1f17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              {t('saudeV2.cta.wa.button')}
              <ArrowRight size={16} />
            </Link>
          </div>

          <ul className="mt-5 lg:mt-6 flex flex-col gap-2.5 max-w-[42ch]">
            {[1, 2].map((n) => (
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

        </Reveal>

        <Reveal delay={0.12}>
          <div id="saude-form-card" className="w-full">
            <ServiceLeadForm
              service={t('saudeV2.cta.form.service')}
              introTitle={t('saudeV2.cta.form.introTitle')}
              introBody={t('saudeV2.cta.form.introBody')}
              showAudienceField
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function SaudeClient() {
  return (
    <>
      <SaudeHero />
      <SobreSection />
      <SaudeModalidades />
      <SaudeOperadoras />
      <SaudeFAQ />
      <CtaFinalSection />
    </>
  )
}
