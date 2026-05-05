'use client'

import { MessageCircle } from 'lucide-react'
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand block — wider */}
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-2 mb-5">
              <span
                className="text-display text-white tracking-tight"
                style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)' }}
              >
                HOLD
              </span>
              <span className="text-[#c9a84c] font-medium text-sm tracking-wider">Corretora</span>
            </div>
            <p className="text-[#7a9ab8] text-sm leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c] mb-5">
              Navegação
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

          {/* Social + legal */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c] mb-5">
              Redes Sociais
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
            <p className="text-[#4a6a8a] text-xs leading-relaxed max-w-xs">
              {t('footer.legal')}
            </p>
          </div>
        </div>

        {/* Lojacorr membership block */}
        <div className="mt-16 pt-8 border-t border-[#142f54]/40">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9a84c]">
              Filiada
            </span>
            <div className="flex items-center gap-3">
              {/* Lojacorr lockup — placeholder until official SVG/PNG is provided */}
              <div className="inline-flex items-center gap-2 rounded-md bg-white/[0.04] ring-1 ring-white/10 px-3 py-2">
                <span className="text-white font-bold tracking-tight text-base">lojacorr</span>
                <span className="text-[#c9a84c] text-xs">·</span>
                <span className="text-[#7a9ab8] text-[10px] uppercase tracking-wider">network</span>
              </div>
              <span className="text-[#7a9ab8] text-xs leading-relaxed max-w-sm">
                {t('footer.lojacorr')}
              </span>
            </div>
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
