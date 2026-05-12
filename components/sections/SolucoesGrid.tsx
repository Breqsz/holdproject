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
  bulletColumns: 1 | 2 | 3
  bg: string
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

function BulletList({
  bullets,
  columns,
}: {
  bullets: string[]
  columns: 1 | 2 | 3
}) {
  const colClass =
    columns === 3
      ? 'grid-cols-2 sm:grid-cols-3'
      : columns === 2
      ? 'grid-cols-2'
      : 'grid-cols-1'

  return (
    <ul className={`grid ${colClass} gap-x-3 gap-y-1.5`}>
      {bullets.map((b) => (
        <li
          key={b}
          className="flex items-start gap-2 text-[11.5px] sm:text-[12px] leading-[1.4]"
          style={{ color: 'rgba(255,255,255,0.82)' }}
        >
          <span
            aria-hidden
            className="mt-[6px] inline-block h-[3px] w-[3px] shrink-0 rounded-full"
            style={{ background: RED }}
          />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  )
}

function SectorCard({ service }: { service: Service }) {
  const { href, Icon, title, desc, bullets, bulletColumns, bg, image, imagePosition, ariaLabel } = service

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
        className="group relative block overflow-hidden rounded-2xl h-full min-h-[560px] transition-shadow duration-500 hover:shadow-[0_28px_70px_-22px_rgba(0,0,0,0.55)]"
        style={{
          background: bg,
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Image — right side, diagonal clip-path */}
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-[40%] sm:w-[36%] overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{
            clipPath: 'polygon(28% 0, 100% 0, 100% 100%, 0 100%)',
          }}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 480px"
            quality={90}
            className="object-cover"
            style={{ objectPosition: imagePosition ?? 'center' }}
          />
          {/* Brand-side fade */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(7,22,42,0.65) 0%, rgba(7,22,42,0.22) 30%, transparent 60%)',
            }}
          />
          {/* Bottom vignette */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, transparent 55%, rgba(7,22,42,0.45) 100%)',
            }}
          />
        </div>

        {/* Red diagonal hairline along the cut */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-[40%] sm:right-[36%] w-[2px]"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(174,37,28,0.55) 50%, transparent 100%)',
            transform: 'skewX(-18deg)',
            transformOrigin: 'top right',
          }}
        />

        {/* Hover spotlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at 18% 22%, rgba(174,37,28,0.16), transparent 60%)',
          }}
        />

        {/* Content — left column */}
        <div className="relative flex h-full flex-col gap-4 p-6 sm:p-7 lg:p-8 w-[62%] sm:w-[66%]">
          {/* Icon badge */}
          <div
            className="inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <Icon size={20} style={{ color: RED }} />
          </div>

          <h3
            className="text-display tracking-tight leading-[1.05] text-white"
            style={{
              fontSize: 'clamp(1.15rem, 1.9vw, 1.5rem)',
              letterSpacing: '-0.02em',
              textShadow: '0 1px 16px rgba(0,0,0,0.35)',
            }}
          >
            {title}
          </h3>

          <p
            className="text-[12px] sm:text-[12.5px] leading-[1.5] max-w-[34ch]"
            style={{
              color: 'rgba(255,255,255,0.7)',
              textShadow: '0 1px 12px rgba(0,0,0,0.4)',
            }}
          >
            {desc}
          </p>

          {/* Hairline divider */}
          <span
            aria-hidden
            className="block h-px w-10 mt-1"
            style={{ background: 'rgba(255,255,255,0.18)' }}
          />

          {/* Bullets */}
          <BulletList bullets={bullets} columns={bulletColumns} />

          <div className="flex-1" />

          <span
            className="inline-flex items-center gap-2 self-start text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/85 transition-colors duration-200 group-hover:text-white"
          >
            Conhecer
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
      bulletColumns: 1,
      bg: 'linear-gradient(155deg, #0c1f3a 0%, #142f54 100%)',
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
      bulletColumns: 3,
      bg: 'linear-gradient(155deg, #060f1c 0%, #0b1f3a 100%)',
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
      bulletColumns: 2,
      bg: 'linear-gradient(155deg, #020b18 0%, #07162a 100%)',
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
      bulletColumns: 1,
      bg: 'linear-gradient(150deg, #07162a 0%, #1a0a14 60%, #ae251c 100%)',
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
            <SectorCard key={s.href} service={s} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
