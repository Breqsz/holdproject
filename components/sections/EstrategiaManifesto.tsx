'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Target, Eye, Gem } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const PRINCIPLES = [
  {
    Icon: Target,
    title: 'Missão',
    body:  'Ajudar pessoas e empresas a tomar melhores decisões, conectando saúde, seguros, consórcios e finanças de forma simples e estratégica.',
  },
  {
    Icon: Eye,
    title: 'Visão',
    body:  'Ser referência para pessoas e empresas que buscam segurança para decidir e consistência para crescer.',
  },
  {
    Icon: Gem,
    title: 'Valores',
    body:  'Agimos com integridade, falamos com transparência, cuidamos com responsabilidade, respeitamos cada história, pensamos no longo prazo e nunca negociamos a confiança.',
  },
] as const

export default function EstrategiaManifesto() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })

  return (
    <section
      ref={ref}
      id="estrategia"
      className="relative section-pad overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #f7f7f6 0%, #ecedee 100%)',
        fontFamily: 'var(--font-outfit)',
      }}
    >
      {/* Dot-grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(7,22,42,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div aria-hidden className="absolute inset-x-0 top-0    h-px bg-gradient-to-r from-transparent via-[#07162a]/15 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#07162a]/10 to-transparent" />

      <div className="relative max-w-[1180px] mx-auto px-6 lg:px-10">

        {/* ── Tagline ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: EASE }}
          className="text-center max-w-[60ch] mx-auto mb-12 lg:mb-14"
        >
          <h2
            className="text-[#07162a]"
            style={{
              fontSize: 'clamp(1.4rem, 2.4vw, 1.95rem)',
              lineHeight: 1.34,
              letterSpacing: '-0.012em',
              fontWeight: 500,
            }}
          >
            <span className="block text-[#07162a]/55">Mais do que produtos.</span>
            <span className="block mt-1 font-semibold">
              Uma estratégia completa para o seu patrimônio.
            </span>
          </h2>
        </motion.div>

        {/* ── Cinematic image card ────────────────────────────── */}
        <motion.article
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
          className="relative rounded-[24px] overflow-hidden mb-14 lg:mb-16"
          style={{
            minHeight: 'clamp(540px, 58vw, 600px)',
            boxShadow:
              '0 30px 80px -30px rgba(7,22,42,0.55), 0 12px 32px -16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
            background: '#050f1f',
          }}
        >
          <Image
            src="/images/manifesto/vista-estrategica.webp"
            alt="Sala executiva ao entardecer — gestão estratégica patrimonial Hold Corretora"
            fill
            sizes="(max-width: 1024px) 100vw, 1180px"
            className="object-cover"
            style={{ objectPosition: '35% center' }}
            priority={false}
          />

          {/* Mobile gradient — dark bottom half for text */}
          <div
            aria-hidden
            className="absolute inset-0 lg:hidden pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(5,15,31,0.05) 0%, rgba(5,15,31,0.4) 38%, rgba(5,15,31,0.92) 62%, #050f1f 88%)',
            }}
          />
          {/* Desktop gradient — dark right third for text */}
          <div
            aria-hidden
            className="absolute inset-0 hidden lg:block pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(5,15,31,0.18) 0%, transparent 22%, transparent 46%, rgba(5,15,31,0.78) 70%, #050f1f 92%)',
            }}
          />

          {/* Inner border highlight */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-[24px] pointer-events-none"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          />

          {/* Content */}
          <div className="relative grid lg:grid-cols-2 min-h-[540px] lg:min-h-[600px]">
            {/* image-only spacer on desktop */}
            <div aria-hidden className="hidden lg:block" />

            {/* text column */}
            <div className="flex flex-col justify-center px-7 pt-[58%] pb-10 lg:px-12 lg:py-16 lg:pt-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="block h-px w-8 bg-[#c9a84c]/55" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9a84c]/80">
                  Estratégia
                </span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
                className="text-white"
                style={{
                  fontSize: 'clamp(1.3rem, 2vw, 1.75rem)',
                  lineHeight: 1.36,
                  letterSpacing: '-0.012em',
                  fontWeight: 500,
                }}
              >
                Integramos saúde, seguros, consórcios e finanças em uma gestão estratégica voltada à{' '}
                <span className="font-semibold text-[#e8463a]">proteção patrimonial</span>, à{' '}
                <span className="font-semibold text-[#e8463a]">sucessão</span> e à{' '}
                <span className="font-semibold text-[#e8463a]">eficiência financeira</span>.
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
                className="mt-7 mb-6 h-px w-16 origin-left bg-[#c9a84c]/45"
              />

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.75, ease: EASE }}
                className="text-[13.5px] lg:text-[14px] leading-[1.78] text-white/65 max-w-[44ch]"
              >
                Com mais de{' '}
                <span className="text-white/90 font-medium">19 anos de experiência</span> e acesso a mais de{' '}
                <span className="text-white/90 font-medium">60 parceiros</span>, a Hold Corretora atua como parceira estratégica na proteção, no planejamento e no crescimento patrimonial de pessoas e empresas, estruturando soluções completas e personalizadas em saúde, seguros, consórcios e finanças.
              </motion.p>
            </div>
          </div>
        </motion.article>

        {/* ── Hairline separator ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          className="h-px max-w-[60%] mx-auto mb-14 lg:mb-16 origin-center"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(7,22,42,0.18) 50%, transparent 100%)',
          }}
        />

        {/* ── MVV ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 max-w-[1080px] mx-auto"
        >
          {PRINCIPLES.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.8 + i * 0.1, ease: EASE }}
              className={[
                'relative flex flex-col gap-3.5',
                i > 0 ? 'md:pl-10 md:border-l md:border-[#07162a]/[0.09]' : '',
                i < 2 ? 'md:pr-10' : '',
              ].join(' ')}
            >
              <div className="flex items-center gap-3">
                <Icon size={22} strokeWidth={1.6} className="text-[#ae251c]" />
                <h4
                  className="text-[#ae251c]"
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  {title}
                </h4>
              </div>
              <p className="text-[14px] leading-[1.72] text-[#07162a]/65">
                {body}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
