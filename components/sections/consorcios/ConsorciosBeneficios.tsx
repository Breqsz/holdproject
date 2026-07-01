'use client'

import type { LucideIcon } from 'lucide-react'
import { BadgeCheck, CalendarRange, ShieldCheck, Target, Users } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { Reveal } from '@/components/motion/Reveal'

// Ícones fiéis à referência: grupo de pessoas (não %), calendário, selo-check, escudo-check, alvo
const ICONS: LucideIcon[] = [Users, CalendarRange, BadgeCheck, ShieldCheck, Target]

// Paleta amostrada da referência — escopo: apenas esta barra
const GOLD = '#d2a866'
const NAVY = '#0a2039'

export default function ConsorciosBeneficios() {
  const { t } = useLocale()
  const titles = t('consorciosV2.beneficios.titles').split('|')
  const descs = t('consorciosV2.beneficios.descs').split('|')

  const items = titles.map((title, i) => ({
    title,
    desc: descs[i] ?? '',
    Icon: ICONS[i] ?? Target,
  }))

  return (
    <section
      aria-label={t('consorciosV2.beneficios.aria')}
      className="relative overflow-hidden"
      style={{ background: NAVY, fontFamily: 'var(--font-outfit)' }}
    >
      {/* Hairlines topo/base */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--hairline-accent) 50%, transparent)' }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--hairline-accent) 50%, transparent)' }}
      />
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.03]" />

      {/* Floreio dourado — arco no topo-centro */}
      <svg
        aria-hidden
        viewBox="0 0 560 36"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-1/2 top-0 h-7 w-[clamp(280px,46vw,560px)] -translate-x-1/2"
      >
        <defs>
          <linearGradient id="benArc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={GOLD} stopOpacity="0" />
            <stop offset="0.5" stopColor={GOLD} stopOpacity="0.95" />
            <stop offset="1" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 6 Q280 36 560 6" stroke="url(#benArc)" strokeWidth="2.5" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid items-center gap-10 lg:gap-12 lg:grid-cols-[minmax(0,2.1fr)_auto_minmax(0,0.62fr)] 2xl:grid-cols-[minmax(0,1.5fr)_auto_minmax(0,0.85fr)]">
          {/* Benefícios */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-0 lg:gap-x-0">
            {items.map(({ title, desc, Icon }, i) => (
              <Reveal key={title} delay={0.06 * i}>
                <div className="flex flex-row items-center gap-4 text-left border-b border-white/8 py-5 first:pt-0 last:border-b-0 last:pb-0 lg:flex-col lg:items-center lg:text-center lg:gap-3 lg:py-0 lg:border-b-0 lg:px-2 2xl:px-4 lg:border-l lg:border-[#d2a866]/15 lg:first:border-l-0">
                  <Icon size={30} strokeWidth={1.5} style={{ color: GOLD }} aria-hidden className="shrink-0" />
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.05em] 2xl:text-[13px] 2xl:tracking-[0.1em] text-white leading-tight">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-[1.45] text-[#aebfd2]">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Divisor */}
          <div
            aria-hidden
            className="hidden lg:block h-24 w-px self-center"
            style={{ background: `linear-gradient(180deg, transparent, ${GOLD}40 50%, transparent)` }}
          />

          {/* Frase de impacto */}
          <Reveal delay={0.3}>
            <div className="text-center">
              <p
                className="text-[15px] lg:text-[13px] 2xl:text-[17px] font-bold uppercase tracking-[0.14em] leading-[1.22]"
                style={{ fontFamily: 'var(--font-gellix)', color: GOLD }}
              >
                {t('consorciosV2.beneficios.slogan.title')}
              </p>
              <p
                className="mt-1.5 text-[27px] lg:text-[22px] 2xl:text-[31px] leading-[1.05] text-[#fcfcfc]"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                {t('consorciosV2.beneficios.slogan.subtitle')}
              </p>
              {/* Floreio dourado — risco sob a frase */}
              <svg
                aria-hidden
                viewBox="0 0 280 12"
                fill="none"
                className="mx-auto mt-1 h-3 w-[200px] lg:w-[230px]"
              >
                <path d="M2 8 Q140 0 278 9" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
