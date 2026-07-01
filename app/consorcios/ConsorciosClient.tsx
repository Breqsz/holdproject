'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { Reveal } from '@/components/motion/Reveal'
import { ServiceLeadForm } from '@/components/forms/ServiceLeadForm'
import ConsorciosHero from '@/components/sections/consorcios/ConsorciosHero'
import ConsorciosBeneficios from '@/components/sections/consorcios/ConsorciosBeneficios'
import ConsorciosCategorias from '@/components/sections/consorcios/ConsorciosCategorias'

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

// Cor sólida casada com a BORDA real de sobre-consorcio.jpg (navy escuro ~#000d2d,
// amostrado dos pixels da imagem), para que a sobra à esquerda/topo do object-contain
// não tenha emenda visível com o fundo da section.
const SOBRE_BG = '#000d2d'

function SobreSection() {
  const { t } = useLocale()
  const chips = t('consorciosV2.sobre.chips').split('|')

  return (
    <section
      id="consorcios-sobre"
      className="relative overflow-hidden"
      style={{ fontFamily: 'var(--font-outfit)', background: SOBRE_BG }}
    >
      {/* Desktop — imagem full-bleed com o carro à direita; texto + dizeres à esquerda
          sobre uma máscara fade-to-navy. A máscara é proporcional (%), então escala com a
          tela: no notebook o navy cobre o nariz do carro em vez de deixar o texto em cima dele. */}
      <div className="hidden lg:block relative min-h-[48vw]">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/consorcio/sobre-consorcio.jpg"
            alt=""
            fill
            quality={90}
            sizes="100vw"
            className="object-cover object-right-bottom"
          />
        </div>

        {/* Máscara: metade esquerda vira navy sólido (zona do texto); o carro emerge à direita.
            Opaco até ~42% garante os dizeres legíveis em qualquer crop/largura. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(90deg, ${SOBRE_BG} 0%, ${SOBRE_BG} 40%, rgba(0,13,45,0.62) 53%, rgba(0,13,45,0.30) 65%, rgba(0,13,45,0.10) 75%, rgba(0,13,45,0) 86%)`,
          }}
        />

        <div className="relative z-10 flex w-full max-w-7xl min-h-[48vw] flex-col justify-center pl-10 xl:pl-16 pr-10 pb-16">
          <div className="max-w-[500px]">
            <Reveal>
              <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.26em] text-[#5a97d4]">
                {t('consorciosV2.sobre.eyebrow')}
              </p>
              <h2
                className="font-bold text-white leading-[1.08]"
                style={{ fontSize: 'clamp(2.25rem, 3.4vw, 3.5rem)', maxWidth: '14em' }}
              >
                {t('consorciosV2.sobre.title')}
              </h2>
              <p className="mt-6 text-[17px] xl:text-[18px] leading-[1.62] text-[#aec3d8]">
                {t('consorciosV2.sobre.body')}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 text-[14px] xl:text-[15px] font-medium text-[#5a97d4]">
                <ShieldCheck size={15} aria-hidden />
                {t('consorciosV2.sobre.bc')}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-col max-w-[360px] 2xl:grid 2xl:grid-cols-2 2xl:gap-x-0 2xl:gap-y-7 2xl:max-w-[520px]">
                {chips.map((chip, i) => (
                  <div
                    key={chip}
                    className="flex items-center gap-4 border-b border-white/10 py-4 first:pt-0 last:border-b-0 last:pb-0 2xl:border-b-0 2xl:border-l 2xl:border-white/15 2xl:py-0 2xl:pl-5 2xl:pr-3"
                  >
                    <TopicIcon src={SOBRE_ICON_SRC[i]} size={30} />
                    <h3 className="text-[15px] font-semibold leading-[1.32] text-[#e3ecf6] tracking-tight">
                      {chip}
                    </h3>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="lg:hidden relative mx-auto max-w-3xl px-6 pt-16 pb-16">
        <Reveal>
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.26em] text-[#5a97d4]">
            {t('consorciosV2.sobre.eyebrow')}
          </p>
          <h2
            className="font-bold text-white leading-[1.12] text-pretty"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 3rem)' }}
          >
            {t('consorciosV2.sobre.title')}
          </h2>
          <p className="mt-5 max-w-[54ch] text-[16.5px] leading-[1.7] text-[#aec3d8]">
            {t('consorciosV2.sobre.body')}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-medium text-[#5a97d4]">
            <ShieldCheck size={14} aria-hidden />
            {t('consorciosV2.sobre.bc')}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-col">
            {chips.map((chip, i) => (
              <div key={chip} className="flex items-center gap-3.5 border-b border-white/8 py-4 first:pt-0 last:border-b-0 last:pb-0">
                <TopicIcon src={SOBRE_ICON_SRC[i]} size={28} />
                <h3 className="text-[14px] font-semibold leading-[1.3] text-[#e3ecf6] tracking-tight">
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
      id="consorcios-form"
      className="section-tight relative overflow-hidden"
      style={{
        fontFamily: 'var(--font-outfit)',
        background:
          'linear-gradient(115deg, #0b1f3a 0%, #08182d 55%, #07162a 100%)',
      }}
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[520px] w-[520px] rounded-full bg-[#1a4b8a] opacity-[.22] blur-[120px]"
      />

      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[280px_minmax(0,1.2fr)_minmax(0,1.3fr)] gap-y-10 gap-x-8 lg:gap-6 items-start"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="hidden lg:block self-start mt-8 -ml-6 xl:-ml-10">
          <Image
            src="/personagem/Boneco_v3.png"
            alt=""
            width={420}
            height={1199}
            quality={95}
            loading="lazy"
            className="h-[480px] w-auto max-w-none"
            style={{ filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.45))' }}
          />
        </div>
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            {t('consorciosV2.cta.eyebrow')}
          </p>
          <h2
            className="mt-3 lg:mt-4 text-display text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
          >
            {t('consorciosV2.cta.title')}
          </h2>
          <p className="mt-5 lg:mt-6 max-w-[58ch] text-pretty text-[#7a9ab8] leading-relaxed">
            {t('consorciosV2.cta.body')}
          </p>
          <div className="mt-6 lg:mt-8 rule-accent h-px w-24" />

          <div className="mt-6 lg:mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#consorcios-form-card"
              className="inline-flex items-center gap-2 rounded-full bg-[#ae251c] hover:bg-[#8f1f17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              {t('consorciosV2.cta.wa.button')}
              <ArrowRight size={16} />
            </Link>
          </div>

          <ul className="mt-5 lg:mt-6 flex flex-col gap-2.5 max-w-[42ch]">
            <li className="flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-white/72">
              <span
                aria-hidden
                className="mt-[7px] block h-[5px] w-[5px] rounded-full shrink-0"
                style={{ background: '#ae251c' }}
              />
              <span>{t('consorciosV2.cta.bullet.1')}</span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <div id="consorcios-form-card" className="w-full">
            <ServiceLeadForm
              service={t('consorciosV2.cta.form.service')}
              introTitle={t('consorciosV2.cta.form.introTitle')}
              introBody={t('consorciosV2.cta.form.introBody')}
              showAudienceField
              audienceOptions={['pf', 'empresa']}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function ConsorciosClient() {
  return (
    <>
      <ConsorciosHero />
      <ConsorciosBeneficios />
      <SobreSection />
      <ConsorciosCategorias />
      <CtaFinalSection />
    </>
  )
}
