'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check, ShieldCheck, ArrowRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const ganhos = [
  'Sem juros — só taxa de administração',
  'Atendimento consultivo e personalizado',
  'Estratégia de contemplação sob medida',
  'Acompanhamento contínuo em todas as etapas',
  'Transparência total no contrato e na operação',
  'Parcerias com administradoras autorizadas pelo Banco Central',
  'Adequação ao seu objetivo, momento e perfil',
  'Suporte pós-venda contínuo',
]

const stepKeys = [
  'comoFunciona.step1',
  'comoFunciona.step2',
  'comoFunciona.step3',
  'comoFunciona.step4',
] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function ComoFunciona() {
  const { t } = useLocale()
  const stepsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 0.85', 'end 0.4'] })
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  const wa = formatWhatsAppLink(WHATSAPP, 'Olá! Quero conversar com um especialista da Hold sobre meu plano.')

  return (
    <section
      id="como-funciona"
      className="section-pad bg-[#07162a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-display text-white"
            style={{ fontSize: 'clamp(2rem, 4.4vw, 3.25rem)' }}
          >
            {t('comoFunciona.title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[60ch] text-pretty text-lg leading-relaxed text-[#7a9ab8]"
          >
            {t('comoFunciona.subtitle')}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-[60ch] leading-relaxed text-[#e0e8f0]/80"
          >
            {t('comoFunciona.body')}
          </motion.p>
        </motion.div>

        {/* Ganhos — two-column list */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.h3
              variants={fadeUp}
              className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]"
            >
              {t('comoFunciona.diff.title')}
            </motion.h3>
            <motion.div variants={fadeUp} className="rule-gold h-px flex-1 max-w-[160px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
            {ganhos.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0">
                  <Check size={16} color="#ae251c" />
                </span>
                <span className="text-[#e0e8f0]/90 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 4 steps timeline — premium motion */}
        <motion.div
          ref={stepsRef}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          {/* Scroll-linked connector (desktop) */}
          <div aria-hidden className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-[#142f54]/40" />
          <motion.div
            aria-hidden
            style={{ scaleX: lineScaleX, transformOrigin: 'left' }}
            className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-gradient-to-r from-[#c9a84c] via-[#ae251c] to-[#c9a84c]"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
            {stepKeys.map((key, i) => (
              <motion.div
                key={key}
                variants={fadeUp}
                className="flex flex-col gap-3"
              >
                <motion.div
                  className="flex items-center gap-3 md:block"
                  whileInView={{ scale: [0.6, 1.06, 1] }}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#07162a] ring-1 ring-[#c9a84c]/40 text-[#c9a84c] text-sm font-bold tabular shadow-[0_0_22px_rgba(201,168,76,0.0)] hover:shadow-[0_0_22px_rgba(201,168,76,0.45)] transition-shadow">
                    {i + 1}
                  </span>
                </motion.div>

                <p className="text-white font-semibold text-sm leading-snug">
                  {t(`${key}.title`)}
                </p>
                <p className="text-[#7a9ab8] text-xs leading-relaxed">
                  {t(`${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <div className="rounded-full bg-[#0b1f3a] ring-1 ring-[#c9a84c]/25 px-6 py-3 flex items-center gap-3">
            <ShieldCheck size={18} className="text-[#c9a84c] shrink-0" strokeWidth={1.7} />
            <span className="text-[#e0e8f0] text-sm font-medium">
              {t('comoFunciona.badge')}
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-[#ae251c] hover:bg-[#c42d23] text-white px-8 py-3.5 rounded-full font-semibold transition-colors duration-200"
          >
            {t('comoFunciona.cta')}
            <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={16} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
