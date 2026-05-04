'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, BarChart2, Eye, TrendingUp } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
    },
  },
}

const badges = [
  { key: 'hero.badge.security', icon: Shield },
  { key: 'hero.badge.planning', icon: BarChart2 },
  { key: 'hero.badge.monitoring', icon: Eye },
  { key: 'hero.badge.results', icon: TrendingUp },
]

export default function Hero() {
  const { t } = useLocale()

  return (
    <section
      id="home"
      className="min-h-[100dvh] bg-gradient-to-br from-[#07162a] to-[#0b1f3a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[100dvh]">
        {/* Left column — text */}
        <div className="flex flex-col justify-center px-8 lg:px-16 pt-24 pb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Eyebrow pill */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center rounded-full bg-[#ae251c]/20 text-[#ae251c] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">
                {t('hero.eyebrow')}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white"
            >
              {t('hero.title')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-4 text-[#7a9ab8] text-lg max-w-lg"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex gap-4 flex-wrap"
            >
              {/* Primary — red */}
              <a
                href="#para-clientes"
                className="inline-flex items-center gap-3 bg-[#ae251c] hover:bg-[#c42d23] text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
              >
                {t('hero.cta.clients')}
                <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                  <ArrowRight size={16} />
                </span>
              </a>

              {/* Secondary — outline */}
              <a
                href="#para-escritorios"
                className="inline-flex items-center border border-white/30 hover:border-white/60 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
              >
                {t('hero.cta.partners')}
              </a>
            </motion.div>

            {/* Badges row */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap gap-2"
            >
              {badges.map(({ key, icon: Icon }) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 bg-[#142f54] text-[#7a9ab8] px-3 py-1.5 text-xs rounded-full"
                >
                  <Icon size={12} />
                  {t(key)}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right column — image */}
        <div className="hidden lg:block relative overflow-hidden">
          <img
            src="/images/hero/home.jpg"
            alt="Hold Corretora — strategic wealth management"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Left-edge dark gradient overlay to blend with left column */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07162a] via-[#07162a]/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}
