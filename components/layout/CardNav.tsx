'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale } from '@/lib/i18n'

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1]

const NAV_LINK_CLS =
  'relative inline-flex items-center gap-1 px-[13px] py-[6px] text-[13.5px] font-medium ' +
  'text-white/50 rounded-lg bg-transparent border-0 cursor-pointer whitespace-nowrap ' +
  'font-[inherit] tracking-[0.1px] transition-colors duration-200 no-underline ' +
  'hover:text-white hover:bg-white/[0.05]'

const LANG_BTN_CLS =
  'text-[11px] font-bold tracking-[0.8px] px-2.5 py-1 rounded-md border-0 ' +
  'cursor-pointer transition-all duration-200 leading-none uppercase bg-transparent'

const DD_ITEMS = [
  { key: 'saude',      href: '/saude/',        icon: 'health' },
  { key: 'seguros',    href: '/seguros/',       icon: 'shield' },
  { key: 'consorcios', href: '/consorcios/',    icon: 'house'  },
  { key: 'financeiro', href: '/investimentos/', icon: 'chart'  },
] as const

// ─── Official logo — logo-02.svg inline ─────────────────────────────────────
// ViewBox cropped to the H-O-L-D wordmark. Navy fills overridden to white;
// compass mark (the "O") keeps the brand red; decorative strokes hidden.
function HoldLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="140 250 1650 510"
      className={className}
      aria-hidden="true"
    >
      {/* H — left vertical */}
      <path fill="rgba(255,255,255,0.93)" d="M146.87,257.68h52.8c2.23,0,4.03,1.51,4.03,3.38v481.5c0,1.87-1.8,3.38-4.03,3.38h-52.81c-2.23,0-4.03-1.51-4.03-3.38v-481.5c.01-1.87,1.81-3.38,4.04-3.38Z"/>
      {/* H — right vertical */}
      <path fill="rgba(255,255,255,0.93)" d="M389.42,257.68h52.74c2.84,0,5.14,1.86,5.14,4.16v479.93c0,2.3-2.3,4.16-5.14,4.16h-52.75c-2.84,0-5.14-1.86-5.14-4.16v-479.93c.01-2.3,2.31-4.16,5.15-4.16Z"/>
      {/* H — crossbar */}
      <path fill="rgba(255,255,255,0.93)" d="M397.27,475.98h-139.03c-1.87,0-3.59,1.22-4.49,3.19l-22.97,50.25c-1.86,4.08.6,9.05,4.49,9.05h193.86c2.83,0,5.12-2.74,5.12-6.12v-50.25c0-3.38-2.29-6.12-5.12-6.12h-34.73"/>
      {/* O — compass mark (brand red) */}
      <path fill="#ae251c" d="M857.84,553.32c-25.64-22.39,2.82-47-.25-54.67-.75-1.88-3.48-4.93-7.12-4.93l-79.32-.02-.6-63.73c19.33,8.39,41.98,3.46,55.72-11.8,15.69-17.42,16.39-42.02,3.88-60.03-13.21-19.02-36.19-25.18-59.3-16.98l.25-83.48c128.49,4.19,231.74,107.48,235.95,235.85l-96.58-.04c-3.83,0-6.95,1.47-8.59,3.39-2.03,2.35-2.68,7.53.15,10.51,12.36,13.02,11.71,31.25.94,43.42-11.85,13.39-31.58,14.33-45.12,2.51Z"/>
      <path fill="#ae251c" d="M755.07,662.57l-.16,83.37c-128.12-4.71-231.48-107.46-235.96-236.07l98.95-.24c3.78,0,6.39-2.92,7.18-4.78,1.04-2.45,1.01-6.29-1.29-8.75-12.61-13.47-11.74-32.93.34-44.82,12.47-12.27,32.75-12.41,45.11-.02,12.07,12.1,13.06,31.34.26,44.78-2.3,2.41-2.15,6.43-1.15,8.79.79,1.87,3.38,4.89,7.13,4.9l79.18.13.75,63.53c-19.38-8.32-42-3.41-55.72,12.03-15.08,16.97-16.16,40.86-4.72,58.38,12.77,19.54,35.92,27.65,60.1,18.78Z"/>
      <path fill="#ae251c" d="M755.21,413.19l-.41,80.39-63.64.72c9.1-19.21,4.58-42.42-10.94-56.48-17.67-16.01-42.58-17.14-61.13-3.86-18.47,13.23-25.58,36.84-16.55,60.05l-83.61-.24c4.13-128.64,107.53-231.91,235.93-236.08l.13,98.91c0,3.75,3.08,6.4,4.95,7.24,2.03.9,6.34,1.11,8.76-1.23,12.73-12.3,31.46-12.03,43.53-1.1,13.08,11.84,14.33,31.97,2.49,45.34-10.94,12.35-31.04,14.92-44.53,2.57-2.61-2.39-5.56-3.26-8.25-3.02-1.98.18-6.71,2.07-6.74,6.8Z"/>
      <path fill="#ae251c" d="M1007.02,509.86c-4.09,128.33-107.57,231.82-235.89,235.93l-.08-99.01c0-4.16-2.37-6.98-4.42-7.78-3.21-1.25-6.79-.96-9.72,1.78-13.18,12.33-34.37,11.66-46.82-1.74-11.33-12.19-11.4-32.19,1.67-44.67,12.1-11.55,32.73-12.61,45.75.35,2.46,2.45,6.28,2.7,8.67,1.73,1.89-.77,4.81-3.53,4.81-7.23l.15-79.38,63.29-.44c-2.68,9.46-4.8,19.72-3.32,31.09,3.14,24.07,23.18,41.24,45.76,42.18,24.4,1.02,45.96-15.73,50.17-40.77,1.87-11.13.01-21.1-3.14-32.33l83.11.29Z"/>
      {/* L */}
      <path fill="rgba(255,255,255,0.93)" d="M1127.25,257.69h-44.55c-3.54,0-6.41,2.87-6.41,6.41l.04,443.52c0,21.08,17.09,38.17,38.17,38.17h205.21c2.6,0,4.71-2.11,4.71-4.71v-61.31c0-2.8-2.27-5.07-5.07-5.07h-156.75c-8.98,0-16.26-7.28-16.26-16.26v-400.75"/>
      {/* D */}
      <path fill="rgba(255,255,255,0.93)" d="M1776.65,511.24l-.13,1.95-.11,1.68-.75,8.51c-2.91,32.76-9.66,65.21-22.64,95.53-17.43,40.7-47.53,73.52-86.62,94.55-45.11,24.28-93.15,31.77-144.29,32.36l-49.03.1c-4.55.01-7.53-4.77-5.52-8.85l20.51-41.68c1.54-3.13,4.72-5.12,8.21-5.13l27.89-.11c21.31-.69,41.55-3.34,62-8.58,43.07-11.29,78.55-34.4,99.6-74.04,10.52-19.82,17.07-40.78,20.37-63.49,4.72-32.44,4.49-64.6-.88-96.47-4.13-24.57-12.75-47.48-26.31-68.19-25.28-38.58-64.63-58.14-110.22-62.74l-63.13-3.02-32.27-.25c-14.81-.11-26.88,11.86-26.88,26.67v298.04c0,3.19-2.59,5.78-5.78,5.78h-49.65c-3.2,0-5.79-2.59-5.79-5.78v-356.72c.01-13.07,10.61-23.66,23.68-23.64l107.61.15,39.52.87c61.09,1.39,119,22.95,161.23,67.47,40.38,42.55,53.26,93.6,58.43,150.39.3,3.39.66,6.39.79,9.36l.06,1.15.08,1.77s1.19,13.16.02,22.36Z"/>
      {/* D — red notch */}
      <path fill="#ae251c" d="M1515.56,693.57l-54.28-1.22-50.63,49.1h74.52l48.6-47.87s-19.44-.57-18.23,0Z"/>
    </svg>
  )
}

// ─── Dropdown product icons ──────────────────────────────────────────────────
function DdIcon({ type }: { type: string }): React.ReactElement | null {
  const s = {
    width: 15, height: 15, viewBox: '0 0 24 24',
    fill: 'none', stroke: '#c9a84c',
    strokeWidth: 1.6, strokeLinecap: 'round' as const,
  }
  if (type === 'health') return <svg {...s}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  if (type === 'shield') return <svg {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  if (type === 'house')  return <svg {...s}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  if (type === 'chart')  return <svg {...s}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  return null
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function CardNav() {
  const { t, locale, setLocale } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [ddOpen,   setDdOpen]   = useState(false)
  const ddRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const closeAll = () => { setMenuOpen(false); setDdOpen(false) }

  return (
    <>
      {/* ── Desktop bar ────────────────────────────────────────────────────── */}
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-50 bg-[#07162a]',
          'transition-[border-color,box-shadow] duration-300',
          scrolled
            ? 'border-b border-[rgba(201,168,76,0.28)] shadow-[0_8px_36px_rgba(0,0,0,0.42)]'
            : 'border-b border-transparent',
        ].join(' ')}
        aria-label="Menu principal"
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        <div className="max-w-[1200px] mx-auto px-9 h-16 flex items-center">

          {/* Logo */}
          <Link
            href="/"
            className="mr-10 flex-shrink-0"
            aria-label={t('navbar.logo.aria')}
            onClick={closeAll}
          >
            <HoldLogo className="h-[30px] w-auto block" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5 flex-1">
            <Link href="/#home" className={NAV_LINK_CLS} onClick={closeAll}>
              {t('navbar.home')}
            </Link>

            {/* Soluções with dropdown */}
            <div className="relative" ref={ddRef}>
              <button
                className={`${NAV_LINK_CLS} flex ${ddOpen ? 'text-white bg-white/[0.05]' : ''}`}
                onClick={() => setDdOpen(v => !v)}
                aria-expanded={ddOpen}
                aria-controls="solucoes-dropdown"
                aria-haspopup="true"
              >
                {t('navbar.solucoes')}
                <svg
                  className={`w-3 h-3 opacity-50 transition-transform duration-200 ${ddOpen ? 'rotate-180 opacity-100' : ''}`}
                  viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M2 4l4 4 4-4"/>
                </svg>
              </button>

              <AnimatePresence>
                {ddOpen && (
                  <motion.div
                    id="solucoes-dropdown"
                    role="menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.21, ease: EASE }}
                    className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[540px] bg-[#0b1f3a] border border-[rgba(201,168,76,0.14)] rounded-2xl p-[18px] shadow-[0_24px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.25)] z-10"
                  >
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/[0.06]">
                      <span className="text-[9.5px] font-bold tracking-[1.8px] uppercase text-white/30">
                        {t('navbar.dd.title')}
                      </span>
                      <span className="text-[10.5px] text-white/20">{t('navbar.dd.partners')}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-[7px]">
                      {DD_ITEMS.map(item => (
                        <Link
                          key={item.key}
                          href={item.href}
                          role="menuitem"
                          onClick={closeAll}
                          className="flex items-start gap-3 p-3 rounded-[10px] border border-transparent hover:bg-white/[0.04] hover:border-[rgba(201,168,76,0.14)] transition-all duration-200 no-underline"
                        >
                          <div className="w-[34px] h-[34px] rounded-[9px] bg-[rgba(201,168,76,0.09)] border border-[rgba(201,168,76,0.14)] flex items-center justify-center flex-shrink-0">
                            <DdIcon type={item.icon} />
                          </div>
                          <div>
                            <div className="text-[13px] font-semibold text-white mb-0.5 leading-snug">
                              {t(`navbar.dd.${item.key}`)}
                            </div>
                            <div className="text-[11px] text-white/40 leading-snug">
                              {t(`navbar.dd.${item.key}.desc`)}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[10.5px] text-white/20">{t('navbar.dd.footer')}</span>
                      <Link
                        href="/#solucoes"
                        onClick={closeAll}
                        className="flex items-center gap-1 text-[11px] font-semibold text-[#c9a84c] opacity-75 hover:opacity-100 transition-opacity no-underline"
                      >
                        {t('navbar.dd.ver_todas')}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <path d="M2 8L8 2M8 2H4M8 2v4"/>
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/#sobre-nos" className={NAV_LINK_CLS} onClick={closeAll}>
              {t('navbar.sobre')}
            </Link>
            <Link href="/#contato" className={NAV_LINK_CLS} onClick={closeAll}>
              {t('navbar.contato')}
            </Link>
          </div>

          {/* Right controls — desktop only */}
          <div className="hidden md:flex items-center gap-2.5 ml-auto flex-shrink-0">
            <div className="flex items-center bg-white/[0.05] border border-white/[0.08] rounded-lg p-[3px] gap-0.5">
              {(['pt', 'en'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`${LANG_BTN_CLS} ${locale === l ? 'bg-white/10 text-white' : 'text-white/30'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <Link
              href="/#contato"
              onClick={closeAll}
              className="group inline-flex items-center gap-2 py-2 pl-5 pr-4 bg-[#ae251c] text-white text-[13px] font-semibold tracking-[0.15px] rounded-[10px] no-underline shadow-[0_3px_14px_rgba(174,37,28,0.35)] hover:opacity-90 hover:shadow-[0_5px_20px_rgba(174,37,28,0.5)] hover:-translate-y-px active:scale-[0.98] transition-all duration-200"
            >
              {t('navbar.cta')}
              <span className="w-[22px] h-[22px] rounded-[6px] bg-black/20 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2 9L9 2M9 2H5M9 2v4"/>
                </svg>
              </span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto p-2 bg-transparent border-0 cursor-pointer"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? t('navbar.menu.close') : t('navbar.menu.open')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <span className={`block w-[22px] h-[2px] bg-white rounded-sm transition-transform duration-300 origin-center ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`block w-[22px] h-[2px] bg-white rounded-sm transition-transform duration-300 origin-center ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#07162a] flex flex-col pt-20 px-6 pb-8"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {(
              [
                { key: 'home',     href: '/#home'      },
                { key: 'solucoes', href: '/#solucoes'  },
                { key: 'sobre',    href: '/#sobre-nos' },
                { key: 'contato',  href: '/#contato'   },
              ] as const
            ).map(({ key, href }, i) => (
              <motion.a
                key={key}
                href={href}
                onClick={closeAll}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 100, damping: 20 }}
                className="flex items-center justify-between py-[13px] text-[21px] font-bold text-white border-b border-white/[0.06] tracking-tight no-underline"
              >
                <span>{t(`navbar.${key}`)}</span>
                <span className="text-[9.5px] font-bold text-white/20 tracking-[1px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 20 }}
              className="mt-6 flex gap-2.5"
            >
              <Link
                href="/#contato"
                onClick={closeAll}
                className="flex-1 bg-[#ae251c] text-white text-[13px] font-semibold text-center py-3 rounded-[10px] no-underline shadow-[0_3px_14px_rgba(174,37,28,0.35)]"
              >
                {t('navbar.cta')}
              </Link>
              <div className="flex items-center bg-white/[0.05] border border-white/[0.09] rounded-[10px] px-3">
                <div className="flex items-center gap-0.5">
                  {(['pt', 'en'] as const).map(l => (
                    <button
                      key={l}
                      onClick={() => setLocale(l)}
                      className={`${LANG_BTN_CLS} text-[10.5px] ${locale === l ? 'bg-white/10 text-white' : 'text-white/30'}`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
