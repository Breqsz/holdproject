'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'
import { useAudience } from '@/lib/audience'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

const baseSchema = z.object({
  name: z.string().min(2),
  whatsapp: z.string().min(10),
  message: z.string().optional(),
  audience: z.enum(['pf', 'mei', 'empresa']).optional(),
})

type FormData = z.infer<typeof baseSchema>

const AUDIENCE_REQUIRED_KEY = 'form.lead.audience.saude.err'

const schemaWithAudience = baseSchema.refine((d) => d.audience !== undefined, {
  message: AUDIENCE_REQUIRED_KEY,
  path: ['audience'],
})

interface ServiceLeadFormProps {
  service: string
  introTitle?: string
  introBody?: string
  showAudienceField?: boolean
  /** Opções de audiência renderizadas. Default mantém PF/MEI/Empresa (não regride outras frentes). Opt-in. */
  audienceOptions?: Array<'pf' | 'mei' | 'empresa'>
}

const inputClass =
  'w-full bg-[#07162a] border border-[#142f54] focus:border-[#7a9ab8] focus:ring-1 focus:ring-[#7a9ab8]/30 text-white placeholder-[#4a6a8a] rounded-lg px-4 py-3 outline-none transition-all duration-200'

export function ServiceLeadForm({
  service,
  introTitle,
  introBody,
  showAudienceField = false,
  audienceOptions = ['pf', 'mei', 'empresa'],
}: ServiceLeadFormProps) {
  const { audience, setAudience } = useAudience()
  const { t } = useLocale()
  const [loading, setLoading] = useState(false)

  const schema = showAudienceField ? schemaWithAudience : baseSchema

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const audienceLabelGlobal = audience === 'pf' ? t('form.lead.audience.pf') : t('form.lead.audience.pj')
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '55XXXXXXXXXXX'

  const finalIntroTitle = introTitle ?? t('form.lead.intro.title.default')
  const finalIntroBody = introBody ?? t('form.lead.intro.body.default')

  function resolveAudienceLabel(data: FormData): string {
    if (!showAudienceField) return audienceLabelGlobal
    if (data.audience === 'pf') return t('form.lead.audience.saude.pf')
    if (data.audience === 'mei') return t('form.lead.audience.saude.mei')
    return t('form.lead.audience.saude.empresa')
  }

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      const audienceLabel = resolveAudienceLabel(data)

      if (showAudienceField) {
        setAudience(data.audience === 'pf' ? 'pf' : 'pj')
      }

      const params = {
        name: data.name,
        whatsapp: data.whatsapp,
        message: data.message ?? '',
        service,
        audience: audienceLabel,
      }

      const sid = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const tid = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CLIENT
      const pk  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      if (sid && tid && pk) {
        await emailjs.send(sid, tid, params, pk)
      }
      toast.success(t('form.lead.toast.success'))

      const message = [
        `Olá! Sou ${data.name} (${audienceLabel}).`,
        `Tenho interesse em ${service}.`,
        data.message ? `Detalhes: ${data.message}` : null,
      ].filter(Boolean).join(' ')

      window.open(formatWhatsAppLink(wa, message), '_blank')
      reset()
    } catch {
      toast.error(t('form.lead.toast.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl bg-[#0b1f3a] ring-1 ring-white/10 px-6 py-8 sm:px-10 sm:py-10 max-w-lg w-full">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]">
        {service}
      </p>
      <h3 className="mt-2 text-display text-white" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)' }}>
        {finalIntroTitle}
      </h3>
      <p className="mt-3 text-sm text-[#7a9ab8] leading-relaxed">
        {finalIntroBody}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        {showAudienceField && (
          <fieldset>
            <legend className="text-[11px] font-medium uppercase tracking-wider text-[#7a9ab8] mb-2 block">
              {t('form.lead.audience.saude.label')}
            </legend>
            <div className={`grid gap-2 ${audienceOptions.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {audienceOptions.map((opt) => (
                <label
                  key={opt}
                  className="relative flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#07162a] border border-[#142f54] px-3 py-3 text-sm text-white/90 transition-colors has-[:checked]:border-[#ae251c] has-[:checked]:bg-[#0d2240] hover:border-[#7a9ab8]/40"
                >
                  <input
                    {...register('audience')}
                    type="radio"
                    value={opt}
                    className="peer sr-only"
                  />
                  <span className="block h-3 w-3 rounded-full border border-[#4a6a8a] peer-checked:border-[#ae251c] peer-checked:bg-[#ae251c] peer-focus-visible:ring-2 peer-focus-visible:ring-white/60 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-[#07162a]" />
                  {t(`form.lead.audience.saude.${opt}`)}
                </label>
              ))}
            </div>
            {errors.audience && (
              <p className="text-[#ae251c] text-xs mt-1.5">
                {t('form.lead.audience.saude.err')}
              </p>
            )}
          </fieldset>
        )}

        <div>
          <label className="text-[11px] font-medium uppercase tracking-wider text-[#7a9ab8] mb-1.5 block">
            {t('form.lead.label.name')}
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder={t('form.lead.placeholder.name')}
            className={inputClass}
            autoComplete="name"
          />
          {errors.name && <p className="text-[#ae251c] text-xs mt-1.5">{t('form.lead.err.name')}</p>}
        </div>

        <div>
          <label className="text-[11px] font-medium uppercase tracking-wider text-[#7a9ab8] mb-1.5 block">
            {t('form.lead.label.whatsapp')}
          </label>
          <input
            {...register('whatsapp')}
            type="tel"
            placeholder={t('form.lead.placeholder.whatsapp')}
            className={inputClass}
            autoComplete="tel"
          />
          {errors.whatsapp && <p className="text-[#ae251c] text-xs mt-1.5">{t('form.lead.err.whatsapp')}</p>}
        </div>

        <div>
          <label className="text-[11px] font-medium uppercase tracking-wider text-[#7a9ab8] mb-1.5 block">
            {t('form.lead.label.message')} <span className="opacity-60 normal-case tracking-normal text-[10px]">{t('form.lead.label.message.optional')}</span>
          </label>
          <textarea
            {...register('message')}
            rows={3}
            placeholder={t('form.lead.placeholder.message')}
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#ae251c] hover:bg-[#8f1f17] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-full py-3.5 transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <WhatsAppIcon size={18} />
          )}
          {t('form.lead.submit')}
        </button>
      </form>
    </div>
  )
}
