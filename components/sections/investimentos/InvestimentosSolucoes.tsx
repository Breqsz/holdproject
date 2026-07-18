'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Wallet, Zap, Landmark, ShieldCheck, ReceiptText, PieChart, Target, ArrowRight } from 'lucide-react'
import { HoldLogo } from '@/components/icons/HoldLogo'
import { DetailModal, type DetailData } from '@/components/shared/DetailModal'
import { WhatsAppRedirectModal } from '@/components/shared/WhatsAppRedirectModal'
import { formatWhatsAppLink } from '@/lib/utils'
import { useLocale } from '@/lib/i18n'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const SOLUCOES = [
  { id: 'capitalGiro', icon: Wallet, img: '/images/solucoes/capitalGiro.webp' },
  { id: 'recebiveis', icon: Zap, img: '/images/solucoes/recebiveis.webp' },
  { id: 'credito', icon: Landmark, img: '/images/solucoes/credito.webp' },
  { id: 'escrow', icon: ShieldCheck, img: '/images/solucoes/escrow.webp' },
  { id: 'cobranca', icon: ReceiptText, img: '/images/solucoes/cobranca.webp' },
  { id: 'estruturacao', icon: PieChart, img: '/images/solucoes/estruturacao.webp' },
] as const

type SolItem = DetailData & { id: string; ariaLabel: string }

// Barra de credenciais (design idêntico ao TrustBar da home) que fecha a seção.
const CRED = [Landmark, ShieldCheck, Zap, Target] as const

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
}
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

export default function InvestimentosSolucoes() {
  const { t } = useLocale()
  const [active, setActive] = useState<SolItem | null>(null)
  const [wa, setWa] = useState<SolItem | null>(null)

  // Carrossel da barra de credenciais no mobile (mesmo comportamento do TrustBar).
  const credScrollRef = useRef<HTMLDivElement>(null)
  const [credDot, setCredDot] = useState(0)
  const handleCredScroll = useCallback(() => {
    const el = credScrollRef.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    if (!first) return
    const stride = first.offsetWidth + 16 // gap-4
    setCredDot(Math.min(Math.round(el.scrollLeft / stride), CRED.length - 1))
  }, [])

  const solData: SolItem[] = SOLUCOES.map((s, i) => ({
    id: s.id,
    eyebrow: t('investimentosV2.solucoes.detail.eyebrow'),
    icon: s.icon,
    image: s.img,
    title: t(`investimentosV2.solucoes.${s.id}.title`),
    short: t(`investimentosV2.solucoes.${s.id}.desc`),
    body: t(`investimentosV2.solucoes.${s.id}.body`),
    items: [],
    ariaLabel: `${t('investimentosV2.solucoes.cta')}: ${t(`investimentosV2.solucoes.${s.id}.title`)}`,
  }))

  const waMessage = wa ? t(`investimentosV2.solucoes.${wa.id}.wa`) : ''
  const waHref = wa ? formatWhatsAppLink(WHATSAPP, waMessage) : ''

  return (
    <section
      id="investimentos-solucoes"
      className="section-pad bg-[#07162a]"
      style={{ fontFamily: 'var(--font-outfit)', paddingBottom: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mb-10 lg:mb-14"
        >
          <p className="text-[12px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            {t('investimentosV2.solucoes.eyebrow')}
          </p>
          <h2 className="mt-4 text-white text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold tracking-[-0.02em] leading-[1.05]">
            {t('investimentosV2.solucoes.title')}
          </h2>
        </motion.div>

        {/* Mosaico de peso variável: o 1º card é o destaque (2x2 no desktop). Cada card abre o modal de detalhe. */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {solData.map((d, i) => {
            const Icon = d.icon!
            return (
              <motion.button
                key={d.id}
                type="button"
                onClick={() => setActive(d)}
                aria-label={d.ariaLabel}
                aria-haspopup="dialog"
                variants={cardVariants}
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                className={`group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-2xl text-left transition-shadow duration-300 hover:shadow-[0_28px_70px_-22px_rgba(0,0,0,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07162a] min-h-[248px] ${
                  i === 0 ? 'lg:col-span-2 lg:row-span-2 min-h-[300px] lg:min-h-0' : ''
                }`}
              >
                <Image
                  src={d.image!}
                  alt=""
                  fill
                  sizes={i === 0 ? '(max-width:1024px) 100vw, 66vw' : '(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw'}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[#ae251c]" />

                <div
                  className="relative p-6 lg:p-7"
                  style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.55)' }}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#ae251c]/90 ring-1 ring-white/10">
                    <Icon size={22} className="text-white" strokeWidth={1.7} />
                  </span>
                  <h3
                    className={`mt-4 text-white font-semibold tracking-tight ${
                      i === 0 ? 'text-[19px] lg:text-[24px]' : 'text-[17px]'
                    }`}
                  >
                    {d.title}
                  </h3>
                  <p
                    className={`mt-2 leading-relaxed text-[#cbd5e1] ${
                      i === 0 ? 'text-[13.5px] lg:text-[15px] lg:max-w-[46ch]' : 'text-[13.5px]'
                    }`}
                  >
                    {d.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[12px] sm:text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white">
                    {t('investimentosV2.solucoes.cta')}
                    <span
                      aria-hidden
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ae251c] transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <ArrowRight size={11} className="text-white" />
                    </span>
                  </span>
                </div>
              </motion.button>
            )
          })}
        </motion.div>

      </div>

      {/* Barra de credenciais — full-bleed ponta a ponta, quadrada, idêntica ao TrustBar da home */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="mt-10 lg:mt-12 bg-[#040d1a] border-y border-white/[0.08]"
      >
        {/* Desktop */}
        <div className="hidden md:flex mx-auto max-w-[1280px] px-6 lg:px-10 xl:px-14 py-6 lg:py-7 items-center">
          {CRED.map((Icon, i) => (
            <div
              key={i}
              className={`flex flex-1 items-center gap-3 ${
                i < CRED.length - 1 ? 'border-r border-white/[0.08] pr-6 mr-6' : ''
              }`}
            >
              <Icon size={17} className="shrink-0 text-[#ae251c]" strokeWidth={1.6} />
              <span className="text-[11.5px] leading-[1.38] text-white/50 font-light">
                {t(`investimentosV2.parceiros.cred.${i + 1}`)}
              </span>
            </div>
          ))}
          <div className="shrink-0 ml-6 pl-6 border-l border-white/[0.08]">
            <HoldLogo className="h-[22px] w-auto" variant="dark" />
          </div>
        </div>

        {/* Mobile — carrossel horizontal com dots (igual ao TrustBar) */}
        <div className="md:hidden relative">
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#040d1a] to-transparent z-10"
          />
          <div
            ref={credScrollRef}
            onScroll={handleCredScroll}
            aria-label={t('investimentosV2.parceiros.title')}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 py-5 gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CRED.map((Icon, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[72vw] snap-start flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3"
              >
                <Icon size={18} className="shrink-0 text-[#ae251c]" strokeWidth={1.6} />
                <span className="text-[12px] leading-[1.45] text-white/70 sm:text-white/55 font-light">
                  {t(`investimentosV2.parceiros.cred.${i + 1}`)}
                </span>
              </div>
            ))}
          </div>
          <div aria-hidden className="flex justify-center gap-1.5 pb-3">
            {CRED.map((_, i) => (
              <div
                key={i}
                className={[
                  'h-[3px] rounded-full transition-all duration-300',
                  i === credDot ? 'w-6 bg-[#ae251c]' : 'w-3 bg-white/20',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <DetailModal
        open={active !== null}
        data={active}
        labels={{
          itemsLabel: t('investimentosV2.solucoes.detail.bulletsLabel'),
          cta: t('investimentosV2.solucoes.detail.cta'),
          close: t('investimentosV2.solucoes.detail.close'),
        }}
        onClose={() => setActive(null)}
        onConfirm={() => {
          const s = active
          setActive(null)
          setWa(s)
        }}
      />
      <WhatsAppRedirectModal
        open={wa !== null}
        onClose={() => setWa(null)}
        href={waHref}
        label={wa?.title ?? ''}
        message={waMessage}
      />
    </section>
  )
}
