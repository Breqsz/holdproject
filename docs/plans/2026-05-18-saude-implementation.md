# Página /saude (v2) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescrever a página `/saude` com 7 seções institucionais (Hero, Sobre, Modalidades accordion, Diferenciais, Operadoras, FAQ, CTA), substituindo o stub atual e descartando o pattern PF/PJ do spec antigo.

**Architecture:** Arquitetura híbrida. `SaudeClient.tsx` compõe seções "estáticas" inline (Hero, Sobre Nós, Diferenciais, CTA Final) e importa 3 componentes em `components/sections/saude/` para seções interativas (`SaudeModalidades`, `SaudeFAQ`, `SaudeOperadoras`). Strings hard-coded em português (sem i18n) — padrão de páginas de serviço da Hold.

**Tech Stack:** Next.js 14 App Router · React · TypeScript · Framer Motion (`motion`, `AnimatePresence`, `layoutId`) · Tailwind CSS · Lucide React · `@/lib/utils` (`formatWhatsAppLink`) · `@testing-library/react` · Vitest · LogoLoop existente.

**Spec:** `docs/specs/2026-05-18-saude-design.md`

---

## Mapa de arquivos

| Arquivo | Ação |
|---|---|
| `components/sections/saude/SaudeOperadoras.tsx` | Criar |
| `components/sections/saude/SaudeOperadoras.test.tsx` | Criar |
| `components/sections/saude/SaudeFAQ.tsx` | Criar |
| `components/sections/saude/SaudeFAQ.test.tsx` | Criar |
| `components/sections/saude/SaudeModalidades.tsx` | Criar |
| `components/sections/saude/SaudeModalidades.test.tsx` | Criar |
| `app/saude/SaudeClient.tsx` | Reescrever inteiro |
| `app/saude/SaudeClient.test.tsx` | Criar (smoke test) |

**Cliente fornece (antes do deploy):** 5 logos `.webp` em `public/images/logosEmpresasParceiras/`: `Amil.webp`, `Hapvida.webp`, `Omint.webp`, `PortoSeguro.webp`, `SegurosUnimed.webp`.

---

## Convenções

**Mock padrão de framer-motion** (usado em todos os testes desta página):

```tsx
vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const { initial, animate, whileInView, viewport, transition, layoutId, exit, whileHover, whileTap, variants, ...d } = rest
          void initial; void animate; void whileInView; void viewport; void transition; void layoutId
          void exit; void whileHover; void whileTap; void variants
          return React.createElement(tag, d, children)
        },
    }
  )
  const AnimatePresence = ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children)
  return { motion, AnimatePresence, useReducedMotion: () => false }
})
```

**Easing canônico** (importado de cada componente):

```ts
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
```

---

## Task 1: SaudeOperadoras — wrap LogoLoop

**Files:**
- Create: `components/sections/saude/SaudeOperadoras.tsx`
- Create: `components/sections/saude/SaudeOperadoras.test.tsx`

- [ ] **Step 1.1: Criar diretório**

```bash
mkdir -p components/sections/saude
```

- [ ] **Step 1.2: Escrever o teste com falha**

Crie `components/sections/saude/SaudeOperadoras.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SaudeOperadoras from './SaudeOperadoras'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const { initial, animate, whileInView, viewport, transition, layoutId, exit, whileHover, whileTap, variants, ...d } = rest
          void initial; void animate; void whileInView; void viewport; void transition; void layoutId
          void exit; void whileHover; void whileTap; void variants
          return React.createElement(tag, d, children)
        },
    }
  )
  return { motion, useReducedMotion: () => false }
})

vi.mock('@/components/motion/LogoLoop', () => ({
  __esModule: true,
  default: ({ logos, ariaLabel }: { logos: Array<{ alt?: string }>; ariaLabel?: string }) => (
    <div data-testid="logo-loop" aria-label={ariaLabel}>
      {logos.map((l, i) => (
        <span key={i}>{l.alt}</span>
      ))}
    </div>
  ),
}))

describe('SaudeOperadoras', () => {
  it('renders the section heading', () => {
    render(<SaudeOperadoras />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Trabalhamos com as principais seguradoras e operadoras do mercado/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the eyebrow', () => {
    render(<SaudeOperadoras />)
    expect(screen.getByText(/PARCEIROS/)).toBeInTheDocument()
  })

  it('renders the disclaimer subtitle', () => {
    render(<SaudeOperadoras />)
    expect(
      screen.getByText(/Disponibilidade varia conforme região, modalidade e perfil/i)
    ).toBeInTheDocument()
  })

  it('renders LogoLoop with all 8 operadoras', () => {
    render(<SaudeOperadoras />)
    const loop = screen.getByTestId('logo-loop')
    expect(loop).toBeInTheDocument()
    expect(loop).toHaveAttribute('aria-label', 'Operadoras de saúde parceiras')

    const expected = [
      'Amil',
      'Bradesco Saúde',
      'Hapvida',
      'Omint',
      'Porto Seguro',
      'Seguros Unimed',
      'SulAmérica',
      'Unimed',
    ]
    for (const name of expected) {
      expect(screen.getByText(name)).toBeInTheDocument()
    }
  })
})
```

- [ ] **Step 1.3: Rodar o teste para confirmar falha**

```bash
npx vitest run components/sections/saude/SaudeOperadoras.test.tsx
```

Esperado: FAIL — `Cannot find module './SaudeOperadoras'`

- [ ] **Step 1.4: Implementar SaudeOperadoras.tsx**

Crie `components/sections/saude/SaudeOperadoras.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import LogoLoop, { type LogoItem } from '@/components/motion/LogoLoop'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const OPERADORAS: LogoItem[] = [
  { src: '/images/logosEmpresasParceiras/Amil.webp', alt: 'Amil' },
  { src: '/images/logosEmpresasParceiras/bradesco.webp', alt: 'Bradesco Saúde' },
  { src: '/images/logosEmpresasParceiras/Hapvida.webp', alt: 'Hapvida' },
  { src: '/images/logosEmpresasParceiras/Omint.webp', alt: 'Omint' },
  { src: '/images/logosEmpresasParceiras/PortoSeguro.webp', alt: 'Porto Seguro' },
  { src: '/images/logosEmpresasParceiras/SegurosUnimed.webp', alt: 'Seguros Unimed' },
  { src: '/images/logosEmpresasParceiras/SulAmerica.webp', alt: 'SulAmérica' },
  { src: '/images/logosEmpresasParceiras/Unimed.webp', alt: 'Unimed' },
]

export default function SaudeOperadoras() {
  return (
    <section
      id="saude-operadoras"
      className="section-pad bg-[#F5F5F5]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
          className="max-w-3xl mb-12"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07162a]/55">
            PARCEIROS
          </p>
          <h2
            className="mt-4 text-display text-[#07162a]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            Trabalhamos com as principais seguradoras e operadoras do mercado
          </h2>
          <p className="mt-4 max-w-[60ch] text-[#07162a]/60 leading-relaxed text-sm">
            Disponibilidade varia conforme região, modalidade e perfil do beneficiário.
          </p>
        </motion.div>

        <div className="relative">
          <LogoLoop
            logos={OPERADORAS}
            speed={60}
            direction="left"
            logoHeight={44}
            gap={56}
            scaleOnHover
            fadeOut
            fadeOutColor="#F5F5F5"
            ariaLabel="Operadoras de saúde parceiras"
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 1.5: Rodar testes para confirmar aprovação**

```bash
npx vitest run components/sections/saude/SaudeOperadoras.test.tsx
```

Esperado: PASS (4 testes)

- [ ] **Step 1.6: Commit**

```bash
git add components/sections/saude/SaudeOperadoras.tsx components/sections/saude/SaudeOperadoras.test.tsx
git commit -m "feat(saude): add SaudeOperadoras section wrapping LogoLoop with 8 operadoras"
```

---

## Task 2: SaudeFAQ — accordion rico com sub-headings

**Files:**
- Create: `components/sections/saude/SaudeFAQ.tsx`
- Create: `components/sections/saude/SaudeFAQ.test.tsx`

- [ ] **Step 2.1: Escrever o teste com falha**

Crie `components/sections/saude/SaudeFAQ.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SaudeFAQ from './SaudeFAQ'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const { initial, animate, whileInView, viewport, transition, layoutId, exit, whileHover, whileTap, variants, ...d } = rest
          void initial; void animate; void whileInView; void viewport; void transition; void layoutId
          void exit; void whileHover; void whileTap; void variants
          return React.createElement(tag, d, children)
        },
    }
  )
  const AnimatePresence = ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children)
  return { motion, AnimatePresence, useReducedMotion: () => false }
})

describe('SaudeFAQ', () => {
  it('renders the section heading', () => {
    render(<SaudeFAQ />)
    expect(
      screen.getByRole('heading', { level: 2, name: /Perguntas frequentes sobre planos de saúde/i })
    ).toBeInTheDocument()
  })

  it('renders all 10 question buttons', () => {
    render(<SaudeFAQ />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(10)
    expect(screen.getByText(/Qual a diferença entre plano individual, coletivo por adesão e empresarial/i)).toBeInTheDocument()
    expect(screen.getByText(/MEI pode contratar plano empresarial/i)).toBeInTheDocument()
    expect(screen.getByText(/A HOLD acompanha após a contratação/i)).toBeInTheDocument()
  })

  it('starts with all items collapsed (aria-expanded=false)', () => {
    render(<SaudeFAQ />)
    const firstQ = screen.getByRole('button', {
      name: /Qual a diferença entre plano individual/i,
    })
    expect(firstQ).toHaveAttribute('aria-expanded', 'false')
  })

  it('expands an item on click', () => {
    render(<SaudeFAQ />)
    const firstQ = screen.getByRole('button', {
      name: /Qual a diferença entre plano individual/i,
    })
    fireEvent.click(firstQ)
    expect(firstQ).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders sub-headings inside Q8 (urgência/emergência) when expanded', () => {
    render(<SaudeFAQ />)
    const q8 = screen.getByRole('button', {
      name: /Como funcionam os atendimentos de urgência e emergência/i,
    })
    fireEvent.click(q8)
    expect(screen.getByText(/O que é considerado emergência\?/i)).toBeInTheDocument()
    expect(screen.getByText(/O que é considerado urgência\?/i)).toBeInTheDocument()
    expect(screen.getByText(/Qual o prazo de cobertura\?/i)).toBeInTheDocument()
    expect(screen.getByText(/Como funciona a cobertura nos planos hospitalares\?/i)).toBeInTheDocument()
    expect(screen.getByText(/Como funciona nos planos exclusivamente ambulatoriais\?/i)).toBeInTheDocument()
    expect(screen.getByText(/Por que é importante analisar o contrato\?/i)).toBeInTheDocument()
  })

  it('renders bullet items inside expanded answer', () => {
    render(<SaudeFAQ />)
    const q5 = screen.getByRole('button', {
      name: /O que é carência no plano de saúde/i,
    })
    fireEvent.click(q5)
    expect(screen.getByText(/24 horas para urgência e emergência/i)).toBeInTheDocument()
    expect(screen.getByText(/300 dias para parto a termo/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2.2: Rodar o teste para confirmar falha**

```bash
npx vitest run components/sections/saude/SaudeFAQ.test.tsx
```

Esperado: FAIL — `Cannot find module './SaudeFAQ'`

- [ ] **Step 2.3: Implementar SaudeFAQ.tsx**

Crie `components/sections/saude/SaudeFAQ.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

type FAQBlock =
  | { type: 'p'; text: string }
  | { type: 'h4'; text: string }
  | { type: 'ul'; items: string[] }

type FAQItem = {
  q: string
  body: FAQBlock[]
}

const FAQ_ITEMS: FAQItem[] = [
  {
    q: 'Qual a diferença entre plano individual, coletivo por adesão e empresarial?',
    body: [
      { type: 'p', text: 'Os planos de saúde variam conforme a modalidade de contratação e elegibilidade do beneficiário.' },
      { type: 'h4', text: 'Individual ou familiar' },
      { type: 'p', text: 'Contratado diretamente pela pessoa física, com cobertura destinada ao titular e seus dependentes.' },
      { type: 'h4', text: 'Coletivo por adesão' },
      { type: 'p', text: 'Voltado a profissionais vinculados a entidades de classe, sindicatos, associações ou conselhos profissionais elegíveis.' },
      { type: 'h4', text: 'Empresarial' },
      { type: 'p', text: 'Destinado a empresas de diferentes portes, incluindo MEIs, PMEs e grandes operações, mediante contratação vinculada ao CNPJ.' },
      { type: 'p', text: 'Cada modalidade possui características específicas relacionadas a:' },
      { type: 'ul', items: ['elegibilidade', 'reajustes', 'regras contratuais', 'composição do grupo', 'carências', 'formatos de contratação'] },
      { type: 'p', text: 'Por isso, a análise adequada do perfil e da necessidade é fundamental antes da contratação.' },
    ],
  },
  {
    q: 'MEI pode contratar plano empresarial?',
    body: [
      { type: 'p', text: 'Sim. O Microempreendedor Individual (MEI) pode contratar plano de saúde empresarial, desde que atenda aos critérios estabelecidos pela operadora e possua CNPJ ativo dentro das exigências regulatórias.' },
      { type: 'p', text: 'As condições variam conforme:' },
      { type: 'ul', items: ['tempo de abertura da empresa', 'número mínimo de vidas', 'operadora', 'região de comercialização', 'modalidade contratada'] },
      { type: 'p', text: 'Em muitos casos, o plano empresarial pode representar uma alternativa estratégica de custo-benefício para profissionais formalizados e suas famílias.' },
    ],
  },
  {
    q: 'Quem pode contratar plano coletivo por adesão?',
    body: [
      { type: 'p', text: 'Os planos coletivos por adesão são destinados a profissionais vinculados a:' },
      { type: 'ul', items: ['entidades de classe', 'sindicatos', 'associações profissionais', 'conselhos profissionais', 'categorias elegíveis'] },
      { type: 'p', text: 'A contratação depende da comprovação de vínculo com a entidade responsável pela adesão ao contrato coletivo.' },
      { type: 'p', text: 'Essa modalidade pode oferecer condições diferenciadas de contratação, mas exige análise criteriosa sobre:' },
      { type: 'ul', items: ['elegibilidade', 'regras de permanência', 'cobertura', 'rede credenciada', 'reajustes', 'cenário de longo prazo'] },
    ],
  },
  {
    q: 'Como escolher o plano ideal?',
    body: [
      { type: 'p', text: 'A escolha do plano de saúde envolve mais do que comparação de preço. É importante analisar fatores como:' },
      { type: 'ul', items: ['perfil de utilização', 'faixa etária', 'rede hospitalar', 'abrangência geográfica', 'acomodação', 'coparticipação', 'previsibilidade financeira', 'necessidades familiares ou empresariais', 'cenário de médio e longo prazo'] },
      { type: 'p', text: 'Além disso, diferentes modalidades podem apresentar vantagens específicas conforme o perfil do cliente.' },
      { type: 'p', text: 'A HOLD realiza uma análise consultiva e personalizada para auxiliar na construção da solução mais adequada para cada realidade.' },
    ],
  },
  {
    q: 'O que é carência no plano de saúde?',
    body: [
      { type: 'p', text: 'Carência é o período contado a partir do início de vigência do contrato em que determinadas coberturas ainda não podem ser utilizadas integralmente.' },
      { type: 'p', text: 'A Lei nº 9.656/98 estabelece prazos máximos de carência para planos regulamentados, incluindo:' },
      { type: 'ul', items: ['24 horas para urgência e emergência', 'até 180 dias para consultas, exames, internações e demais procedimentos', '300 dias para parto a termo', 'até 24 meses para cobertura parcial temporária relacionada a doenças ou lesões preexistentes'] },
      { type: 'p', text: 'Os prazos podem variar conforme:' },
      { type: 'ul', items: ['operadora', 'modalidade do plano', 'campanhas promocionais', 'análise de redução de carência', 'portabilidade'] },
    ],
  },
  {
    q: 'É possível reduzir ou aproveitar carências?',
    body: [
      { type: 'p', text: 'Sim, em alguns casos. Dependendo do histórico do beneficiário e das regras da operadora, pode haver:' },
      { type: 'ul', items: ['redução de carências', 'aproveitamento de prazos já cumpridos', 'portabilidade de carências', 'campanhas promocionais específicas'] },
      { type: 'p', text: 'A análise depende de fatores como:' },
      { type: 'ul', items: ['tempo de permanência no plano anterior', 'compatibilidade entre produtos', 'documentação apresentada', 'regras regulatórias da ANS', 'critérios da operadora'] },
      { type: 'p', text: 'Cada situação deve ser avaliada individualmente.' },
    ],
  },
  {
    q: 'Os planos de saúde seguem regulamentação da ANS e da Lei nº 9.656/98?',
    body: [
      { type: 'p', text: 'Sim. Os planos de saúde regulamentados seguem as diretrizes estabelecidas pela Agência Nacional de Saúde Suplementar (ANS) e pela Lei nº 9.656/98, principal legislação da saúde suplementar no Brasil.' },
      { type: 'p', text: 'A regulamentação estabelece regras relacionadas a:' },
      { type: 'ul', items: ['cobertura mínima obrigatória', 'carências', 'urgência e emergência', 'reajustes', 'portabilidade', 'doenças e lesões preexistentes', 'direitos dos beneficiários', 'responsabilidades das operadoras', 'segmentação assistencial', 'funcionamento dos contratos'] },
      { type: 'p', text: 'Além disso, a ANS também define o Rol de Procedimentos e Eventos em Saúde, que representa a cobertura mínima obrigatória dos planos regulamentados.' },
      { type: 'p', text: 'A HOLD auxilia seus clientes na compreensão dessas regras para proporcionar mais clareza, segurança e previsibilidade na tomada de decisão.' },
    ],
  },
  {
    q: 'Como funcionam os atendimentos de urgência e emergência nos planos de saúde?',
    body: [
      { type: 'p', text: 'Os atendimentos de urgência e emergência possuem regras específicas definidas pela Lei nº 9.656/98 e pela regulamentação da ANS.' },
      { type: 'h4', text: 'O que é considerado emergência?' },
      { type: 'p', text: 'São situações que impliquem risco imediato à vida ou possibilidade de lesões irreparáveis ao paciente, conforme declaração médica.' },
      { type: 'h4', text: 'O que é considerado urgência?' },
      { type: 'p', text: 'São situações resultantes de:' },
      { type: 'ul', items: ['acidentes pessoais', 'complicações no processo gestacional'] },
      { type: 'h4', text: 'Qual o prazo de cobertura?' },
      { type: 'p', text: 'Nos planos regulamentados, o prazo máximo de carência para atendimentos de urgência e emergência é de 24 horas após o início da vigência contratual.' },
      { type: 'p', text: 'Após esse período, o beneficiário passa a ter direito à cobertura conforme a segmentação do plano contratado e as regras previstas em contrato.' },
      { type: 'h4', text: 'Como funciona a cobertura nos planos hospitalares?' },
      { type: 'p', text: 'Nos planos com cobertura hospitalar, os atendimentos de urgência e emergência podem incluir:' },
      { type: 'ul', items: ['pronto atendimento', 'exames', 'procedimentos', 'medicamentos utilizados durante o atendimento', 'internações', 'cirurgias', 'tratamentos necessários à estabilização do quadro clínico'] },
      { type: 'h4', text: 'Como funciona nos planos exclusivamente ambulatoriais?' },
      { type: 'p', text: 'Nos planos exclusivamente ambulatoriais, a cobertura de urgência e emergência é limitada às primeiras 12 horas de atendimento.' },
      { type: 'p', text: 'Caso exista necessidade de internação após esse período, podem ser aplicadas regras específicas previstas contratualmente e na regulamentação da ANS. Nessas situações, pode haver:' },
      { type: 'ul', items: ['remoção do paciente', 'encaminhamento ao SUS', 'continuidade assistencial conforme segmentação contratada'] },
      { type: 'h4', text: 'O que acontece em casos de doença ou lesão preexistente?' },
      { type: 'p', text: 'Quando houver Cobertura Parcial Temporária (CPT) relacionada a doença ou lesão preexistente declarada, podem existir limitações temporárias para:' },
      { type: 'ul', items: ['procedimentos de alta complexidade', 'cirurgias', 'leitos de alta tecnologia relacionados à condição declarada'] },
      { type: 'p', text: 'Ainda assim, permanecem garantidos os atendimentos necessários à estabilização do quadro de urgência ou emergência conforme previsto na legislação.' },
      { type: 'h4', text: 'Por que é importante analisar o contrato?' },
      { type: 'p', text: 'As condições de cobertura podem variar conforme:' },
      { type: 'ul', items: ['modalidade do plano', 'segmentação assistencial', 'abrangência', 'tipo de acomodação', 'coparticipação', 'carências', 'CPT', 'regras da operadora'] },
      { type: 'p', text: 'A HOLD auxilia seus clientes na compreensão dessas condições, buscando mais clareza, segurança e previsibilidade na escolha do plano mais adequado.' },
    ],
  },
  {
    q: 'A HOLD trabalha com quais seguradoras/operadoras?',
    body: [
      { type: 'p', text: 'A HOLD atua com diferentes seguradoras/operadoras do mercado, buscando identificar as soluções mais adequadas ao perfil e às necessidades de cada cliente. Entre elas:' },
      { type: 'ul', items: ['Amil', 'Bradesco Saúde', 'Hapvida', 'Omint', 'Porto Seguro', 'Seguros Unimed', 'SulAmérica', 'Unimed'] },
      { type: 'p', text: 'A disponibilidade pode variar conforme:' },
      { type: 'ul', items: ['região', 'modalidade', 'perfil do beneficiário', 'elegibilidade', 'regras comerciais vigentes'] },
    ],
  },
  {
    q: 'A HOLD acompanha após a contratação?',
    body: [
      { type: 'p', text: 'Sim. Nosso trabalho vai além da contratação do plano. A HOLD atua com acompanhamento próximo e suporte consultivo para auxiliar clientes em diferentes etapas da jornada, incluindo:' },
      { type: 'ul', items: ['análise de utilização', 'orientações contratuais', 'movimentações cadastrais', 'dúvidas operacionais', 'reavaliações estratégicas', 'suporte relacionado às modalidades contratadas'] },
      { type: 'p', text: 'O objetivo é proporcionar mais segurança, clareza e continuidade no relacionamento com cada cliente.' },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }

function renderBlock(block: FAQBlock, i: number) {
  switch (block.type) {
    case 'p':
      return (
        <p key={i} className="mt-3 text-[#07162a]/60 text-sm leading-relaxed">
          {block.text}
        </p>
      )
    case 'h4':
      return (
        <h4 key={i} className="mt-6 text-[#07162a] font-semibold text-sm">
          {block.text}
        </h4>
      )
    case 'ul':
      return (
        <ul key={i} className="mt-3 space-y-1.5">
          {block.items.map((it, j) => (
            <li key={j} className="flex items-start gap-2 text-[#07162a]/60 text-sm leading-relaxed">
              <span className="mt-2 h-1 w-1 rounded-full bg-[#ae251c] shrink-0" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )
  }
}

export default function SaudeFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  function toggle(index: number) {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <section
      id="saude-faq"
      className="section-pad bg-[#F5F5F5]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07162a]/55"
          >
            DÚVIDAS FREQUENTES
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-display text-[#07162a]"
            style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
          >
            Perguntas frequentes sobre planos de saúde
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openItems.includes(index)
            const contentId = `saude-faq-content-${index}`
            return (
              <motion.div key={index} variants={fadeUp} className="ground-divide">
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen ? 'true' : 'false'}
                  aria-controls={contentId}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                >
                  <span className="text-[#07162a] font-medium text-sm md:text-base leading-snug group-hover:text-[#ae251c] transition-colors">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                    className="shrink-0 text-[#7a9ab8] group-hover:text-[#ae251c] transition-colors"
                  >
                    <Plus size={18} strokeWidth={1.6} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={contentId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-8">
                        {item.body.map((block, i) => renderBlock(block, i))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2.4: Rodar testes para confirmar aprovação**

```bash
npx vitest run components/sections/saude/SaudeFAQ.test.tsx
```

Esperado: PASS (6 testes)

- [ ] **Step 2.5: Commit**

```bash
git add components/sections/saude/SaudeFAQ.tsx components/sections/saude/SaudeFAQ.test.tsx
git commit -m "feat(saude): add SaudeFAQ with 10 items and rich Q8 sub-headings (urgência/emergência)"
```

---

## Task 3: SaudeModalidades — grid 4 + accordion full-width

**Files:**
- Create: `components/sections/saude/SaudeModalidades.tsx`
- Create: `components/sections/saude/SaudeModalidades.test.tsx`

- [ ] **Step 3.1: Escrever o teste com falha**

Crie `components/sections/saude/SaudeModalidades.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SaudeModalidades from './SaudeModalidades'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const { initial, animate, whileInView, viewport, transition, layoutId, exit, whileHover, whileTap, variants, ...d } = rest
          void initial; void animate; void whileInView; void viewport; void transition; void layoutId
          void exit; void whileHover; void whileTap; void variants
          return React.createElement(tag, d, children)
        },
    }
  )
  const AnimatePresence = ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children)
  return { motion, AnimatePresence, useReducedMotion: () => false }
})

describe('SaudeModalidades', () => {
  it('renders the section heading', () => {
    render(<SaudeModalidades />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Soluções em saúde para diferentes perfis e formatos de contratação/i,
      })
    ).toBeInTheDocument()
  })

  it('renders all 4 modality cards by title', () => {
    render(<SaudeModalidades />)
    expect(screen.getByText('Individual e Familiar')).toBeInTheDocument()
    expect(screen.getByText('Coletivo por Adesão')).toBeInTheDocument()
    expect(screen.getByText('Empresarial')).toBeInTheDocument()
    expect(screen.getByText('Odontológico')).toBeInTheDocument()
  })

  it('starts with no expanded panel', () => {
    render(<SaudeModalidades />)
    expect(
      screen.queryByText(/Escolher um plano de saúde envolve mais do que/i)
    ).not.toBeInTheDocument()
  })

  it('expands a modality on click and shows its long text', () => {
    render(<SaudeModalidades />)
    const card = screen.getByRole('button', { name: /Individual e Familiar/i })
    fireEvent.click(card)
    expect(card).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByText(/Escolher um plano de saúde envolve mais do que comparar preços/i)
    ).toBeInTheDocument()
  })

  it('clicking the same card again collapses the panel', () => {
    render(<SaudeModalidades />)
    const card = screen.getByRole('button', { name: /Empresarial/i })
    fireEvent.click(card)
    expect(
      screen.getByText(/A estruturação de benefícios em saúde vai além/i)
    ).toBeInTheDocument()
    fireEvent.click(card)
    expect(
      screen.queryByText(/A estruturação de benefícios em saúde vai além/i)
    ).not.toBeInTheDocument()
  })

  it('clicking a different card swaps the panel content', () => {
    render(<SaudeModalidades />)
    const cardA = screen.getByRole('button', { name: /Coletivo por Adesão/i })
    const cardB = screen.getByRole('button', { name: /Odontológico/i })

    fireEvent.click(cardA)
    expect(screen.getByText(/O plano coletivo por adesão é uma alternativa voltada/i)).toBeInTheDocument()

    fireEvent.click(cardB)
    expect(screen.queryByText(/O plano coletivo por adesão é uma alternativa voltada/i)).not.toBeInTheDocument()
    expect(screen.getByText(/O cuidado com a saúde também passa pela prevenção/i)).toBeInTheDocument()
  })

  it('expanded panel renders a WhatsApp CTA link', () => {
    render(<SaudeModalidades />)
    fireEvent.click(screen.getByRole('button', { name: /Individual e Familiar/i }))
    const cta = screen.getAllByRole('link').find((a) => /wa\.me|whatsapp/i.test(a.getAttribute('href') ?? ''))
    expect(cta).toBeDefined()
  })
})
```

- [ ] **Step 3.2: Rodar o teste para confirmar falha**

```bash
npx vitest run components/sections/saude/SaudeModalidades.test.tsx
```

Esperado: FAIL — `Cannot find module './SaudeModalidades'`

- [ ] **Step 3.3: Implementar SaudeModalidades.tsx**

Crie `components/sections/saude/SaudeModalidades.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Briefcase, Building2, Smile, Plus } from 'lucide-react'
import { formatWhatsAppLink } from '@/lib/utils'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

type ModalidadeId = 'individual' | 'adesao' | 'empresarial' | 'odonto'

type Modalidade = {
  id: ModalidadeId
  seq: string
  icon: React.ElementType
  title: string
  short: string
  long: string
  waMessage: string
}

const MODALIDADES: Modalidade[] = [
  {
    id: 'individual',
    seq: '01 / 04',
    icon: Users,
    title: 'Individual e Familiar',
    short: 'Soluções em saúde para pessoas e famílias que buscam proteção, previsibilidade e acesso com segurança.',
    long: 'Escolher um plano de saúde envolve mais do que comparar preços e coberturas. Cada decisão precisa considerar perfil de utilização, rede credenciada, previsibilidade financeira e momento de vida. A HOLD conecta você e sua família às soluções mais adequadas por meio de análise estratégica, acompanhamento próximo e suporte em todas as etapas.',
    waMessage: 'Olá! Tenho interesse em planos de saúde Individual ou Familiar.',
  },
  {
    id: 'adesao',
    seq: '02 / 04',
    icon: Briefcase,
    title: 'Coletivo por Adesão',
    short: 'Alternativas estratégicas para profissionais vinculados a entidades de classe e categorias elegíveis.',
    long: 'O plano coletivo por adesão é uma alternativa voltada a profissionais vinculados a entidades de classe, associações e categorias elegíveis. Essa modalidade pode oferecer condições estratégicas de contratação, mas exige análise criteriosa sobre elegibilidade, regras, cobertura, rede credenciada e cenário de longo prazo. A HOLD realiza uma avaliação personalizada para identificar as alternativas mais adequadas ao perfil e à necessidade de cada cliente.',
    waMessage: 'Olá! Tenho interesse em plano de saúde Coletivo por Adesão.',
  },
  {
    id: 'empresarial',
    seq: '03 / 04',
    icon: Building2,
    title: 'Empresarial',
    short: 'Estruturação de benefícios para MEIs, PMEs e grandes empresas, com soluções alinhadas ao porte, momento e estratégia de cada operação.',
    long: 'A estruturação de benefícios em saúde vai além da contratação de um plano. Empresas de diferentes portes precisam equilibrar qualidade assistencial, previsibilidade financeira, retenção de talentos e sustentabilidade da operação. A HOLD atua na construção de soluções empresariais para MEIs, PMEs e grandes empresas, conectando cada operação às alternativas mais adequadas ao seu momento, perfil e estratégia.',
    waMessage: 'Olá! Tenho interesse em plano de saúde Empresarial.',
  },
  {
    id: 'odonto',
    seq: '04 / 04',
    icon: Smile,
    title: 'Odontológico',
    short: 'Cobertura odontológica para pessoas e empresas com foco em cuidado, prevenção e bem-estar.',
    long: 'O cuidado com a saúde também passa pela prevenção e pelo acompanhamento odontológico. A HOLD estrutura soluções odontológicas para pessoas, famílias e empresas, buscando equilíbrio entre cobertura, qualidade de atendimento, rede credenciada e custo-benefício. Nosso acompanhamento é realizado de forma próxima e estratégica, considerando o perfil e as necessidades de cada cliente.',
    waMessage: 'Olá! Tenho interesse em plano de saúde Odontológico.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }

function ExpandedPanel({ data }: { data: Modalidade }) {
  const wa = formatWhatsAppLink(WHATSAPP, data.waMessage)
  return (
    <div
      role="region"
      aria-labelledby={`saude-card-${data.id}`}
      className="bg-[#142f54] ring-1 ring-[#ae251c]/30 rounded-2xl px-6 py-8 md:px-12 md:py-12 mt-2"
    >
      <span className="tabular text-[#ae251c]/70 text-xs font-semibold tracking-[0.2em]">
        {data.seq}
      </span>
      <h3
        className="mt-3 text-display text-white"
        style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)' }}
      >
        {data.title}
      </h3>
      <p className="mt-4 text-[#7a9ab8] leading-relaxed max-w-[62ch] text-base">
        {data.long}
      </p>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-6 py-3 transition-colors"
      >
        <WhatsAppIcon size={16} />
        Falar com especialista
      </a>
    </div>
  )
}

export default function SaudeModalidades() {
  const [selected, setSelected] = useState<ModalidadeId | null>(null)

  function toggle(id: ModalidadeId) {
    setSelected((prev) => (prev === id ? null : id))
  }

  const selectedData = MODALIDADES.find((m) => m.id === selected)

  return (
    <section
      id="saude-modalidades"
      className="section-pad bg-[#07162a]"
      style={{ fontFamily: 'var(--font-outfit)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]"
          >
            MODALIDADES DE CONTRATAÇÃO
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-display text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}
          >
            Soluções em saúde para diferentes perfis e formatos de contratação
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[60ch] text-[#7a9ab8] leading-relaxed"
          >
            A HOLD estrutura soluções em saúde de forma personalizada, considerando perfil,
            necessidade, momento e estratégia de cada cliente. Atuamos com diferentes
            modalidades de contratação para pessoas, famílias, profissionais e empresas.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {MODALIDADES.map((m) => {
            const Icon = m.icon
            const isSelected = selected === m.id
            const panelId = `saude-card-${m.id}`
            return (
              <motion.button
                key={m.id}
                id={panelId}
                variants={fadeUp}
                onClick={() => toggle(m.id)}
                aria-expanded={isSelected ? 'true' : 'false'}
                aria-controls={`saude-panel-${m.id}`}
                className={[
                  'group text-left rounded-2xl px-6 py-7 transition-all duration-200',
                  'bg-[#0b1f3a]',
                  isSelected
                    ? 'ring-2 ring-[#ae251c]/50'
                    : 'ring-1 ring-white/10 hover:ring-[#ae251c]/25',
                ].join(' ')}
              >
                <Icon size={28} strokeWidth={1.5} className="text-[#ae251c]" />
                <p
                  className="mt-5 text-white font-semibold leading-snug"
                  style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.25rem)' }}
                >
                  {m.title}
                </p>
                <div className="rule-accent h-px w-10 mt-3" />
                <p className="mt-3 text-sm text-[#7a9ab8] leading-relaxed">
                  {m.short}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs">
                  <span
                    className={
                      isSelected
                        ? 'text-[#ae251c] font-semibold'
                        : 'text-[#7a9ab8] group-hover:text-[#e0e8f0]'
                    }
                  >
                    {isSelected ? 'Recolher' : 'Saber mais'}
                  </span>
                  <motion.span
                    animate={{ rotate: isSelected ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                    className={isSelected ? 'text-[#ae251c]' : 'text-[#7a9ab8]'}
                  >
                    <Plus size={16} strokeWidth={1.8} />
                  </motion.span>
                </div>
              </motion.button>
            )
          })}

          <AnimatePresence initial={false}>
            {selectedData && (
              <motion.div
                key={selectedData.id}
                id={`saude-panel-${selectedData.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="col-span-full overflow-hidden"
              >
                <ExpandedPanel data={selectedData} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3.4: Rodar testes para confirmar aprovação**

```bash
npx vitest run components/sections/saude/SaudeModalidades.test.tsx
```

Esperado: PASS (7 testes)

- [ ] **Step 3.5: Commit**

```bash
git add components/sections/saude/SaudeModalidades.tsx components/sections/saude/SaudeModalidades.test.tsx
git commit -m "feat(saude): add SaudeModalidades with 4-card grid and full-width accordion panel"
```

---

## Task 4: Reescrever SaudeClient.tsx + smoke test

**Files:**
- Modify (reescreve inteiro): `app/saude/SaudeClient.tsx`
- Create: `app/saude/SaudeClient.test.tsx`

> **Nota:** `app/saude/SaudeClient.tsx` é reescrito por completo. O arquivo atual contém um stub que será descartado. Não há commits intermediários — `page.tsx` importa o `export default`, então quebrar TypeScript no meio do caminho impediria qualquer verificação. Escreva o arquivo inteiro de uma vez.

- [ ] **Step 4.1: Escrever o smoke test com falha**

Crie `app/saude/SaudeClient.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SaudeClient from './SaudeClient'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const { initial, animate, whileInView, viewport, transition, layoutId, exit, whileHover, whileTap, variants, ...d } = rest
          void initial; void animate; void whileInView; void viewport; void transition; void layoutId
          void exit; void whileHover; void whileTap; void variants
          return React.createElement(tag, d, children)
        },
    }
  )
  const AnimatePresence = ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children)
  return { motion, AnimatePresence, useReducedMotion: () => false }
})

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ alt, src }: any) => <img alt={alt} src={typeof src === 'string' ? src : ''} />,
}))

vi.mock('@/components/forms/ServiceLeadForm', () => ({
  ServiceLeadForm: ({ service }: { service: string }) => (
    <div data-testid="service-lead-form">Form: {service}</div>
  ),
}))

vi.mock('@/components/motion/LogoLoop', () => ({
  __esModule: true,
  default: () => <div data-testid="logo-loop" />,
}))

describe('SaudeClient', () => {
  it('renders the hero H1 (institutional copy)', () => {
    render(<SaudeClient />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Soluções em saúde estruturadas com estratégia/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the "Sobre Nós" section with 3 chips', () => {
    render(<SaudeClient />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /O jeito HOLD de estruturar soluções em saúde/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByText('Atendimento consultivo')).toBeInTheDocument()
    expect(screen.getByText('Soluções personalizadas')).toBeInTheDocument()
    expect(screen.getByText('Acompanhamento próximo')).toBeInTheDocument()
  })

  it('renders the Diferenciais headline and 3 cards', () => {
    render(<SaudeClient />)
    expect(
      screen.getByText(/O diferencial não está apenas na solução/i)
    ).toBeInTheDocument()
    expect(screen.getByText('Análise estratégica')).toBeInTheDocument()
    expect(screen.getByText('Estrutura multissoluções')).toBeInTheDocument()
    // "Acompanhamento próximo" aparece como chip (Sobre Nós) e como título do diferencial.
    // Verificamos que há pelo menos 2 ocorrências distintas.
    const acomp = screen.getAllByText('Acompanhamento próximo')
    expect(acomp.length).toBeGreaterThanOrEqual(2)
  })

  it('renders the Modalidades section component', () => {
    render(<SaudeClient />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Soluções em saúde para diferentes perfis e formatos de contratação/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the Operadoras section component', () => {
    render(<SaudeClient />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Trabalhamos com as principais seguradoras e operadoras do mercado/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the FAQ section component', () => {
    render(<SaudeClient />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Perguntas frequentes sobre planos de saúde/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the CTA Final with form and link to #saude-form', () => {
    render(<SaudeClient />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Conte com a HOLD para estruturar sua solução em saúde/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByTestId('service-lead-form')).toBeInTheDocument()
  })

  it('renders a hero CTA linking to #saude-form', () => {
    render(<SaudeClient />)
    const cta = screen.getAllByRole('link').find((a) => a.getAttribute('href') === '#saude-form')
    expect(cta).toBeDefined()
  })
})
```

- [ ] **Step 4.2: Rodar o teste para confirmar falha**

```bash
npx vitest run app/saude/SaudeClient.test.tsx
```

Esperado: FAIL (atual `SaudeClient` ainda é stub, não tem as headings esperadas)

- [ ] **Step 4.3: Reescrever `app/saude/SaudeClient.tsx`**

Substitua **todo** o conteúdo de `app/saude/SaudeClient.tsx`:

```tsx
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
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a9ab8]">
            O JEITO HOLD
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className="mt-4 text-display text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)' }}
          >
            O jeito HOLD de estruturar soluções em saúde
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-[60ch] text-[#7a9ab8] leading-relaxed text-lg">
            Mais do que intermediar soluções, atuamos de forma consultiva na construção de
            estratégias em saúde, benefícios e planejamento, conectando cada cliente às
            decisões mais adequadas ao seu momento, necessidade e visão de futuro.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap gap-3">
            {SOBRE_CHIPS.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center rounded-full border border-[#ae251c]/30 bg-[#ae251c]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e0e8f0]"
              >
                {chip}
              </span>
            ))}
          </div>
        </Reveal>
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
                    : 'md:border-l md:border-white/10 md:pl-10'
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
```

- [ ] **Step 4.4: Rodar o smoke test para confirmar aprovação**

```bash
npx vitest run app/saude/SaudeClient.test.tsx
```

Esperado: PASS (8 testes)

- [ ] **Step 4.5: Rodar toda a suite de testes**

```bash
npx vitest run
```

Esperado: todos os testes passam (incluindo os 4 novos arquivos desta página + suites existentes).

- [ ] **Step 4.6: Verificar TypeScript sem erros**

```bash
npx tsc --noEmit
```

Esperado: nenhum erro de TypeScript.

- [ ] **Step 4.7: Build de produção**

```bash
npx next build
```

Esperado: build completo sem erros. **Atenção:** se algum dos 5 logos pendentes (`Amil.webp`, `Hapvida.webp`, `Omint.webp`, `PortoSeguro.webp`, `SegurosUnimed.webp`) não estiver no projeto, o build conclui mas o `LogoLoop` em runtime mostrará imagens quebradas. Verificar visualmente após o build (Step 4.9).

- [ ] **Step 4.8: Commit final**

```bash
git add app/saude/SaudeClient.tsx app/saude/SaudeClient.test.tsx
git commit -m "feat(saude): complete page rewrite with 7 sections (hero, sobre, modalidades, diferenciais, operadoras, faq, cta)"
```

- [ ] **Step 4.9: Verificação manual no browser (dev server)**

```bash
npx next dev
```

Abrir `http://localhost:3000/saude` e validar visualmente:
1. Hero dark gradient com imagem à direita (desktop)
2. Sobre Nós com 3 chips vermelhos clicáveis (visuais — não navegam)
3. Modalidades — clicar em cada card abre painel full-width abaixo; clicar de novo fecha
4. Diferenciais com 3 cards + divisores verticais em desktop
5. Operadoras — carrossel infinito horizontal (se logos faltarem, aparecem placeholders quebrados)
6. FAQ — accordion abre/fecha; Q8 tem sub-headings em negrito
7. CTA Final — form à direita, headline + WhatsApp à esquerda
8. CTA "Comparar planos" do hero faz scroll suave até o form

Anotar issues e abrir tasks se necessário. Sem regressões nas outras páginas (`/`, `/consorcios`, `/seguros`, `/investimentos`, `/equipe`).

---

## Checklist de cobertura do spec

- [x] Hero `#142f54` gradient com dot-grid, blobs e imagem `saude.webp` à direita — Task 4
- [x] H1 institucional integral do brief com `clamp(1.85rem, 4vw, 3.25rem)` — Task 4
- [x] CTAs do hero: WhatsApp verde + "Comparar planos" ghost com scroll para `#saude-form` — Task 4
- [x] Sem `AudienceToggle` (substituição total do spec antigo) — Task 4
- [x] Sobre Nós `#07162a` com texto + 3 chips minimalistas vermelhos — Task 4
- [x] Modalidades `#07162a` com grid 4 cards + accordion full-width — Task 3
- [x] Card selecionado mantém `bg-[#0b1f3a]` com ring `#ae251c/50`, footer "Recolher" — Task 3
- [x] Painel expandido `bg-[#142f54]` com sequencial, título, texto longo e CTA WhatsApp — Task 3
- [x] WhatsApp messages distintas por modalidade — Task 3
- [x] Diferenciais `#142f54` com 3 cards estilo "stat" e divisores verticais — Task 4
- [x] Operadoras `#F5F5F5` com `LogoLoop` carregando 8 operadoras — Task 1
- [x] FAQ `#F5F5F5` com 10 itens accordion — Task 2
- [x] FAQ Q8 com 7 sub-headings (`h4`) renderizados a partir do array de blocks — Task 2
- [x] CTA Final `#142f54` `id="saude-form"` com `ServiceLeadForm` 2 colunas + WhatsApp secundário — Task 4
- [x] Strings hard-coded sem i18n — Tasks 1–4
- [x] Smoke test cobrindo todas as 7 seções — Task 4
- [x] Arquitetura híbrida (4 inline + 3 componentes próprios) — Tasks 1–4

---

## Dependências externas pendentes

Estes 5 arquivos precisam estar em `public/images/logosEmpresasParceiras/` antes do deploy:
- `Amil.webp`
- `Hapvida.webp`
- `Omint.webp`
- `PortoSeguro.webp`
- `SegurosUnimed.webp`

Se algum estiver faltando no momento da implementação:
- A implementação **prossegue** (LogoLoop não trava o build)
- O carrossel renderiza com imagens quebradas para as faltantes
- Verificar visualmente no Step 4.9 e registrar issue separada se necessário

Não é responsabilidade desta task obter as logos.
