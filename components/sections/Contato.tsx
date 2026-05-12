'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'
import { useLocale } from '@/lib/i18n'
import {
  EASE, INIT, SERVICES,
  type FormState,
  StepperNav,
  StepPerfil,
  StepInteresse,
  StepEscritorio,
  StepDados,
  DoneState,
} from '@/components/forms/ContactWizardSteps'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

export default function Contato() {
  const { t } = useLocale()
  const [step, setStep]       = useState(1)
  const [done, setDone]       = useState(false)
  const [loading, setLoading] = useState(false)
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

  async function handleNext() {
    if (!validate(step)) return
    if (step < 3) { setDir(1); setStep((s) => s + 1); return }
    setLoading(true)
    try {
      const serviceLabel = SERVICES.find((s) => s.id === data.service)?.label ?? data.service
      const params = isClient
        ? { type: 'Cliente', name: data.name, whatsapp: data.whatsapp, service: serviceLabel, segment: data.segment, credit: data.credit, term: data.term }
        : { type: 'Parceiro', name: data.name, phone: data.phone, email: data.email, company: data.company, broker: data.broker, advisors: data.advisors }
      const sid = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const tid = isClient
        ? process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CLIENT
        : process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_PARTNER
      const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      if (sid && tid && pk) await emailjs.send(sid, tid, params as Record<string, unknown>, pk)
      setDone(true)
    } catch {
      toast.error(t('contact.error'))
    } finally {
      setLoading(false)
    }
  }

  function handleBack()  { setDir(-1); setStep((s) => s - 1) }
  function handleReset() { setData(INIT); setErrors({}); setStep(1); setDone(false); setDir(1) }

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x:  d * 28 }),
    center: {             opacity: 1, x: 0           },
    exit:   (d: number) => ({ opacity: 0, x: -d * 28 }),
  }

  return (
    <section id="contato" className="section-pad bg-[#0b1f3a]" style={{ fontFamily: 'var(--font-outfit)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl mb-10 sm:mb-12">
          <h2 className="mt-5 text-display text-white" style={{ fontSize: 'clamp(1.65rem, 4.4vw, 3.25rem)' }}>
            {t('contact.title')}
          </h2>
        </div>

        <div className="max-w-lg mx-auto rounded-2xl bg-[#07162a]/80 ring-1 ring-white/10 px-5 py-7 sm:px-10 sm:py-10">
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
                  className={`inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 ${
                    step === 1 ? 'invisible pointer-events-none' : 'text-[#7a9ab8] hover:text-white'
                  }`}
                >
                  <ChevronLeft size={16} />
                  {t('contact.wizard.back')}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-[#ae251c] hover:bg-[#921e16] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-full px-7 py-2.5 text-sm transition-colors duration-200"
                >
                  {loading && <Loader2 size={15} className="animate-spin" />}
                  {step < 3 ? t('contact.wizard.next') : isClient ? t('contact.wizard.send') : t('partners.cta')}
                  {step < 3 && !loading && <ChevronRight size={16} />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
