'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import ConsorcioIcon from '@/components/icons/sectors/ConsorcioIcon'
import SegurosIcon from '@/components/icons/sectors/SegurosIcon'
import SaudeIcon from '@/components/icons/sectors/SaudeIcon'
import InvestimentosIcon from '@/components/icons/sectors/InvestimentosIcon'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Service = {
  href: string
  Icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  title: string
  desc: string
  bullets?: string[]
  extendedDesc?: string
  bg: string
  isLight?: boolean
  iconColor: string
  hoverGlow?: string
  ariaLabel: string
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
  const {
    href, Icon, title, desc, bullets, extendedDesc,
    bg, isLight, iconColor, hoverGlow, ariaLabel,
  } = service

  const titleColor = isLight ? '#142f54' : '#ffffff'
  const descColor = isLight ? 'rgba(7,22,42,0.62)' : 'rgba(255,255,255,0.66)'
  const extendedColor = isLight ? 'rgba(7,22,42,0.5)' : 'rgba(255,255,255,0.5)'
  const bulletColor = isLight ? 'rgba(7,22,42,0.78)' : 'rgba(255,255,255,0.82)'
  const borderColor = isLight ? 'rgba(7,22,42,0.08)' : 'rgba(255,255,255,0.08)'

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      className="h-full"
    >
      <Link
        href={href}
        aria-label={ariaLabel}
        className="group relative block overflow-hidden rounded-2xl h-full transition-shadow duration-500 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]"
        style={{ background: bg, border: `1px solid ${borderColor}` }}
      >
        {/* Top-right navy triangle accent on the light card (matches image) */}
        {isLight && (
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 h-[88px] w-[88px]"
            style={{
              background: 'linear-gradient(225deg, #07162a 0%, #142f54 100%)',
              clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)',
            }}
          />
        )}

        {/* Hover spotlight on dark cards */}
        {!isLight && hoverGlow && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: hoverGlow }}
          />
        )}

        <div className="relative flex h-full flex-col gap-5 p-7 md:p-8">
          <Icon size={32} style={{ color: iconColor }} />

          <h3
            className="text-display tracking-tight leading-[1.08]"
            style={{
              color: titleColor,
              fontSize: 'clamp(1.45rem, 2.3vw, 1.95rem)',
            }}
          >
            {title}
          </h3>

          <p
            className="text-[13.5px] leading-[1.65] max-w-[42ch]"
            style={{ color: descColor }}
          >
            {desc}
          </p>

          {extendedDesc && (
            <p
              className="text-[12px] leading-[1.7]"
              style={{ color: extendedColor }}
            >
              {extendedDesc}
            </p>
          )}

          {bullets && bullets.length > 0 && (
            <ul className="flex flex-col gap-2.5">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-[13px] leading-snug"
                  style={{ color: bulletColor }}
                >
                  <span
                    aria-hidden
                    className="mt-[3px] inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px]"
                    style={{ background: '#ae251c' }}
                  >
                    <Check size={9} strokeWidth={3.5} className="text-white" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex-1" />

          <span className="inline-flex items-center gap-2 self-start rounded-md bg-[#ae251c] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 group-hover:bg-[#c42d23]">
            Conhecer
            <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function SolucoesGrid() {
  const { t } = useLocale()

  const splitBullets = (key: string) =>
    t(key).split('|').map((s) => s.trim()).filter(Boolean)

  const SERVICES: Service[] = [
    {
      href: '/saude/',
      Icon: SaudeIcon,
      title: t('solucoes.saude.title'),
      desc: t('solucoes.saude.desc'),
      bullets: splitBullets('solucoes.saude.bullets'),
      bg: 'linear-gradient(160deg, #ffffff 0%, #f3f5f8 100%)',
      isLight: true,
      iconColor: '#ae251c',
      ariaLabel: t('solucoes.saude.label'),
    },
    {
      href: '/seguros/',
      Icon: SegurosIcon,
      title: t('solucoes.seguros.title'),
      desc: t('solucoes.seguros.desc'),
      extendedDesc: t('solucoes.seguros.tipos'),
      bg: 'linear-gradient(155deg, #060f1c 0%, #0b1f3a 100%)',
      iconColor: '#ffffff',
      hoverGlow: 'radial-gradient(380px circle at 80% 0%, rgba(174,37,28,0.18), transparent 60%)',
      ariaLabel: t('solucoes.seguros.label'),
    },
    {
      href: '/consorcios/',
      Icon: ConsorcioIcon,
      title: t('solucoes.consorcio.title'),
      desc: t('solucoes.consorcio.desc'),
      bullets: splitBullets('solucoes.consorcio.bullets'),
      bg: 'linear-gradient(155deg, #020b18 0%, #07162a 100%)',
      iconColor: '#ffffff',
      hoverGlow: 'radial-gradient(380px circle at 80% 0%, rgba(174,37,28,0.18), transparent 60%)',
      ariaLabel: t('solucoes.consorcio.label'),
    },
    {
      href: '/investimentos/',
      Icon: InvestimentosIcon,
      title: t('solucoes.invest.title'),
      desc: t('solucoes.invest.desc'),
      bullets: splitBullets('solucoes.invest.bullets'),
      bg: 'linear-gradient(150deg, #07162a 0%, #1a0a14 60%, #ae251c 100%)',
      iconColor: '#ae251c',
      hoverGlow: 'radial-gradient(420px circle at 90% 0%, rgba(174,37,28,0.22), transparent 60%)',
      ariaLabel: t('solucoes.invest.label'),
    },
  ]

  return (
    <section
      id="solucoes"
      className="section-pad bg-[#F5F5F5]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
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
