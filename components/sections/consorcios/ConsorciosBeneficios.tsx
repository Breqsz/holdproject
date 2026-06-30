'use client'

import type { LucideIcon } from 'lucide-react'
import { CalendarRange, Percent, ShieldCheck, SlidersHorizontal, Target } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { Reveal } from '@/components/motion/Reveal'

const ICONS: LucideIcon[] = [Percent, CalendarRange, SlidersHorizontal, ShieldCheck, Target]

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
      style={{ background: '#07162a', fontFamily: 'var(--font-outfit)' }}
    >
      {/* Top + bottom hairlines */}
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
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-[#1a4b8a] opacity-[.16] blur-[120px]"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid items-center gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.55fr)_auto_minmax(0,0.78fr)]">
          {/* Benefits */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-9 lg:gap-x-0">
            {items.map(({ title, desc, Icon }, i) => (
              <Reveal key={title} delay={0.06 * i}>
                <div className="flex flex-col gap-3 lg:px-5 lg:border-l lg:border-white/10 lg:first:border-l-0 lg:first:pl-0">
                  <Icon size={26} strokeWidth={1.6} className="text-[#ae251c]" aria-hidden />
                  <div>
                    <h3 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-white leading-tight">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-[1.45] text-[#9fb4c9]">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Divider */}
          <div
            aria-hidden
            className="hidden lg:block h-24 w-px self-center"
            style={{ background: 'linear-gradient(180deg, transparent, var(--hairline-accent) 50%, transparent)' }}
          />

          {/* Slogan */}
          <Reveal delay={0.3}>
            <div className="text-center lg:text-left">
              <p
                className="text-[15px] lg:text-[16px] font-bold uppercase tracking-[0.16em] text-white leading-[1.25]"
                style={{ fontFamily: 'var(--font-gellix)' }}
              >
                {t('consorciosV2.beneficios.slogan.title')}
              </p>
              <p
                className="mt-2 text-[18px] lg:text-[19px] italic text-[#5a97d4]"
                style={{ fontWeight: 500 }}
              >
                {t('consorciosV2.beneficios.slogan.subtitle')}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
