'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
}
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
}

export default function InvestimentosParaQuem() {
  const { t } = useLocale()
  const items = t('investimentosV2.paraQuem.items').split('|')

  return (
    <section
      id="investimentos-para-quem"
      className="section-pad bg-[#050f22]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mb-10 lg:mb-12"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            {t('investimentosV2.paraQuem.eyebrow')}
          </p>
          <h2
            className="mt-4 text-display text-white"
            style={{ fontFamily: 'var(--font-gellix)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
          >
            {t('investimentosV2.paraQuem.title')}
          </h2>
        </motion.div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4"
        >
          {items.map((it) => (
            <motion.li
              key={it}
              variants={itemVariants}
              className="flex items-center gap-3 border-b border-white/[0.08] pb-4"
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ae251c]/[0.15]">
                <Check size={15} className="text-[#e2604f]" strokeWidth={2.4} />
              </span>
              <span className="text-[15.5px] text-[#dbe6f2]">{it}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
