'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Eye, Star } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

/* ─── Count-up hook ─────────────────────────────────────────────────────── */

function useCountUp(target: number, duration: number, triggered: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!triggered) return

    let startTime: number | null = null
    let raf: number

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [triggered, target, duration])

  return count
}

/* ─── Variants ──────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
  },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const springHover = {
  y: -4,
  transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
}

/* ─── Card data ─────────────────────────────────────────────────────────── */

const cards = [
  {
    titleKey: 'about.mission.title',
    bodyKey: 'about.mission.body',
    icon: Target,
    color: '#ae251c',
  },
  {
    titleKey: 'about.vision.title',
    bodyKey: 'about.vision.body',
    icon: Eye,
    color: '#5b8fc9',
  },
  {
    titleKey: 'about.values.title',
    bodyKey: 'about.values.body',
    icon: Star,
    color: '#7a9ab8',
  },
]

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function SobreNos() {
  const { t } = useLocale()

  // Single ref/inView for the whole section to trigger count-up
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  const yearsCount = useCountUp(19, 1400, statsInView)
  const partnersCount = useCountUp(60, 1600, statsInView)

  return (
    <section
      id="sobre-nos"
      className="py-24 md:py-32 bg-[#0b1f3a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header block */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center rounded-full bg-[#ae251c]/20 text-[#ae251c] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">
              {t('about.eyebrow')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-white"
          >
            {t('about.title')}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mt-5 text-[#7a9ab8] text-lg leading-relaxed"
          >
            {t('about.subtitle')}
          </motion.p>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="mt-4 text-[#7a9ab8] text-base leading-relaxed"
          >
            {t('about.body')}
          </motion.p>
        </motion.div>

        {/* Stat counters */}
        <div ref={statsRef} className="mt-12 flex flex-wrap gap-12">
          {/* +19 Years */}
          <div className="flex flex-col gap-1">
            <span className="text-6xl font-bold text-white leading-none">
              +{yearsCount}
            </span>
            <span className="text-[#7a9ab8] text-sm mt-2">
              {t('about.stat.years')}
            </span>
          </div>

          {/* +60 Partners */}
          <div className="flex flex-col gap-1">
            <span className="text-6xl font-bold text-white leading-none">
              +{partnersCount}
            </span>
            <span className="text-[#7a9ab8] text-sm mt-2">
              {t('about.stat.partners')}
            </span>
          </div>
        </div>

        {/* Cards row */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map(({ titleKey, bodyKey, icon: Icon, color }) => (
            <motion.div
              key={titleKey}
              variants={fadeUp}
              whileHover={springHover}
              /* Double-Bezel outer wrapper */
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-1.5 cursor-default"
            >
              {/* Double-Bezel inner */}
              <div className="rounded-[calc(1rem-0.375rem)] bg-[#142f54] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] p-6 h-full flex flex-col gap-4">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>

                {/* Title */}
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: '#ae251c' }}
                >
                  {t(titleKey)}
                </p>

                {/* Body */}
                <p className="text-[#7a9ab8] text-sm leading-relaxed">
                  {t(bodyKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
