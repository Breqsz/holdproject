'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Wallet, Zap, Landmark, ShieldCheck, ReceiptText, PieChart, Handshake } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const SOLUCOES = [
  { id: 'capitalGiro', icon: Wallet, img: '/images/solucoes/capitalGiro.webp' },
  { id: 'recebiveis', icon: Zap, img: '/images/solucoes/recebiveis.webp' },
  { id: 'credito', icon: Landmark, img: '/images/solucoes/credito.webp' },
  { id: 'escrow', icon: ShieldCheck, img: '/images/solucoes/escrow.webp' },
  { id: 'cobranca', icon: ReceiptText, img: '/images/solucoes/cobranca.webp' },
  { id: 'estruturacao', icon: PieChart, img: '/images/solucoes/estruturacao.webp' },
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
          {SOLUCOES.map(({ id, icon: Icon, img }, i) => (
            <motion.article
              key={id}
              variants={cardVariants}
              className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl ring-1 ring-inset ring-white/[0.08] transition-shadow duration-300 hover:shadow-[0_28px_70px_-22px_rgba(0,0,0,0.65)] min-h-[248px] ${
                i === 0 ? 'lg:col-span-2 lg:row-span-2 min-h-[300px] lg:min-h-0' : ''
              }`}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes={i === 0 ? '(max-width:1024px) 100vw, 66vw' : '(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw'}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[#ae251c]" />

              <div
                className="relative p-6 lg:p-7"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.55)' }}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#ae251c]/90 ring-1 ring-white/10">
                  <Icon size={22} className="text-white" strokeWidth={1.7} />
                </span>
                <h3
                  className={`mt-4 text-white font-semibold tracking-tight ${
                    i === 0 ? 'text-[19px] lg:text-[24px]' : 'text-[17px]'
                  }`}
                >
                  {t(`investimentosV2.solucoes.${id}.title`)}
                </h3>
                <p
                  className={`mt-2 leading-relaxed text-[#cbd5e1] ${
                    i === 0 ? 'text-[13.5px] lg:text-[15px] lg:max-w-[46ch]' : 'text-[13.5px]'
                  }`}
                >
                  {t(`investimentosV2.solucoes.${id}.desc`)}
                </p>
              </div>
            </motion.article>
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
