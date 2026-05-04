'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'

// ─── Schemas ────────────────────────────────────────────────────────────────

const clientSchema = z.object({
  segment: z.string().min(1, 'Selecione um segmento'),
  credit: z.string().min(1, 'Informe o crédito desejado'),
  term: z.string().min(1, 'Informe o prazo'),
  name: z.string().min(2, 'Nome obrigatório'),
  whatsapp: z.string().min(10, 'WhatsApp inválido'),
})

const partnerSchema = z.object({
  company: z.string().min(2, 'Razão social obrigatória'),
  broker: z.string().min(2, 'Nome do escritório obrigatório'),
  advisors: z.string().min(1, 'Informe a quantidade'),
  phone: z.string().min(10, 'Telefone inválido'),
  email: z.string().email('Email inválido'),
})

type ClientFormData = z.infer<typeof clientSchema>
type PartnerFormData = z.infer<typeof partnerSchema>

// ─── Reusable field sub-components ──────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[#7a9ab8] text-sm font-medium mb-1 block">
      {children}
    </label>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-[#ae251c] text-xs mt-1">{message}</p>
}

const inputClass =
  'w-full bg-[#0b1f3a] border border-[#142f54] focus:border-[#ae251c] text-white placeholder-[#4a6a8a] rounded-lg px-4 py-3 outline-none transition-colors'

// ─── Client Form ─────────────────────────────────────────────────────────────

interface ClientFormProps {
  onSubmit: (data: ClientFormData) => Promise<void>
  loading: boolean
  t: (key: string) => string
}

function ClientForm({ onSubmit, loading, t }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({ resolver: zodResolver(clientSchema) })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Segment */}
      <div>
        <FieldLabel>{t('contact.segment.label')}</FieldLabel>
        <select {...register('segment')} className={inputClass}>
          <option value="" className="bg-[#0b1f3a]">
            Selecione...
          </option>
          {[
            'Imóvel',
            'Veículo',
            'Pesados & Agro',
            'Serviços',
            'Condomínio',
            'Outros',
          ].map((opt) => (
            <option key={opt} value={opt} className="bg-[#0b1f3a]">
              {opt}
            </option>
          ))}
        </select>
        <FieldError message={errors.segment?.message} />
      </div>

      {/* Credit */}
      <div>
        <FieldLabel>{t('contact.credit.label')}</FieldLabel>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a9ab8] text-sm select-none pointer-events-none">
            R$
          </span>
          <input
            {...register('credit')}
            type="text"
            placeholder="500.000"
            className={`${inputClass} pl-10`}
          />
        </div>
        <FieldError message={errors.credit?.message} />
      </div>

      {/* Term */}
      <div>
        <FieldLabel>{t('contact.term.label')}</FieldLabel>
        <input
          {...register('term')}
          type="text"
          placeholder="ex: 60 meses"
          className={inputClass}
        />
        <FieldError message={errors.term?.message} />
      </div>

      {/* Name */}
      <div>
        <FieldLabel>{t('contact.name.label')}</FieldLabel>
        <input
          {...register('name')}
          type="text"
          placeholder="Seu nome completo"
          className={inputClass}
        />
        <FieldError message={errors.name?.message} />
      </div>

      {/* WhatsApp */}
      <div>
        <FieldLabel>{t('contact.whatsapp.label')}</FieldLabel>
        <input
          {...register('whatsapp')}
          type="tel"
          placeholder="(11) 99999-9999"
          className={inputClass}
        />
        <FieldError message={errors.whatsapp?.message} />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ae251c] hover:bg-[#c42d23] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-full py-4 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        {t('contact.submit.client')}
      </button>
    </form>
  )
}

// ─── Partner Form ─────────────────────────────────────────────────────────────

interface PartnerFormProps {
  onSubmit: (data: PartnerFormData) => Promise<void>
  loading: boolean
  t: (key: string) => string
}

function PartnerForm({ onSubmit, loading, t }: PartnerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerFormData>({ resolver: zodResolver(partnerSchema) })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Company */}
      <div>
        <FieldLabel>{t('contact.company.label')}</FieldLabel>
        <input
          {...register('company')}
          type="text"
          placeholder="Razão social da empresa"
          className={inputClass}
        />
        <FieldError message={errors.company?.message} />
      </div>

      {/* Broker */}
      <div>
        <FieldLabel>{t('contact.broker.label')}</FieldLabel>
        <input
          {...register('broker')}
          type="text"
          placeholder="Nome do escritório / correspondente"
          className={inputClass}
        />
        <FieldError message={errors.broker?.message} />
      </div>

      {/* Advisors */}
      <div>
        <FieldLabel>{t('contact.advisors.label')}</FieldLabel>
        <input
          {...register('advisors')}
          type="number"
          min={1}
          placeholder="Ex: 5"
          className={inputClass}
        />
        <FieldError message={errors.advisors?.message} />
      </div>

      {/* Phone */}
      <div>
        <FieldLabel>{t('contact.phone.label')}</FieldLabel>
        <input
          {...register('phone')}
          type="tel"
          placeholder="(11) 99999-9999"
          className={inputClass}
        />
        <FieldError message={errors.phone?.message} />
      </div>

      {/* Email */}
      <div>
        <FieldLabel>{t('contact.email.label')}</FieldLabel>
        <input
          {...register('email')}
          type="email"
          placeholder="contato@empresa.com.br"
          className={inputClass}
        />
        <FieldError message={errors.email?.message} />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ae251c] hover:bg-[#c42d23] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-full py-4 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        {t('contact.submit.partner')}
      </button>
    </form>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Contato() {
  const { t } = useLocale()
  const [tab, setTab] = useState<'client' | 'partner'>('client')
  const [loading, setLoading] = useState(false)

  const isClient = tab === 'client'

  async function handleClientSubmit(data: ClientFormData) {
    setLoading(true)
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CLIENT!,
        data as Record<string, unknown>,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      toast.success(t('contact.success'))
      const waNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '55XXXXXXXXXXX'
      const msg = `Olá! Sou ${data.name}, tenho interesse em consórcio de ${data.segment} com crédito de ${data.credit}.`
      window.open(formatWhatsAppLink(waNumber, msg), '_blank')
    } catch {
      toast.error(t('contact.error'))
    } finally {
      setLoading(false)
    }
  }

  async function handlePartnerSubmit(data: PartnerFormData) {
    setLoading(true)
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_PARTNER!,
        data as Record<string, unknown>,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      toast.success(t('contact.success'))
      const waNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '55XXXXXXXXXXX'
      const msg = `Olá! Sou ${data.broker}, tenho interesse em parceria com a Hold Corretora.`
      window.open(formatWhatsAppLink(waNumber, msg), '_blank')
    } catch {
      toast.error(t('contact.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contato"
      className="py-24 md:py-32 bg-[#0b1f3a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center rounded-full bg-[#ae251c]/20 text-[#ae251c] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">
            {t('contact.eyebrow')}
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {t('contact.title')}
          </h2>
        </div>

        {/* Card — Double-Bezel */}
        <div className="max-w-lg mx-auto rounded-2xl bg-white/5 ring-1 ring-white/10 p-1.5">
          <div className="rounded-[calc(1rem-0.375rem)] bg-[#0b1f3a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] px-6 py-8 sm:px-8">

            {/* Tab toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#142f54] rounded-full p-1 inline-flex">
                <button
                  type="button"
                  onClick={() => setTab('client')}
                  className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-200 ${
                    isClient
                      ? 'bg-[#ae251c] text-white'
                      : 'text-[#7a9ab8] hover:text-white'
                  }`}
                >
                  {t('contact.client.title')}
                </button>
                <button
                  type="button"
                  onClick={() => setTab('partner')}
                  className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-200 ${
                    !isClient
                      ? 'bg-[#ae251c] text-white'
                      : 'text-[#7a9ab8] hover:text-white'
                  }`}
                >
                  {t('contact.partner.title')}
                </button>
              </div>
            </div>

            {/* Animated form swap */}
            <AnimatePresence mode="wait">
              {isClient ? (
                <motion.div
                  key="client"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                >
                  <ClientForm
                    onSubmit={handleClientSubmit}
                    loading={loading}
                    t={t}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="partner"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                >
                  <PartnerForm
                    onSubmit={handlePartnerSubmit}
                    loading={loading}
                    t={t}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
