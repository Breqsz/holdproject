'use client'

import { motion } from 'framer-motion'
import { Wallet, Zap, Landmark, ShieldCheck, ReceiptText, PieChart, Handshake } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const SOLUCOES = [
  { id: 'capitalGiro', icon: Wallet },
  { id: 'recebiveis', icon: Zap },
  { id: 'credito', icon: Landmark },
  { id: 'escrow', icon: ShieldCheck },
  { id: 'cobranca', icon: ReceiptText },
  { id: 'estruturacao', icon: PieChart },
] as const

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
}
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

export default function InvestimentosSolucoes() {
  const { t } = useLocale()

  return (
    <section
      id="investimentos-solucoes"
      className="section-pad bg-[#07162a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mb-12 lg:mb-16"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            {t('investimentosV2.solucoes.eyebrow')}
          </p>
          <h2
            className="mt-4 text-display text-white"
            style={{ fontFamily: 'var(--font-gellix)', fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}
          >
            {t('investimentosV2.solucoes.title')}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {SOLUCOES.map(({ id, icon: Icon }) => (
            <motion.div
              key={id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 lg:p-7 transition-colors duration-300 hover:border-[#ae251c]/40 hover:bg-white/[0.05]"
            >
              <span
                aria-hidden
                className="absolute left-0 top-6 h-8 w-[3px] rounded-r bg-[#ae251c] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#ae251c]/[0.12]">
                <Icon size={22} className="text-[#e2604f]" strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 text-white font-semibold text-[17px] tracking-tight">
                {t(`investimentosV2.solucoes.${id}.title`)}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#8fa6bd]">
                {t(`investimentosV2.solucoes.${id}.desc`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Parceiros Estratégicos */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 lg:mt-16 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent p-8 lg:p-10"
        >
          <div className="flex items-start gap-4 max-w-3xl">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ae251c]/[0.12]">
              <Handshake size={22} className="text-[#e2604f]" strokeWidth={1.7} />
            </span>
            <div>
              <h3 className="text-white font-semibold text-[19px] tracking-tight">
                {t('investimentosV2.parceiros.title')}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#8fa6bd]">
                {t('investimentosV2.parceiros.body')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
