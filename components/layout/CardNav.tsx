'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

type Locale = 'pt' | 'en'

type CardNavLink = { label: string; href: string; ariaLabel: string }
type CardNavItem = { label: string; bgColor: string; textColor: string; links: CardNavLink[] }

function LocaleToggle({ locale, setLocale, dark }: { locale: Locale; setLocale: (l: Locale) => void; dark?: boolean }) {
  const outer    = dark ? 'bg-white/10 border border-white/15'           : 'bg-[#07162a]/[0.06] border border-[#07162a]/10'
  const active   = dark ? 'bg-white text-[#07162a] shadow-sm'            : 'bg-[#07162a] text-white shadow-sm'
  const inactive = dark ? 'text-white/45 hover:text-white/80'            : 'text-[#07162a]/40 hover:text-[#07162a]/70'

  return (
    <div className={`flex items-center rounded-lg p-[3px] gap-[2px] ${outer}`} style={{ fontFamily: 'var(--font-outfit)' }}>
      {(['pt', 'en'] as Locale[]).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`text-[11px] font-semibold tracking-wide px-2.5 py-[5px] rounded-md transition-all duration-200 leading-none uppercase ${locale === l ? active : inactive}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

export default function CardNav() {
  const { t, locale, setLocale } = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  const ITEMS: CardNavItem[] = [
    {
      label: t('cardnav.solutions'),
      bgColor: '#142f54',
      textColor: '#ffffff',
      links: [
        { label: t('cardnav.link.consorcios'),    href: '/consorcios/',    ariaLabel: t('cardnav.aria.consorcios') },
        { label: t('cardnav.link.seguros'),       href: '/seguros/',       ariaLabel: t('cardnav.aria.seguros') },
        { label: t('cardnav.link.saude'),         href: '/saude/',         ariaLabel: t('cardnav.aria.saude') },
        { label: t('cardnav.link.investimentos'), href: '/investimentos/', ariaLabel: t('cardnav.aria.investimentos') },
      ],
    },
    {
      label: t('cardnav.hold'),
      bgColor: '#0b1f3a',
      textColor: '#ffffff',
      links: [
        { label: t('cardnav.link.sobre'),       href: '/#sobre-nos',        ariaLabel: t('cardnav.aria.sobre') },
        { label: t('cardnav.link.equipe'),      href: '/equipe/',            ariaLabel: t('cardnav.aria.equipe') },
        { label: t('cardnav.link.escritorios'), href: '/#para-escritorios', ariaLabel: t('cardnav.aria.escritorios') },
      ],
    },
    {
      label: t('cardnav.support'),
      bgColor: '#c9a84c',
      textColor: '#ffffff',
      links: [
        { label: t('cardnav.link.faq'),     href: '/#faq',     ariaLabel: t('cardnav.aria.faq') },
        { label: t('cardnav.link.contato'), href: '/#contato', ariaLabel: t('cardnav.aria.contato') },
      ],
    },
  ]

  return (
    <div className="fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-50 top-[1.2em] md:top-[2em]">
      <nav
        className="rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
        aria-expanded={isOpen}
      >
        {/* ── Top bar (always visible, 60px) ── */}
        <div className="h-[60px] flex items-center justify-between px-[1.1rem] pr-2 relative z-[2]">

          {/* Hamburger */}
          <button
            type="button"
            className="group flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none bg-transparent border-0 p-2 h-full"
            onClick={() => setIsOpen(v => !v)}
            aria-label={isOpen ? t('cardnav.menu.close') : t('cardnav.menu.open')}
          >
            <span className={`block w-[26px] h-[2px] bg-[#07162a] transition-transform duration-300 ease-in-out origin-center group-hover:opacity-60 ${isOpen ? 'translate-y-[4px] rotate-45' : ''}`} />
            <span className={`block w-[26px] h-[2px] bg-[#07162a] transition-transform duration-300 ease-in-out origin-center group-hover:opacity-60 ${isOpen ? '-translate-y-[4px] -rotate-45' : ''}`} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-baseline gap-1 order-1 md:order-none md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            <span className="text-[#07162a] font-bold text-lg tracking-wide">HOLD</span>
            <span className="text-[#ae251c] text-sm font-medium">Corretora</span>
          </Link>

          {/* PT/EN + CTA — desktop only */}
          <div className="hidden md:flex self-stretch items-center gap-2">
            <LocaleToggle locale={locale} setLocale={setLocale} />
            <Link
              href="/#contato"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center h-[calc(100%-0.8rem)] rounded-[calc(0.75rem-0.2rem)] px-5 text-sm font-semibold text-white no-underline transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: '#ae251c', fontFamily: 'var(--font-outfit)' }}
            >
              {t('cardnav.cta')}
            </Link>
          </div>
        </div>

        {/* ── Collapsible panel via CSS grid-template-rows ── */}
        {/* Outer div animates the row height; inner div clips overflow */}
        <div
          className="cardnav-panel"
          style={{
            display: 'grid',
            gridTemplateRows: isOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 320ms cubic-bezier(0.4,0,0.2,1)',
          }}
          aria-hidden={!isOpen}
        >
          <div className="overflow-hidden min-h-0">
            <div className="p-2 flex gap-2 flex-col items-stretch justify-start md:flex-row md:items-end md:gap-3">
              {ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="select-none flex flex-col gap-2 p-3 px-4 rounded-[calc(0.75rem-0.2rem)] flex-1 min-h-[60px] md:h-full"
                  style={{ backgroundColor: item.bgColor, color: item.textColor }}
                >
                  <p className="font-normal tracking-[-0.5px] text-[18px] md:text-[22px] m-0" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {item.label}
                  </p>
                  <div className="mt-auto flex flex-col gap-[2px]">
                    {item.links.map((lnk) => (
                      <Link
                        key={lnk.label}
                        href={lnk.href}
                        aria-label={lnk.ariaLabel}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-[6px] no-underline transition-opacity duration-200 hover:opacity-70 text-[14px] md:text-[15px]"
                        style={{ color: item.textColor, fontFamily: 'var(--font-outfit)' }}
                      >
                        <ArrowUpRight size={14} className="shrink-0" aria-hidden="true" />
                        {lnk.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* PT/EN — mobile only */}
              <div className="md:hidden flex items-center px-2 pb-1 pt-0.5">
                <LocaleToggle locale={locale} setLocale={setLocale} dark />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
