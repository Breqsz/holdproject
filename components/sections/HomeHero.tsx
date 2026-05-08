'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'
import TextType from '@/components/ui/TextType'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px] shrink-0" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function WaCTA({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 })

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ x: sx, y: sy }}
      className="group inline-flex items-center gap-2 rounded-full bg-[#ae251c] pl-4 pr-2 h-10 text-sm font-bold text-white shadow-[0_4px_18px_rgba(174,37,28,0.35)] transition-colors duration-300 hover:bg-[#c42d23]"
    >
      <WaIcon />
      {label}
      <span className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
        <ArrowRight size={13} />
      </span>
    </motion.a>
  )
}

export default function HomeHero() {
  const { t } = useLocale()
  const wa = formatWhatsAppLink(WHATSAPP, t('hero.wa.pf'))
  const [isTypingDone, setIsTypingDone] = useState(false)

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] overflow-hidden bg-white"
    >
      {/* Background image */}
      <Image
        src="/images/hero/home%20image%205.jpg.jpeg"
        alt={t('hero.photo.alt')}
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center md:object-[100%_0%]"
        style={{ zIndex: 0 }}
      />

      {/* Mobile gradient overlay — garante legibilidade do texto */}
      <div
        data-testid="mobile-overlay"
        aria-hidden
        className="md:hidden absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"
        style={{ zIndex: 1 }}
      />

      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ zIndex: 2, backgroundImage: 'radial-gradient(circle,rgba(7,22,42,.06) 1px,transparent 1px)', backgroundSize: '24px 24px' }}
      />

      {/* Content */}
      <div className="relative flex min-h-[100dvh] items-center" style={{ zIndex: 10 }}>
        <div
          className="w-full px-6 sm:px-10 lg:pl-20 xl:pl-24"
          style={{ paddingTop: 'clamp(80px,10vh,120px)', paddingBottom: 'clamp(40px,6vh,80px)' }}
        >
          <div className="max-w-[85%] sm:max-w-[640px]">

            {/* H1 — three lines: line1 biggest, line2 slightly smaller, line3 typed small */}
            <h1 className="tracking-[-0.03em]">
              <motion.span
                className="block font-extrabold text-[#07162a] leading-[1.1]"
                style={{ fontSize: 'clamp(2.4rem,5.2vw,4rem)' }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 }}
              >
                {t('hero.title.line1')}
              </motion.span>

              <motion.span
                className="block font-bold text-[#ae251c] leading-[1.1] mt-1"
                style={{ fontSize: 'clamp(1.8rem,3.9vw,3rem)' }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.42 }}
              >
                {t('hero.title.line2')}
              </motion.span>

              <span
                className="block font-semibold text-[#07162a]/55 leading-[1.3] mt-2"
                style={{ fontSize: 'clamp(1rem,2vw,1.4rem)', letterSpacing: '-0.01em' }}
              >
                <TextType
                  text={t('hero.title.line3')}
                  as="span"
                  typingSpeed={52}
                  variableSpeed={{ min: 28, max: 88 }}
                  initialDelay={900}
                  loop={false}
                  showCursor={!isTypingDone}
                  cursorCharacter="|"
                  cursorClassName="text-[#ae251c] font-light"
                  onTypingComplete={() => setIsTypingDone(true)}
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="mt-6 max-w-[48ch] text-pretty text-[1rem] leading-[1.8] text-[#142f54] transition-opacity duration-1000 ease-in-out"
              style={{ opacity: isTypingDone ? 1 : 0 }}
            >
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div
              className="mt-8 flex flex-wrap items-center gap-3 transition-opacity duration-1000 ease-in-out delay-300"
              style={{ opacity: isTypingDone ? 1 : 0 }}
            >
              <WaCTA href={wa} label={t('hero.cta.specialist')} />
              <Link
                href="#solucoes"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-[#07162a]/15 bg-[#07162a]/[0.04] px-5 text-sm font-semibold text-[#07162a]/55 transition-colors duration-300 hover:border-[#07162a]/30 hover:text-[#07162a]/80"
              >
                {t('hero.cta.solutions')}
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
