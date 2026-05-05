'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

type Locale = 'pt' | 'en'

type CardNavLink = {
  label: string
  href: string
  ariaLabel: string
}

type CardNavItem = {
  label: string
  bgColor: string
  textColor: string
  links: CardNavLink[]
}

function LocaleToggle({ locale, setLocale, dark }: { locale: Locale; setLocale: (l: Locale) => void; dark?: boolean }) {
  const outer = dark
    ? 'bg-white/10 border border-white/15'
    : 'bg-[#07162a]/[0.06] border border-[#07162a]/10'
  const activeBtn = dark
    ? 'bg-white text-[#07162a] shadow-sm'
    : 'bg-[#07162a] text-white shadow-sm'
  const inactiveBtn = dark
    ? 'text-white/45 hover:text-white/80'
    : 'text-[#07162a]/40 hover:text-[#07162a]/70'

  return (
    <div
      className={`flex items-center rounded-lg p-[3px] gap-[2px] ${outer}`}
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      {(['pt', 'en'] as Locale[]).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`text-[11px] font-semibold tracking-wide px-2.5 py-[5px] rounded-md transition-all duration-200 leading-none uppercase ${
            locale === l ? activeBtn : inactiveBtn
          }`}
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
  const [isExpanded, setIsExpanded] = useState(false)

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
        { label: t('cardnav.link.faq'),    href: '/#faq',     ariaLabel: t('cardnav.aria.faq') },
        { label: t('cardnav.link.contato'), href: '/#contato', ariaLabel: t('cardnav.aria.contato') },
      ],
    },
  ]
  const navRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const calculateHeight = () => {
    const navEl = navRef.current
    if (!navEl) return 260

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement
      if (!contentEl) return 260

      const prev = {
        visibility: contentEl.style.visibility,
        pointerEvents: contentEl.style.pointerEvents,
        position: contentEl.style.position,
        height: contentEl.style.height,
      }

      contentEl.style.visibility = 'visible'
      contentEl.style.pointerEvents = 'auto'
      contentEl.style.position = 'static'
      contentEl.style.height = 'auto'
      contentEl.offsetHeight // force reflow

      const total = 60 + contentEl.scrollHeight + 16

      contentEl.style.visibility = prev.visibility
      contentEl.style.pointerEvents = prev.pointerEvents
      contentEl.style.position = prev.position
      contentEl.style.height = prev.height

      return total
    }

    return 260
  }

  const createTimeline = () => {
    const navEl = navRef.current
    if (!navEl) return null

    gsap.set(navEl, { height: 60, overflow: 'hidden' })
    gsap.set(cardsRef.current, { y: 50, opacity: 0 })

    const tl = gsap.timeline({ paused: true })
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease: 'power3.out' })
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08 },
      '-=0.1',
    )
    return tl
  }

  useLayoutEffect(() => {
    const tl = createTimeline()
    tlRef.current = tl
    return () => {
      tl?.kill()
      tlRef.current = null
    }
  }, [])

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return
      if (isExpanded) {
        gsap.set(navRef.current, { height: calculateHeight() })
        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) {
          newTl.progress(1)
          tlRef.current = newTl
        }
      } else {
        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) tlRef.current = newTl
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isExpanded])

  const toggle = () => {
    const tl = tlRef.current
    if (!tl) return
    if (!isExpanded) {
      setIsOpen(true)
      setIsExpanded(true)
      tl.play(0)
    } else {
      setIsOpen(false)
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false))
      tl.reverse()
    }
  }

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el
  }

  return (
    <div className="fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-50 top-[1.2em] md:top-[2em]">
      <nav
        ref={navRef}
        className="h-[60px] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.18)] relative overflow-hidden will-change-[height]"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Top bar */}
        <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-[1.1rem] pr-2 z-[2]">

          {/* Hamburger — right on mobile, left on desktop */}
          <button
            type="button"
            className="group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none bg-transparent border-0 p-2"
            onClick={toggle}
            aria-label={isExpanded ? t('cardnav.menu.close') : t('cardnav.menu.open')}
            aria-expanded={isExpanded}
          >
            <span
              className={`block w-[26px] h-[2px] bg-[#07162a] transition-transform duration-300 ease-in-out origin-center group-hover:opacity-60 ${
                isOpen ? 'translate-y-[4px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-[26px] h-[2px] bg-[#07162a] transition-transform duration-300 ease-in-out origin-center group-hover:opacity-60 ${
                isOpen ? '-translate-y-[4px] -rotate-45' : ''
              }`}
            />
          </button>

          {/* Logo — centered on desktop */}
          <Link
            href="/"
            className="flex items-baseline gap-1 order-1 md:order-none md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            <span className="text-[#07162a] font-bold text-lg tracking-wide">HOLD</span>
            <span className="text-[#ae251c] text-sm font-medium">Corretora</span>
          </Link>

          {/* PT/EN toggle + CTA — desktop only */}
          <div className="hidden md:flex self-stretch items-center gap-2">
            <LocaleToggle locale={locale} setLocale={setLocale} />
            <Link
              href="/#contato"
              className="inline-flex items-center h-[calc(100%-0.8rem)] rounded-[calc(0.75rem-0.2rem)] px-5 text-sm font-semibold text-white no-underline transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: '#ae251c', fontFamily: 'var(--font-outfit)' }}
            >
              {t('cardnav.cta')}
            </Link>
          </div>
        </div>

        {/* Cards panel */}
        <div
          className={`card-nav-content absolute inset-x-0 top-[60px] bottom-0 p-2 flex gap-2 z-[1] flex-col items-stretch justify-start md:flex-row md:items-end md:gap-3 ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
          aria-hidden={!isExpanded}
        >
          {ITEMS.map((item, idx) => (
            <div
              key={item.label}
              ref={setCardRef(idx)}
              className="select-none flex flex-col gap-2 p-3 px-4 rounded-[calc(0.75rem-0.2rem)] flex-1 min-h-[60px] md:h-full"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <p
                className="font-normal tracking-[-0.5px] text-[18px] md:text-[22px] m-0"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {item.label}
              </p>
              <div className="mt-auto flex flex-col gap-[2px]">
                {item.links.map((lnk) => (
                  <Link
                    key={lnk.label}
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
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

          {/* PT/EN toggle — mobile only, shown at the bottom of the open panel */}
          <div className="md:hidden flex items-center px-2 pb-1 pt-0.5">
            <LocaleToggle locale={locale} setLocale={setLocale} dark />
          </div>
        </div>
      </nav>
    </div>
  )
}
