'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ConsorcioIcon from '@/components/icons/sectors/ConsorcioIcon'
import SegurosIcon from '@/components/icons/sectors/SegurosIcon'
import SaudeIcon from '@/components/icons/sectors/SaudeIcon'
import InvestimentosIcon from '@/components/icons/sectors/InvestimentosIcon'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const RED = '#ae251c'

type Service = {
  href: string
  Icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  title: string
  desc: string
  bullets: string[]
  /** Canonical solid color per frente — used as the top hairline bar */
  color: string
  image: string
  imagePosition?: string
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

function SectorCard({ service, brand, exploreLabel }: { service: Service; brand: string; exploreLabel: string }) {
  const { href, title, desc, bullets, color, image, imagePosition, ariaLabel } = service

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
        className="group relative block overflow-hidden rounded-2xl h-full min-h-[420px] sm:min-h-[520px] transition-shadow duration-500 hover:shadow-[0_28px_70px_-22px_rgba(0,0,0,0.55)]"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Full-bleed image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 600px"
            quality={92}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            style={{ objectPosition: imagePosition ?? 'center' }}
          />
          {/* Bottom-up gradient — keeps text legible without burying the image */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(7,22,42,0.05) 0%, rgba(7,22,42,0.35) 45%, rgba(7,22,42,0.92) 100%)',
            }}
          />
        </div>

        {/* Top hairline bar in canonical service color */}
        <span
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: color }}
        />

        {/* Hover spotlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(520px circle at 18% 22%, rgba(174,37,28,0.14), transparent 60%)',
          }}
        />

        {/* Bottom-anchored content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-7 lg:p-8">
          <span className="text-[10px] font-semibold tracking-[0.24em] uppercase text-white/55 mb-3">
            {brand} · {title}
          </span>

          <h3
            className="text-display text-white tracking-tight leading-[1.02] mb-3"
            style={{
              fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)',
              letterSpacing: '-0.02em',
              textShadow: '0 1px 16px rgba(0,0,0,0.45)',
            }}
          >
            {title}
          </h3>

          <p
            className="text-[12.5px] sm:text-[13px] leading-[1.5] max-w-[36ch] mb-4"
            style={{
              color: 'rgba(255,255,255,0.78)',
              textShadow: '0 1px 12px rgba(0,0,0,0.5)',
            }}
          >
            {desc}
          </p>

          {/* Bullets — always visible on mobile/touch, hover-revealed on lg+ pointer */}
          <div
            className="overflow-hidden mb-4 lg:transition-[max-height,opacity] lg:duration-500 lg:ease-out lg:opacity-0 lg:max-h-0 lg:group-hover:opacity-100 lg:group-hover:max-h-44"
          >
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-3 border-t border-white/15">
              {bullets.map((b) => (
                <span key={b} className="text-[11px] text-white/85 leading-tight pt-2">
                  · {b}
                </span>
              ))}
            </div>
          </div>

          <span className="inline-flex items-center gap-2.5 self-start text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white">
            {exploreLabel}
            <span
              aria-hidden
              className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
              style={{ background: RED }}
            >
              <ArrowRight size={12} className="text-white" />
            </span>
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
      color: '#142f54',
      image: '/images/hero/card-saude.jpg',
      imagePosition: 'center 40%',
      ariaLabel: t('solucoes.saude.label'),
    },
    {
      href: '/seguros/',
      Icon: SegurosIcon,
      title: t('solucoes.seguros.title'),
      desc: t('solucoes.seguros.desc'),
      bullets: splitBullets('solucoes.seguros.bullets'),
      color: '#0b1f3a',
      image: '/images/hero/card-seguros.jpg',
      imagePosition: 'center',
      ariaLabel: t('solucoes.seguros.label'),
    },
    {
      href: '/consorcios/',
      Icon: ConsorcioIcon,
      title: t('solucoes.consorcio.title'),
      desc: t('solucoes.consorcio.desc'),
      bullets: splitBullets('solucoes.consorcio.bullets'),
      color: '#07162a',
      image: '/images/hero/card-consorcios.jpg',
      imagePosition: 'center 45%',
      ariaLabel: t('solucoes.consorcio.label'),
    },
    {
      href: '/investimentos/',
      Icon: InvestimentosIcon,
      title: t('solucoes.invest.title'),
      desc: t('solucoes.invest.desc'),
      bullets: splitBullets('solucoes.invest.bullets'),
      color: '#ae251c',
      image: '/images/hero/card-financeiras.jpg',
      imagePosition: 'center',
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
            {t('solucoes.heading.main')}{' '}
            <span style={{ color: RED }}>{t('solucoes.heading.accent')}</span>
          </h2>
          <p className="mt-5 max-w-[56ch] text-pretty text-[#07162a]/60 leading-relaxed mx-auto">
            {t('solucoes.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SERVICES.map((s) => (
            <SectorCard key={s.href} service={s} brand={t('solucoes.card.brand')} exploreLabel={t('solucoes.explore')} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
