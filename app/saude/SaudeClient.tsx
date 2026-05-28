'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users, ClipboardList, RefreshCw, ShieldCheck } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { Reveal } from '@/components/motion/Reveal'
import { ServiceLeadForm } from '@/components/forms/ServiceLeadForm'
import SaudeHero from '@/components/sections/saude/SaudeHero'
import SaudeModalidades from '@/components/sections/saude/SaudeModalidades'
import SaudeOperadoras from '@/components/sections/saude/SaudeOperadoras'
import SaudeFAQ from '@/components/sections/saude/SaudeFAQ'

const SOBRE_ICONS = [Users, ClipboardList, RefreshCw, ShieldCheck]
const SOBRE_ICON_SRC = [
  '/images/Saude/user.png',
  '/images/Saude/clipboard.png',
  '/images/Saude/handshake.png',
  '/images/Saude/security.png',
]

function SobreSection() {
  const { t } = useLocale()
  const chips = t('saudeV2.sobre.chips').split('|')
  const chipsBody = t('saudeV2.sobre.chipsBody').split('|')

  return (
    <section
      id="saude-sobre"
      className="relative overflow-hidden"
      style={{
        fontFamily: 'var(--font-outfit)',
        background:
          'radial-gradient(ellipse 55% 75% at 80% 45%, rgba(30,72,160,0.55) 0%, rgba(14,38,100,0.28) 45%, transparent 70%), linear-gradient(180deg, #020b1a 0%, #051324 30%, #071a30 60%, #07162a 100%)',
      }}
    >
      {/* Desktop — coded layout over background image (doctor on the right) */}
      <div className="hidden lg:block relative w-full overflow-hidden">
        <Image
          src="/images/Saude/saude-sobre-bg.jpg"
          alt=""
          fill
          quality={95}
          priority={false}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(2,11,26,0.92) 0%, rgba(2,11,26,0.78) 34%, rgba(2,11,26,0.4) 58%, transparent 80%)',
          }}
        />

        <div
          className="relative z-10 max-w-7xl mx-auto px-10 xl:px-16 flex items-center"
          style={{ minHeight: 'min(100vh, calc(100vw * 9 / 16))' }}
        >
          <div className="max-w-[58%] py-16">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7a9ab8] mb-4">
                {t('saudeV2.sobre.eyebrow')}
              </p>
              <h2
                className="font-bold text-white leading-[1.12] text-pretty"
                style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)' }}
              >
                {t('saudeV2.sobre.title')}
              </h2>
              <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.7] text-[#a9c0d4]">
                {t('saudeV2.sobre.body')}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8 border-t border-white/12 pt-7 grid grid-cols-2 gap-x-10 gap-y-6">
                {chips.map((chip, i) => (
                  <div key={chip} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="block shrink-0 mt-px"
                      style={{
                        width: 26,
                        height: 26,
                        backgroundColor: '#ae251c',
                        WebkitMaskImage: `url(${SOBRE_ICON_SRC[i]})`,
                        maskImage: `url(${SOBRE_ICON_SRC[i]})`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                      }}
                    />
                    <h3 className="text-[13.5px] font-semibold leading-[1.35] text-white tracking-tight max-w-[24ch] text-balance">
                      {chip}
                    </h3>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Mobile — text + icon chips (legacy layout, no bottom image) */}
      <div className="lg:hidden relative max-w-7xl mx-auto px-6">
        <div className="pt-14 pb-14">
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

          <Reveal delay={0.14}>
            <div className="mt-10 pt-9 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {chips.map((chip, i) => {
                const Icon = SOBRE_ICONS[i]
                return (
                  <div key={chip} className="grid grid-cols-[28px_1fr] gap-x-[0.9rem] items-start">
                    <span
                      aria-hidden
                      className="inline-flex items-center justify-center w-7 h-7 rounded-[7px] mt-px"
                      style={{ background: 'rgba(174,37,28,0.14)' }}
                    >
                      <Icon size={16} strokeWidth={1.7} style={{ color: '#ae251c' }} />
                    </span>
                    <div className="flex flex-col gap-[0.35rem] min-w-0">
                      <h3 className="font-semibold text-[15px] leading-[1.35] text-white tracking-tight max-w-[30ch] text-balance">
                        {chip}
                      </h3>
                      <p className="text-[13px] leading-[1.65] text-white/[0.52] max-w-[42ch]">
                        {chipsBody[i]}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
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
