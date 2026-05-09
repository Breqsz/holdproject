'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ConsorcioIcon from '@/components/icons/sectors/ConsorcioIcon'
import SegurosIcon from '@/components/icons/sectors/SegurosIcon'
import SaudeIcon from '@/components/icons/sectors/SaudeIcon'
import InvestimentosIcon from '@/components/icons/sectors/InvestimentosIcon'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Service = {
  href: string
  Icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  label: string
  title: string
  desc: string
  accent: string
  bg: string
  text?: string
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

function SectorCard({ service }: { service: Service }) {
  const { t } = useLocale()
  const { href, Icon, label, title, desc, accent, bg, text } = service
  const isLight = !!text

  return (
    <motion.div variants={cardVariants} whileHover={{ y: -6 }} transition={{ duration: 0.4, ease: EASE_OUT_EXPO }} className="h-full">
      <Link
        href={href}
        className="group relative block overflow-hidden rounded-2xl transition-all duration-500 h-full"
        style={{
          background: bg,
          border: `1px solid ${isLight ? 'rgba(7,22,42,0.08)' : 'rgba(255,255,255,0.08)'}`,
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
          style={{ background: `radial-gradient(300px circle at 80% 10%, ${accent}28, transparent 60%)` }}
        />
        <div className="relative p-8 md:p-9 flex flex-col gap-4 h-full">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}20`, border: `1px solid ${accent}44` }}
          >
            <Icon size={22} style={{ color: accent }} />
          </div>

          <span
            className="text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ color: isLight ? 'rgba(7,22,42,0.4)' : 'rgba(255,255,255,0.38)' }}
          >
            {label}
          </span>

          <h3
            className="text-display tracking-tight leading-tight"
            style={{ color: text ?? '#fff', fontSize: 'clamp(1.45rem, 2.4vw, 1.9rem)' }}
          >
            {title}
          </h3>

          <p
            className="text-sm leading-relaxed max-w-[38ch] mt-auto"
            style={{ color: isLight ? 'rgba(7,22,42,0.6)' : 'rgba(255,255,255,0.58)' }}
          >
            {desc}
          </p>

          <div
            className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase"
            style={{ color: isLight ? accent : 'rgba(255,255,255,0.65)' }}
          >
            {t('solucoes.explore')}
            <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function SolucoesGrid() {
  const { t } = useLocale()

  const SERVICES: Service[] = [
    {
      href: '/saude/',
      Icon: SaudeIcon,
      label: t('solucoes.saude.label'),
      title: t('solucoes.saude.title'),
      desc: t('solucoes.saude.desc'),
      accent: '#142f54',
      bg: 'linear-gradient(135deg, #f0f6ff 0%, #d4e3f5 100%)',
      text: '#07162a',
    },
    {
      href: '/seguros/',
      Icon: SegurosIcon,
      label: t('solucoes.seguros.label'),
      title: t('solucoes.seguros.title'),
      desc: t('solucoes.seguros.desc'),
      accent: '#ae251c',
      bg: 'linear-gradient(135deg, #6e1a14 0%, #ae251c 100%)',
    },
    {
      href: '/consorcios/',
      Icon: ConsorcioIcon,
      label: t('solucoes.consorcio.label'),
      title: t('solucoes.consorcio.title'),
      desc: t('solucoes.consorcio.desc'),
      accent: '#3b6cb5',
      bg: 'linear-gradient(135deg, #020c30 0%, #0b2d6e 100%)',
    },
    {
      href: '/investimentos/',
      Icon: InvestimentosIcon,
      label: t('solucoes.invest.label'),
      title: t('solucoes.invest.title'),
      desc: t('solucoes.invest.desc'),
      accent: '#c9a84c',
      bg: 'linear-gradient(135deg, #0a0a0a 0%, #181818 100%)',
    },
  ]

  return (
    <section id="solucoes" className="section-pad bg-[#F5F5F5]" style={{ fontFamily: 'var(--font-outfit)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="max-w-3xl mb-12 lg:mb-16 text-center mx-auto"
        >
          <h2
            className="text-display text-[#07162a]"
            style={{ fontSize: 'clamp(1.75rem, 3.8vw, 2.75rem)' }}
          >
            {t('solucoes.heading.main')} <span style={{ color: '#ae251c' }}>{t('solucoes.heading.accent')}</span>
          </h2>
          <p className="mt-5 max-w-[56ch] text-pretty text-[#07162a]/60 leading-relaxed mx-auto">
            {t('solucoes.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SERVICES.map((s) => (
            <SectorCard key={s.href} service={s} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
