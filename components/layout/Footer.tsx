'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, MapPin, Globe } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { HoldLogo } from '@/components/icons/HoldLogo'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

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

function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

// Mirrors the CardNav structure of the new multi-page site
const solutionsLinks = [
  { key: 'cardnav.link.saude',         href: '/saude/' },
  { key: 'cardnav.link.seguros',       href: '/seguros/' },
  { key: 'cardnav.link.consorcios',    href: '/consorcios/' },
  { key: 'cardnav.link.investimentos', href: '/investimentos/' },
]

const holdLinks = [
  { key: 'cardnav.link.sobre',   href: '/#sobre-nos' },
  { key: 'cardnav.link.faq',     href: '/#faq' },
  { key: 'cardnav.link.contato', href: '/#contato' },
]

export default function Footer() {
  const { t } = useLocale()
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const waHref = waNumber ? `https://wa.me/${waNumber}` : '#'

  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })

  const linkCls =
    'text-[#7a9ab8] hover:text-white text-[0.9rem] transition-colors duration-200'
  const headingCls =
    'text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ae251c] mb-5'

  return (
    <footer className="bg-[#020c30]" style={{ fontFamily: 'var(--font-outfit)' }}>
      {/* Top hairline: editorial navy tint */}
      <div className="rule-accent h-px max-w-7xl mx-auto" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">

        {/* Main footer hero: HOLD CORRETORA + LOJACORR seal */}
        <div ref={heroRef} className="mb-14 flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-14 sm:gap-20 flex-wrap justify-center">
            <motion.span
              className="inline-block"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={heroInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
              transition={{ duration: 0.95, delay: 0.1, ease: EASE }}
            >
              <HoldLogo
                subtitle="corretora"
                variant="dark"
                className="w-auto"
                style={{ height: 'clamp(4rem, 8vw, 6.5rem)' }}
              />
            </motion.span>

            <motion.div
              className="flex flex-col items-center gap-1.5"
              style={{ transform: 'translateY(-0.4rem)' }}
              initial={{ clipPath: 'inset(0 0 0 100%)' }}
              animate={heroInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
              transition={{ duration: 0.95, delay: 0.4, ease: EASE }}
            >
              <img
                src="/images/footer/Selo%20Vermelho%20-%20Corretora%20Parceira%20-%20Lojacorr%20Seguros.png"
                alt="Lojacorr"
                loading="lazy"
                decoding="async"
                className="w-auto"
                style={{ height: 'clamp(3.6rem, 6.5vw, 5.6rem)' }}
              />
            </motion.div>
          </div>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">

          {/* Soluções */}
          <div className="flex flex-col items-start sm:items-start text-left sm:text-left">
            <h4 className={headingCls}>{t('cardnav.solutions')}</h4>
            <ul className="space-y-2.5">
              {solutionsLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className={linkCls}>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* A Hold */}
          <div className="flex flex-col items-start sm:items-start text-left sm:text-left">
            <h4 className={headingCls}>{t('cardnav.hold')}</h4>
            <ul className="space-y-2.5">
              {holdLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className={linkCls}>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="flex flex-col items-start sm:items-start text-left sm:text-left">
            <h4 className={headingCls}>{t('nav.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#e0e8f0]/70 shrink-0 mt-0.5" strokeWidth={1.7} />
                <span className="text-[#7a9ab8] text-[0.9rem] leading-relaxed">
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle size={14} className="text-[#e0e8f0]/70 shrink-0 mt-0.5" strokeWidth={1.7} />
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  {t('wa.label.alt')}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Globe size={14} className="text-[#e0e8f0]/70 shrink-0 mt-0.5" strokeWidth={1.7} />
                <span className="text-[#7a9ab8] text-sm">
                  holdcorretora.com
                </span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="flex flex-col items-start sm:items-start text-left sm:text-left">
            <h4 className={headingCls}>{t('footer.social.title')}</h4>
            <div className="flex gap-2.5">
              <a
                href="https://www.instagram.com/hold.corretora"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#142f54] flex items-center justify-center text-[#7a9ab8] hover:text-white hover:bg-[#1e4a7a] transition-colors"
              >
                <IconInstagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/holdcorretora"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#142f54] flex items-center justify-center text-[#7a9ab8] hover:text-white hover:bg-[#1e4a7a] transition-colors"
              >
                <IconFacebook size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/holdcorretora"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-[#142f54] flex items-center justify-center text-[#7a9ab8] hover:text-white hover:bg-[#1e4a7a] transition-colors"
              >
                <IconLinkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: hairline rule + meta */}
        <div className="mt-12 pt-6 pb-24 sm:pb-0 border-t border-[#142f54]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
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
