'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Car,
  Truck,
  Sparkles,
  Building2,
  Church,
  TrendingUp,
  Zap,
  MessageCircle,
  ChevronRight,
  Users,
  BarChart3,
  Shield,
  Handshake,
} from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const SPRING = { type: 'spring' as const, stiffness: 110, damping: 22 }
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

// ─── Types ───────────────────────────────────────────────────────────────────

type TabId = 'voce' | 'empresa'
type CategoryId =
  | 'imoveis'
  | 'veiculos'
  | 'pesados'
  | 'servicos'
  | 'condominios'
  | 'igrejas'
  | 'alavancagem'
  | 'cotas'

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

// ─── Shared primitives ────────────────────────────────────────────────────────

function EyebrowPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#7a9ab8]">
      {children}
    </span>
  )
}

// ─── Detail Panel — single solid panel, NO side-stripe (banned), leading number ──

function CategoryDetail({ id, index }: { id: CategoryId; index: number }) {
  const { t } = useLocale()

  const title      = t(`clients.${id}.title`)
  const desc       = t(`clients.${id}.desc`)
  const strategic  = t(`clients.${id}.strategic`)
  const appsRaw    = t(`clients.${id}.apps`)
  const apps       = appsRaw.split('|').filter(Boolean)

  const whatsappLink = formatWhatsAppLink(
    WHATSAPP_NUMBER,
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
      {/* Leading number + title — replaces the side-stripe affordance */}
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
        {/* Applications */}
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

        {/* Strategic vision */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8] mb-3">
            {t('clients.strategic')}
          </p>
          <p className="text-sm text-[#7a9ab8] leading-relaxed">{strategic}</p>
        </div>
      </div>

      {/* CTA */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#25d366] hover:bg-[#1ebe5d] text-white font-semibold text-sm px-6 py-3 transition-colors duration-200"
      >
        <MessageCircle size={16} />
        {t('clients.cta.whatsapp')}
      </a>
    </motion.div>
  )
}

// ─── Process Steps — diagonal stagger, no card containers ────────────────────

function ProcessSteps() {
  const { t } = useLocale()
  const steps = [1, 2, 3, 4] as const

  return (
    <div className="mt-20">
      <div className="flex items-center gap-4 mb-12">
        <h3 className="text-display text-white" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)' }}>
          {t('process.title')}
        </h3>
        <div className="rule-gold h-px flex-1 max-w-[140px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
        {steps.map((n, i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
            className="flex flex-col gap-3 relative"
          >
            <div className="flex items-baseline gap-3">
              <span className="tabular text-[#ae251c] text-sm font-bold tracking-tight">
                {n}
              </span>
              <div className="h-px flex-1 bg-[#142f54]" />
            </div>
            <p className="font-semibold text-[#e0e8f0]">{t(`process.step${n}.title`)}</p>
            <p className="text-sm text-[#7a9ab8] leading-relaxed">
              {t(`process.step${n}.desc`)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── "Para Você" tab content ──────────────────────────────────────────────────

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
      {/* Heading — left-aligned, asymmetric */}
      <div className="max-w-3xl mb-10">
        <EyebrowPill>{t('clients.eyebrow')}</EyebrowPill>
        <h2
          className="mt-5 text-display text-white"
          style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}
        >
          {t('clients.title')}
        </h2>
      </div>

      {/* 8 icon-card grid */}
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
                'cursor-pointer rounded-xl px-3 py-4 text-center transition-colors duration-200 relative',
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
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-xl bg-[#ae251c] -z-10"
                  transition={SPRING}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Detail panel */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <CategoryDetail key={selected} id={selected} index={selectedIndex} />
        </AnimatePresence>
      </div>

      <ProcessSteps />
    </motion.div>
  )
}

// ─── "Para sua Empresa" tab content ──────────────────────────────────────────

function ParaEmpresaContent() {
  const { t } = useLocale()

  const diferenciais = [
    { icon: BarChart3, text: 'Mesa de Consórcios estruturada com suporte técnico e comercial dedicado' },
    { icon: Users,     text: 'Capacitação da equipe e integração com o fluxo do seu escritório' },
    { icon: Shield,    text: 'Operação autorizada e fiscalizada pelo Banco Central do Brasil' },
    { icon: Handshake, text: 'Modelo de parceria flexível, respeitando a dinâmica e cultura do seu negócio' },
  ]

  return (
    <motion.div
      key="empresa"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
    >
      <div className="max-w-3xl mb-10">
        <EyebrowPill>{t('clients.eyebrow')}</EyebrowPill>
        <h2
          className="mt-5 text-display text-white"
          style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}
        >
          {t('partners.title')}
        </h2>
      </div>

      {/* Single solid panel — no double bezel */}
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

        <ul className="mt-6 space-y-4">
          {diferenciais.map(({ icon: Icon, text }, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: i * 0.07 }}
              className="flex items-start gap-3 text-[#e0e8f0]"
            >
              <span className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-[#ae251c]/15 ring-1 ring-[#ae251c]/25 flex items-center justify-center">
                <Icon size={15} className="text-[#ae251c]" strokeWidth={1.6} />
              </span>
              <span className="text-sm leading-relaxed">{text}</span>
            </motion.li>
          ))}
        </ul>

        <a
          href="#para-escritorios"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#ae251c] hover:bg-[#c42d22] text-white font-semibold text-sm px-6 py-3 transition-colors duration-200"
        >
          {t('partners.cta')}
          <ChevronRight size={15} />
        </a>
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ParaClientes() {
  const { t } = useLocale()
  const [tab, setTab] = useState<TabId>('voce')

  return (
    <section
      id="para-clientes"
      className="section-pad bg-[#0b1f3a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#142f54] rounded-full p-1 inline-flex gap-1 relative">
            {(['voce', 'empresa'] as TabId[]).map((id) => {
              const label = id === 'voce' ? t('clients.toggle.you') : t('clients.toggle.company')
              const isActive = tab === id
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className="relative z-10 px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
                  style={{ color: isActive ? '#ffffff' : '#7a9ab8' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="toggle-pill"
                      className="absolute inset-0 rounded-full bg-[#ae251c]"
                      transition={SPRING}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tab === 'voce' ? <ParaVoceContent /> : <ParaEmpresaContent />}
        </AnimatePresence>
      </div>
    </section>
  )
}
