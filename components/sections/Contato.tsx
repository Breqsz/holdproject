'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'
import {
  EASE, INIT,
  type FormState,
  StepperNav,
  StepPerfil,
  StepInteresse,
  StepEscritorio,
  StepDados,
  DoneState,
  buildContactWaMessage,
} from '@/components/forms/ContactWizardSteps'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

export default function Contato() {
  const { t } = useLocale()
  const [step, setStep]       = useState(1)
  const [done, setDone]       = useState(false)
  const [data, setData]       = useState<FormState>(INIT)
  const [errors, setErrors]   = useState<Record<string, string>>({})
  const [dir, setDir]         = useState(1)

  const isClient = data.type === 'client'

  function upd(field: string, value: string) {
    setData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function validate(s: number): boolean {
    const e: Record<string, string> = {}
    if (s === 1) {
      if (!data.type) e.type = t('contact.err.select_option')
    } else if (s === 2) {
      if (isClient) {
        if (!data.service) e.service = t('contact.err.select_service')
        if (data.service === 'consorcio') {
          if (!data.segment) e.segment = t('contact.err.select_segment')
          if (!data.credit)  e.credit  = t('contact.err.credit')
          if (!data.term)    e.term    = t('contact.err.term')
        }
      } else {
        if (!data.company)  e.company  = t('contact.err.company')
        if (!data.broker)   e.broker   = t('contact.err.broker')
        if (!data.advisors) e.advisors = t('contact.err.advisors')
      }
    } else if (s === 3) {
      if (data.name.trim().length < 2) e.name = t('contact.err.name')
      if (isClient) {
        if (data.whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = t('contact.err.whatsapp')
      } else {
        if (data.phone.replace(/\D/g, '').length < 10) e.phone = t('contact.err.phone')
        if (!data.email.includes('@'))                  e.email = t('contact.err.email')
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleNext() {
    if (!validate(step)) return
    if (step < 3) { setDir(1); setStep((s) => s + 1); return }
    // Final step: hand the lead off to WhatsApp (pre-filled), then show the
    // confirmation. DoneState keeps a fallback button for blocked pop-ups.
    window.open(formatWhatsAppLink(WHATSAPP, buildContactWaMessage(data)), '_blank')
    setDone(true)
  }

  function handleBack()  { setDir(-1); setStep((s) => s - 1) }
  function handleReset() { setData(INIT); setErrors({}); setStep(1); setDone(false); setDir(1) }

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x:  d * 28 }),
    center: {             opacity: 1, x: 0           },
    exit:   (d: number) => ({ opacity: 0, x: -d * 28 }),
  }

  return (
    <section id="contato" className="section-pad bg-[#0b1f3a] relative overflow-hidden" style={{ fontFamily: 'var(--font-outfit)' }}>
      {/* Subtle backdrop glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 30%, rgba(122,154,184,0.08), transparent 55%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">

          {/* LEFT — copy + boneco + trust */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-[#7a9ab8]">
              {t('contact.eyebrow')}
            </span>
            <h2
              className="mt-4 text-display text-white"
              style={{
                fontSize: 'clamp(1.65rem, 4.4vw, 3rem)',
                letterSpacing: '-0.022em',
                lineHeight: 1.05,
              }}
            >
              {t('contact.title')}
            </h2>
            <p className="mt-5 text-[14.5px] leading-[1.65] text-white/65 max-w-[44ch]">
              {t('contact.subtitle')}
            </p>

            <div className="mt-8 hidden md:flex items-end gap-6">
              <Image
                src="/personagem/Boneco_v3.png"
                alt=""
                width={220}
                height={340}
                quality={95}
                className="w-28 lg:w-32 h-auto shrink-0"
                style={{ filter: 'drop-shadow(0 18px 36px rgba(0,0,0,0.42))' }}
              />

              <ul className="flex flex-col gap-2.5 pb-3 flex-1 min-w-0">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-white/72">
                    <span
                      aria-hidden
                      className="mt-[7px] block h-[5px] w-[5px] rounded-full shrink-0"
                      style={{ background: '#ae251c' }}
                    />
                    <span>{t(`contact.trust.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile trust signals (no boneco) */}
            <ul className="mt-6 md:hidden flex flex-col gap-2 border-t border-white/10 pt-5">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-white/72">
                  <span
                    aria-hidden
                    className="mt-[7px] block h-[5px] w-[5px] rounded-full shrink-0"
                    style={{ background: '#ae251c' }}
                  />
                  <span>{t(`contact.trust.${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — wizard form */}
          <div className="md:col-span-7 lg:col-span-7 w-full">
        <div className="w-full rounded-2xl bg-[#07162a]/80 ring-1 ring-white/10 px-5 py-7 sm:px-10 sm:py-10">
          {done ? (
            <DoneState d={data} onReset={handleReset} waNumber={WHATSAPP} />
          ) : (
            <>
              <StepperNav step={step} isPartner={data.type === 'partner'} />

              <div className="overflow-hidden">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={step}
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    {step === 1 && (
                      <StepPerfil type={data.type} error={errors.type} onSelect={(t) => upd('type', t)} />
                    )}
                    {step === 2 && isClient  && <StepInteresse  d={data} e={errors} upd={upd} />}
                    {step === 2 && !isClient && <StepEscritorio d={data} e={errors} upd={upd} />}
                    {step === 3 && <StepDados d={data} e={errors} upd={upd} isClient={isClient} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-7 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className={`min-h-[44px] md:min-h-0 inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 ${
                    step === 1 ? 'invisible pointer-events-none' : 'text-[#7a9ab8] hover:text-white'
                  }`}
                >
                  <ChevronLeft size={16} />
                  {t('contact.wizard.back')}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-7 min-h-[44px] md:min-h-0 inline-flex items-center justify-center gap-2 bg-[#ae251c] hover:bg-[#921e16] text-white font-semibold rounded-full py-2.5 text-sm transition-colors duration-200"
                >
                  {step < 3 ? t('contact.wizard.next') : isClient ? t('contact.wizard.send') : t('partners.cta')}
                  {step < 3 && <ChevronRight size={16} />}
                </button>
              </div>
            </>
          )}
        </div>
          </div>
        </div>
      </div>
    </section>
  )
}
