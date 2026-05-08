'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale } from '@/lib/i18n'
import { HoldLogo } from '@/components/icons/HoldLogo'

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
        <div className="grid grid-cols-[4fr_auto_1fr] items-center px-6 sm:px-10 lg:px-20 xl:px-24 h-16">

          {/* Logo — alinha com o U do hero */}
          <Link
            href="/"
            className="flex-shrink-0 justify-self-start"
            aria-label={t('navbar.logo.aria')}
            onClick={closeAll}
          >
            <HoldLogo
              subtitle="corretora"
              variant="dark"
              className="w-auto block"
              style={{ height: 'clamp(2.25rem, 2.8vw, 2.75rem)' }}
            />
          </Link>

          {/* Desktop nav links — centro real da viewport */}
          <div className="hidden md:flex items-center gap-6 justify-self-center">
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
          <div className="hidden md:flex items-center justify-self-end flex-shrink-0">
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
              className="mt-6"
            >
              <div className="flex items-center bg-white/[0.05] border border-white/[0.09] rounded-[10px] px-3 w-fit">
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
