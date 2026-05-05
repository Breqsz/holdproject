'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check, ShieldCheck, ArrowRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const diferenciais = [
  'Estrutura especializada sem necessidade de equipe interna',
  'Time com experiência em consórcios e atendimento consultivo',
  'Propostas personalizadas para seu escritório',
  'Adequação à linguagem e ao perfil do seu público',
  'Integração ao modelo comercial do escritório',
  'Suporte contínuo ao assessor e ao cliente',
  'Parcerias com administradoras autorizadas pelo Banco Central',
  'Operação estruturada com transparência e acompanhamento',
  'Preservação do relacionamento com sua base de clientes',
]

const stepKeys = [
  'partners.step1',
  'partners.step2',
  'partners.step3',
  'partners.step4',
  'partners.step5',
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
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function ParaEscritorios() {
  const { t } = useLocale()
  const stepsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 0.85', 'end 0.4'] })
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="para-escritorios"
      className="section-pad bg-[#F5F5F5]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Eyebrow + heading */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-display text-[#07162a]"
            style={{ fontSize: 'clamp(2rem, 4.4vw, 3.25rem)' }}
          >
            {t('partners.title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[60ch] text-pretty text-lg leading-relaxed text-[#07162a]/60"
          >
            {t('partners.subtitle')}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-[60ch] leading-relaxed text-[#07162a]/70"
          >
            {t('partners.body')}
          </motion.p>
        </motion.div>

        {/* Diferenciais — two-column list, no card */}
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
              {t('partners.diff.title')}
            </motion.h3>
            <motion.div variants={fadeUp} className="rule-gold h-px flex-1 max-w-[160px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
            {diferenciais.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 shrink-0">
                  <Check size={16} color="#ae251c" />
                </span>
                <span className="text-[#07162a]/80 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 5 steps timeline — premium motion */}
        <motion.div
          ref={stepsRef}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          {/* Static rail */}
          <div aria-hidden className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-[#07162a]/10" />
          {/* Scroll-linked progress line */}
          <motion.div
            aria-hidden
            style={{ scaleX: lineScaleX, transformOrigin: 'left' }}
            className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-gradient-to-r from-[#c9a84c] via-[#ae251c] to-[#c9a84c]"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6 relative">
            {stepKeys.map((key, i) => (
              <motion.div key={key} variants={fadeUp} className="flex flex-col gap-3">
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

                <p className="text-[#07162a] font-semibold text-sm leading-snug">
                  {t(`${key}.title`)}
                </p>
                <p className="text-[#07162a]/55 text-xs leading-relaxed">
                  {t(`${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Badge — single panel, no double bezel */}
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
              {t('partners.badge')}
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
            href="#contato"
            className="group inline-flex items-center gap-3 bg-[#ae251c] hover:bg-[#c42d23] text-white px-8 py-3.5 rounded-full font-semibold transition-colors duration-200"
          >
            {t('partners.cta')}
            <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={16} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
