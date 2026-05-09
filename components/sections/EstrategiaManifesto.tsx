'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Target, Eye, Gem } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Principle = {
  Icon: typeof Target
  title: string
  body: string
  badge: string
}

const PRINCIPLES: Principle[] = [
  {
    Icon: Target,
    title: 'Missão',
    body:
      'Ajudar pessoas e empresas a tomar melhores decisões, conectando saúde, seguros, consórcios e finanças de forma simples e estratégica.',
    badge: '#e8463a',
  },
  {
    Icon: Eye,
    title: 'Visão',
    body:
      'Ser referência para pessoas e empresas que buscam segurança para decidir e consistência para crescer.',
    badge: '#5a86c0',
  },
  {
    Icon: Gem,
    title: 'Valores',
    body:
      'Agimos com integridade, falamos com transparência, cuidamos com responsabilidade, respeitamos cada história, pensamos no longo prazo e nunca negociamos a confiança.',
    badge: '#c9a84c',
  },
]

export default function EstrategiaManifesto() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })

  return (
    <section
      ref={ref}
      id="estrategia"
      className="relative section-pad overflow-hidden"
      style={{
        background: 'var(--surface-base)',
        fontFamily: 'var(--font-outfit)',
      }}
    >
      {/* Top edge gold hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'var(--hairline-gold)' }}
      />

      {/* Backdrop dot-grid */}
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 opacity-[0.35]"
      />

      {/* Backdrop radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.06), transparent 60%)',
          mixBlendMode: 'soft-light',
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-6 lg:px-10">
        {/* ── Movement 1 — Manifesto editorial ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left column — text */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-center gap-3 mb-7 lg:mb-8"
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
              <span
                className="text-[11px] font-semibold uppercase"
                style={{
                  letterSpacing: '0.32em',
                  color: 'rgba(201,168,76,0.78)',
                }}
              >
                Estratégia
              </span>
            </motion.div>

            {/* Headline serif tri-color */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
              className="leading-[1.12] tracking-[-0.015em]"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 500,
              }}
            >
              <span className="block" style={{ color: 'rgba(201,168,76,0.55)' }}>
                Mais do que produtos.
              </span>
              <span className="block text-white">Uma estratégia completa</span>
              <span className="block italic" style={{ color: '#c9a84c' }}>
                para o seu patrimônio.
              </span>
            </motion.h2>

            {/* Gold short rule */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="mt-7 mb-7 h-px w-16 origin-left"
              style={{ background: 'var(--hairline-gold)' }}
            />

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.4, ease: EASE }}
              className="text-[14px] leading-[1.78] max-w-[44ch]"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              Com mais de{' '}
              <span className="text-white/95 font-medium">19 anos de experiência</span>{' '}
              e acesso a mais de{' '}
              <span className="text-white/95 font-medium">60 parceiros</span>, a Hold
              Corretora atua como parceira estratégica na proteção, no planejamento e
              no crescimento patrimonial de pessoas e empresas, estruturando soluções
              completas e personalizadas em saúde, seguros, consórcios e finanças.
            </motion.p>
          </div>

          {/* Right column — cinematic image */}
          <motion.article
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
            className="lg:col-span-7 order-1 lg:order-2 relative overflow-hidden aspect-[16/9] lg:aspect-[4/5] lg:max-h-[680px] lg:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]"
            style={{
              boxShadow:
                '0 30px 80px -30px rgba(0,0,0,0.7), 0 12px 32px -16px rgba(0,0,0,0.5)',
              background: '#050f1f',
            }}
          >
            <Image
              src="/images/hero/quem-somos.jpg"
              alt="Hold Corretora — escritório institucional, gestão estratégica patrimonial"
              fill
              sizes="(max-width: 1024px) 100vw, 760px"
              className="object-cover"
              style={{ objectPosition: 'center 30%' }}
            />

            {/* Diagonal gold hairline (desktop only) */}
            <svg
              aria-hidden
              className="absolute inset-0 hidden lg:block pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1={8}
                y1={0}
                x2={0}
                y2={100}
                stroke="#c9a84c"
                strokeOpacity={0.32}
                strokeWidth={0.18}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Inner border highlight */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            />

            {/* Bottom dark gradient for quote bar legibility */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(5,15,31,0.85) 65%, rgba(5,15,31,0.95) 100%)',
              }}
            />

            {/* Glass quote bar overlay */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
              className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-12 lg:right-12 px-5 py-5 lg:px-7 lg:py-6 rounded-xl"
              style={{
                background: 'rgba(11,31,58,0.78)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <p
                className="italic"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 500,
                  fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)',
                  lineHeight: 1.45,
                  color: 'rgba(255,255,255,0.92)',
                }}
              >
                Integramos saúde, seguros, consórcios e finanças em uma gestão
                estratégica voltada à{' '}
                <span className="not-italic font-bold" style={{ color: '#e8463a' }}>
                  proteção patrimonial
                </span>
                ,{' '}
                <span className="not-italic font-bold" style={{ color: '#e8463a' }}>
                  sucessão
                </span>{' '}
                e{' '}
                <span className="not-italic font-bold" style={{ color: '#e8463a' }}>
                  eficiência financeira
                </span>
                .
              </p>
            </motion.div>
          </motion.article>
        </div>

        {/* ── Régua de transição ── */}
        <div className="text-center mt-20 lg:mt-24 mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className="text-[10px] font-semibold uppercase mb-3"
            style={{
              letterSpacing: '0.4em',
              color: 'rgba(201,168,76,0.6)',
            }}
          >
            M · V · V
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
            className="h-px max-w-[240px] mx-auto"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, var(--hairline-gold) 50%, transparent 100%)',
            }}
          />
        </div>

        {/* ── Movement 2 — MVV badges ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 max-w-[1080px] mx-auto">
          {PRINCIPLES.map(({ Icon, title, body, badge }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.95 + i * 0.1, ease: EASE }}
              className={[
                'relative flex flex-col gap-5',
                i > 0 ? 'pt-8 md:pt-0 border-t md:border-t-0 md:border-l md:pl-10' : '',
                i < PRINCIPLES.length - 1 ? 'md:pr-10' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={
                i > 0 ? { borderColor: 'rgba(201,168,76,0.16)' } : undefined
              }
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `${badge}1f`,
                  border: `1px solid ${badge}6b`,
                  boxShadow: `inset 0 0 12px ${badge}1a`,
                }}
              >
                <Icon size={22} strokeWidth={1.6} style={{ color: badge }} />
              </div>

              <h3
                className="italic text-white"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.55rem, 2.3vw, 1.95rem)',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  letterSpacing: '-0.005em',
                }}
              >
                {title}
              </h3>

              <p
                className="text-[13.5px] leading-[1.72]"
                style={{ color: 'rgba(255,255,255,0.62)' }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
