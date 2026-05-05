'use client'

import Image from 'next/image'
import { Heart, Users, Stethoscope, Activity, ArrowRight } from 'lucide-react'
import { useAudience } from '@/lib/audience'
import { formatWhatsAppLink } from '@/lib/utils'
import { Reveal } from '@/components/motion/Reveal'
import { AudienceToggle } from '@/components/AudienceToggle'
import { ServiceLeadForm } from '@/components/forms/ServiceLeadForm'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const benefits = [
  {
    icon: Heart,
    title: 'Individual & Familiar',
    body: 'Comparativo entre operadoras locais e nacionais, com critérios reais de rede credenciada e custo-benefício.',
  },
  {
    icon: Users,
    title: 'Empresarial',
    body: 'Planos PME e corporativos — desde 2 vidas até estruturas com centenas de colaboradores. Adesão e migração assistidas.',
  },
  {
    icon: Stethoscope,
    title: 'Odonto',
    body: 'Cobertura odontológica como complemento ou avulsa — para indivíduos, famílias e funcionários.',
  },
  {
    icon: Activity,
    title: 'Telemedicina',
    body: 'Atendimento remoto integrado a planos selecionados — atendimento 24/7 em parceria com operadoras de referência.',
  },
]

export default function SaudeClient() {
  const { audience } = useAudience()
  const wa = formatWhatsAppLink(
    WHATSAPP,
    audience === 'pj'
      ? 'Olá! Quero conhecer as opções de Plano de Saúde Empresarial.'
      : 'Olá! Quero comparar planos de saúde para minha família.',
  )

  return (
    <>
      {/* Hero — light scheme to differentiate from other pages */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 bg-[#f4f1ea]">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-[460px] w-[460px] rounded-full bg-[#142f54] opacity-[.04] blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-12 left-12 h-[280px] w-[280px] rounded-full bg-[#ae251c] opacity-[.06] blur-[90px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-[#142f54]/20 bg-[#142f54]/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#142f54]">
                  Saúde · Hold Corretora
                </span>
                <div className="h-px max-w-[120px] flex-1 bg-gradient-to-r from-transparent via-[#142f54]/30 to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                className="mt-6 text-display text-[#07162a] text-pretty"
                style={{ fontSize: 'clamp(2.25rem, 5.4vw, 4rem)' }}
              >
                Saúde com escolha consciente — sem letras miúdas.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[56ch] text-pretty text-lg leading-relaxed text-[#142f54]/75">
                Comparamos operadoras com critérios reais — rede credenciada, custo, carências, reembolsos —
                para indicar o plano que faz sentido pra você ou pra sua empresa.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8">
                <AudienceToggle variant="dark" />
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
                  href="#saude-form"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#07162a] text-white px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                >
                  Comparar planos
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="hidden lg:block">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-[#142f54]/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.18)]">
              <Image
                src="/images/hero/saude.jpg"
                alt="Família planejando bem-estar e saúde em ambiente doméstico"
                fill
                priority
                sizes="(max-width: 1024px) 0px, 50vw"
                className="object-cover"
              />
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
                Linhas de cobertura
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mt-4 text-display text-white"
                style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
              >
                Da medicina preventiva à urgência — com clareza.
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

      {/* Form section */}
      <section className="section-tight bg-[#07162a]" id="saude-form" style={{ fontFamily: 'var(--font-outfit)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9a84c]">
              Atendimento consultivo
            </p>
            <h2
              className="mt-4 text-display text-white"
              style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
            >
              Conteúdo completo em construção.
            </h2>
            <p className="mt-6 max-w-[58ch] text-pretty text-[#7a9ab8] leading-relaxed">
              Estamos consolidando comparativos detalhados das operadoras de Uberlândia e nacionais.
              Deixe seu contato — preparamos uma simulação personalizada já no primeiro retorno.
            </p>
            <div className="mt-8 rule-gold h-px w-24" />
            <p className="mt-6 text-sm text-[#7a9ab8]">
              Análise por perfil · sem custo · resposta em horário comercial.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <ServiceLeadForm
              service="Saúde"
              introTitle="Quero comparar planos"
              introBody="Conta o que importa pra você (rede, especialidades, faixa etária) — voltamos com 2 ou 3 opções claras."
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
