'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Search, HandHeart, Layers, ArrowRight } from 'lucide-react'
import { formatWhatsAppLink } from '@/lib/utils'
import { useLocale } from '@/lib/i18n'
import { Reveal } from '@/components/motion/Reveal'
import { ServiceLeadForm } from '@/components/forms/ServiceLeadForm'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import SaudeHero from '@/components/sections/saude/SaudeHero'
import SaudeModalidades from '@/components/sections/saude/SaudeModalidades'
import SaudeOperadoras from '@/components/sections/saude/SaudeOperadoras'
import SaudeFAQ from '@/components/sections/saude/SaudeFAQ'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const DIFERENCIAIS_ICONS = [Search, HandHeart, Layers]

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

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#saude-form-card"
              className="inline-flex items-center gap-2 rounded-full bg-[#ae251c] hover:bg-[#8f1f17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              {t('saudeV2.cta.wa.button')}
              <ArrowRight size={16} />
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('saudeV2.cta.wa.aria')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-colors"
            >
              <WhatsAppIcon size={18} />
            </a>
          </div>

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
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div id="saude-form-card">
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
      <DiferenciaisSection />
      <SaudeOperadoras />
      <SaudeFAQ />
      <CtaFinalSection />
    </>
  )
}
