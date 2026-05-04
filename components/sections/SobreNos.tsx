'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

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
      const eased = 1 - (1 - progress) * (1 - progress)
      setCount(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [triggered, target, duration])

  return count
}

/* ─── Variants ──────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

/* ─── Manifesto blocks (no cards, no icons) ─────────────────────────────── */

const principles = [
  { titleKey: 'about.mission.title', bodyKey: 'about.mission.body' },
  { titleKey: 'about.vision.title',  bodyKey: 'about.vision.body'  },
  { titleKey: 'about.values.title',  bodyKey: 'about.values.body'  },
]

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function SobreNos() {
  const { t } = useLocale()

  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })
  const yearsCount = useCountUp(19, 1400, statsInView)
  const partnersCount = useCountUp(60, 1600, statsInView)
  const frentesCount = useCountUp(4, 1200, statsInView)

  return (
    <section
      id="sobre-nos"
      className="section-pad bg-[#0b1f3a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header — left-aligned editorial */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center rounded-full bg-[#ae251c]/20 text-[#ae251c] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">
              {t('about.eyebrow')}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-6 text-display text-white"
            style={{ fontSize: 'clamp(2rem, 4.4vw, 3.25rem)' }}
          >
            {t('about.title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[60ch] text-pretty text-lg leading-relaxed text-[#7a9ab8]"
          >
            {t('about.subtitle')}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-[60ch] text-base leading-relaxed text-[#7a9ab8]"
          >
            {t('about.body')}
          </motion.p>
        </motion.div>

        {/* Stats — fluid display scale, gold rule underline */}
        <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl">
          {[
            { count: yearsCount, key: 'about.stat.years' },
            { count: partnersCount, key: 'about.stat.partners' },
            { count: frentesCount, key: 'about.stat.frentes' },
          ].map(({ count, key }) => (
            <div key={key} className="flex flex-col">
              <span
                className="tabular text-display leading-none text-white"
                style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}
              >
                +{count}
              </span>
              <div className="rule-gold mt-4 h-px w-12" />
              <span className="mt-3 text-sm text-[#7a9ab8]">
                {t(key)}
              </span>
            </div>
          ))}
        </div>

        {/* Manifesto — three blocks, no cards, hairline-divided columns */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-24 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[#142f54]"
        >
          {principles.map(({ titleKey, bodyKey }, i) => (
            <motion.div
              key={titleKey}
              variants={fadeUp}
              className={[
                'flex flex-col gap-4',
                i === 0 ? 'md:pr-10' : i === principles.length - 1 ? 'md:pl-10' : 'md:px-10',
              ].join(' ')}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ae251c]">
                {t(titleKey)}
              </p>
              <p className="text-base leading-relaxed text-[#e0e8f0]">
                {t(bodyKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
