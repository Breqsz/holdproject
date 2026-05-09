'use client'

import { useState, useCallback } from 'react'
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

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

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
        onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick() } : undefined}
        className={[
          'group relative flex items-center gap-3 px-5 py-4 w-full transition-colors duration-200',
          isClickable ? 'cursor-pointer hover:bg-[#fdf5f5]' : 'cursor-default',
          isActive ? 'bg-[#fdf5f5]' : '',
        ].join(' ')}
      >
        {/* Icon */}
        <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#ae251c]/10">
          {icon}
        </span>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <div className="text-[1.4rem] font-extrabold leading-none tracking-tight text-[#07162a]">{value}</div>
          <div className="mt-0.5 text-[11px] leading-snug text-[#07162a]/55">{label}</div>
        </div>

        {/* Chevron when active */}
        {isActive && (
          <ChevronDown size={13} className="shrink-0 text-[#ae251c]" />
        )}

        {/* Hint — appears on hover for clickable items when not active */}
        {isClickable && hint && !isActive && (
          <span className="absolute bottom-1.5 left-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#ae251c] opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
            {hint}
          </span>
        )}
      </div>

      {/* Vertical divider */}
      {divider && (
        <div className="self-center h-8 w-px bg-[#07162a]/[0.08] shrink-0" />
      )}
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export default function StatsBar() {
  const [panelOpen, setPanelOpen] = useState(false)
  const togglePanel = useCallback(() => setPanelOpen(v => !v), [])

  return (
    <>
      <div
        className="bg-white border-y border-[#07162a]/[0.07]"
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        <div className="mx-auto max-w-[1280px] flex flex-wrap sm:flex-nowrap">

          <StatItem
            icon={<Calendar size={15} className="text-[#ae251c]" strokeWidth={1.8} />}
            value="+19"
            label="anos de trajetória"
            hint="Nossa história →"
            onClick={() => scrollTo('sobre-nos')}
          />

          <StatItem
            icon={<Handshake size={15} className="text-[#ae251c]" strokeWidth={1.8} />}
            value="+60"
            label="parceiros estratégicos"
            hint="Ver parceiros →"
            onClick={togglePanel}
            isActive={panelOpen}
          />

          <StatItem
            icon={<Target size={15} className="text-[#ae251c]" strokeWidth={1.8} />}
            value="4"
            label="frentes integradas"
            hint="Ver soluções →"
            onClick={() => scrollTo('solucoes')}
          />

          <StatItem
            icon={<Gem size={15} className="text-[#ae251c]" strokeWidth={1.8} />}
            value="1"
            label="propósito: o seu patrimônio"
            divider={false}
          />

        </div>

        {/* Partners accordion panel */}
        <div
          className="overflow-hidden"
          style={{
            maxHeight: panelOpen ? '90px' : '0px',
            transition: 'max-height 0.3s ease-in-out',
          }}
        >
          <div className="border-t border-[#f5d4d2] bg-[#fffaf9] py-3">
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
        </div>
      </div>
    </>
  )
}
