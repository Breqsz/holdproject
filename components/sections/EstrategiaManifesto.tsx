'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const RED = '#ae251c'

type Principle = {
  title: string
  body: string
}

const PRINCIPLES: Principle[] = [
  {
    title: 'Missão',
    body:
      'Ajudar pessoas e empresas a tomar melhores decisões, conectando saúde, seguros, consórcios e finanças de forma simples e estratégica.',
  },
  {
    title: 'Visão',
    body:
      'Ser referência para pessoas e empresas que buscam segurança para decidir e consistência para crescer.',
  },
  {
    title: 'Valores',
    body:
      'Agimos com integridade, falamos com transparência, cuidamos com responsabilidade, respeitamos cada história, pensamos no longo prazo e nunca negociamos a confiança.',
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
      {/* Top edge editorial hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'var(--hairline-accent)' }}
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
            'radial-gradient(ellipse at 50% 30%, rgba(122,154,184,0.08), transparent 60%)',
          mixBlendMode: 'soft-light',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* ── Movement 1 — Cinematic image with overlaid bracket text ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
          className="relative overflow-hidden aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] lg:max-h-[640px]"
          style={{
            boxShadow:
              '0 30px 80px -30px rgba(0,0,0,0.7), 0 12px 32px -16px rgba(0,0,0,0.5)',
            background: '#050f1f',
          }}
        >
          {/* Image */}
          <Image
            src="/images/estrategia.jpg"
            alt="Hold Corretora — equipe em reunião estratégica no escritório"
            fill
            priority={false}
            sizes="(max-width: 1024px) 100vw, 1160px"
            className="object-cover"
            style={{ objectPosition: 'center 45%' }}
          />

          {/* Heavy left-side gradient — Consorce style */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(7,22,42,0.96) 0%, rgba(7,22,42,0.92) 28%, rgba(7,22,42,0.65) 50%, rgba(7,22,42,0.20) 75%, rgba(7,22,42,0.0) 100%)',
            }}
          />

          {/* Inner border highlight */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          />

          {/* Overlay text — free-flowing, no card */}
          <div className="absolute inset-0 flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
              className="w-full max-w-[620px] px-5 sm:px-12 lg:px-16 lg:pl-20"
            >
              {/* Headline — two-part editorial */}
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.4, ease: EASE }}
                className="text-balance"
                style={{
                  fontSize: 'clamp(1.35rem, 3vw, 2.625rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.022em',
                  fontWeight: 600,
                  color: '#ffffff',
                  textShadow: '0 2px 18px rgba(0,0,0,0.45)',
                }}
              >
                Integramos saúde, seguros, consórcios e finanças em uma gestão
                estratégica.
                <span
                  className="block mt-3"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontStyle: 'italic',
                    fontWeight: 600,
                    color: RED,
                    fontSize: 'clamp(1.4rem, 3.2vw, 2.875rem)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.018em',
                  }}
                >
                  Voltada à proteção patrimonial, sucessão e eficiência
                  financeira.
                </span>
              </motion.h2>

              {/* Body — two paragraphs */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.7, ease: EASE }}
                className="mt-8 text-[13.5px] sm:text-[14.5px] leading-[1.65] max-w-[56ch]"
                style={{
                  color: '#c8d2e0',
                  fontWeight: 400,
                  textShadow: '0 1px 12px rgba(0,0,0,0.55)',
                }}
              >
                A Hold Corretora atua como parceira estratégica na proteção, no
                planejamento e no crescimento patrimonial de pessoas e empresas,
                com mais de{' '}
                <span style={{ color: '#ffffff', fontWeight: 600 }}>
                  19 anos de experiência
                </span>{' '}
                e acesso a mais de{' '}
                <span style={{ color: '#ffffff', fontWeight: 600 }}>
                  60 parceiros
                </span>
                .
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.85, ease: EASE }}
                className="mt-5 text-[13.5px] sm:text-[14.5px] leading-[1.65] max-w-[56ch]"
                style={{
                  color: '#c8d2e0',
                  fontWeight: 400,
                  textShadow: '0 1px 12px rgba(0,0,0,0.55)',
                }}
              >
                Estruturamos soluções completas e personalizadas em saúde,
                seguros, consórcios e finanças — com proximidade, transparência
                e visão de longo prazo.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Régua de transição ── */}
        <div className="text-center mt-12 sm:mt-20 lg:mt-24 mb-10 sm:mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
            className="h-px max-w-[240px] mx-auto"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, var(--hairline-accent) 50%, transparent 100%)',
            }}
          />
        </div>

        {/* ── Movement 2 — MVV compact ── */}
        <div className="max-w-[1080px] mx-auto">
          <div className="flex items-center justify-center gap-3 mb-10">
            <motion.span
              aria-hidden
              className="block h-px w-5"
              style={{ background: 'rgba(224,232,240,0.55)', transformOrigin: 'center' }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            />
            <motion.span
              className="text-[11px] font-semibold uppercase"
              style={{ letterSpacing: '0.32em', color: '#7a9ab8' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.45, delay: 1.15, ease: 'easeOut' }}
            >
              Princípios Hold
            </motion.span>
            <motion.span
              aria-hidden
              className="block h-px w-5"
              style={{ background: 'rgba(224,232,240,0.55)', transformOrigin: 'center' }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            />
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3">
            <motion.span
              aria-hidden
              className="hidden md:block absolute top-0 bottom-0 w-px"
              style={{ left: 'calc(100% / 3)', background: 'var(--hairline-accent)', transformOrigin: 'top' }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.85, delay: 1.05, ease: EASE }}
            />
            <motion.span
              aria-hidden
              className="hidden md:block absolute top-0 bottom-0 w-px"
              style={{ left: 'calc(200% / 3)', background: 'var(--hairline-accent)', transformOrigin: 'top' }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.85, delay: 1.05, ease: EASE }}
            />
            {PRINCIPLES.map(({ title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.55, delay: 1.4 + i * 0.08, ease: 'easeOut' }}
                className={[
                  'flex flex-col gap-[14px] py-6 md:py-3 px-0 md:px-10',
                  i > 0 ? 'border-t md:border-t-0 pt-6 md:pt-3' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={
                  i > 0 ? { borderColor: 'rgba(122,154,184,0.16)' } : undefined
                }
              >
                <h3
                  className="leading-none italic"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontStyle: 'italic',
                    fontWeight: 600,
                    fontSize: 'clamp(1.625rem, 2.4vw, 2.125rem)',
                    letterSpacing: '-0.012em',
                    color: RED,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="text-[15px] leading-[1.55] text-[#d4dfeb]"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
