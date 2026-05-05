'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, ShieldCheck, ArrowRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const GANHO_COUNT = 8

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
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveStep((prev) => (prev + 1) % 4), 2500)
    return () => clearInterval(id)
  }, [])

  const ganhos = Array.from({ length: GANHO_COUNT }, (_, i) => t(`comoFunciona.gain.${i + 1}`))
  const wa = formatWhatsAppLink(WHATSAPP, t('comoFunciona.wa'))

  return (
    <section
      id="como-funciona"
      className="section-pad bg-[#F5F5F5]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header — texto à esquerda, personagem preenche o espaço vazio à direita */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-4">

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex-1 max-w-3xl"
          >
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-display text-[#07162a]"
              style={{ fontSize: 'clamp(2rem, 4.4vw, 3.25rem)' }}
            >
              {t('comoFunciona.title')}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[60ch] text-pretty text-lg leading-relaxed text-[#07162a]/60"
            >
              {t('comoFunciona.subtitle')}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-[60ch] leading-relaxed text-[#07162a]/70"
            >
              {t('comoFunciona.body')}
            </motion.p>
          </motion.div>

          {/* Personagem 3D */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.25 }}
            className="pointer-events-none select-none flex justify-center lg:justify-end lg:shrink-0"
          >
            <Image
              src="/personagem/jacimar-avatar-question.png"
              alt=""
              width={260}
              height={400}
              className="w-56 sm:w-72 lg:w-[22rem] xl:w-[26rem] h-auto drop-shadow-xl"
            />
          </motion.div>

        </div>

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
                <span className="text-[#07162a]/80 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 4 steps timeline */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          {/* Rail */}
          <div aria-hidden className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-[#07162a]/10" />
          {/* Active-step progress line */}
          <motion.div
            aria-hidden
            animate={{ scaleX: (activeStep + 1) / 4 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: 'left' }}
            className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-gradient-to-r from-[#c9a84c] via-[#ae251c] to-[#c9a84c]"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
            {stepKeys.map((key, i) => {
              const isActive = activeStep === i
              return (
                <motion.div key={key} variants={fadeUp} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 md:block">
                    <span
                      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold tabular transition-all duration-500 ${
                        isActive
                          ? 'bg-[#c9a84c] text-[#07162a]'
                          : 'bg-[#07162a] ring-1 ring-[#c9a84c]/40 text-[#c9a84c]'
                      }`}
                      style={{ boxShadow: isActive ? '0 0 22px rgba(201,168,76,0.6)' : 'none' }}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <p className={`font-semibold text-sm leading-snug transition-colors duration-500 ${isActive ? 'text-[#07162a]' : 'text-[#07162a]/40'}`}>
                    {t(`${key}.title`)}
                  </p>
                  <p className={`text-xs leading-relaxed transition-colors duration-500 ${isActive ? 'text-[#07162a]/65' : 'text-[#07162a]/30'}`}>
                    {t(`${key}.desc`)}
                  </p>
                </motion.div>
              )
            })}
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
