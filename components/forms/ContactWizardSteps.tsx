'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Building2, User } from 'lucide-react'
import { formatWhatsAppLink } from '@/lib/utils'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { useLocale } from '@/lib/i18n'

export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

// ── Types & constants ─────────────────────────────────────────────────────────

export interface FormState {
  type: string    // 'client' | 'partner' | ''
  service: string // 'consorcio' | 'seguros' | 'saude' | 'investimentos' | ''
  segment: string
  credit: string
  term: string
  company: string
  broker: string
  advisors: string
  name: string
  whatsapp: string
  phone: string
  email: string
}

export const INIT: FormState = {
  type: '', service: '', segment: '', credit: '', term: '',
  company: '', broker: '', advisors: '',
  name: '', whatsapp: '', phone: '', email: '',
}

// label = PT display used in WA messages; labelKey = i18n key for UI display
export const SERVICES = [
  { id: 'consorcio',     label: 'Consórcio',     labelKey: 'services.consortium.title' },
  { id: 'seguros',       label: 'Seguros',        labelKey: 'services.insurance.title' },
  { id: 'saude',         label: 'Saúde',          labelKey: 'services.health.title' },
  { id: 'investimentos', label: 'Investimentos',  labelKey: 'services.invest.title' },
]

// value = PT string stored in FormState and used in WA messages; key = i18n key for display
export const SEGMENTS = [
  { value: 'Imóvel',         key: 'contact.segment.imovel' },
  { value: 'Veículo',        key: 'contact.segment.veiculo' },
  { value: 'Pesados & Agro', key: 'contact.segment.pesados' },
  { value: 'Serviços',       key: 'contact.segment.servicos' },
  { value: 'Condomínio',     key: 'contact.segment.condominio' },
  { value: 'Outros',         key: 'contact.segment.outros' },
]

// ── Primitives ─────────────────────────────────────────────────────────────────

export const inputCls =
  'w-full bg-[#07162a] border border-[#142f54] focus:border-[#7a9ab8] focus:ring-1 focus:ring-[#7a9ab8]/30 text-white placeholder-[#4a6a8a] rounded-lg px-4 py-3 outline-none transition-all duration-200 text-sm'

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7a9ab8] mb-1.5">
      {children}
    </label>
  )
}

export function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-[#ae251c] text-xs mt-1.5">{msg}</p>
}

// ── Stepper nav ────────────────────────────────────────────────────────────────

export function StepperNav({ step, isPartner }: { step: number; isPartner: boolean }) {
  const { t } = useLocale()
  const labels = [
    t('contact.wizard.step.profile'),
    isPartner ? t('contact.wizard.step.office') : t('contact.wizard.step.interest'),
    t('contact.wizard.step.contact'),
  ]
  return (
    <div className="flex items-start justify-between mb-8">
      {labels.map((label, i) => {
        const n = i + 1
        const isDone   = step > n
        const isActive = step === n
        return (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-500 ${
                  isDone   ? 'bg-[#7a9ab8] text-[#07162a]'
                  : isActive ? 'bg-[#ae251c] text-white shadow-[0_0_14px_rgba(174,37,28,0.22)]'
                  : 'bg-[#07162a] ring-1 ring-[#142f54] text-[#4a6a8a]'
                }`}
              >
                {isDone ? <Check size={13} strokeWidth={2.5} /> : n}
              </span>
              <span className={`text-[9.5px] sm:text-[10px] font-medium whitespace-nowrap transition-colors duration-300 ${
                isActive ? 'text-white' : isDone ? 'text-[#7a9ab8]' : 'text-[#4a6a8a]'
              }`}>
                {label}
              </span>
            </div>
            {i < 2 && (
              <div
                className="flex-1 h-px mx-2 -mt-[14px] transition-colors duration-500"
                style={{ background: step > n ? '#7a9ab8' : '#142f54' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Step 1 ─ Perfil ────────────────────────────────────────────────────────────

export function StepPerfil({
  type, error, onSelect,
}: {
  type: string; error?: string; onSelect: (t: string) => void
}) {
  const { t } = useLocale()
  const opts = [
    { id: 'client',  Icon: User,      title: t('contact.wizard.client.title'),  desc: t('contact.wizard.client.desc') },
    { id: 'partner', Icon: Building2, title: t('contact.wizard.partner.title'), desc: t('contact.wizard.partner.desc') },
  ]
  return (
    <div className="space-y-3">
      <p className="text-[#7a9ab8] text-sm mb-5">{t('contact.wizard.prompt')}</p>
      {opts.map(({ id, Icon, title, desc }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className={`w-full text-left rounded-xl border p-5 transition-all duration-200 flex items-start gap-4 ${
            type === id
              ? 'border-[#ae251c] bg-[#ae251c]/10 ring-1 ring-[#ae251c]/30'
              : 'border-[#142f54] hover:border-[#1e4a7a]'
          }`}
        >
          <Icon size={24} className={`shrink-0 mt-0.5 ${type === id ? 'text-[#ae251c]' : 'text-[#7a9ab8]'}`} />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-sm">{title}</p>
            <p className="text-[#7a9ab8] text-xs mt-1 leading-relaxed">{desc}</p>
          </div>
          {type === id && <Check size={15} className="text-[#ae251c] shrink-0 mt-0.5" />}
        </button>
      ))}
      <FieldError msg={error} />
    </div>
  )
}

// ── Step 2a ─ Interesse (cliente) ──────────────────────────────────────────────

export function StepInteresse({
  d, e, upd,
}: {
  d: FormState; e: Record<string, string>; upd: (f: string, v: string) => void
}) {
  const { t } = useLocale()
  return (
    <div className="space-y-5">
      <div>
        <Label>{t('contact.wizard.service.label')}</Label>
        <div className="grid grid-cols-2 gap-2">
          {SERVICES.map((svc) => (
            <button
              key={svc.id}
              type="button"
              onClick={() => upd('service', svc.id)}
              className={`rounded-lg border py-2.5 px-3 text-sm font-medium transition-all duration-200 ${
                d.service === svc.id
                  ? 'border-[#ae251c] bg-[#ae251c]/10 text-white ring-1 ring-[#ae251c]/30'
                  : 'border-[#142f54] text-[#7a9ab8] hover:border-[#1e4a7a] hover:text-white'
              }`}
            >
              {t(svc.labelKey)}
            </button>
          ))}
        </div>
        <FieldError msg={e.service} />
      </div>

      <AnimatePresence>
        {d.service === 'consorcio' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-1">
              <div>
                <Label>{t('contact.segment.label')}</Label>
                <select value={d.segment} onChange={(ev) => upd('segment', ev.target.value)} className={inputCls}>
                  <option value="" className="bg-[#0b1f3a]">{t('contact.wizard.segment.placeholder')}</option>
                  {SEGMENTS.map((s) => <option key={s.value} value={s.value} className="bg-[#0b1f3a]">{t(s.key)}</option>)}
                </select>
                <FieldError msg={e.segment} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('contact.credit.label')}</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a9ab8] text-sm pointer-events-none select-none">R$</span>
                    <input type="text" value={d.credit} onChange={(ev) => upd('credit', ev.target.value)} placeholder="500.000" className={`${inputCls} pl-9`} />
                  </div>
                  <FieldError msg={e.credit} />
                </div>
                <div>
                  <Label>{t('contact.wizard.term.label')}</Label>
                  <input type="text" value={d.term} onChange={(ev) => upd('term', ev.target.value)} placeholder={t('contact.wizard.term.placeholder')} className={inputCls} />
                  <FieldError msg={e.term} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Step 2b ─ Escritório (parceiro) ───────────────────────────────────────────

export function StepEscritorio({
  d, e, upd,
}: {
  d: FormState; e: Record<string, string>; upd: (f: string, v: string) => void
}) {
  const { t } = useLocale()
  return (
    <div className="space-y-4">
      <div>
        <Label>{t('contact.company.label')}</Label>
        <input type="text" value={d.company} onChange={(ev) => upd('company', ev.target.value)} placeholder={t('contact.wizard.company.placeholder')} className={inputCls} />
        <FieldError msg={e.company} />
      </div>
      <div>
        <Label>{t('contact.wizard.broker.label')}</Label>
        <input type="text" value={d.broker} onChange={(ev) => upd('broker', ev.target.value)} placeholder={t('contact.wizard.broker.placeholder')} className={inputCls} />
        <FieldError msg={e.broker} />
      </div>
      <div>
        <Label>{t('contact.wizard.advisors.label')}</Label>
        <input type="number" min={1} value={d.advisors} onChange={(ev) => upd('advisors', ev.target.value)} placeholder="Ex: 5" className={inputCls} />
        <FieldError msg={e.advisors} />
      </div>
    </div>
  )
}

// ── Step 3 ─ Dados de contato ─────────────────────────────────────────────────

export function StepDados({
  d, e, upd, isClient,
}: {
  d: FormState; e: Record<string, string>; upd: (f: string, v: string) => void; isClient: boolean
}) {
  const { t } = useLocale()
  return (
    <div className="space-y-4">
      <div>
        <Label>{t('contact.name.label')}</Label>
        <input type="text" value={d.name} onChange={(ev) => upd('name', ev.target.value)} placeholder={t('contact.wizard.name.placeholder')} className={inputCls} autoComplete="name" />
        <FieldError msg={e.name} />
      </div>
      {isClient ? (
        <div>
          <Label>{t('contact.whatsapp.label')}</Label>
          <input type="tel" value={d.whatsapp} onChange={(ev) => upd('whatsapp', ev.target.value)} placeholder="(34) 99999-9999" className={inputCls} autoComplete="tel" />
          <FieldError msg={e.whatsapp} />
        </div>
      ) : (
        <>
          <div>
            <Label>{t('contact.phone.label')}</Label>
            <input type="tel" value={d.phone} onChange={(ev) => upd('phone', ev.target.value)} placeholder="(34) 99999-9999" className={inputCls} autoComplete="tel" />
            <FieldError msg={e.phone} />
          </div>
          <div>
            <Label>{t('contact.email.label')}</Label>
            <input type="email" value={d.email} onChange={(ev) => upd('email', ev.target.value)} placeholder="contato@empresa.com.br" className={inputCls} autoComplete="email" />
            <FieldError msg={e.email} />
          </div>
        </>
      )}
    </div>
  )
}

// ── Done ──────────────────────────────────────────────────────────────────────

export function DoneState({
  d, onReset, waNumber,
}: {
  d: FormState; onReset: () => void; waNumber: string
}) {
  const { t } = useLocale()
  const serviceLabel = SERVICES.find((s) => s.id === d.service)?.label ?? d.service
  const firstName = d.name.split(' ')[0]
  // WA messages stay in PT — they are received by the Brazilian business
  const waMsg =
    d.type === 'client'
      ? d.service === 'consorcio'
        ? `Olá! Sou ${d.name} e tenho interesse em consórcio de ${d.segment} com crédito de R$ ${d.credit} em ${d.term}. Pode me ajudar?`
        : `Olá! Sou ${d.name} e tenho interesse em ${serviceLabel} pela Hold Corretora. Pode me ajudar?`
      : `Olá! Sou ${d.name} de ${d.broker}. Tenho interesse em parceria com a Hold Corretora para integrar consórcio ao nosso portfólio.`
  const wa = formatWhatsAppLink(waNumber, waMsg)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="text-center py-4"
    >
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.08] ring-1 ring-white/20 mb-5">
        <Check size={28} className="text-white" strokeWidth={2} />
      </div>
      <h3 className="text-white font-semibold text-xl mb-2">{t('contact.wizard.done.title')}</h3>
      <p className="text-[#7a9ab8] text-sm leading-relaxed max-w-xs mx-auto mb-7">
        {t('contact.wizard.done.thanks')} {firstName}. {t('contact.wizard.done.suffix')}
      </p>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-full px-7 py-3.5 text-sm transition-colors"
      >
        <WhatsAppIcon size={18} />
        {t('contact.wizard.done.open_wa')}
      </a>
      <div className="mt-5">
        <button type="button" onClick={onReset} className="text-[#4a6a8a] hover:text-[#7a9ab8] text-xs transition-colors">
          {t('contact.wizard.done.reset')}
        </button>
      </div>
    </motion.div>
  )
}
