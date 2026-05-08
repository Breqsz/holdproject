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

const TITLE_TEXT = 'Uma estratégia para proteger, planejar e expandir patrimônios.'

function MagneticCTA({ href, label }: { href: string; label: string }) {
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
      className="group inline-flex items-center rounded-full bg-[#ae251c] pl-5 pr-1.5 h-10 text-sm font-bold text-white shadow-[0_4px_18px_rgba(174,37,28,0.35)] transition-colors duration-300 hover:bg-[#c42d23]"
    >
      {label}
      <span className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
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
      className="relative min-h-[100dvh] overflow-hidden bg-[#040d1a]"
    >
      {/* Background image */}
      <Image
        src="/images/hero/HOME_IMAGE_2.jpg"
        alt={t('hero.photo.alt')}
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover"
        style={{ zIndex: 0, objectPosition: '100% 0%' }}
      />

      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ zIndex: 2, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,.055) 1px,transparent 1px)', backgroundSize: '24px 24px' }}
      />

      {/* Content */}
      <div className="relative flex min-h-[100dvh] items-center" style={{ zIndex: 10 }}>
        <div
          className="w-full px-6 sm:px-10 lg:pl-20 xl:pl-24"
          style={{ paddingTop: 'clamp(80px,10vh,120px)', paddingBottom: 'clamp(40px,6vh,80px)' }}
        >
          <div className="max-w-[600px]">

            {/* H1 — typing effect */}
            <h1
              className="font-extrabold leading-[1.1] tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(2.2rem,4.8vw,3.6rem)' }}
            >
              <TextType
                text={TITLE_TEXT}
                as="span"
                typingSpeed={55}
                variableSpeed={{ min: 30, max: 90 }}
                initialDelay={400}
                loop={false}
                showCursor={!isTypingDone}
                cursorCharacter="|"
                cursorClassName="text-[#ae251c] font-light"
                onTypingComplete={() => setIsTypingDone(true)}
              />
            </h1>

            {/* Subtitle — fades in when title finishes typing */}
            <p
              className="mt-6 max-w-[44ch] text-pretty text-[0.9rem] leading-[1.8] text-white/65 transition-opacity duration-1000 ease-in-out"
              style={{ opacity: isTypingDone ? 1 : 0 }}
            >
              {t('hero.subtitle')}
            </p>

            {/* CTAs — slight delay after subtitle */}
            <div
              className="mt-8 flex flex-wrap items-center gap-3 transition-opacity duration-1000 ease-in-out delay-300"
              style={{ opacity: isTypingDone ? 1 : 0 }}
            >
              <MagneticCTA href={wa} label={t('hero.cta.specialist')} />
              <Link
                href="#solucoes"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 text-sm font-semibold text-white/60 transition-colors duration-300 hover:border-white/[0.22] hover:text-white/85"
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
