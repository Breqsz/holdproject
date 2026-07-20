'use client'

import Image from 'next/image'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'
import { Reveal } from '@/components/motion/Reveal'
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA'
import { ServiceLeadForm } from '@/components/forms/ServiceLeadForm'
import InvestimentosHero from '@/components/sections/investimentos/InvestimentosHero'
import InvestimentosMetodologia from '@/components/sections/investimentos/InvestimentosMetodologia'
import InvestimentosSolucoes from '@/components/sections/investimentos/InvestimentosSolucoes'
import InvestimentosParaQuem from '@/components/sections/investimentos/InvestimentosParaQuem'

const SOBRE_ICON_SRC = [
  '/images/Saude/user.png',
  '/images/Saude/clipboard.png',
  '/images/Saude/handshake.png',
  '/images/Saude/security.png',
]

function TopicIcon({ src, size = 26 }: { src: string; size?: number }) {
  return (
    <span
      aria-hidden
      className="block shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: '#ae251c',
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  )
}

// Cor sólida casada com o fundo de sobre-investimento.jpg (navy ~#081c42).
// A imagem é 2:1 com o personagem à direita; com object-cover ancorado à direita
// ela preenche a tela inteira sem faixas vazias e só o navy livre da esquerda é cortado.
const SOBRE_BG = '#081c42'

function SobreSection() {
  const { t } = useLocale()
  const chips = t('investimentosV2.sobre.chips').split('|')

  return (
    <section
      id="investimentos-sobre"
      className="relative overflow-hidden"
      style={{ fontFamily: 'var(--font-outfit)', background: SOBRE_BG }}
    >
      {/* Desktop — texto + 4 tópicos à esquerda, personagem embutido no fundo full-bleed */}
      <div className="hidden lg:block relative min-h-[100dvh]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-0">
          <Image
            src="/investimento/sobre-investimento.jpg"
            alt=""
            fill
            quality={90}
            sizes="100vw"
            className="object-cover object-right object-bottom"
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl min-h-[100dvh] flex-col justify-center px-10 xl:px-16 py-20">
          <div className="max-w-[640px] xl:max-w-[880px]">
            <Reveal>
              <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.26em] text-[#5a97d4]">
                {t('investimentosV2.sobre.eyebrow')}
              </p>
              <h2
                className="font-bold text-white leading-[1.08]"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 3.85rem)', maxWidth: '14em' }}
              >
                {t('investimentosV2.sobre.title')}
              </h2>
              <p className="mt-6 text-[17px] xl:text-[18.5px] leading-[1.62] text-[#aec3d8]" style={{ maxWidth: '37em' }}>
                {t('investimentosV2.sobre.body')}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="relative mt-12 py-7">
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 right-[26%] xl:right-[24%]"
                style={{
                  background:
                    'radial-gradient(58% 150% at 50% 0%, rgba(42,96,168,0.30) 0%, rgba(10,28,60,0) 62%), linear-gradient(180deg, rgba(3,11,26,0.50) 0%, rgba(3,11,26,0.18) 100%)',
                  borderTop: '1px solid rgba(255,255,255,0.10)',
                }}
              />
              <div className="relative z-10 grid grid-cols-4 gap-0 pr-[26%] xl:pr-[24%]">
                {chips.map((chip, i) => (
                  <div key={chip} className="flex items-center gap-3.5 border-l border-white/15 pl-5 pr-3">
                    <TopicIcon src={SOBRE_ICON_SRC[i]} size={30} />
                    <h3 className="text-[13.5px] font-semibold leading-[1.32] text-[#e3ecf6] tracking-tight">
                      {chip}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="lg:hidden relative mx-auto max-w-3xl px-6 pt-16 pb-16">
        <Reveal>
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.26em] text-[#5a97d4]">
            {t('investimentosV2.sobre.eyebrow')}
          </p>
          <h2
            className="font-bold text-white leading-[1.12] text-pretty"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 3rem)' }}
          >
            {t('investimentosV2.sobre.title')}
          </h2>
          <p className="mt-5 max-w-[54ch] text-[16.5px] leading-[1.7] text-[#aec3d8]">
            {t('investimentosV2.sobre.body')}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Image
            src="/investimento/sobre-investimento.jpg"
            alt=""
            width={2880}
            height={1440}
            quality={90}
            sizes="100vw"
            loading="eager"
            className="mt-8 h-auto w-[calc(100%+3rem)] max-w-none -mx-6"
            style={{
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, #000 14%, #000 88%, transparent 100%)',
              maskImage:
                'linear-gradient(to bottom, transparent 0%, #000 14%, #000 88%, transparent 100%)',
            }}
          />
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-7">
            {chips.map((chip, i) => (
              <div key={chip} className="flex items-center gap-3 border-l border-white/15 pl-4">
                <TopicIcon src={SOBRE_ICON_SRC[i]} size={28} />
                <h3 className="text-[13.5px] font-semibold leading-[1.3] text-[#e3ecf6] tracking-tight">
                  {chip}
                </h3>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CtaFinalSection() {
  const { t } = useLocale()

  return (
    <section
      id="investimentos-form"
      className="section-tight relative overflow-hidden"
      style={{
        fontFamily: 'var(--font-outfit)',
        background:
          'linear-gradient(115deg, #2a0f0d 0%, #0b1f3a 55%, #07162a 100%)',
      }}
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[520px] w-[520px] rounded-full bg-[#ae251c] opacity-[.16] blur-[120px]"
      />

      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[280px_minmax(0,1.2fr)_minmax(0,1.3fr)] gap-8 lg:gap-6 items-start"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="hidden lg:block self-start -ml-20 xl:-ml-32">
          <Image
            src="/personagem/SOLUCOES_FINANCEIRAS.png"
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
          <p className="text-[12px] md:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            {t('investimentosV2.cta.eyebrow')}
          </p>
          <h2
            className="mt-3 lg:mt-4 text-display text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
          >
            {t('investimentosV2.cta.title')}
          </h2>
          <p className="mt-5 lg:mt-6 max-w-[58ch] text-pretty text-[#7a9ab8] leading-relaxed">
            {t('investimentosV2.cta.body')}
          </p>
          <div className="mt-6 lg:mt-8 rule-accent h-px w-24" />

          <div className="mt-6 lg:mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppCTA
              href={formatWhatsAppLink(
                process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
                t('investimentosV2.hero.wa.message'),
              )}
              label={t('investimentosV2.cta.wa.button')}
            />
          </div>

          <ul className="mt-5 lg:mt-6 flex flex-col gap-2.5 max-w-[42ch]">
            {[1, 2].map((n) => (
              <li
                key={n}
                className="flex items-start gap-2.5 text-[13px] md:text-[12.5px] leading-[1.5] text-white/72"
              >
                <span
                  aria-hidden
                  className="mt-[7px] block h-[5px] w-[5px] rounded-full shrink-0"
                  style={{ background: '#ae251c' }}
                />
                <span>{t(`investimentosV2.cta.bullet.${n}`)}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <div id="investimentos-form-card" className="w-full">
            <ServiceLeadForm
              service={t('investimentosV2.cta.form.service')}
              introTitle={t('investimentosV2.cta.form.introTitle')}
              introBody={t('investimentosV2.cta.form.introBody')}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function InvestimentosClient() {
  return (
    <>
      <InvestimentosHero />
      <SobreSection />
      <InvestimentosMetodologia />
      <InvestimentosSolucoes />
      <InvestimentosParaQuem />
      <CtaFinalSection />
    </>
  )
}
