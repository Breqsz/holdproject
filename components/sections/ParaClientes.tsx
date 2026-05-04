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

const SPRING = { type: 'spring', stiffness: 100, damping: 20 } as const
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

// ─── Category config ─────────────────────────────────────────────────────────

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

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function CategoryDetail({ id }: { id: CategoryId }) {
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

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={SPRING}
      // Double-Bezel outer
      className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-1.5"
    >
      {/* Double-Bezel inner */}
      <div className="rounded-[calc(1rem-0.375rem)] bg-[#0b1f3a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] border-l-4 border-[#ae251c] px-6 py-6 md:px-8 md:py-8">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-[#7a9ab8] leading-relaxed">{desc}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Applications */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ae251c] mb-3">
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
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7a9ab8] mb-3">
              {t('clients.strategic')}
            </p>
            <p className="text-sm text-[#7a9ab8] leading-relaxed italic">{strategic}</p>
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25d366] hover:bg-[#1ebe5d] text-white font-semibold text-sm px-6 py-3 transition-colors duration-200"
        >
          <MessageCircle size={16} />
          {t('clients.cta.whatsapp')}
        </motion.a>
      </div>
    </motion.div>
  )
}

// ─── Process Steps ────────────────────────────────────────────────────────────

function ProcessSteps() {
  const { t } = useLocale()

  const steps = [1, 2, 3, 4] as const

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-bold text-white text-center mb-10">
        {t('process.title')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((n, i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ ...SPRING, delay: i * 0.08 }}
            className="flex flex-col items-center text-center gap-4"
          >
            {/* Numbered circle */}
            <div className="w-12 h-12 rounded-full bg-[#ae251c] text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(174,37,28,0.35)]">
              {n}
            </div>
            <div>
              <p className="font-semibold text-[#e0e8f0]">{t(`process.step${n}.title`)}</p>
              <p className="mt-1 text-sm text-[#7a9ab8] leading-relaxed">
                {t(`process.step${n}.desc`)}
              </p>
            </div>
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

  return (
    <motion.div
      key="voce"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={SPRING}
    >
      {/* Section heading */}
      <div className="flex flex-col items-center text-center mb-10">
        <EyebrowPill>{t('clients.eyebrow')}</EyebrowPill>
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
          {t('clients.title')}
        </h2>
      </div>

      {/* 8 icon-card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        {CATEGORIES.map(({ id, icon: Icon }, i) => {
          const isSelected = selected === id
          return (
            <motion.button
              key={id}
              onClick={() => setSelected(id)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ ...SPRING, delay: i * 0.05 }}
              whileHover={isSelected ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={[
                'cursor-pointer rounded-xl p-4 text-center transition-all duration-200',
                isSelected
                  ? 'bg-[#ae251c] ring-2 ring-[#ae251c]/50 text-white'
                  : 'bg-[#142f54] text-[#7a9ab8] hover:bg-[#1e4a7a] hover:text-white',
              ].join(' ')}
            >
              <Icon size={28} className="mx-auto mb-2" />
              <span className="text-xs font-semibold leading-snug">
                {t(`clients.${id}.title`)}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Detail panel with AnimatePresence */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <CategoryDetail key={selected} id={selected} />
        </AnimatePresence>
      </div>

      {/* "Como Funciona" */}
      <ProcessSteps />
    </motion.div>
  )
}

// ─── "Para sua Empresa" tab content ──────────────────────────────────────────

function ParaEmpresaContent() {
  const { t } = useLocale()

  const diferenciais = [
    {
      icon: BarChart3,
      text: 'Mesa de Consórcios estruturada com suporte técnico e comercial dedicado',
    },
    {
      icon: Users,
      text: 'Capacitação da equipe e integração com o fluxo do seu escritório',
    },
    {
      icon: Shield,
      text: 'Operação autorizada e fiscalizada pelo Banco Central do Brasil',
    },
    {
      icon: Handshake,
      text: 'Modelo de parceria flexível, respeitando a dinâmica e cultura do seu negócio',
    },
  ]

  return (
    <motion.div
      key="empresa"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={SPRING}
    >
      {/* Section heading */}
      <div className="flex flex-col items-center text-center mb-10">
        <EyebrowPill>{t('clients.eyebrow')}</EyebrowPill>
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
          {t('partners.title')}
        </h2>
      </div>

      {/* Double-Bezel B2B summary card */}
      <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-1.5">
        <div
          className="rounded-[calc(1rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] px-6 py-8 md:px-10 md:py-10"
          style={{ background: 'linear-gradient(135deg, #0b1f3a, #142f54)' }}
        >
          <p className="text-[#7a9ab8] leading-relaxed max-w-2xl">
            {t('partners.body')}
          </p>

          {/* Diferenciais list */}
          <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-[#ae251c] mb-4">
            {t('partners.diff.title')}
          </p>
          <ul className="space-y-4">
            {diferenciais.map(({ icon: Icon, text }, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...SPRING, delay: i * 0.07 }}
                className="flex items-start gap-3 text-[#e0e8f0]"
              >
                <span className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-[#ae251c]/15 ring-1 ring-[#ae251c]/25 flex items-center justify-center">
                  <Icon size={15} className="text-[#ae251c]" />
                </span>
                <span className="text-sm leading-relaxed">{text}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href="#para-escritorios"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#ae251c] hover:bg-[#c42d22] text-white font-semibold text-sm px-6 py-3 transition-colors duration-200"
          >
            {t('partners.cta')}
            <ChevronRight size={15} />
          </motion.a>
        </div>
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
      className="py-24 md:py-32 bg-[#0b1f3a]"
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
                  {/* Shared-element active indicator */}
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

        {/* Tab content with AnimatePresence */}
        <AnimatePresence mode="wait">
          {tab === 'voce' ? <ParaVoceContent /> : <ParaEmpresaContent />}
        </AnimatePresence>
      </div>
    </section>
  )
}
