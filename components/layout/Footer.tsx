'use client'

import { MessageCircle, MapPin, Phone } from 'lucide-react'
import { useLocale } from '@/lib/i18n'

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

function IconLinkedin({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

const navLinks = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#sobre-nos' },
  { key: 'nav.clients', href: '#para-clientes' },
  { key: 'nav.partners', href: '#para-escritorios' },
  { key: 'nav.faq', href: '#faq' },
  { key: 'nav.contact', href: '#contato' },
]

export default function Footer() {
  const { t } = useLocale()
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const waHref = waNumber ? `https://wa.me/${waNumber}` : '#'

  return (
    <footer className="bg-[#020c30]" style={{ fontFamily: 'var(--font-outfit)' }}>
      {/* Top hairline — gold tint */}
      <div className="rule-gold h-px max-w-7xl mx-auto" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Main footer hero — HOLD CORRETORA × LOJACORR — centered */}
        <div className="mb-14 flex flex-col items-center text-center gap-4">
          <div className="flex items-end gap-4 sm:gap-6 flex-wrap justify-center">
            <div className="flex items-baseline gap-2.5">
              <span
                className="text-display text-white tracking-tight leading-none"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
              >
                HOLD
              </span>
              <span className="text-[#c9a84c] font-semibold tracking-wider" style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}>
                Corretora
              </span>
            </div>

            <span className="text-[#1e4a7a] font-light select-none" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>×</span>

            <img
              src="/images/LojaCorr.webp"
              alt="Lojacorr"
              loading="lazy"
              decoding="async"
              className="brightness-200 contrast-125 w-auto"
              style={{ height: 'clamp(2.4rem, 4.8vw, 4.2rem)' }}
            />
          </div>

          <p className="text-[#7a9ab8] text-sm leading-relaxed max-w-sm">
            {t('footer.tagline')}
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">

          {/* Navegação */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c] mb-5">
              {t('footer.nav.title')}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-[#7a9ab8] hover:text-white text-sm transition-colors duration-200"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c] mb-5">
              {t('footer.social.title')}
            </h4>
            <div className="flex gap-2.5 mb-7">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#142f54] flex items-center justify-center text-[#7a9ab8] hover:text-white hover:bg-[#1e4a7a] transition-colors"
              >
                <IconInstagram size={16} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-[#142f54] flex items-center justify-center text-[#7a9ab8] hover:text-white hover:bg-[#1e4a7a] transition-colors"
              >
                <IconLinkedin size={16} />
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-[#142f54] flex items-center justify-center text-[#7a9ab8] hover:text-[#25D366] hover:bg-[#1e4a7a] transition-colors"
              >
                <MessageCircle size={16} strokeWidth={1.7} />
              </a>
            </div>
            <p className="text-[#4a6a8a] text-xs leading-relaxed max-w-[18ch]">
              {t('footer.legal')}
            </p>
          </div>

          {/* Contato */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c] mb-5">
              {t('nav.contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#c9a84c] shrink-0 mt-0.5" strokeWidth={1.7} />
                <span className="text-[#7a9ab8] text-sm leading-relaxed">
                  Uberlândia, MG
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle size={14} className="text-[#c9a84c] shrink-0 mt-0.5" strokeWidth={1.7} />
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7a9ab8] hover:text-white text-sm transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-[#c9a84c] shrink-0 mt-0.5" strokeWidth={1.7} />
                <span className="text-[#7a9ab8] text-sm">
                  holdcorretora.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row — hairline rule + meta */}
        <div className="mt-8 pt-6 border-t border-[#142f54]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[#4a6a8a] text-xs">
            © {new Date().getFullYear()} Hold Corretora. {t('footer.rights')}
          </p>
          <p className="text-[#4a6a8a] text-xs tabular tracking-wider">
            Uberlândia, MG · holdcorretora.com
          </p>
        </div>
      </div>
    </footer>
  )
}
