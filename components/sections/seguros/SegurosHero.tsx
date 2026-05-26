'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { formatWhatsAppLink } from '@/lib/utils'
import { Reveal } from '@/components/motion/Reveal'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import RotatingText from '@/components/motion/RotatingText'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const ROTATING = ['vida', 'casa', 'auto', 'empresa', 'patrimônio']

const PHOTO_SRC = '/images/hero/seguros.webp'
const PHOTO_ALT = 'Família protegida por seguro patrimonial e residencial'

const DIAGONAL_ANGLE = 115
const DIAGONAL_CUT = 42
const DIAGONAL_SLICE_BG = `linear-gradient(${DIAGONAL_ANGLE}deg, #0b1f3a 0%, #0e2546 30%, #0b1f3a ${DIAGONAL_CUT - 0.1}%, transparent ${DIAGONAL_CUT + 0.1}%)`
const DIAGONAL_LINE_BG = `linear-gradient(${DIAGONAL_ANGLE}deg, transparent ${DIAGONAL_CUT - 0.14}%, #ae251c ${DIAGONAL_CUT - 0.09}%, #ae251c ${DIAGONAL_CUT + 0.09}%, transparent ${DIAGONAL_CUT + 0.14}%)`
const DIAGONAL_DARKEN = 'linear-gradient(180deg, rgba(7,22,42,0.10) 0%, rgba(7,22,42,0.50) 100%)'

export default function SegurosHero() {
  const wa = formatWhatsAppLink(
    WHATSAPP,
    'Olá! Quero entender as opções de Seguros para mim e minha família.',
  )

  return (
    <section
      className="relative overflow-hidden"
      style={{ fontFamily: 'var(--font-outfit)', background: '#0b1f3a' }}
    >
      {/* ============ MOBILE photo pane (top) ============ */}
      <div className="lg:hidden relative h-[340px] sm:h-[420px] overflow-hidden bg-[#07162a]">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={PHOTO_SRC}
            alt={PHOTO_ALT}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: 'center 35%' }}
          />
        </motion.div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(11,31,58,0.45) 0%, rgba(14,37,70,0.12) 40%, rgba(7,22,42,0.40) 100%)',
            mixBlendMode: 'multiply',
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-2 border border-white/[0.08]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4"
          style={{ background: 'linear-gradient(to top, rgba(7,22,42,0.65), transparent)' }}
        />
      </div>

      {/* ============ DESKTOP photo background ============ */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden bg-[#07162a]">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 right-0"
          style={{ left: '30%' }}
        >
          <Image
            src={PHOTO_SRC}
            alt={PHOTO_ALT}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
        </motion.div>
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: DIAGONAL_DARKEN }} />
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: DIAGONAL_SLICE_BG }} />
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: DIAGONAL_LINE_BG }} />
        <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-12 h-72 w-72 rounded-full bg-[#1a4b8a] opacity-[.20] blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-10 h-56 w-56 rounded-full bg-[#ae251c] opacity-[.14] blur-[90px]"
        />
        <div
          className="absolute top-6 right-8 z-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-white"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
        >
          <span aria-hidden className="block h-px w-6 bg-white/60" />
          <span className="font-extrabold text-[#ae251c]" style={{ letterSpacing: 0 }}>
            01
          </span>
          Seguros · Hold Corretora
        </div>
      </div>

      {/* ============ Text content ============ */}
      <div className="relative lg:min-h-[940px]">
        <div
          aria-hidden
          className="lg:hidden absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0b1f3a 0%, #0e2546 60%, #07162a 100%)' }}
        />
        <div aria-hidden className="lg:hidden dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div
          aria-hidden
          className="lg:hidden pointer-events-none absolute -left-16 top-6 h-56 w-56 rounded-full bg-[#1a4b8a] opacity-[.20] blur-[100px]"
        />
        <div
          aria-hidden
          className="lg:hidden pointer-events-none absolute -bottom-10 left-10 h-40 w-40 rounded-full bg-[#ae251c] opacity-[.14] blur-[80px]"
        />

        <div className="relative z-10 px-6 sm:px-10 lg:pl-16 xl:pl-24 lg:pr-8 pt-12 pb-16 lg:flex lg:items-center lg:py-24 lg:min-h-[940px]">
          <div className="lg:max-w-[560px]">
            <Reveal delay={0.08}>
              <h1
                className="text-display text-white text-pretty"
                style={{ fontSize: 'clamp(1.85rem, 4vw, 3.25rem)' }}
              >
                Proteção que acompanha cada etapa da sua
                <RotatingText
                  texts={ROTATING}
                  mainClassName="mt-3 w-fit px-3 sm:px-4 md:px-5 bg-[#ae251c] text-white overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-lg"
                  staggerFrom="last"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  rotationInterval={3200}
                />
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p
                className="mt-6 max-w-[44ch] text-pretty text-lg leading-relaxed text-[#cbd5e1]"
                style={{ textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}
              >
                Vida, auto, residencial, empresarial e patrimonial, com comparativo entre seguradoras
                e suporte humano em todas as etapas, inclusive sinistros.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] px-6 py-3 text-sm font-semibold text-white transition-colors"
                >
                  <WhatsAppIcon size={16} />
                  Falar no WhatsApp
                </a>
                <a
                  href="#seguros-form"
                  className="group inline-flex items-center gap-2 rounded-full bg-white/[0.08] ring-1 ring-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.12]"
                >
                  Pedir cotação
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
