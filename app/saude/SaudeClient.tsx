'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, HandHeart, Layers, ArrowRight } from 'lucide-react'
import { formatWhatsAppLink } from '@/lib/utils'
import { Reveal } from '@/components/motion/Reveal'
import { ServiceLeadForm } from '@/components/forms/ServiceLeadForm'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import SaudeModalidades from '@/components/sections/saude/SaudeModalidades'
import SaudeOperadoras from '@/components/sections/saude/SaudeOperadoras'
import SaudeFAQ from '@/components/sections/saude/SaudeFAQ'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const HERO_WA = 'Olá! Quero falar com um especialista em planos de saúde.'

const SOBRE_CHIPS = [
  'Atendimento consultivo',
  'Soluções personalizadas',
  'Acompanhamento próximo',
]

const DIFERENCIAIS = [
  {
    icon: Search,
    title: 'Análise estratégica',
    desc: 'Avaliação técnica considerando perfil, utilização, cobertura e previsibilidade.',
  },
  {
    icon: HandHeart,
    title: 'Acompanhamento próximo',
    desc: 'Suporte consultivo em todas as etapas da jornada.',
  },
  {
    icon: Layers,
    title: 'Estrutura multissoluções',
    desc: 'Integração entre saúde, benefícios e planejamento.',
  },
]

function HeroSection() {
  const wa = formatWhatsAppLink(WHATSAPP, HERO_WA)
  return (
    <section
      className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
      style={{ background: 'linear-gradient(135deg, #0d2240 0%, #142f54 60%, #0f2548 100%)' }}
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-[480px] w-[480px] rounded-full bg-[#1a4b8a] opacity-[.18] blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 left-12 h-[280px] w-[280px] rounded-full bg-[#ae251c] opacity-[.10] blur-[90px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-[#ae251c]/30 bg-[#ae251c]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]">
                Saúde · Hold Corretora
              </span>
              <div className="rule-accent h-px max-w-[120px] flex-1" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              className="mt-6 text-display text-white text-pretty"
              style={{ fontSize: 'clamp(1.85rem, 4vw, 3.25rem)' }}
            >
              Soluções em saúde estruturadas com estratégia, análise e acompanhamento consultivo.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[58ch] text-pretty text-lg leading-relaxed text-[#7a9ab8]">
              A HOLD conecta pessoas, famílias e empresas às soluções em saúde mais adequadas
              para cada perfil, necessidade e momento.
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
                Falar com especialista
              </a>
              <a
                href="#saude-form"
                className="group inline-flex items-center gap-2 rounded-full bg-white/[0.08] ring-1 ring-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.12]"
              >
                Comparar planos
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.32} className="hidden lg:block">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/10">
            <Image
              src="/images/hero/saude.webp"
              alt="Pessoa avaliando opções de plano de saúde com consultor"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 50vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#0d2240]/70 via-transparent to-transparent"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function SobreSection() {
  return (
    <section
      id="saude-sobre"
      className="section-pad bg-[#07162a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8 saude-sobre-stage">
        <p className="saude-sobre-eyebrow">O JEITO HOLD</p>
        <h2 className="saude-sobre-h2">O jeito HOLD de estruturar soluções em saúde</h2>
        <p className="saude-sobre-body">
          Mais do que intermediar soluções, atuamos de forma consultiva na construção de
          estratégias em saúde, benefícios e planejamento.
        </p>
        <ol className="saude-sobre-values">
          {SOBRE_CHIPS.map((chip, i) => (
            <li key={chip} className="saude-sobre-value">
              <span className="saude-sobre-value-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="saude-sobre-value-label">{chip}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function DiferenciaisSection() {
  return (
    <section
      id="saude-diferenciais"
      className="section-pad bg-[#142f54]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            DIFERENCIAIS
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p
            className="mt-4 text-display italic text-white max-w-3xl"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            O diferencial não está apenas na solução. Está na forma de conduzir cada decisão.
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-16 grid md:grid-cols-3 gap-x-10 gap-y-12"
        >
          {DIFERENCIAIS.map((d, i) => {
            const Icon = d.icon
            return (
              <motion.div
                key={d.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
                  },
                }}
                className={
                  i === 0
                    ? ''
                    : 'md:border-l md:border-white/10 md:pl-8'
                }
              >
                <Icon size={32} strokeWidth={1.6} className="text-[#ae251c]" />
                <h3 className="mt-6 text-white font-semibold text-lg">{d.title}</h3>
                <p className="mt-3 text-[#7a9ab8] leading-relaxed text-sm">{d.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function CtaFinalSection() {
  const wa = formatWhatsAppLink(WHATSAPP, HERO_WA)
  return (
    <section
      id="saude-form"
      className="section-tight bg-[#142f54]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            FALE COM A HOLD
          </p>
          <h2
            className="mt-4 text-display text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
          >
            Conte com a HOLD para estruturar sua solução em saúde com inteligência e segurança.
          </h2>
          <p className="mt-6 max-w-[58ch] text-pretty text-[#7a9ab8] leading-relaxed">
            Nossa equipe está pronta para entender seu cenário e conectar você às alternativas
            mais adequadas para sua realidade.
          </p>
          <div className="mt-8 rule-accent h-px w-24" />
          <p className="mt-6 text-sm text-[#7a9ab8]">
            Sem custo · sem compromisso · resposta em horário comercial.
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-6 py-3 transition-colors"
          >
            <WhatsAppIcon size={16} />
            Falar com especialista no WhatsApp
          </a>
        </Reveal>

        <Reveal delay={0.12}>
          <ServiceLeadForm
            service="Saúde"
            introTitle="Falar com especialista"
            introBody="Conta seu cenário — perfil, modalidade, momento. Voltamos com a alternativa mais adequada."
          />
        </Reveal>
      </div>
    </section>
  )
}

export default function SaudeClient() {
  return (
    <>
      <HeroSection />
      <SobreSection />
      <SaudeModalidades />
      <DiferenciaisSection />
      <SaudeOperadoras />
      <SaudeFAQ />
      <CtaFinalSection />
    </>
  )
}
