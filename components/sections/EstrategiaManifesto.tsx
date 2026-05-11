'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

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
            {/* Headline — editorial one-liner */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
              className="text-white max-w-[18ch]"
              style={{
                fontSize: 'clamp(2rem, 3.6vw, 3rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.025em',
                fontWeight: 800,
              }}
            >
              Uma estratégia completa para o{' '}
              <span style={{ color: '#c9a84c' }}>seu patrimônio.</span>
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.4, ease: EASE }}
              className="mt-8 text-base leading-relaxed max-w-[60ch] text-pretty text-[#7a9ab8]"
            >
              Com mais de{' '}
              <span className="font-semibold text-[#e0e8f0]">19 anos de experiência</span>{' '}
              e acesso a mais de{' '}
              <span className="font-semibold text-[#e0e8f0]">60 parceiros</span>, a Hold
              Corretora atua como parceira estratégica na proteção, no planejamento e
              no crescimento patrimonial de pessoas e empresas, estruturando soluções
              completas e personalizadas em saúde, seguros, consórcios e finanças.
            </motion.p>
          </div>

          {/* Right column — cinematic image */}
          <motion.div
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
              src="/images/hero/AdobeStock_447632877.jpeg"
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

          </motion.div>
        </div>

        {/* ── Régua de transição ── */}
        <div className="text-center mt-20 lg:mt-24 mb-14 lg:mb-16">
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

        {/* ── Movement 2 — MVV compact ── */}
        <div className="max-w-[1080px] mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            className="flex items-center justify-center gap-3 mb-11"
          >
            <span
              aria-hidden
              className="block h-px w-6"
              style={{ background: 'rgba(201,168,76,0.6)' }}
            />
            <span
              className="text-[10px] font-semibold uppercase"
              style={{ letterSpacing: '0.28em', color: '#c9a84c' }}
            >
              Princípios Hold
            </span>
            <span
              aria-hidden
              className="block h-px w-6"
              style={{ background: 'rgba(201,168,76,0.6)' }}
            />
          </motion.div>

          {/* Three columns — Cormorant italic label + running body */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {PRINCIPLES.map(({ title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 1.0 + i * 0.08, ease: EASE }}
                className={[
                  'flex flex-col gap-[18px] py-6 md:py-2 px-0 md:px-9',
                  i > 0
                    ? 'border-t md:border-t-0 md:border-l pt-6 md:pt-2'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={
                  i > 0 ? { borderColor: 'rgba(201,168,76,0.16)' } : undefined
                }
              >
                <h3
                  className="leading-none italic"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontStyle: 'italic',
                    fontWeight: 500,
                    fontSize: 'clamp(1.5rem, 2.2vw, 1.875rem)',
                    letterSpacing: '-0.01em',
                    color: '#c9a84c',
                  }}
                >
                  {title}
                </h3>

                <p
                  className="text-[15px] leading-[1.65] text-[#d4dfeb]"
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
