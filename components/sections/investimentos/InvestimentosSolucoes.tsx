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
          className="max-w-3xl mb-10 lg:mb-14"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            {t('investimentosV2.solucoes.eyebrow')}
          </p>
          <h2 className="mt-4 text-white text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold tracking-[-0.02em] leading-[1.05]">
            {t('investimentosV2.solucoes.title')}
          </h2>
        </motion.div>

        {/* Mosaico de peso variável: o 1º card é o destaque (2x2 no desktop) — quebra a grade uniforme */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {SOLUCOES.map(({ id, icon: Icon }, i) => (
            <motion.div
              key={id}
              variants={cardVariants}
              className={`group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 lg:p-7 overflow-hidden transition-all duration-300 hover:bg-white/[0.05] hover:border-[#ae251c]/40 hover:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.6)] ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#ae251c]/[0.12]">
                <Icon size={22} className="text-[#e2604f]" strokeWidth={1.7} />
              </span>
              <div className="mt-5">
                <h3 className={`text-white font-semibold tracking-tight ${i === 0 ? 'text-[17px] lg:text-[22px]' : 'text-[17px]'}`}>
                  {t(`investimentosV2.solucoes.${id}.title`)}
                </h3>
                <p className={`mt-2 leading-relaxed text-[#8fa6bd] ${i === 0 ? 'text-[13.5px] lg:text-[15px] lg:max-w-[46ch]' : 'text-[13.5px]'}`}>
                  {t(`investimentosV2.solucoes.${id}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Parceiros Estratégicos — faixa larga que fecha o mosaico */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-4 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent p-8 lg:p-10"
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
