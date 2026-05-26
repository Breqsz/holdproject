'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { formatWhatsAppLink } from '@/lib/utils'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const RED = '#ae251c'
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

type Linha = {
  id: string
  seq: string
  title: string
  short: string
  bullets: string[]
  image: string
  imagePosition?: string
  waMessage: string
}

const LINHAS: Linha[] = [
  {
    id: 'vida',
    seq: '01',
    title: 'Vida',
    short:
      'Cobertura sob medida para quem precisa de proteção financeira em casos de morte, invalidez ou doenças graves.',
    bullets: ['Doenças graves', 'Invalidez permanente', 'Renda familiar'],
    image: '/images/hero/family-hero.webp',
    imagePosition: 'center 30%',
    waMessage: 'Olá! Quero entender as opções de Seguro de Vida.',
  },
  {
    id: 'auto',
    seq: '02',
    title: 'Auto',
    short:
      'Comparativo de seguradoras, cobertura otimizada e franquia sob medida: leves, pesados e frota corporativa.',
    bullets: ['Cobertura compreensiva', 'Frota corporativa', 'Assistência 24h'],
    image: '/images/hero/card-seguros.jpg',
    imagePosition: 'center',
    waMessage: 'Olá! Quero cotar um Seguro Auto.',
  },
  {
    id: 'residencial',
    seq: '03',
    title: 'Residencial',
    short:
      'Patrimônio físico protegido contra incêndio, roubo, danos elétricos e responsabilidade civil familiar.',
    bullets: ['Incêndio e roubo', 'Danos elétricos', 'Responsabilidade civil'],
    image: '/images/hero/home.jpg',
    imagePosition: 'center 40%',
    waMessage: 'Olá! Quero cotar um Seguro Residencial.',
  },
  {
    id: 'empresarial',
    seq: '04',
    title: 'Empresarial',
    short:
      'Garantia operacional para PMEs e indústrias: patrimônio, lucros cessantes, RC e D&O.',
    bullets: ['Lucros cessantes', 'RC e D&O', 'Patrimônio corporativo'],
    image: '/images/hero/office-hero.webp',
    imagePosition: 'center',
    waMessage: 'Olá! Quero conhecer as opções de Seguro Empresarial.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
}

function LinhaCard({ data }: { data: Linha }) {
  const href = formatWhatsAppLink(WHATSAPP, data.waMessage)
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      className="h-full"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Falar no WhatsApp sobre Seguro ${data.title}`}
        className="group relative block w-full text-left overflow-hidden rounded-2xl h-full min-h-[420px] sm:min-h-[520px] transition-shadow duration-500 hover:shadow-[0_28px_70px_-22px_rgba(0,0,0,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ae251c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07162a]"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={data.image}
            alt=""
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 600px"
            quality={92}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            style={{ objectPosition: data.imagePosition ?? 'center' }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(7,22,42,0.10) 0%, rgba(7,22,42,0.45) 45%, rgba(7,22,42,0.95) 100%)',
            }}
          />
        </div>

        <span
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: RED }}
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(520px circle at 18% 22%, rgba(174,37,28,0.16), transparent 60%)',
          }}
        />

        <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-7 lg:p-8">
          <span
            aria-hidden
            className="absolute top-5 right-5 text-[11px] font-extrabold tracking-[0.18em] text-white/80"
          >
            {data.seq}
          </span>

          <h3
            className="text-display text-white tracking-tight leading-[1.02] mb-3"
            style={{
              fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)',
              letterSpacing: '-0.02em',
              textShadow: '0 1px 16px rgba(0,0,0,0.5)',
            }}
          >
            {data.title}
          </h3>

          <p
            className="text-[12.5px] sm:text-[13px] leading-[1.5] max-w-[36ch] mb-4"
            style={{
              color: 'rgba(255,255,255,0.78)',
              textShadow: '0 1px 12px rgba(0,0,0,0.5)',
            }}
          >
            {data.short}
          </p>

          <div className="overflow-hidden mb-4 lg:transition-[max-height,opacity] lg:duration-500 lg:ease-out lg:opacity-0 lg:max-h-0 lg:group-hover:opacity-100 lg:group-hover:max-h-44">
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-3 border-t border-white/15">
              {data.bullets.map((b) => (
                <span key={b} className="text-[11px] text-white/85 leading-tight pt-2">
                  · {b}
                </span>
              ))}
            </div>
          </div>

          <span className="inline-flex items-center gap-2.5 self-start text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white">
            Falar no WhatsApp
            <span
              aria-hidden
              className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
              style={{ background: RED }}
            >
              <ArrowRight size={12} className="text-white" />
            </span>
          </span>
        </div>
      </a>
    </motion.div>
  )
}

export default function SegurosLinhas() {
  return (
    <section
      id="seguros-linhas"
      className="section-pad bg-[#07162a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mb-12 lg:mb-16"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            Linhas de proteção
          </p>
          <h2
            className="mt-4 text-display text-white"
            style={{
              fontFamily: 'var(--font-gellix)',
              fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)',
            }}
          >
            Quatro frentes para proteger pessoas, bens e operações.
          </h2>
          <p className="mt-6 max-w-[60ch] text-[#7a9ab8] leading-relaxed">
            Comparativo entre seguradoras de mercado, modelagem por perfil e
            acompanhamento de sinistro fim-a-fim, do briefing à indenização.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {LINHAS.map((m) => (
            <LinhaCard key={m.id} data={m} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
