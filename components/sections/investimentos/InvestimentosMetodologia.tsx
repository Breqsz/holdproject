'use client'

import { motion } from 'framer-motion'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const STEPS = [1, 2, 3, 4, 5] as const

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
}
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

export default function InvestimentosMetodologia() {
  const { t } = useLocale()

  return (
    <section
      id="investimentos-metodologia"
      className="section-pad bg-[#050f22]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mb-12 lg:mb-16"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            {t('investimentosV2.metodologia.eyebrow')}
          </p>
          <h2
            className="mt-4 text-display text-white"
            style={{ fontFamily: 'var(--font-gellix)', fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}
          >
            {t('investimentosV2.metodologia.title')}
          </h2>
        </motion.div>

        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative flex flex-col"
        >
          {STEPS.map((n, i) => (
            <motion.li key={n} variants={stepVariants} className="relative flex items-start gap-5 pb-9 last:pb-0">
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[22px] top-12 bottom-0 w-px bg-gradient-to-b from-[#ae251c]/60 to-white/10"
                />
              )}
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ae251c] text-white font-bold text-[15px] shadow-[0_6px_20px_-6px_rgba(174,37,28,0.7)]">
                {n}
              </span>
              <p className="pt-2.5 text-[16px] md:text-[17px] leading-relaxed text-[#dbe6f2]">
                {t(`investimentosV2.metodologia.step.${n}`)}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
