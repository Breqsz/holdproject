'use client'

import { motion } from 'framer-motion'
import { Check, ShieldCheck, ArrowRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

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
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function ParaEscritorios() {
  const { t } = useLocale()

  return (
    <section
      id="para-escritorios"
      className="py-24 md:py-32 bg-[#07162a]"
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
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center rounded-full bg-[#ae251c]/20 text-[#ae251c] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">
              {t('partners.eyebrow')}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-white"
          >
            {t('partners.title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-[#7a9ab8] text-lg leading-relaxed"
          >
            {t('partners.subtitle')}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-[#e0e8f0]/80 leading-relaxed"
          >
            {t('partners.body')}
          </motion.p>
        </motion.div>

        {/* Diferenciais */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <motion.h3
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#7a9ab8] mb-6"
          >
            {t('partners.diff.title')}
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
            {diferenciais.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 shrink-0">
                  <Check size={16} color="#ae251c" />
                </span>
                <span className="text-[#e0e8f0]/90 text-sm leading-relaxed">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 5 Steps */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          {stepKeys.map((key, i) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className="flex flex-col"
            >
              {/* Outer bezel */}
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-1.5 h-full">
                {/* Inner bezel */}
                <div className="rounded-[calc(1rem-0.375rem)] bg-[#0b1f3a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] p-5 h-full flex flex-col">
                  {/* Numbered circle */}
                  <div className="w-9 h-9 rounded-full bg-[#ae251c]/15 ring-1 ring-[#ae251c]/40 flex items-center justify-center mb-4 shrink-0">
                    <span className="text-[#ae251c] text-sm font-bold">
                      {i + 1}
                    </span>
                  </div>

                  <p className="text-white font-semibold text-sm leading-snug mb-2">
                    {t(`${key}.title`)}
                  </p>
                  <p className="text-[#7a9ab8] text-xs leading-relaxed">
                    {t(`${key}.desc`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          {/* Outer bezel */}
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-1.5">
            {/* Inner bezel */}
            <div className="rounded-[calc(1rem-0.375rem)] bg-[#0b1f3a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] px-6 py-3 flex items-center gap-3">
              <ShieldCheck size={18} className="text-[#ae251c] shrink-0" />
              <span className="text-[#e0e8f0] text-sm font-medium">
                {t('partners.badge')}
              </span>
            </div>
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
            className="inline-flex items-center gap-3 bg-[#ae251c] hover:bg-[#c42d23] text-white px-8 py-3.5 rounded-full font-semibold transition-colors duration-200"
          >
            {t('partners.cta')}
            <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0">
              <ArrowRight size={16} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
