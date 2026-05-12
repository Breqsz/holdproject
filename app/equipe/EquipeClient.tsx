'use client'

import Image from 'next/image'
import { Reveal } from '@/components/motion/Reveal'
import { TiltCard } from '@/components/motion/TiltCard'
import { ServiceLeadForm } from '@/components/forms/ServiceLeadForm'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { formatWhatsAppLink } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

type TeamMember = {
  name: string
  role: string
  initials: string
  bio: string
  photo?: string
}

const team: TeamMember[] = [
  {
    name: 'Jacimar Mendonça',
    role: 'Diretoria executiva',
    initials: 'JM',
    bio: 'Frente comercial e estratégica. +19 anos conduzindo as decisões patrimoniais de famílias e empresas em Uberlândia.',
    photo: '/personagem/jacimar-avatar-3d.webp',
  },
  {
    name: 'Time de Saúde',
    role: 'Especialistas em planos de saúde',
    initials: 'TS',
    bio: 'Comparativo de operadoras, contratação e renovação de planos individuais, familiares e empresariais.',
    photo: '/images/editorial/equipe-medica-corredor.png',
  },
  {
    name: 'Time de Seguros',
    role: 'Consultores em proteção patrimonial',
    initials: 'CS',
    bio: 'Vida, auto, residencial, empresarial e patrimonial — com suporte humano em sinistros e renovações.',
    photo: '/images/hero/seguros.webp',
  },
  {
    name: 'Time de Consórcios',
    role: 'Estruturação de consórcios',
    initials: 'TC',
    bio: 'Atendimento consultivo a clientes finais, empresas, agronegócio e escritórios de investimento parceiros.',
    photo: '/images/hero/consorcios.webp',
  },
  {
    name: 'Time Patrimonial',
    role: 'Estratégia patrimonial',
    initials: 'TP',
    bio: 'Diagnóstico, planejamento e parceria com escritórios de investimento — visão integrada do patrimônio.',
    photo: '/images/hero/quem-somos.jpg',
  },
  {
    name: 'Atendimento & Pós-venda',
    role: 'Relacionamento com cliente',
    initials: 'AP',
    bio: 'Acompanhamento humano antes, durante e depois da contratação — ajustes, sinistros e renovações.',
    photo: '/images/editorial/consultoria-familia.png',
  },
]

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const seq = String(index + 1).padStart(2, '0')

  return (
    <Reveal delay={index * 0.06}>
      <TiltCard rotateAmplitude={5} scaleOnHover={1.015}>
        <article
          className="group relative overflow-hidden rounded-2xl bg-[#0b1f3a] ring-1 ring-white/8 hover:ring-white/15 transition-all duration-500"
        >
          {/* Photo area — 4:5 portrait */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#07162a]">
            {member.photo ? (
              <>
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#07162a]/55 group-hover:bg-[#07162a]/30 transition-colors duration-500" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-[#07162a] to-[#142f54]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-display text-white/15 tracking-tight" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>
                    {member.initials}
                  </span>
                </div>
              </>
            )}

            {/* Bottom row inside photo */}
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
              <span className="tabular text-[10px] uppercase tracking-[0.2em] text-white/70 font-semibold">
                {seq} / 06
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/60 italic">
                Hold Corretora
              </span>
            </div>
          </div>

          {/* Text area */}
          <div className="p-6 md:p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]">
              {member.role}
            </p>
            <h3 className="mt-2 text-display text-white tracking-tight" style={{ fontSize: 'clamp(1.15rem, 1.6vw, 1.4rem)' }}>
              {member.name}
            </h3>
            <p className="mt-3 text-sm text-[#7a9ab8] leading-relaxed">
              {member.bio}
            </p>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  )
}

export default function EquipeClient() {
  const wa = formatWhatsAppLink(
    WHATSAPP,
    'Olá! Quero falar com um especialista da Hold Corretora.',
  )

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07162a] via-[#0a1c36] to-[#0b1f3a] pt-32 pb-20 md:pt-40 md:pb-28">
        <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-[440px] w-[440px] rounded-full bg-[#1a4b8a] opacity-[.18] blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 left-12 h-[300px] w-[300px] rounded-full bg-[#ae251c] opacity-[.08] blur-[100px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-[#ae251c]/30 bg-[#ae251c]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]">
                Quem cuida
              </span>
              <div className="rule-accent h-px max-w-[120px] flex-1" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              className="mt-6 text-display text-white max-w-4xl text-pretty"
              style={{ fontSize: 'clamp(2.25rem, 5.4vw, 4rem)' }}
            >
              Time consultivo, <span className="text-[#7a9ab8] italic font-light">presente em cada etapa</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[60ch] text-pretty text-lg leading-relaxed text-[#7a9ab8]">
              Equipes especializadas por frente, com vínculo direto entre cliente e consultor —
              do primeiro contato à manutenção do contrato.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Team grid */}
      <section id="equipe" className="section-pad bg-[#07162a]" style={{ fontFamily: 'var(--font-outfit)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contato — section dentro de /equipe */}
      <section
        id="contato-equipe"
        className="section-pad bg-[#0b1f3a]"
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
              Contato direto
            </p>
            <h2
              className="mt-4 text-display text-white"
              style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
            >
              Fale com a equipe.
            </h2>
            <p className="mt-6 max-w-[58ch] text-pretty text-[#7a9ab8] leading-relaxed">
              Sem call center, sem fila. Você é direcionado para a frente especializada que faz sentido
              para o seu caso e atendido por quem realmente vai conduzir o seu projeto.
            </p>
            <div className="mt-8 rule-accent h-px w-24" />
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5d]"
              >
                <WhatsAppIcon size={16} />
                Falar no WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ServiceLeadForm
              service="Atendimento Hold"
              introTitle="Direcionar contato"
              introBody="Conta brevemente o tema (consórcio, seguro, saúde ou patrimônio) e direcionamos para a frente certa."
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
