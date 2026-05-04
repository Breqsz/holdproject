'use client'

import { MessageCircle } from 'lucide-react'

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

function IconLinkedin({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
import { useLocale } from '@/lib/i18n'

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
    <footer className="bg-[#020c30] border-t border-[#142f54]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Col 1: Logo + tagline */}
          <div>
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-white font-bold text-2xl tracking-tight">HOLD</span>
              <span className="text-[#ae251c]/80 font-medium">Corretora</span>
            </div>
            <p className="text-[#7a9ab8] text-sm leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Col 2: Nav links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2">
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

          {/* Col 3: Social + legal */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Redes Sociais
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#142f54] flex items-center justify-center text-[#7a9ab8] hover:text-white hover:bg-[#1e4a7a] transition-colors"
              >
                <IconInstagram size={16} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#142f54] flex items-center justify-center text-[#7a9ab8] hover:text-white hover:bg-[#1e4a7a] transition-colors"
              >
                <IconLinkedin size={16} />
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-[#142f54] flex items-center justify-center text-[#7a9ab8] hover:text-[#25D366] hover:bg-[#1e4a7a] transition-colors"
              >
                <MessageCircle size={16} />
              </a>
            </div>
            <p className="text-[#4a6a8a] text-xs leading-relaxed">
              {t('footer.legal')}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#142f54]/60 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#4a6a8a] text-xs">
            © {new Date().getFullYear()} Hold Corretora. {t('footer.rights')}
          </p>
          <p className="text-[#4a6a8a] text-xs">
            Uberlândia, MG — holdcorretora.com
          </p>
        </div>
      </div>
    </footer>
  )
}
