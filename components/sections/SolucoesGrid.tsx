'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import ConsorcioIcon from '@/components/icons/sectors/ConsorcioIcon'
import SegurosIcon from '@/components/icons/sectors/SegurosIcon'
import SaudeIcon from '@/components/icons/sectors/SaudeIcon'
import InvestimentosIcon from '@/components/icons/sectors/InvestimentosIcon'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Service = {
  href: string
  Icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  label: string
  desc: string
  accent: string
  bg: string
  text?: string
  featured?: boolean
}

const featured: Service = {
  href: '/consorcios/',
  Icon: ConsorcioIcon,
  label: 'Consórcios',
  desc: 'Estratégia patrimonial sem juros — imóveis, veículos, agro, condomínios, serviços e alavancagem.',
  accent: '#ae251c',
  bg: 'linear-gradient(135deg, #020c30 0%, #142f54 100%)',
  featured: true,
}

const others: Service[] = [
  {
    href: '/seguros/',
    Icon: SegurosIcon,
    label: 'Seguros',
    desc: 'Vida, auto, residencial, empresarial — comparativo entre seguradoras autorizadas.',
    accent: '#ae251c',
    bg: 'linear-gradient(135deg, #6e1a14 0%, #ae251c 100%)',
  },
  {
    href: '/saude/',
    Icon: SaudeIcon,
    label: 'Saúde',
    desc: 'Planos individuais, familiares e empresariais — escolha consciente e bem-estar.',
    accent: '#142f54',
    bg: 'linear-gradient(135deg, #f0f6ff 0%, #d4e3f5 100%)',
    text: '#07162a',
  },
  {
    href: '/investimentos/',
    Icon: InvestimentosIcon,
    label: 'Investimentos',
    desc: 'Visão integrada — diagnóstico, planejamento e parceria com escritórios.',
    accent: '#c9a84c',
    bg: 'linear-gradient(135deg, #111122 0%, #1a1a2e 100%)',
  },
]

function SectorCard({ service, featured = false }: { service: Service; featured?: boolean }) {
  const { href, Icon, label, desc, accent, bg, text } = service
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.4, ease: EASE_OUT_EXPO }} className="h-full">
      <Link
        href={href}
        className="group relative block overflow-hidden rounded-2xl ring-1 ring-white/10 hover:ring-white/20 transition-all duration-500 h-full"
        style={{ background: bg }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(360px circle at 50% 0%, ${accent}33, transparent 60%)` }}
        />
        <div className={`relative ${featured ? 'p-9 md:p-11' : 'p-7 md:p-8'} flex flex-col gap-4 h-full`}>
          <div
            className={`${featured ? 'w-14 h-14' : 'w-11 h-11'} rounded-xl flex items-center justify-center`}
            style={{ background: `${accent}1F`, border: `1px solid ${accent}55` }}
          >
            <Icon size={featured ? 26 : 20} style={{ color: accent }} />
          </div>
          <h3
            className="text-display tracking-tight"
            style={{
              color: text ?? '#fff',
              fontSize: featured ? 'clamp(1.85rem, 3vw, 2.5rem)' : 'clamp(1.4rem, 2vw, 1.75rem)',
            }}
          >
            {label}
          </h3>
          <p
            className={`leading-relaxed ${featured ? 'text-base max-w-[42ch]' : 'text-sm'}`}
            style={{ color: text ? '#142f54CC' : '#7a9ab8' }}
          >
            {desc}
          </p>
          <div className="mt-auto flex items-center gap-2 text-xs font-semibold tracking-wide uppercase" style={{ color: accent }}>
            Conhecer
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function SolucoesGrid() {
  return (
    <section id="solucoes" className="section-pad bg-[#07162a]" style={{ fontFamily: 'var(--font-outfit)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header — full width, top */}
        <Reveal>
          <div className="max-w-3xl mb-12 lg:mb-16">
            <span className="inline-flex items-center rounded-full bg-[#ae251c]/20 text-[#ae251c] px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-semibold">
              Nossas soluções
            </span>
            <h2
              className="mt-5 text-display text-white"
              style={{ fontSize: 'clamp(1.75rem, 3.8vw, 2.75rem)' }}
            >
              Quatro frentes, uma visão integrada.
            </h2>
            <p className="mt-5 max-w-[52ch] text-pretty text-[#7a9ab8] leading-relaxed">
              Mais que produtos isolados — um ecossistema patrimonial conduzido por um time consultivo.
            </p>
          </div>
        </Reveal>

        {/* 1+3 asymmetric grid: Consórcio big left, others stacked right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 lg:auto-rows-fr">
          <Reveal>
            <div className="lg:col-span-2 lg:row-span-3 h-full">
              <SectorCard service={featured} featured />
            </div>
          </Reveal>
          {others.map((s, i) => (
            <Reveal key={s.href} delay={(i + 1) * 0.07}>
              <SectorCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
