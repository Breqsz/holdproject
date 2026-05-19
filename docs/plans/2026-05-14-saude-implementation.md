# Página /saude — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescrever `SaudeClient.tsx` com conteúdo real — hero dark navy, seletor de categorias PF animado, card B2B PJ e jornada de 4 passos.

**Architecture:** O `SaudeClient.tsx` orquestra tudo em um único arquivo (mesmo padrão de `ConsorciosClient.tsx`): `HeroSection`, `CategoryDetail`, `ParaVoceContent`, `ParaEmpresaContent` como funções internas. `SaudeJornada` é extraído como componente reutilizável em `components/sections/`.

**Tech Stack:** Next.js 14 App Router, React, Framer Motion (`motion`, `AnimatePresence`, `layoutId`), Tailwind CSS, Lucide React, `@/lib/audience` (useAudience), `@/lib/utils` (formatWhatsAppLink), `@testing-library/react`, Vitest.

**Spec:** `docs/specs/2026-05-14-saude-design.md`

---

## Mapa de arquivos

| Arquivo | Ação | Responsabilidade |
|--------|------|-----------------|
| `components/sections/SaudeJornada.tsx` | Criar | Timeline 4 passos + badge ANS + CTA |
| `components/sections/SaudeJornada.test.tsx` | Criar | Testes de renderização do componente |
| `app/saude/SaudeClient.tsx` | Reescrever | Hero + seletor PF + card PJ + form |

---

## Task 1: SaudeJornada — TDD

**Files:**
- Create: `components/sections/SaudeJornada.tsx`
- Create: `components/sections/SaudeJornada.test.tsx`

- [ ] **Step 1.1: Escrever o teste com falha**

Crie `components/sections/SaudeJornada.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SaudeJornada from './SaudeJornada'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        ({ children, ...rest }: any) => {
          const {
            initial, animate, whileInView, viewport, transition,
            layoutId, exit, whileHover, whileTap, variants, ...d
          } = rest
          void initial; void animate; void whileInView; void viewport
          void transition; void layoutId; void exit; void whileHover
          void whileTap; void variants
          return React.createElement(tag, d, children)
        },
    }
  )
  return { motion, useReducedMotion: () => false }
})

describe('SaudeJornada', () => {
  it('renders section heading', () => {
    render(<SaudeJornada />)
    expect(screen.getByRole('heading', { level: 3, name: /Como conduzimos o processo/i })).toBeInTheDocument()
  })

  it('renders all 4 step titles', () => {
    render(<SaudeJornada />)
    expect(screen.getByText('Diagnóstico')).toBeInTheDocument()
    expect(screen.getByText('Comparativo')).toBeInTheDocument()
    expect(screen.getByText('Contratação')).toBeInTheDocument()
    expect(screen.getByText('Acompanhamento')).toBeInTheDocument()
  })

  it('renders ANS regulatory badge', () => {
    render(<SaudeJornada />)
    expect(screen.getByText(/regulamentada pela ANS/i)).toBeInTheDocument()
  })

  it('renders CTA linking to WhatsApp', () => {
    render(<SaudeJornada />)
    const cta = screen.getByRole('link', { name: /Quero comparar planos/i })
    expect(cta).toBeInTheDocument()
    expect(cta.getAttribute('href') ?? '').toMatch(/^https?:\/\//)
  })
})
```

- [ ] **Step 1.2: Rodar o teste para confirmar falha**

```bash
npx vitest run components/sections/SaudeJornada.test.tsx
```

Esperado: FAIL — `Cannot find module './SaudeJornada'`

- [ ] **Step 1.3: Implementar SaudeJornada.tsx**

Crie `components/sections/SaudeJornada.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { formatWhatsAppLink } from '@/lib/utils'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const steps = [
  {
    title: 'Diagnóstico',
    desc: 'Perfil de uso, faixa etária, rede preferida e histórico de operadora',
  },
  {
    title: 'Comparativo',
    desc: '3 a 5 opções com rede, carências, cobertura e preço por faixa',
  },
  {
    title: 'Contratação',
    desc: 'Conduzimos do início ao fim, sem burocracia ou surpresas',
  },
  {
    title: 'Acompanhamento',
    desc: 'Suporte em sinistros, reajustes e revisão anual do plano',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function SaudeJornada() {
  const [activeStep, setActiveStep] = useState(0)
  const wa = formatWhatsAppLink(WHATSAPP, 'Olá! Quero comparar planos de saúde para minha família.')

  useEffect(() => {
    const id = setInterval(() => setActiveStep((prev) => (prev + 1) % 4), 2500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mt-20" style={{ fontFamily: 'var(--font-outfit)' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="flex items-center gap-4 mb-10"
      >
        <h3
          className="text-display text-white"
          style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)' }}
        >
          Como conduzimos o processo
        </h3>
        <div className="rule-accent h-px flex-1 max-w-[140px]" />
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative"
      >
        <div
          aria-hidden
          className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-white/10"
        />
        <motion.div
          aria-hidden
          animate={{ scaleX: (activeStep + 1) / 4 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          style={{ transformOrigin: 'left' }}
          className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-[#ae251c]"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
          {steps.map(({ title, desc }, i) => {
            const isActive = activeStep === i
            return (
              <motion.div key={title} variants={fadeUp} className="flex flex-col gap-3">
                <span
                  className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold tabular transition-all duration-500 ${
                    isActive
                      ? 'bg-[#ae251c] text-white'
                      : 'bg-[#07162a] ring-1 ring-[#7a9ab8]/40 text-[#7a9ab8]'
                  }`}
                  style={{ boxShadow: isActive ? '0 0 18px rgba(174,37,28,0.32)' : 'none' }}
                >
                  {i + 1}
                </span>
                <p
                  className={`font-semibold text-sm leading-snug transition-colors duration-500 ${
                    isActive ? 'text-white' : 'text-[#7a9ab8]/55'
                  }`}
                >
                  {title}
                </p>
                <p
                  className={`text-xs leading-relaxed transition-colors duration-500 ${
                    isActive ? 'text-[#7a9ab8]' : 'text-[#7a9ab8]/40'
                  }`}
                >
                  {desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-16 flex justify-center"
      >
        <div className="rounded-full bg-[#0b1f3a] ring-1 ring-white/15 px-6 py-3 flex items-center gap-3">
          <ShieldCheck size={18} className="text-white shrink-0" strokeWidth={1.7} />
          <span className="text-[#e0e8f0] text-sm font-medium">
            Operação autorizada e regulamentada pela ANS
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-8 flex justify-center"
      >
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 bg-[#ae251c] hover:bg-[#921e16] text-white px-8 py-3.5 rounded-full font-semibold transition-colors duration-200"
        >
          Quero comparar planos
          <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight size={16} />
          </span>
        </a>
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 1.4: Rodar testes para confirmar aprovação**

```bash
npx vitest run components/sections/SaudeJornada.test.tsx
```

Esperado: PASS (4 testes)

- [ ] **Step 1.5: Commit**

```bash
git add components/sections/SaudeJornada.tsx components/sections/SaudeJornada.test.tsx
git commit -m "feat(saude): add SaudeJornada component with ANS badge and 4-step timeline"
```

---

## Task 2: Reescrever SaudeClient.tsx

**Files:**
- Modify: `app/saude/SaudeClient.tsx` (reescrita completa — arquivo vai do atual stub para a versão final)

> **Nota:** Este arquivo é reescrito inteiro de uma vez. Commits intermediários quebrariam o TypeScript pois `page.tsx` importa o `export default`. Escreva o arquivo completo antes de rodar qualquer verificação.

- [ ] **Step 2.1: Substituir todo o conteúdo de `app/saude/SaudeClient.tsx`**

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart, Users, Stethoscope, Activity,
  ChevronRight, ArrowRight,
} from 'lucide-react'
import { useAudience } from '@/lib/audience'
import { formatWhatsAppLink } from '@/lib/utils'
import { Reveal } from '@/components/motion/Reveal'
import { AudienceToggle } from '@/components/AudienceToggle'
import { ServiceLeadForm } from '@/components/forms/ServiceLeadForm'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import SaudeJornada from '@/components/sections/SaudeJornada'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const SPRING = { type: 'spring' as const, stiffness: 110, damping: 22 }
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

type CategoryId = 'individual' | 'familiar' | 'odonto' | 'telemedicina'

const CATEGORIES: { id: CategoryId; icon: React.ElementType; label: string }[] = [
  { id: 'individual',   icon: Heart,       label: 'Individual'   },
  { id: 'familiar',     icon: Users,       label: 'Familiar'     },
  { id: 'odonto',       icon: Stethoscope, label: 'Odonto'       },
  { id: 'telemedicina', icon: Activity,    label: 'Telemedicina' },
]

type CategoryData = {
  seq: string
  title: string
  desc: string
  items: string[]
  ideal: string
}

const CATEGORY_DATA: Record<CategoryId, CategoryData> = {
  individual: {
    seq: '01 / 04',
    title: 'Individual',
    desc: 'Comparamos operadoras locais e nacionais por rede credenciada, carências, cobertura ambulatorial e hospitalar. Recomendamos com base no seu perfil — não no maior comissionamento.',
    items: [
      'Rede credenciada na sua cidade',
      'Tabelas de carência por operadora',
      'Cobertura ambulatorial e hospitalar',
      'Política de reembolso',
    ],
    ideal: 'Profissionais liberais, autônomos e pessoas sem vínculo empregatício que precisam de cobertura independente.',
  },
  familiar: {
    seq: '02 / 04',
    title: 'Familiar',
    desc: 'Planos com coberturas para diferentes faixas etárias no mesmo contrato. Avaliamos cobertura pediátrica, maternidade e idosos com critério.',
    items: [
      'Cobertura obstétrica e maternidade',
      'Planos pediátricos',
      'Faixas etárias e reajustes',
      'Portabilidade de carências',
    ],
    ideal: 'Famílias com filhos pequenos que precisam de atenção especial à cobertura obstétrica e pediátrica.',
  },
  odonto: {
    seq: '03 / 04',
    title: 'Odonto',
    desc: 'Cobertura odontológica avulsa ou complementar — procedimentos preventivos, restaurações, próteses e ortodontia.',
    items: [
      'Preventivo e restaurador',
      'Ortodontia',
      'Próteses e implantes',
      'Individual ou familiar',
    ],
    ideal: 'Quem quer complementar o plano de saúde com cobertura odontológica, ou contratar odonto de forma independente.',
  },
  telemedicina: {
    seq: '04 / 04',
    title: 'Telemedicina',
    desc: 'Atendimento remoto integrado a planos selecionados. Consultas 24/7 com clínicos, pediatras e especialistas — sem filas, sem deslocamento.',
    items: [
      'Atendimento 24/7',
      'Clínico, pediatra e especialistas',
      'Receituário digital',
      'Integrado a planos parceiros',
    ],
    ideal: 'Complemento a planos com rede menor — amplia o acesso sem trocar de operadora.',
  },
}

function HeroSection() {
  const { audience } = useAudience()
  const wa = formatWhatsAppLink(
    WHATSAPP,
    audience === 'pj'
      ? 'Olá! Quero conhecer as opções de Plano de Saúde Empresarial.'
      : 'Olá! Quero comparar planos de saúde para minha família.',
  )

  return (
    <section
      className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
      style={{ background: 'linear-gradient(135deg, #0d2240 0%, #142f54 60%, #0f2548 100%)' }}
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-[480px] w-[480px] rounded-full bg-[#1a4b8a] opacity-[.18] blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-12 left-12 h-[280px] w-[280px] rounded-full bg-[#ae251c] opacity-[.10] blur-[90px]" />

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
              style={{ fontSize: 'clamp(2.25rem, 5.4vw, 4rem)' }}
            >
              Saúde com escolha consciente — sem letras miúdas.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[56ch] text-pretty text-lg leading-relaxed text-[#7a9ab8]">
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
                className="group inline-flex items-center gap-2 rounded-full bg-white/[0.08] ring-1 ring-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.12]"
              >
                Comparar planos
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="hidden lg:block">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/10">
            <Image
              src="/images/hero/saude.webp"
              alt="Pessoa avaliando opções de plano de saúde com consultor"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 50vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0d2240]/70 via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CategoryDetail({ id }: { id: CategoryId }) {
  const data = CATEGORY_DATA[id]
  const wa = formatWhatsAppLink(
    WHATSAPP,
    `Olá! Tenho interesse em plano de saúde — tipo: ${data.title}.`,
  )

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
      className="rounded-2xl bg-[#0b1f3a] ring-1 ring-[#ae251c]/30 px-6 py-7 md:px-10 md:py-10"
    >
      <div className="flex items-baseline gap-4">
        <span className="tabular text-[#ae251c]/70 text-xs font-semibold tracking-[0.2em]">
          {data.seq}
        </span>
        <h3 className="text-display text-white" style={{ fontSize: 'clamp(1.35rem, 2.4vw, 1.75rem)' }}>
          {data.title}
        </h3>
      </div>
      <p className="mt-3 text-[#7a9ab8] leading-relaxed max-w-[60ch]">{data.desc}</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c] mb-3">
            O que analisamos
          </p>
          <ul className="space-y-2">
            {data.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#e0e8f0]">
                <ChevronRight size={14} className="mt-0.5 shrink-0 text-[#ae251c]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8] mb-3">
            Para quem é ideal
          </p>
          <p className="text-sm text-[#7a9ab8] leading-relaxed">{data.ideal}</p>
        </div>
      </div>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#25d366] hover:bg-[#1ebe5d] text-white font-semibold text-sm px-6 py-3 transition-colors"
      >
        <WhatsAppIcon size={16} />
        Falar no WhatsApp
      </a>
    </motion.div>
  )
}

function ParaVoceContent() {
  const [selected, setSelected] = useState<CategoryId>('individual')

  return (
    <motion.div
      key="voce"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
    >
      <div className="max-w-3xl mb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#7a9ab8]">
          Planos para você e sua família
        </span>
        <h2 className="mt-5 text-display text-white" style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}>
          Qual tipo de cobertura você precisa?
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CATEGORIES.map(({ id, icon: Icon, label }, i) => {
          const isSelected = selected === id
          return (
            <motion.button
              key={id}
              onClick={() => setSelected(id)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: i * 0.04 }}
              whileTap={{ scale: 0.98 }}
              className={[
                'relative cursor-pointer rounded-xl px-3 py-4 text-center transition-colors duration-200',
                isSelected
                  ? 'bg-[#ae251c] text-white'
                  : 'bg-[#142f54] text-[#7a9ab8] hover:bg-[#1e4a7a] hover:text-white',
              ].join(' ')}
            >
              <Icon size={26} className="mx-auto mb-2" strokeWidth={1.6} />
              <span className="text-xs font-semibold leading-snug">{label}</span>
              {isSelected && (
                <motion.span
                  layoutId="saude-cat-pill"
                  className="absolute inset-0 rounded-xl bg-[#ae251c] -z-10"
                  transition={SPRING}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <CategoryDetail key={selected} id={selected} />
        </AnimatePresence>
      </div>

      <SaudeJornada />
    </motion.div>
  )
}

function ParaEmpresaContent() {
  const wa = formatWhatsAppLink(
    WHATSAPP,
    'Olá! Quero conhecer as opções de Plano de Saúde Empresarial.',
  )

  return (
    <motion.div
      key="empresa"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
    >
      <div className="max-w-3xl mb-10">
        <span className="inline-flex items-center rounded-full bg-[#ae251c]/20 text-[#ae251c] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">
          Saúde Empresarial
        </span>
        <h2 className="mt-5 text-display text-white" style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}>
          Planos coletivos para PMEs e corporações.
        </h2>
      </div>

      <div
        className="rounded-2xl px-6 py-10 md:px-12 md:py-12 ring-1 ring-white/10"
        style={{ background: 'linear-gradient(135deg, #0b1f3a 0%, #142f54 100%)' }}
      >
        <p className="text-[#7a9ab8] leading-relaxed max-w-2xl text-lg">
          Da micro-empresa com 2 colaboradores à corporação com centenas de vidas — estruturamos planos
          coletivos com análise de sinistralidade, migração assistida e gestão de adesão. RH mais leve,
          time mais saudável.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ae251c]">
            Diferenciais do atendimento B2B
          </p>
          <div className="rule-accent h-px flex-1 max-w-[100px]" />
        </div>

        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
          {[
            'Diagnóstico de sinistralidade antes da renovação',
            'Migração assistida sem gap de cobertura',
            'Odonto empresarial integrado ao plano principal',
            'Suporte em onboarding e comunicação com RH',
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.05} className="flex items-start gap-3 text-[#e0e8f0]">
              <ChevronRight size={16} className="mt-0.5 shrink-0 text-[#ae251c]" />
              <span className="text-sm leading-relaxed">{item}</span>
            </Reveal>
          ))}
        </ul>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#ae251c] hover:bg-[#c42d22] text-white font-semibold text-sm px-6 py-3 transition-colors"
        >
          <WhatsAppIcon size={16} />
          Falar com especialista empresarial
        </a>
      </div>
    </motion.div>
  )
}

export default function SaudeClient() {
  const { audience } = useAudience()

  return (
    <>
      <HeroSection />

      <section
        className="section-pad bg-[#07162a]"
        id="saude-content"
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {audience === 'pf' ? <ParaVoceContent /> : <ParaEmpresaContent />}
          </AnimatePresence>
        </div>
      </section>

      <section
        className="section-tight bg-[#142f54]"
        id="saude-form"
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
              Análise personalizada
            </p>
            <h2
              className="mt-4 text-display text-white"
              style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
            >
              Encontre o plano certo — sem esforço.
            </h2>
            <p className="mt-6 max-w-[58ch] text-pretty text-[#7a9ab8] leading-relaxed">
              Conta o seu perfil de uso, faixa etária e cidade. Voltamos com 2 a 3 opções comparadas
              por rede, carências e preço — no primeiro retorno.
            </p>
            <div className="mt-8 rule-accent h-px w-24" />
            <p className="mt-6 text-sm text-[#7a9ab8]">
              Sem custo · sem compromisso · resposta em horário comercial.
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
```

- [ ] **Step 2.2: Verificar TypeScript sem erros**

```bash
npx tsc --noEmit
```

Esperado: sem erros. Se aparecer erro no `bg-white/[0.08]`, é Tailwind arbitrary value — ignorar (só afeta CSS, não TypeScript).

- [ ] **Step 2.3: Rodar todos os testes**

```bash
npx vitest run
```

Esperado: todos os testes passam (o suite de `SaudeJornada` já existe da Task 1).

- [ ] **Step 2.4: Build de produção**

```bash
npx next build
```

Esperado: build completo sem erros de compilação.

- [ ] **Step 2.5: Commit final**

```bash
git add app/saude/SaudeClient.tsx
git commit -m "feat(saude): complete page rewrite — dark hero, PF selector, PJ card, lead form"
```

---

## Checklist de cobertura do spec

- [x] Hero dark `#142f54` com blobs, dot-grid e imagem `saude.webp` — Task 2
- [x] Eyebrow pill vermelho `#ae251c` — Task 2
- [x] `AudienceToggle variant="dark"` — Task 2
- [x] WhatsApp messages distintos por audiência — Task 2
- [x] `AnimatePresence mode="wait"` bifurcando PF/PJ — Task 2
- [x] CategoryGrid 4 botões com `layoutId="saude-cat-pill"` — Task 2
- [x] CategoryDetail animado com conteúdo real por categoria — Task 2
- [x] `SaudeJornada` com 4 passos + badge ANS + CTA — Task 1
- [x] Card PJ com body, 4 diferenciais, CTA WhatsApp — Task 2
- [x] Formulário `ServiceLeadForm` com copy contextual — Task 2
- [x] `id="saude-form"` para o scroll do CTA do hero — Task 2
- [x] Strings hard-coded sem i18n — Tasks 1 e 2
