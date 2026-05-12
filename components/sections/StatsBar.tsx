'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Handshake, Target, Gem, ChevronDown } from 'lucide-react'
import LogoLoop from '@/components/motion/LogoLoop'

import type { LogoItem } from '@/components/motion/LogoLoop'

const PARTNER_LOGOS: LogoItem[] = [
  { src: '/images/logosEmpresasParceiras/HDIseguros.webp',    alt: 'HDI Seguros' },
  { src: '/images/logosEmpresasParceiras/MAGSeguros.webp',    alt: 'MAG Seguros' },
  { src: '/images/logosEmpresasParceiras/MAPFRE.webp',        alt: 'MAPFRE' },
  { src: '/images/logosEmpresasParceiras/SulAmerica.webp',    alt: 'SulAmérica' },
  { src: '/images/logosEmpresasParceiras/TokioSeguadora.webp', alt: 'Tokio Marine' },
  { src: '/images/logosEmpresasParceiras/Unimed.webp',        alt: 'Unimed' },
  { src: '/images/logosEmpresasParceiras/bradesco.webp',      alt: 'Bradesco Seguros' },
]

const HISTORY_TIMELINE: { year: string; text: string; current?: boolean }[] = [
  {
    year: '2006',
    text: 'Início — atuação especializada na comercialização de planos de saúde, com o propósito de unir proteção, proximidade e confiança.',
  },
  {
    year: '2009',
    text: 'Ampliação para o mercado de seguros, passando a operar em todos os ramos e atendendo pessoas e empresas de forma mais estratégica e completa.',
  },
  {
    year: '2011',
    text: 'Incorporação de consórcios ao portfólio, com visão de planejamento patrimonial e conquista estruturada de bens e objetivos de médio e longo prazo.',
  },
  {
    year: '2022',
    text: 'Filiação à Rede Lojacorr, a maior rede de corretoras de seguros do país — mais soluções, tecnologia e capacidade operacional.',
  },
  {
    year: '2026',
    text: 'Expansão para soluções financeiras, completando um ecossistema integrado de proteção, planejamento, crescimento e estruturação patrimonial.',
    current: true,
  },
]

const TIMELINE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const timelineRail = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.7, ease: TIMELINE_EASE, delay: 0.05 } },
}

const timelineList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
}

const timelineItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: TIMELINE_EASE } },
}

const FRENTES = [
  { title: 'Planos de Saúde', desc: 'Cuidado, previsibilidade e acesso às melhores operadoras.' },
  { title: 'Seguros',         desc: 'Proteção sob medida em todos os ramos, PF e PJ.' },
  { title: 'Consórcios',      desc: 'Construção patrimonial planejada e estratégica.' },
  { title: 'Soluções Financeiras', desc: 'Organizar, proteger e expandir patrimônio.' },
]

type PanelKey = 'history' | 'partners' | 'frentes' | 'proposito'

interface StatItemProps {
  icon: React.ReactNode
  value: string
  label: string
  hint?: string
  onClick?: () => void
  divider?: boolean
  isActive?: boolean
}

function StatItem({ icon, value, label, hint, onClick, divider = true, isActive = false }: StatItemProps) {
  const isClickable = !!onClick
  return (
    <div className="flex items-stretch flex-1 min-w-0">
      <div
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={onClick}
        onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } } : undefined}
        aria-expanded={isClickable ? isActive : undefined}
        className={[
          'group relative flex items-center gap-3 px-5 py-4 w-full transition-colors duration-200',
          isClickable ? 'cursor-pointer hover:bg-[#fdf5f5]' : 'cursor-default',
          isActive ? 'bg-[#fdf5f5]' : '',
        ].join(' ')}
      >
        <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#ae251c]/10">
          {icon}
        </span>

        <div className="min-w-0 flex-1">
          <div className="text-[1.4rem] font-extrabold leading-none tracking-tight text-[#07162a]">{value}</div>
          <div className="mt-0.5 text-[11px] leading-snug text-[#07162a]/55">{label}</div>
        </div>

        {isActive && (
          <ChevronDown size={13} className="shrink-0 text-[#ae251c]" />
        )}

        {isClickable && hint && !isActive && (
          <span className="absolute bottom-1.5 left-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#ae251c] opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
            {hint}
          </span>
        )}
      </div>

      {divider && (
        <div className="self-center h-8 w-px bg-[#07162a]/[0.08] shrink-0" />
      )}
    </div>
  )
}

/* ─── Panels ─────────────────────────────────────────────────────────────── */

function PanelHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-4">
      <div className="text-[9.5px] font-bold tracking-[0.22em] uppercase text-[#ae251c] mb-1.5">
        {eyebrow}
      </div>
      <h3
        className="text-[#07162a] tracking-tight leading-tight"
        style={{
          fontFamily: 'var(--font-gellix)',
          fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
          fontWeight: 600,
          letterSpacing: '-0.018em',
        }}
      >
        {title}
      </h3>
    </div>
  )
}

function HistoryPanel() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 sm:px-8 py-7 sm:py-8">
      {/* Header row: title left, subtitle right */}
      <div className="flex items-end justify-between gap-6 mb-7 sm:mb-8">
        <div>
          <div className="text-[9.5px] font-bold tracking-[0.22em] uppercase text-[#ae251c] mb-1.5">
            +19 anos
          </div>
          <h3
            className="text-[#07162a] tracking-tight leading-tight"
            style={{
              fontFamily: 'var(--font-gellix)',
              fontSize: 'clamp(1.15rem, 1.5vw, 1.35rem)',
              fontWeight: 600,
              letterSpacing: '-0.018em',
            }}
          >
            Nossa história
          </h3>
        </div>
        <p
          className="hidden sm:block text-[11.5px] text-[#07162a]/45 max-w-[40ch] text-right leading-snug"
          style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '13.5px' }}
        >
          Da especialização em saúde ao ecossistema integrado de soluções financeiras.
        </p>
      </div>

      {/* Timeline */}
      <motion.ol
        variants={timelineList}
        initial="hidden"
        animate="visible"
        className="relative pl-7 sm:pl-8"
      >
        {/* Vertical rail — animates scaleY from origin top */}
        <motion.span
          aria-hidden
          variants={timelineRail}
          style={{ originY: 0 }}
          className="absolute left-[6px] sm:left-[7px] top-[10px] bottom-[10px] w-px bg-gradient-to-b from-[#ae251c]/35 via-[#07162a]/15 to-[#07162a]/5"
        />

        {HISTORY_TIMELINE.map((item) => (
          <motion.li
            key={item.year}
            variants={timelineItem}
            className="relative pb-5 sm:pb-6 last:pb-0"
          >
            {/* Dot marker */}
            <span
              aria-hidden
              className="absolute -left-7 sm:-left-8 top-[6px] flex h-3.5 w-3.5 items-center justify-center"
            >
              {item.current && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-[#ae251c]"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.45, 0, 0.45] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <span
                className="relative h-2 w-2 rounded-full"
                style={{
                  background: '#ae251c',
                  boxShadow: item.current
                    ? '0 0 0 3px rgba(174,37,28,0.18)'
                    : '0 0 0 3px rgba(7,22,42,0.06)',
                }}
              />
            </span>

            {/* Year + current chip */}
            <div className="flex items-baseline gap-2.5 mb-1">
              <span
                className="text-[#07162a] tabular-nums"
                style={{
                  fontFamily: 'var(--font-gellix)',
                  fontWeight: 700,
                  fontSize: '17px',
                  letterSpacing: '-0.018em',
                  lineHeight: 1,
                }}
              >
                {item.year}
              </span>
              {item.current && (
                <span className="text-[8.5px] font-bold tracking-[0.18em] uppercase text-[#ae251c] px-1.5 py-[2px] rounded-sm bg-[#ae251c]/10 leading-none">
                  Hoje
                </span>
              )}
            </div>

            {/* Text */}
            <p className="text-[12.5px] leading-[1.55] text-[#07162a]/65 max-w-[78ch]">
              {item.text}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  )
}

function PartnersPanel() {
  return (
    <div className="py-3">
      <LogoLoop
        logos={PARTNER_LOGOS}
        speed={60}
        direction="left"
        logoHeight={36}
        gap={56}
        fadeOut
        fadeOutColor="#fffaf9"
        ariaLabel="Parceiros estratégicos"
      />
    </div>
  )
}

function FrentesPanel() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 sm:px-8 py-6">
      <PanelHeader eyebrow="4 frentes" title="Estratégicas e integradas" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {FRENTES.map((f, i) => (
          <div
            key={f.title}
            className="rounded-lg border border-[#07162a]/8 bg-white p-3.5"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[9.5px] font-bold tracking-[0.18em] uppercase text-[#ae251c] tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="text-[#07162a]"
                style={{
                  fontFamily: 'var(--font-gellix)',
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '-0.012em',
                }}
              >
                {f.title}
              </span>
            </div>
            <p className="text-[11.5px] leading-[1.5] text-[#07162a]/55">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function PropositoPanel() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 sm:px-8 py-6">
      <PanelHeader eyebrow="1 propósito" title="O seu patrimônio" />
      <p className="max-w-[68ch] text-[13px] leading-[1.6] text-[#07162a]/75">
        Transformar decisões financeiras e patrimoniais em estratégias seguras,
        inteligentes e acessíveis, conectando pessoas e empresas às melhores
        soluções com transparência, proximidade e visão de longo prazo.
      </p>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export default function StatsBar() {
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null)

  const togglePanel = useCallback((key: PanelKey) => {
    setActivePanel((prev) => (prev === key ? null : key))
  }, [])

  return (
    <div
      className="bg-white border-y border-[#07162a]/[0.07]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="mx-auto max-w-[1280px] flex flex-wrap sm:flex-nowrap">

        <StatItem
          icon={<Calendar size={15} className="text-[#ae251c]" strokeWidth={1.8} />}
          value="+19"
          label="anos de trajetória"
          hint="Ver história →"
          onClick={() => togglePanel('history')}
          isActive={activePanel === 'history'}
        />

        <StatItem
          icon={<Handshake size={15} className="text-[#ae251c]" strokeWidth={1.8} />}
          value="+60"
          label="parceiros estratégicos"
          hint="Ver parceiros →"
          onClick={() => togglePanel('partners')}
          isActive={activePanel === 'partners'}
        />

        <StatItem
          icon={<Target size={15} className="text-[#ae251c]" strokeWidth={1.8} />}
          value="4"
          label="frentes integradas"
          hint="Ver frentes →"
          onClick={() => togglePanel('frentes')}
          isActive={activePanel === 'frentes'}
        />

        <StatItem
          icon={<Gem size={15} className="text-[#ae251c]" strokeWidth={1.8} />}
          value="1"
          label="propósito: o seu patrimônio"
          hint="Ver propósito →"
          onClick={() => togglePanel('proposito')}
          isActive={activePanel === 'proposito'}
          divider={false}
        />

      </div>

      {/* Single accordion panel — only one open at a time */}
      <AnimatePresence initial={false} mode="wait">
        {activePanel && (
          <motion.div
            key={activePanel}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#f5d4d2] bg-[#fffaf9]">
              {activePanel === 'history'  && <HistoryPanel />}
              {activePanel === 'partners' && <PartnersPanel />}
              {activePanel === 'frentes'  && <FrentesPanel />}
              {activePanel === 'proposito' && <PropositoPanel />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
