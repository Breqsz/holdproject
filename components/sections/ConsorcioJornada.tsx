'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ShieldCheck } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const GANHO_COUNT = 8

const stepKeys = [
  'process.step1',
  'process.step2',
  'process.step3',
  'process.step4',
] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function ConsorcioJornada() {
  const { t } = useLocale()
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveStep((prev) => (prev + 1) % 4), 2500)
    return () => clearInterval(id)
  }, [])

  const ganhos = Array.from({ length: GANHO_COUNT }, (_, i) => t(`comoFunciona.gain.${i + 1}`))
  const wa = formatWhatsAppLink(WHATSAPP, t('comoFunciona.wa'))

  return (
    <div className="mt-20" style={{ fontFamily: 'var(--font-outfit)' }}>
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="flex items-center gap-4 mb-10"
      >
        <h3
          className="text-display text-white"
          style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)' }}
        >
          {t('process.title')}
        </h3>
        <div className="rule-accent h-px flex-1 max-w-[140px]" />
      </motion.div>

      {/* Ganhos */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-7">
          <motion.h4
            variants={fadeUp}
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]"
          >
            {t('comoFunciona.diff.title')}
          </motion.h4>
          <motion.div variants={fadeUp} className="rule-accent h-px flex-1 max-w-[120px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
          {ganhos.map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0">
                <Check size={16} color="#ae251c" />
              </span>
              <span className="text-[#e0e8f0]/85 text-sm leading-relaxed">{item}</span>
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
        className="mt-16 relative"
      >
        {/* Rail */}
        <div
          aria-hidden
          className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-white/10"
        />
        {/* Active progress */}
        <motion.div
          aria-hidden
          animate={{ scaleX: (activeStep + 1) / 4 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          style={{ transformOrigin: 'left' }}
          className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-[#ae251c]"
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
                        ? 'bg-[#ae251c] text-white'
                        : 'bg-[#07162a] ring-1 ring-[#7a9ab8]/40 text-[#7a9ab8]'
                    }`}
                    style={{ boxShadow: isActive ? '0 0 18px rgba(174,37,28,0.32)' : 'none' }}
                  >
                    {i + 1}
                  </span>
                </div>

                <p
                  className={`font-semibold text-sm leading-snug transition-colors duration-500 ${
                    isActive ? 'text-white' : 'text-[#7a9ab8]/55'
                  }`}
                >
                  {t(`${key}.title`)}
                </p>
                <p
                  className={`text-xs leading-relaxed transition-colors duration-500 ${
                    isActive ? 'text-[#7a9ab8]' : 'text-[#7a9ab8]/40'
                  }`}
                >
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
        <div className="rounded-full bg-[#0b1f3a] ring-1 ring-white/15 px-6 py-3 flex items-center gap-3">
          <ShieldCheck size={18} className="text-white shrink-0" strokeWidth={1.7} />
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
        <WhatsAppCTA href={wa} label={t('comoFunciona.cta')} className="px-8 py-3.5" />
      </motion.div>
    </div>
  )
}
