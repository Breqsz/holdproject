'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Car, Truck, Sparkles, Building2, Church, TrendingUp, Zap,
  ChevronRight, ArrowRight,
} from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { useAudience } from '@/lib/audience'
import { formatWhatsAppLink } from '@/lib/utils'
import { Reveal } from '@/components/motion/Reveal'
import { AudienceToggle } from '@/components/AudienceToggle'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const SPRING = { type: 'spring' as const, stiffness: 110, damping: 22 }
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

type CategoryId =
  | 'imoveis' | 'veiculos' | 'pesados' | 'servicos'
  | 'condominios' | 'igrejas' | 'alavancagem' | 'cotas'

const CATEGORIES: { id: CategoryId; icon: React.ElementType }[] = [
  { id: 'imoveis',     icon: Home       },
  { id: 'veiculos',    icon: Car        },
  { id: 'pesados',     icon: Truck      },
  { id: 'servicos',    icon: Sparkles   },
  { id: 'condominios', icon: Building2  },
  { id: 'igrejas',     icon: Church     },
  { id: 'alavancagem', icon: TrendingUp },
  { id: 'cotas',       icon: Zap        },
]

function HeroSection() {
  const { t } = useLocale()
  const { audience } = useAudience()

  const headline = audience === 'pj'
    ? 'Mesa de consórcios para escritórios e empresas.'
    : 'Consórcio com inteligência, confiança e estratégia.'

  const sub = audience === 'pj'
    ? 'Estrutura especializada para você ofertar consórcios aos seus clientes sem montar operação interna.'
    : 'Da escolha à contemplação, conduzimos cada etapa com diagnóstico, estratégia e acompanhamento.'

  const wa = formatWhatsAppLink(
    WHATSAPP,
    audience === 'pj'
      ? 'Olá! Tenho interesse em conhecer a Mesa de Consórcios para escritórios.'
      : 'Olá! Tenho interesse em consórcio. Pode me ajudar?',
  )

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#07162a] via-[#0a1c36] to-[#0b1f3a] pt-32 pb-16 md:pt-40 md:pb-24">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-[480px] w-[480px] rounded-full bg-[#1a4b8a] opacity-[.18] blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-12 left-12 h-[280px] w-[280px] rounded-full bg-[#ae251c] opacity-[.10] blur-[90px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-[#ae251c]/30 bg-[#ae251c]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]">
                Consórcios · Hold Corretora
              </span>
              <div className="rule-gold h-px max-w-[120px] flex-1" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              className="mt-6 text-display text-white text-pretty"
              style={{ fontSize: 'clamp(2.25rem, 5.4vw, 4rem)' }}
            >
              {headline}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[56ch] text-pretty text-lg leading-relaxed text-[#7a9ab8]">
              {sub}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8">
              <AudienceToggle variant="dark" />
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5d]"
              >
                <WhatsAppIcon size={16} />
                Falar no WhatsApp
              </a>
              <a
                href="#consorcio-form"
                className="group inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Simular cota
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Hero image */}
        <Reveal delay={0.2} className="hidden lg:block">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/10">
            <Image
              src="/images/hero/consorcios.jpg"
              alt="Consultor da Hold conduzindo planejamento patrimonial"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 50vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#07162a]/70 via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CategoryDetail({ id, index }: { id: CategoryId; index: number }) {
  const { t } = useLocale()
  const title     = t(`clients.${id}.title`)
  const desc      = t(`clients.${id}.desc`)
  const strategic = t(`clients.${id}.strategic`)
  const apps      = t(`clients.${id}.apps`).split('|').filter(Boolean)

  const wa = formatWhatsAppLink(
    WHATSAPP,
    `Olá! Tenho interesse em consórcio para ${title}.`,
  )
  const seq = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
      className="rounded-2xl bg-[#0b1f3a] ring-1 ring-[#ae251c]/30 px-6 py-7 md:px-10 md:py-10"
    >
      <div className="flex items-baseline gap-4">
        <span className="tabular text-[#ae251c]/70 text-xs font-semibold tracking-[0.2em]">
          {seq} / 08
        </span>
        <h3 className="text-display text-white" style={{ fontSize: 'clamp(1.35rem, 2.4vw, 1.75rem)' }}>
          {title}
        </h3>
      </div>
      <p className="mt-3 text-[#7a9ab8] leading-relaxed max-w-[60ch]">{desc}</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c] mb-3">
            {t('clients.applications')}
          </p>
          <ul className="space-y-2">
            {apps.map((app) => (
              <li key={app} className="flex items-start gap-2 text-sm text-[#e0e8f0]">
                <ChevronRight size={14} className="mt-0.5 shrink-0 text-[#ae251c]" />
                {app}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8] mb-3">
            {t('clients.strategic')}
          </p>
          <p className="text-sm text-[#7a9ab8] leading-relaxed">{strategic}</p>
        </div>
      </div>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#25d366] hover:bg-[#1ebe5d] text-white font-semibold text-sm px-6 py-3 transition-colors"
      >
        <WhatsAppIcon size={16} />
        {t('clients.cta.whatsapp')}
      </a>
    </motion.div>
  )
}

function ParaVoceContent() {
  const { t } = useLocale()
  const [selected, setSelected] = useState<CategoryId>('imoveis')
  const selectedIndex = CATEGORIES.findIndex((c) => c.id === selected)

  return (
    <motion.div
      key="voce"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
    >
      <div className="max-w-3xl mb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#7a9ab8]">
          {t('clients.eyebrow')}
        </span>
        <h2 className="mt-5 text-display text-white" style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}>
          {t('clients.title')}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CATEGORIES.map(({ id, icon: Icon }, i) => {
          const isSelected = selected === id
          return (
            <motion.button
              key={id}
              onClick={() => setSelected(id)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: i * 0.04 }}
              whileTap={{ scale: 0.98 }}
              className={[
                'relative cursor-pointer rounded-xl px-3 py-4 text-center transition-colors duration-200',
                isSelected
                  ? 'bg-[#ae251c] text-white'
                  : 'bg-[#142f54] text-[#7a9ab8] hover:bg-[#1e4a7a] hover:text-white',
              ].join(' ')}
            >
              <Icon size={26} className="mx-auto mb-2" strokeWidth={1.6} />
              <span className="text-xs font-semibold leading-snug">
                {t(`clients.${id}.title`)}
              </span>
              {isSelected && (
                <motion.span
                  layoutId="consorcios-cat-pill"
                  className="absolute inset-0 rounded-xl bg-[#ae251c] -z-10"
                  transition={SPRING}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <CategoryDetail key={selected} id={selected} index={selectedIndex} />
        </AnimatePresence>
      </div>

      {/* Process Steps */}
      <div className="mt-20">
        <div className="flex items-center gap-4 mb-12">
          <h3 className="text-display text-white" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)' }}>
            {t('process.title')}
          </h3>
          <div className="rule-gold h-px flex-1 max-w-[140px]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
          <div aria-hidden className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-gradient-to-r from-transparent via-[#142f54] to-transparent" />
          {[1, 2, 3, 4].map((n, i) => (
            <Reveal key={n} delay={i * 0.06} className="flex flex-col gap-3">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#07162a] ring-1 ring-[#c9a84c]/40 text-[#c9a84c] text-sm font-bold tabular">
                {n}
              </span>
              <p className="font-semibold text-[#e0e8f0]">{t(`process.step${n}.title`)}</p>
              <p className="text-sm text-[#7a9ab8] leading-relaxed">{t(`process.step${n}.desc`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ParaEmpresaContent() {
  const { t } = useLocale()
  const wa = formatWhatsAppLink(
    WHATSAPP,
    'Olá! Sou de um escritório/empresa e quero conhecer a Mesa de Consórcios.',
  )

  return (
    <motion.div
      key="empresa"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
    >
      <div className="max-w-3xl mb-10">
        <span className="inline-flex items-center rounded-full bg-[#ae251c]/20 text-[#ae251c] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">
          {t('partners.eyebrow')}
        </span>
        <h2 className="mt-5 text-display text-white" style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}>
          {t('partners.title')}
        </h2>
      </div>

      <div
        className="rounded-2xl px-6 py-10 md:px-12 md:py-12 ring-1 ring-white/10"
        style={{ background: 'linear-gradient(135deg, #0b1f3a 0%, #142f54 100%)' }}
      >
        <p className="text-[#7a9ab8] leading-relaxed max-w-2xl text-lg">
          {t('partners.body')}
        </p>

        <div className="mt-10 flex items-center gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]">
            {t('partners.diff.title')}
          </p>
          <div className="rule-gold h-px flex-1 max-w-[100px]" />
        </div>

        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          {[
            'Estrutura especializada sem necessidade de equipe interna',
            'Time com experiência em consórcios e atendimento consultivo',
            'Operação autorizada e fiscalizada pelo Banco Central do Brasil',
            'Modelo de parceria flexível, respeitando a cultura do seu negócio',
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.05} className="flex items-start gap-3 text-[#e0e8f0]">
              <ChevronRight size={16} className="mt-0.5 shrink-0 text-[#ae251c]" />
              <span className="text-sm leading-relaxed">{item}</span>
            </Reveal>
          ))}
        </ul>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#ae251c] hover:bg-[#c42d22] text-white font-semibold text-sm px-6 py-3 transition-colors"
        >
          <WhatsAppIcon size={16} />
          {t('partners.cta')}
        </a>
      </div>
    </motion.div>
  )
}

export default function ConsorciosClient() {
  const { audience } = useAudience()

  return (
    <>
      <HeroSection />

      <section className="section-pad bg-[#07162a]" id="consorcio-form" style={{ fontFamily: 'var(--font-outfit)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {audience === 'pf' ? <ParaVoceContent /> : <ParaEmpresaContent />}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
