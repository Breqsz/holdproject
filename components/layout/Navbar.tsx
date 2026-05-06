'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

const NAV_LINKS = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#sobre-nos' },
  { key: 'nav.clients', href: '#para-clientes' },
  { key: 'nav.partners', href: '#para-escritorios' },
  { key: 'nav.faq', href: '#faq' },
  { key: 'nav.contact', href: '#contato' },
]

export default function Navbar() {
  const { t, locale, setLocale } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className={[
          'fixed top-4 left-1/2 -translate-x-1/2 z-50',
          'rounded-full px-6 py-3',
          'flex items-center gap-8',
          'transition-all duration-300',
          scrolled
            ? 'bg-[#0b1f3a]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10'
            : 'bg-[#0b1f3a]/60 backdrop-blur-md border border-white/10',
        ].join(' ')}
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        {/* Logo */}
        <a href="#home" className="flex items-baseline gap-1 shrink-0">
          <span className="text-white font-bold text-lg tracking-wide">HOLD</span>
          <span className="text-[#ae251c] text-sm font-medium">Corretora</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-[#7a9ab8] hover:text-[#e0e8f0] text-sm transition-colors duration-200 whitespace-nowrap"
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        {/* PT/EN toggle */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          <button
            onClick={() => setLocale('pt')}
            className={[
              'text-xs font-semibold px-2 py-1 rounded transition-colors duration-200',
              locale === 'pt'
                ? 'text-[#ae251c]'
                : 'text-[#7a9ab8] hover:text-[#e0e8f0]',
            ].join(' ')}
          >
            PT
          </button>
          <span className="text-[#7a9ab8] text-xs">/</span>
          <button
            onClick={() => setLocale('en')}
            className={[
              'text-xs font-semibold px-2 py-1 rounded transition-colors duration-200',
              locale === 'en'
                ? 'text-[#ae251c]'
                : 'text-[#7a9ab8] hover:text-[#e0e8f0]',
            ].join(' ')}
          >
            EN
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto text-[#e0e8f0] p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#07162a]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-2"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.key}
                href={link.href}
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{
                  delay: i * 0.06,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
                className="text-[#e0e8f0] text-2xl font-semibold py-3 hover:text-[#ae251c] transition-colors duration-200"
              >
                {t(link.key)}
              </motion.a>
            ))}

            {/* PT/EN in overlay */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{
                delay: NAV_LINKS.length * 0.06 + 0.05,
                type: 'spring',
                stiffness: 100,
                damping: 20,
              }}
              className="mt-8"
            >
              <div className="flex items-center rounded-full bg-white/[0.06] ring-1 ring-white/10 p-1">
                <button
                  onClick={() => setLocale('pt')}
                  className={[
                    'text-sm font-bold px-5 py-2 rounded-full transition-all duration-200',
                    locale === 'pt'
                      ? 'bg-[#ae251c] text-white shadow-[0_2px_10px_rgba(174,37,28,0.45)]'
                      : 'text-white/35',
                  ].join(' ')}
                >
                  PT
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={[
                    'text-sm font-bold px-5 py-2 rounded-full transition-all duration-200',
                    locale === 'en'
                      ? 'bg-[#ae251c] text-white shadow-[0_2px_10px_rgba(174,37,28,0.45)]'
                      : 'text-white/35',
                  ].join(' ')}
                >
                  EN
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
