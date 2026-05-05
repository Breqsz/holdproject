'use client'

import Image from 'next/image'
import { LineChart, Coins, ShieldHalf, Network, ArrowRight } from 'lucide-react'
import { useAudience } from '@/lib/audience'
import { formatWhatsAppLink } from '@/lib/utils'
import { Reveal } from '@/components/motion/Reveal'
import { AudienceToggle } from '@/components/AudienceToggle'
import { ServiceLeadForm } from '@/components/forms/ServiceLeadForm'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const pillars = [
  {
    icon: LineChart,
    title: 'Renda fixa estruturada',
    body: 'Composição entre títulos públicos, CDBs, LCIs/LCAs e debêntures incentivadas — com gestão de prazo e tributação.',
  },
  {
    icon: Coins,
    title: 'Renda variável',
    body: 'Acesso a ações, fundos e ETFs por meio de assessores parceiros — com tese clara e rebalanceamento periódico.',
  },
  {
    icon: ShieldHalf,
    title: 'Previdência & seguros patrimoniais',
    body: 'PGBL/VGBL com revisão tributária e seguros que blindam o patrimônio principal contra eventos críticos.',
  },
  {
    icon: Network,
    title: 'Visão integrada',
    body: 'Consórcio, seguros, saúde e investimentos olhados como um único sistema — não como produtos isolados.',
  },
]

export default function InvestimentosClient() {
  const { audience } = useAudience()
  const wa = formatWhatsAppLink(
    WHATSAPP,
    audience === 'pj'
      ? 'Olá! Sou de um escritório/empresa e quero conversar sobre estratégia patrimonial.'
      : 'Olá! Quero conversar sobre estratégia de investimentos.',
  )

  return (
    <>
      {/* Hero — graphite + gold per design spec */}
      <section
        className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
        style={{ background: 'linear-gradient(135deg, #111122 0%, #1a1a2e 70%, #0b1f3a 100%)' }}
      >
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-10 h-[460px] w-[460px] rounded-full bg-[#c9a84c] opacity-[.10] blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-12 left-12 h-[280px] w-[280px] rounded-full bg-[#142f54] opacity-[.18] blur-[90px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9a84c]">
                  Investimentos · Hold
                </span>
                <div className="rule-gold h-px max-w-[120px] flex-1" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                className="mt-6 text-display text-white text-pretty"
                style={{ fontSize: 'clamp(2.25rem, 5.4vw, 4rem)' }}
              >
                Patrimônio é sistema. <span className="text-[#c9a84c]">Não produto.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[56ch] text-pretty text-lg leading-relaxed text-white/70">
                Diagnóstico, planejamento e parceria com escritórios de investimento para uma visão patrimonial
                integrada — onde consórcios, seguros, saúde e ativos financeiros conversam.
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
                  href="#invest-form"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#c9a84c] text-[#1a1a2e] px-6 py-3 text-sm font-bold transition-colors hover:bg-[#e0c073]"
                >
                  Agendar diagnóstico
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="hidden lg:block">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-[#c9a84c]/15">
              <Image
                src="/images/hero/investimentos.webp"
                alt="Análise patrimonial em ambiente executivo com gráficos e indicadores"
                fill
                priority
                sizes="(max-width: 1024px) 0px, 50vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#111122]/85 via-[#111122]/10 to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-pad bg-[#0b1f3a]" style={{ fontFamily: 'var(--font-outfit)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <Reveal>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9a84c]">
                Quatro pilares
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mt-4 text-display text-white"
                style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
              >
                Decisões estruturadas, não palpites.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {pillars.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.06} className="flex items-start gap-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#c9a84c]/12 ring-1 ring-[#c9a84c]/30 flex items-center justify-center">
                  <Icon size={20} className="text-[#c9a84c]" strokeWidth={1.6} />
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
      <section className="section-tight bg-[#07162a]" id="invest-form" style={{ fontFamily: 'var(--font-outfit)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9a84c]">
              Diagnóstico patrimonial
            </p>
            <h2
              className="mt-4 text-display text-white"
              style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
            >
              Página detalhada em construção.
            </h2>
            <p className="mt-6 max-w-[58ch] text-pretty text-[#7a9ab8] leading-relaxed">
              Estamos finalizando o conteúdo público sobre a frente patrimonial — alocação, parcerias,
              metodologia. Por ora, agendamos uma conversa direta de 30 minutos para entender o seu cenário.
            </p>
            <div className="mt-8 rule-gold h-px w-24" />
            <p className="mt-6 text-sm text-[#7a9ab8]">
              Conversas confidenciais · sem caráter de oferta de produto.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <ServiceLeadForm
              service="Investimentos"
              introTitle="Agendar diagnóstico"
              introBody="Trinta minutos. Cenário atual, objetivos, restrições. Sem promessa de venda."
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
