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
      <div data-impeccable-variants="19d7854f" data-impeccable-variant-count="3" style={{ display: "contents" }}>
        {/* impeccable-variants-start 19d7854f */}
        {/* Original */}
        <div data-impeccable-variant="original">
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
                    src="/images/hero/saude.webp"
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
        </div>
        {/* Variants: insert below this line */}
        <style data-impeccable-css="19d7854f">{`
          @scope ([data-impeccable-variant="1"]) {
            :scope > .v1-root {
              position: relative;
              overflow: hidden;
              background: #f4f1ea;
              padding: clamp(7rem, 13vw, 11rem) 0 clamp(3rem, 6vw, 5rem);
              isolation: isolate;
            }
            :scope .v1-vignette {
              position: absolute; inset: 0;
              background:
                radial-gradient(60% 80% at 88% 12%, rgba(20,47,84,0.06), transparent 60%),
                radial-gradient(40% 60% at 6% 96%, rgba(174,37,28,0.05), transparent 60%);
              pointer-events: none;
            }
            :scope .v1-grid {
              position: relative; z-index: 1;
              display: grid;
              grid-template-columns: 1fr;
              grid-template-areas: "spec" "headline" "image" "toggle" "ctas";
              max-width: min(1480px, 96vw);
              margin: 0 auto;
              padding: 0 clamp(1rem, 3vw, 2.5rem);
              gap: clamp(1.25rem, 2vw, 2rem);
            }
            @media (min-width: 1024px) {
              :scope .v1-grid {
                grid-template-columns: 1fr 0.32fr;
                grid-template-areas:
                  "spec     spec"
                  "headline image"
                  "toggle   image"
                  "ctas     image";
                column-gap: clamp(2rem, 4vw, 4rem);
                align-items: end;
              }
            }
            :scope .v1-spec {
              grid-area: spec;
              display: flex; align-items: center; gap: 1rem;
              font-family: var(--font-outfit);
              font-size: 10px;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: #142f54;
              font-weight: 600;
            }
            :scope .v1-spec b { font-weight: 700; }
            :scope .v1-spec .rule {
              flex: 1; height: 1px;
              background: linear-gradient(90deg, rgba(20,47,84,0.4), rgba(20,47,84,0.05));
            }
            :scope .v1-spec .stamp {
              font-variant-numeric: tabular-nums;
              color: rgba(20,47,84,0.55);
            }
            :scope .v1-headline {
              grid-area: headline;
              margin: 0;
              color: #07162a;
              font-family: var(--font-cormorant);
              line-height: 0.92;
              letter-spacing: -0.022em;
              text-wrap: balance;
              font-size: calc(clamp(3rem, 12.5vw, 10.5rem) * var(--p-headline-size, 1));
              font-style: italic;
              font-weight: 400;
            }
            :scope .v1-headline .accent { color: #ae251c; font-style: italic; }
            :scope[data-p-display-mode="roman"] .v1-headline { font-style: normal; font-weight: 600; }
            :scope[data-p-display-mode="roman"] .v1-headline .accent { font-style: normal; }
            :scope[data-p-display-mode="mixed"] .v1-headline { font-style: normal; font-weight: 500; }
            :scope[data-p-display-mode="mixed"] .v1-headline em { font-style: italic; font-weight: 400; }
            :scope .v1-toggle { grid-area: toggle; margin-top: 0.5rem; }
            :scope .v1-ctas {
              grid-area: ctas;
              display: flex; flex-direction: column;
              border-top: 1px solid rgba(20,47,84,0.18);
              padding-top: 1.5rem;
              margin-top: 1rem;
              gap: 0;
            }
            :scope .v1-cta {
              display: flex; align-items: baseline; justify-content: space-between;
              padding: 1rem 0;
              border-bottom: 1px solid rgba(20,47,84,0.12);
              font-family: var(--font-outfit);
              text-decoration: none;
              transition: padding-left 280ms cubic-bezier(0.16,1,0.3,1), color 200ms;
            }
            :scope .v1-cta:hover { padding-left: 0.5rem; }
            :scope .v1-cta-label {
              font-size: clamp(1rem, 1.4vw, 1.25rem);
              font-weight: 500;
              color: #07162a;
              letter-spacing: -0.005em;
            }
            :scope .v1-cta-meta {
              font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
              color: rgba(20,47,84,0.55);
              font-weight: 600;
              display: inline-flex; align-items: center; gap: 0.5rem;
            }
            :scope .v1-cta--wa .v1-cta-label::before {
              content: ""; display: inline-block;
              width: 8px; height: 8px; border-radius: 999px;
              background: #25D366; margin-right: 0.75rem;
              transform: translateY(-2px);
            }
            :scope .v1-image {
              grid-area: image;
              position: relative;
              aspect-ratio: 3 / 5;
              border-radius: 0;
              overflow: hidden;
              filter: grayscale(0.18) contrast(1.04);
            }
            :scope .v1-image::after {
              content: ""; position: absolute; inset: 0;
              background: linear-gradient(180deg, transparent 55%, rgba(7,22,42,0.42));
              pointer-events: none;
            }
            :scope .v1-image img { width: 100%; height: 100%; object-fit: cover; }
            @media (max-width: 1023px) {
              :scope .v1-image { aspect-ratio: 4/3; }
            }
            @media (prefers-reduced-motion: no-preference) {
              :scope .v1-headline { animation: v1-rise 900ms cubic-bezier(0.16,1,0.3,1) both; }
              @keyframes v1-rise { from { opacity: 0; transform: translateY(0.4em); } to { opacity: 1; transform: none; } }
            }
          }

          @scope ([data-impeccable-variant="2"]) {
            :scope > .v2-root {
              position: relative;
              isolation: isolate;
              min-height: clamp(560px, 88vh, 820px);
              display: grid;
              grid-template-columns: var(--p-split-balance-pct, 50%) 1fr;
              overflow: hidden;
              background: #f4f1ea;
            }
            @media (max-width: 900px) {
              :scope > .v2-root { grid-template-columns: 1fr; min-height: auto; }
            }
            :scope .v2-cream {
              position: relative;
              background: #f4f1ea;
              padding: clamp(5rem, 9vw, 8rem) clamp(1.5rem, 4vw, 3.5rem) clamp(2.5rem, 5vw, 4rem);
              display: flex; flex-direction: column; justify-content: center;
              gap: clamp(1.25rem, 2vw, 1.75rem);
              color: #07162a;
            }
            :scope .v2-navy {
              position: relative;
              background: #07162a;
              padding: clamp(5rem, 9vw, 8rem) clamp(1.5rem, 4vw, 3.5rem) clamp(2.5rem, 5vw, 4rem);
              display: flex; flex-direction: column; justify-content: flex-end;
              color: #f4f1ea;
              overflow: hidden;
            }
            :scope[data-p-accent="red"] .v2-navy { background: #2a0c0a; }
            :scope[data-p-accent="gold"] .v2-navy { background: #1a1408; }
            :scope .v2-navy::before {
              content: ""; position: absolute; inset: 0;
              background:
                radial-gradient(50% 60% at 80% 0%, rgba(201,168,76,0.10), transparent 70%),
                radial-gradient(60% 50% at 0% 100%, rgba(174,37,28,0.18), transparent 70%);
              pointer-events: none;
            }
            :scope[data-p-accent="navy"] .v2-navy::before {
              background: radial-gradient(60% 80% at 100% 0%, rgba(20,47,84,0.45), transparent 70%);
            }
            :scope[data-p-accent="gold"] .v2-navy::before {
              background: radial-gradient(60% 60% at 80% 10%, rgba(201,168,76,0.22), transparent 70%);
            }
            :scope .v2-seam {
              position: absolute; top: 0; bottom: 0;
              left: var(--p-split-balance-pct, 50%);
              transform: translateX(-50%);
              width: 1px;
              background: linear-gradient(180deg, rgba(20,47,84,0.18), rgba(201,168,76,0.45), rgba(20,47,84,0.18));
              z-index: 2;
            }
            @media (max-width: 900px) { :scope .v2-seam { display: none; } }
            :scope .v2-spec {
              font-family: var(--font-outfit);
              font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
              color: rgba(20,47,84,0.7);
              display: inline-flex; align-items: center; gap: 0.65rem;
            }
            :scope .v2-spec::before {
              content: ""; width: 28px; height: 1px; background: #ae251c;
            }
            :scope .v2-headline {
              margin: 0;
              font-family: var(--font-cormorant);
              font-style: italic;
              font-weight: 400;
              line-height: 0.95;
              letter-spacing: -0.02em;
              font-size: clamp(2.4rem, 5.4vw, 4.6rem);
              text-wrap: balance;
            }
            :scope .v2-headline .em { font-style: normal; color: #ae251c; }
            :scope[data-p-accent="gold"] .v2-headline .em { color: #c9a84c; }
            :scope[data-p-accent="navy"] .v2-headline .em { color: #142f54; }
            :scope .v2-lede {
              font-family: var(--font-outfit);
              font-size: clamp(0.95rem, 1.15vw, 1.05rem);
              line-height: 1.6;
              color: rgba(20,47,84,0.75);
              max-width: 36ch;
            }
            :scope .v2-toggle-wrap { margin-top: 0.5rem; }
            :scope .v2-stack {
              position: relative; z-index: 1;
              display: flex; flex-direction: column; gap: 1.25rem;
            }
            :scope .v2-stack-bottom {
              position: relative; z-index: 1;
              display: flex; flex-direction: column; gap: 1.5rem;
              align-items: flex-start;
            }
            :scope .v2-image {
              position: absolute; inset: 0;
              z-index: 0;
              opacity: 0.32;
              filter: grayscale(0.4) contrast(1.1) brightness(0.85);
            }
            :scope .v2-image img { width: 100%; height: 100%; object-fit: cover; }
            :scope .v2-image::after {
              content: ""; position: absolute; inset: 0;
              background: linear-gradient(180deg, rgba(7,22,42,0.4), rgba(7,22,42,0.85));
            }
            :scope .v2-stat {
              font-family: var(--font-cormorant);
              font-style: italic;
              font-size: clamp(3rem, 7vw, 5.5rem);
              line-height: 0.9;
              color: #c9a84c;
              letter-spacing: -0.02em;
            }
            :scope[data-p-accent="red"] .v2-stat { color: #e8a698; }
            :scope[data-p-accent="navy"] .v2-stat { color: #f4f1ea; }
            :scope .v2-stat-meta {
              font-family: var(--font-outfit);
              font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase;
              color: rgba(244,241,234,0.7);
              margin-top: 0.5rem;
            }
            :scope .v2-ctas {
              display: flex; flex-wrap: wrap; gap: 0.75rem;
              margin-top: 0.5rem;
            }
            :scope .v2-cta {
              display: inline-flex; align-items: center; gap: 0.55rem;
              padding: 0.85rem 1.5rem;
              border-radius: 999px;
              font-family: var(--font-outfit);
              font-size: 13px; font-weight: 600; letter-spacing: 0.01em;
              text-decoration: none;
              transition: transform 240ms cubic-bezier(0.16,1,0.3,1), background 200ms;
            }
            :scope .v2-cta--wa { background: #25D366; color: #fff; }
            :scope .v2-cta--wa:hover { background: #1ebe5d; }
            :scope .v2-cta--ghost {
              background: transparent;
              color: #f4f1ea;
              border: 1px solid rgba(244,241,234,0.35);
            }
            :scope .v2-cta--ghost:hover { background: rgba(244,241,234,0.08); }
          }

          @scope ([data-impeccable-variant="3"]) {
            :scope > .v3-root {
              position: relative;
              overflow: hidden;
              background: #f4f1ea;
              padding: clamp(7rem, 12vw, 10rem) 0 clamp(4rem, 7vw, 6rem);
              isolation: isolate;
              view-timeline-name: --v3-hero;
            }
            :scope .v3-glow-a {
              position: absolute; top: -180px; right: -160px;
              width: 520px; height: 520px; border-radius: 999px;
              background: #142f54; opacity: 0.05; filter: blur(120px);
              pointer-events: none;
            }
            :scope .v3-glow-b {
              position: absolute; bottom: -100px; left: 4rem;
              width: 320px; height: 320px; border-radius: 999px;
              background: #ae251c; opacity: 0.08; filter: blur(100px);
              pointer-events: none;
            }
            :scope .v3-grid {
              position: relative; z-index: 1;
              display: grid;
              grid-template-columns: 1fr;
              gap: clamp(2rem, 4vw, 3rem);
              max-width: min(1320px, 94vw);
              margin: 0 auto;
              padding: 0 clamp(1.25rem, 3vw, 2rem);
            }
            @media (min-width: 1024px) {
              :scope .v3-grid {
                grid-template-columns: 1.15fr 1fr;
                align-items: center;
                column-gap: clamp(2.5rem, 4vw, 4rem);
              }
            }
            :scope .v3-spec {
              display: flex; align-items: center; gap: 0.85rem;
              font-family: var(--font-outfit);
              font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
              color: #142f54; font-weight: 600;
            }
            :scope .v3-spec .dot {
              width: 6px; height: 6px; border-radius: 999px; background: #ae251c;
              animation: v3-pulse 2.4s ease-in-out infinite;
            }
            :scope .v3-spec .rule {
              flex: 0 1 120px; height: 1px;
              background: linear-gradient(90deg, rgba(20,47,84,0.4), transparent);
            }
            :scope .v3-headline {
              margin: 1.5rem 0 0;
              color: #07162a;
              font-family: var(--font-cormorant);
              font-style: italic;
              font-weight: 400;
              line-height: 0.95;
              letter-spacing: -0.02em;
              font-size: clamp(2.5rem, 5.6vw, 4.4rem);
              text-wrap: balance;
            }
            :scope .v3-headline .word {
              display: inline-block;
              clip-path: inset(0 0 0 0);
              animation: v3-clip 1100ms cubic-bezier(0.16,1,0.3,1) both;
            }
            :scope .v3-headline .word:nth-child(1) { animation-delay: 80ms; }
            :scope .v3-headline .word:nth-child(2) { animation-delay: 160ms; }
            :scope .v3-headline .word:nth-child(3) { animation-delay: 240ms; }
            :scope .v3-headline .word:nth-child(4) { animation-delay: 320ms; }
            :scope .v3-headline .word:nth-child(5) { animation-delay: 400ms; }
            :scope .v3-headline .word:nth-child(6) { animation-delay: 480ms; }
            :scope .v3-headline .word:nth-child(7) { animation-delay: 560ms; }
            :scope .v3-headline .word:nth-child(8) { animation-delay: 640ms; }
            :scope .v3-headline em {
              font-style: italic; color: #ae251c;
            }
            :scope .v3-lede {
              margin: 1.5rem 0 0;
              font-family: var(--font-outfit);
              font-size: 1.05rem;
              line-height: 1.65;
              color: rgba(20,47,84,0.78);
              max-width: 56ch;
              opacity: 0;
              animation: v3-fade-up 900ms cubic-bezier(0.16,1,0.3,1) 760ms both;
            }
            :scope .v3-toggle {
              margin-top: 1.75rem;
              opacity: 0;
              animation: v3-fade-up 900ms cubic-bezier(0.16,1,0.3,1) 900ms both;
            }
            :scope .v3-ctas {
              margin-top: 1.75rem;
              display: flex; flex-wrap: wrap; gap: 0.75rem;
              opacity: 0;
              animation: v3-fade-up 900ms cubic-bezier(0.16,1,0.3,1) 1040ms both;
            }
            :scope .v3-cta {
              display: inline-flex; align-items: center; gap: 0.55rem;
              padding: 0.85rem 1.5rem;
              border-radius: 999px;
              font-family: var(--font-outfit);
              font-size: 13px; font-weight: 600;
              text-decoration: none;
              transition: transform 240ms cubic-bezier(0.16,1,0.3,1);
            }
            :scope .v3-cta--wa { background: #25D366; color: #fff; }
            :scope .v3-cta--wa:hover { background: #1ebe5d; }
            :scope .v3-cta--solid {
              background: #07162a; color: #f4f1ea;
            }
            :scope .v3-cta--solid:hover { transform: translateX(2px); }
            :scope .v3-stage {
              position: relative;
              aspect-ratio: 4/5;
              border-radius: 6px;
              overflow: hidden;
              ring: 1px solid rgba(20,47,84,0.1);
              box-shadow: 0 30px 80px -30px rgba(7,22,42,0.32);
            }
            :scope .v3-stage img { width: 100%; height: 100%; object-fit: cover; }
            :scope .v3-stage {
              clip-path: inset(0 100% 0 0);
              animation: v3-reveal 1400ms cubic-bezier(0.16,1,0.3,1) 200ms both;
            }
            :scope[data-p-reveal="bottom"] .v3-stage {
              clip-path: inset(100% 0 0 0);
              animation-name: v3-reveal-bottom;
            }
            :scope[data-p-reveal="fade"] .v3-stage {
              clip-path: none;
              opacity: 0;
              animation: v3-fade-in 1400ms cubic-bezier(0.16,1,0.3,1) 200ms both;
            }
            :scope .v3-stage::after {
              content: ""; position: absolute; inset: 0;
              background: linear-gradient(220deg, transparent 60%, rgba(7,22,42,0.45));
              pointer-events: none;
            }
            :scope .v3-stage-caption {
              position: absolute;
              left: 1.25rem; right: 1.25rem; bottom: 1.25rem;
              font-family: var(--font-outfit);
              font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
              color: rgba(244,241,234,0.85);
              z-index: 2;
              display: flex; justify-content: space-between; gap: 1rem;
            }
            :scope .v3-stage-caption b {
              color: #c9a84c; font-weight: 600;
            }
            @supports (animation-timeline: view()) {
              :scope[data-p-scroll-tie="on"] .v3-headline {
                animation: none;
                animation-timeline: view();
                animation: v3-tie 1ms linear;
              }
            }
            @keyframes v3-clip {
              from { clip-path: inset(0 100% 0 0); opacity: 0; transform: translateY(0.2em); }
              to { clip-path: inset(0 0 0 0); opacity: 1; transform: none; }
            }
            @keyframes v3-reveal {
              from { clip-path: inset(0 100% 0 0); }
              to { clip-path: inset(0 0 0 0); }
            }
            @keyframes v3-reveal-bottom {
              from { clip-path: inset(100% 0 0 0); }
              to { clip-path: inset(0 0 0 0); }
            }
            @keyframes v3-fade-in {
              from { opacity: 0; transform: scale(1.04); }
              to { opacity: 1; transform: none; }
            }
            @keyframes v3-fade-up {
              from { opacity: 0; transform: translateY(0.6rem); }
              to { opacity: 1; transform: none; }
            }
            @keyframes v3-pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(0.85); }
            }
            @media (prefers-reduced-motion: reduce) {
              :scope .v3-headline .word,
              :scope .v3-stage,
              :scope .v3-lede,
              :scope .v3-toggle,
              :scope .v3-ctas,
              :scope .v3-spec .dot { animation: none !important; clip-path: none !important; opacity: 1 !important; transform: none !important; }
            }
          }
        `}</style>
        <div data-impeccable-variant="1" data-impeccable-params={'[{"id":"headline-size","kind":"range","min":0.7,"max":1.3,"step":0.05,"default":1,"label":"Headline scale"},{"id":"display-mode","kind":"steps","default":"italic","label":"Display style","options":[{"value":"italic","label":"Italic"},{"value":"roman","label":"Roman"},{"value":"mixed","label":"Mixed"}]}]'}>
          <section className="v1-root">
            <div className="v1-vignette" aria-hidden />
            <div className="v1-grid">
              <div className="v1-spec">
                <span><b>Saúde</b> · Hold Corretora</span>
                <span className="rule" />
                <span className="stamp">№ 01 / Uberlândia · 19+ anos</span>
              </div>
              <h1 className="v1-headline">
                Saúde com <em>escolha</em><br />
                <span className="accent">consciente.</span>
              </h1>
              <div className="v1-toggle">
                <AudienceToggle variant="dark" />
              </div>
              <div className="v1-ctas">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="v1-cta v1-cta--wa">
                  <span className="v1-cta-label">Falar no WhatsApp</span>
                  <span className="v1-cta-meta">conversa direta <ArrowRight size={14} /></span>
                </a>
                <a href="#saude-form" className="v1-cta v1-cta--solid">
                  <span className="v1-cta-label">Comparar planos</span>
                  <span className="v1-cta-meta">simulação <ArrowRight size={14} /></span>
                </a>
              </div>
              <div className="v1-image">
                <Image
                  src="/images/hero/saude.webp"
                  alt="Família planejando bem-estar e saúde em ambiente doméstico"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
            </div>
          </section>
        </div>
        <div data-impeccable-variant="2" data-impeccable-params={'[{"id":"split-balance","kind":"range","min":0.35,"max":0.65,"step":0.01,"default":0.5,"label":"Split balance"},{"id":"accent","kind":"steps","default":"red","label":"Accent","options":[{"value":"red","label":"Red"},{"value":"gold","label":"Gold"},{"value":"navy","label":"Navy"}]}]'} style={{ display: 'none', ['--p-split-balance-pct' as string]: 'calc(var(--p-split-balance, 0.5) * 100%)' }}>
          <section className="v2-root">
            <div className="v2-cream">
              <div className="v2-stack">
                <div className="v2-spec">Saúde · Hold Corretora</div>
                <h1 className="v2-headline">
                  Saúde com escolha <span className="em">consciente</span>, sem letras miúdas.
                </h1>
                <p className="v2-lede">
                  Comparamos operadoras com critérios reais: rede credenciada, custo,
                  carências, reembolsos. O plano que faz sentido pra você ou pra sua empresa.
                </p>
                <div className="v2-toggle-wrap">
                  <AudienceToggle variant="dark" />
                </div>
              </div>
            </div>
            <div className="v2-seam" aria-hidden />
            <div className="v2-navy">
              <div className="v2-image" aria-hidden>
                <Image
                  src="/images/hero/saude.webp"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className="v2-stack-bottom">
                <div>
                  <div className="v2-stat">19<span style={{ fontSize: '0.55em' }}>+</span></div>
                  <div className="v2-stat-meta">anos comparando operadoras · 60+ parceiros</div>
                </div>
                <div className="v2-ctas">
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="v2-cta v2-cta--wa">
                    <WhatsAppIcon size={14} />
                    Falar no WhatsApp
                  </a>
                  <a href="#saude-form" className="v2-cta v2-cta--ghost">
                    Comparar planos <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div data-impeccable-variant="3" data-impeccable-params={'[{"id":"reveal","kind":"steps","default":"right","label":"Reveal axis","options":[{"value":"right","label":"Clip →"},{"value":"bottom","label":"Clip ↑"},{"value":"fade","label":"Soft fade"}]},{"id":"scroll-tie","kind":"toggle","default":false,"label":"Scroll-tied headline"}]'} style={{ display: 'none' }}>
          <section className="v3-root">
            <div className="v3-glow-a" aria-hidden />
            <div className="v3-glow-b" aria-hidden />
            <div className="v3-grid">
              <div>
                <div className="v3-spec">
                  <span className="dot" />
                  <span>Saúde · Hold Corretora</span>
                  <span className="rule" />
                </div>
                <h1 className="v3-headline">
                  <span className="word">Saúde</span>{' '}
                  <span className="word">com</span>{' '}
                  <span className="word">escolha</span>{' '}
                  <span className="word"><em>consciente</em>,</span>{' '}
                  <span className="word">sem</span>{' '}
                  <span className="word">letras</span>{' '}
                  <span className="word">miúdas.</span>
                </h1>
                <p className="v3-lede">
                  Comparamos operadoras com critérios reais: rede credenciada, custo,
                  carências, reembolsos, para indicar o plano que faz sentido pra você ou
                  pra sua empresa.
                </p>
                <div className="v3-toggle">
                  <AudienceToggle variant="dark" />
                </div>
                <div className="v3-ctas">
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="v3-cta v3-cta--wa">
                    <WhatsAppIcon size={14} />
                    Falar no WhatsApp
                  </a>
                  <a href="#saude-form" className="v3-cta v3-cta--solid">
                    Comparar planos <ArrowRight size={14} />
                  </a>
                </div>
              </div>
              <div className="v3-stage">
                <Image
                  src="/images/hero/saude.webp"
                  alt="Família planejando bem-estar e saúde em ambiente doméstico"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="v3-stage-caption">
                  <span>Reel № 01</span>
                  <span><b>HOLD</b> · 2006 — hoje</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* impeccable-variants-end 19d7854f */}
      </div>

      {/* Benefits */}
      <section className="section-pad bg-[#142f54]" style={{ fontFamily: 'var(--font-outfit)' }}>
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
      <section className="section-tight bg-[#142f54]" id="saude-form" style={{ fontFamily: 'var(--font-outfit)' }}>
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
