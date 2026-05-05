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

/* ─── Manifesto blocks ──────────────────────────────────────────────────── */

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
  const yearsCount    = useCountUp(19, 1400, statsInView)
  const partnersCount = useCountUp(50, 1600, statsInView)
  const frentesCount  = useCountUp(4,  1200, statsInView)

  return (
    <section
      id="sobre-nos"
      className="section-pad bg-[#0b1f3a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header — text left + floating stat pills right */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-8">

          {/* Left: editorial text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex-1 max-w-2xl"
          >
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

          {/* Right: floating stat pills (desktop) / flat grid (mobile) */}
          <div ref={statsRef} className="lg:shrink-0 lg:w-64 xl:w-72 mt-6 lg:mt-8">

            {/* Mobile flat grid */}
            <div className="grid grid-cols-3 gap-4 lg:hidden">
              {[
                { count: yearsCount,    key: 'about.stat.years',    prefix: '+' },
                { count: partnersCount, key: 'about.stat.partners', prefix: '+' },
                { count: frentesCount,  key: 'about.stat.frentes',  prefix: ''  },
              ].map(({ count, key, prefix }) => (
                <div key={key} className="flex flex-col">
                  <span className="tabular text-display leading-none text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                    {prefix}{count}
                  </span>
                  <span className="mt-2 text-xs text-[#7a9ab8]">{t(key)}</span>
                </div>
              ))}
            </div>

            {/* Desktop — big pill top, two small pills bottom */}
            <div className="hidden lg:flex lg:flex-col gap-5 pb-3">

              {/* Pill 1 — anos (big, top) */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.1 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-[14px] pointer-events-none" style={{ background: 'rgba(11,31,58,0.45)', border: '1px solid rgba(201,168,76,0.1)', transform: 'translate(9px,9px)' }} />
                  <div className="absolute inset-0 rounded-[14px] pointer-events-none" style={{ background: 'rgba(11,31,58,0.68)', border: '1px solid rgba(201,168,76,0.18)', transform: 'translate(4.5px,4.5px)' }} />
                  <div className="relative rounded-[14px] px-7 py-6 text-center" style={{ background: 'rgba(11,31,58,0.97)', border: '1px solid rgba(201,168,76,0.32)', boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset,0 20px 40px rgba(0,0,0,0.6),0 6px 12px rgba(0,0,0,0.4)' }}>
                    <span className="tabular text-display leading-none text-white" style={{ fontSize: 'clamp(3rem, 5vw, 4rem)' }}>
                      +{yearsCount}
                    </span>
                    <p className="mt-2 text-sm text-[#7a9ab8] leading-snug">{t('about.stat.years')}</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Row — parceiros + frentes (small, bottom) */}
              <div className="flex gap-5">

                {/* Pill 2 — parceiros */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.22 }}
                >
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <div className="absolute inset-0 rounded-[13px] pointer-events-none" style={{ background: 'rgba(11,31,58,0.45)', border: '1px solid rgba(201,168,76,0.1)', transform: 'translate(9px,9px)' }} />
                    <div className="absolute inset-0 rounded-[13px] pointer-events-none" style={{ background: 'rgba(11,31,58,0.68)', border: '1px solid rgba(201,168,76,0.18)', transform: 'translate(4.5px,4.5px)' }} />
                    <div className="relative rounded-[13px] px-5 py-4 text-center" style={{ background: 'rgba(11,31,58,0.97)', border: '1px solid rgba(201,168,76,0.32)', boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset,0 16px 32px rgba(0,0,0,0.55),0 4px 8px rgba(0,0,0,0.35)' }}>
                      <span className="tabular text-display leading-none text-white" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}>
                        +{partnersCount}
                      </span>
                      <p className="mt-1.5 text-xs text-[#7a9ab8] leading-snug">{t('about.stat.partners')}</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Pill 3 — frentes */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.34 }}
                >
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 4.7, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <div className="absolute inset-0 rounded-[13px] pointer-events-none" style={{ background: 'rgba(11,31,58,0.45)', border: '1px solid rgba(201,168,76,0.1)', transform: 'translate(9px,9px)' }} />
                    <div className="absolute inset-0 rounded-[13px] pointer-events-none" style={{ background: 'rgba(11,31,58,0.68)', border: '1px solid rgba(201,168,76,0.18)', transform: 'translate(4.5px,4.5px)' }} />
                    <div className="relative rounded-[13px] px-5 py-4 text-center" style={{ background: 'rgba(11,31,58,0.97)', border: '1px solid rgba(201,168,76,0.32)', boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset,0 16px 32px rgba(0,0,0,0.55),0 4px 8px rgba(0,0,0,0.35)' }}>
                      <span className="tabular text-display leading-none text-white" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}>
                        {frentesCount}
                      </span>
                      <p className="mt-1.5 text-xs text-[#7a9ab8] leading-snug">{t('about.stat.frentes')}</p>
                    </div>
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>

        {/* Manifesto — three blocks, hairline-divided columns */}
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
