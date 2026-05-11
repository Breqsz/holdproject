'use client'

import Image from 'next/image'
import { ShieldCheck, Car, Home, Briefcase, ArrowRight } from 'lucide-react'
import { useAudience } from '@/lib/audience'
import { formatWhatsAppLink } from '@/lib/utils'
import { Reveal } from '@/components/motion/Reveal'
import { AudienceToggle } from '@/components/AudienceToggle'
import { ServiceLeadForm } from '@/components/forms/ServiceLeadForm'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Vida',
    body: 'Cobertura sob medida para quem precisa de proteção financeira em casos de morte, invalidez ou doenças graves.',
  },
  {
    icon: Car,
    title: 'Auto',
    body: 'Comparativo de seguradoras, cobertura otimizada e franquia sob medida — leves, pesados e frota corporativa.',
  },
  {
    icon: Home,
    title: 'Residencial',
    body: 'Patrimônio físico protegido contra incêndio, roubo, danos elétricos e responsabilidade civil familiar.',
  },
  {
    icon: Briefcase,
    title: 'Empresarial',
    body: 'Garantia operacional para PMEs e indústrias — patrimônio, lucros cessantes, RC e D&O.',
  },
]

export default function SegurosClient() {
  const { audience } = useAudience()
  const wa = formatWhatsAppLink(
    WHATSAPP,
    audience === 'pj'
      ? 'Olá! Quero conhecer as soluções de Seguros para empresas/escritórios.'
      : 'Olá! Quero entender as opções de Seguros para mim e minha família.',
  )

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
        style={{ background: 'linear-gradient(135deg, #2a0606 0%, #4a0e0e 60%, #07162a 100%)' }}
      >
        <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-10 h-[420px] w-[420px] rounded-full bg-[#ae251c] opacity-[.18] blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                  Seguros · Hold Corretora
                </span>
                <div className="h-px max-w-[120px] flex-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                className="mt-6 text-display text-white text-pretty"
                style={{ fontSize: 'clamp(2.25rem, 5.4vw, 4rem)' }}
              >
                Proteção que acompanha cada etapa da sua vida.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[56ch] text-pretty text-lg leading-relaxed text-white/75">
                Vida, auto, residencial, empresarial e patrimonial — com comparativo entre seguradoras
                e suporte humano em todas as etapas, inclusive sinistros.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8">
                <AudienceToggle variant="light" />
              </div>
            </Reveal>

            <Reveal delay={0.32}>
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
                <a
                  href="#seguros-form"
                  className="group inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  Pedir cotação
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="hidden lg:block">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/10">
              <Image
                src="/images/hero/seguros.webp"
                alt="Família protegida por seguro patrimonial residencial"
                fill
                priority
                sizes="(max-width: 1024px) 0px, 50vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#2a0606]/80 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad bg-[#0b1f3a]" style={{ fontFamily: 'var(--font-outfit)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <Reveal>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]">
                Linhas de proteção
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mt-4 text-display text-white"
                style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
              >
                Quatro frentes para proteger pessoas, bens e operações.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {benefits.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.06} className="flex items-start gap-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#ae251c]/15 ring-1 ring-[#ae251c]/30 flex items-center justify-center">
                  <Icon size={20} className="text-[#ae251c]" strokeWidth={1.6} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{title}</h3>
                  <p className="mt-2 text-[#7a9ab8] text-sm leading-relaxed max-w-prose">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Em breve / em construção — tasteful */}
      <section className="section-tight bg-[#0b1f3a]" id="seguros-form" style={{ fontFamily: 'var(--font-outfit)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9a84c]">
              Estamos estruturando
            </p>
            <h2
              className="mt-4 text-display text-white"
              style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
            >
              Conteúdo completo a caminho.
            </h2>
            <p className="mt-6 max-w-[58ch] text-pretty text-[#7a9ab8] leading-relaxed">
              A página detalhada de Seguros está sendo construída pela nossa equipe — com tabelas comparativas,
              estudos de caso e orientação por perfil. Enquanto isso, deixe seu contato e
              nosso time prepara um atendimento personalizado para você.
            </p>
            <div className="mt-8 rule-gold h-px w-24" />
            <p className="mt-6 text-sm text-[#7a9ab8]">
              Atendimento humano · diagnóstico em &lt; 24h · sem compromisso.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <ServiceLeadForm
              service="Seguros"
              introTitle="Pedir uma cotação"
              introBody="Comparamos seguradoras e voltamos com a melhor opção em poucas horas."
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
