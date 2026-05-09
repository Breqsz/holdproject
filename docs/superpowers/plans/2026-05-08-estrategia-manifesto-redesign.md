# EstrategiaManifesto Redesign — Editorial Spread Navy — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescrever `EstrategiaManifesto.tsx` para um slab navy unificado em estilo editorial-magazine (Cormorant Garamond serif, badges circulares alternados red/blue/gold, hairlines dourados, clip-path arquitetônico na imagem, glass quote bar com texto serif italic), substituindo a versão v3 atual (light bg + dark card + MVV white).

**Architecture:** Componente único `'use client'` em React + TypeScript + Tailwind. Divide-se internamente em 3 movimentos: Manifesto editorial (12-col grid desktop, single col mobile) + Régua de transição + MVV (3-col badges desktop, single col mobile). Motion com `framer-motion` + `useInView` once. Aproveita design tokens existentes em `globals.css` (`--surface-base`, `--hairline-gold`, `.dot-grid`, `.rule-gold`).

**Tech Stack:** Next.js 14, React 18, TypeScript 6, Tailwind CSS 3.4 (arbitrary values), framer-motion 12, lucide-react, next/font (Cormorant Garamond + Outfit), Vitest 4, @testing-library/react 16.

**Spec referenciado:** `docs/superpowers/specs/2026-05-08-estrategia-manifesto-redesign.md` (commits `bc985242` + `b576c6a5`).

**Checkpoint para revert:** commit `7f45f61d`.

---

## Arquivos

| Arquivo | Ação |
|---|---|
| `app/layout.tsx` | Modify — adicionar `'normal'` ao `style` array do `Cormorant_Garamond` |
| `components/sections/EstrategiaManifesto.test.tsx` | Modify — substituir testes stale por testes da v4 |
| `components/sections/EstrategiaManifesto.tsx` | Modify — reescrita completa |

Nenhum arquivo novo. Nenhum diretório novo.

---

## Task 1: Atualizar Cormorant Garamond para suportar style 'normal'

**Files:**
- Modify: `app/layout.tsx:19-25`

### Contexto

A headline serif do Movement 1 usa Cormorant Garamond em peso 500 **não-italic** (a última linha "para o seu patrimônio." segue italic). Atualmente o font config carrega só `style: ['italic']`. Precisa adicionar `'normal'`.

- [ ] **Step 1: Editar `app/layout.tsx` para adicionar style normal**

Substituir o bloco do font Cormorant (linhas 19-25):

```tsx
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})
```

- [ ] **Step 2: Verificar TypeScript não tem erros**

```bash
cd E:/Projetos/hold && npx tsc --noEmit 2>&1 | head -20
```

Esperado: sem erros relacionados a `app/layout.tsx`.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "$(cat <<'EOF'
chore(fonts): load Cormorant Garamond in style 'normal' alongside italic

Necessário para a headline serif do EstrategiaManifesto v4 (slab navy
editorial), onde "Mais do que produtos." e "Uma estratégia completa" usam
peso 500 normal, e a linha "para o seu patrimônio." mantém italic.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Reescrever testes do EstrategiaManifesto v4

**Files:**
- Modify: `components/sections/EstrategiaManifesto.test.tsx` (substituir conteúdo inteiro)

### Contexto

O test file atual tem 6 testes stale (referenciam "Manifesto" eyebrow, headline "Sua estratégia começa com... resultado", heritage signature "Hold Corretora · Desde 2006", imagem `office-hero`) que vieram de uma versão anterior do componente. Vamos substituir todo o file por testes alinhados ao componente v4 do spec.

Os mocks de `next/image` e `framer-motion` permanecem (funcionam bem, já testados em outros components).

- [ ] **Step 1: Substituir o conteúdo completo de `EstrategiaManifesto.test.tsx`**

Conteúdo novo (substituir o file todo):

```tsx
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import EstrategiaManifesto from './EstrategiaManifesto'

beforeAll(() => {
  if (!('IntersectionObserver' in window)) {
    class IO {
      observe() {}
      disconnect() {}
      unobserve() {}
      takeRecords() { return [] }
      root = null
      rootMargin = ''
      thresholds = []
    }
    // @ts-expect-error - jsdom shim
    window.IntersectionObserver = IO
  }
})

vi.mock('next/image', () => ({
  default: ({ alt, ...rest }: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={String(alt ?? '')} {...(rest as object)} />
  ),
}))

vi.mock('framer-motion', async () => {
  const React = await import('react')
  const passthrough = (tag: keyof JSX.IntrinsicElements) =>
    React.forwardRef<HTMLElement, Record<string, unknown>>(({ children, ...rest }, ref) =>
      React.createElement(tag, { ref, ...stripMotion(rest) }, children as React.ReactNode),
    )

  function stripMotion(props: Record<string, unknown>) {
    const { initial, animate, exit, transition, variants, whileHover, whileTap,
      whileInView, viewport, ...rest } = props
    void initial; void animate; void exit; void transition; void variants
    void whileHover; void whileTap; void whileInView; void viewport
    return rest
  }

  return {
    motion: new Proxy({}, {
      get: (_t, key: string) => passthrough(key as keyof JSX.IntrinsicElements),
    }),
    useInView: () => true,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('EstrategiaManifesto v4 — Editorial Spread Navy', () => {
  it('exposes id="estrategia" on the section', () => {
    const { container } = render(<EstrategiaManifesto />)
    expect(container.querySelector('#estrategia')).toBeInTheDocument()
  })

  it('renders the "Estratégia" eyebrow', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByText(/^Estratégia$/i)).toBeInTheDocument()
  })

  it('renders the tri-color serif headline', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByText('Mais do que produtos.')).toBeInTheDocument()
    expect(screen.getByText('Uma estratégia completa')).toBeInTheDocument()
    expect(screen.getByText('para o seu patrimônio.')).toBeInTheDocument()
  })

  it('renders an h2 heading element', () => {
    render(<EstrategiaManifesto />)
    const h2s = screen.getAllByRole('heading', { level: 2 })
    expect(h2s.length).toBeGreaterThanOrEqual(1)
  })

  it('renders body paragraph highlights "19 anos de experiência" and "60 parceiros"', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByText('19 anos de experiência')).toBeInTheDocument()
    expect(screen.getByText('60 parceiros')).toBeInTheDocument()
  })

  it('body paragraph contains positioning copy', () => {
    const { container } = render(<EstrategiaManifesto />)
    expect(container.textContent).toContain('Hold Corretora atua como parceira estratégica')
    expect(container.textContent).toContain('estruturando soluções completas')
  })

  it('renders the cinematic image with descriptive alt and quem-somos src', () => {
    render(<EstrategiaManifesto />)
    const img = screen.getByAltText(/Hold Corretora.*escrit/i) as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.getAttribute('src')).toContain('quem-somos')
  })

  it('renders the manifesto quote with three accent terms', () => {
    const { container } = render(<EstrategiaManifesto />)
    expect(container.textContent).toContain('Integramos saúde, seguros, consórcios e finanças')
    expect(screen.getByText('proteção patrimonial')).toBeInTheDocument()
    expect(screen.getByText('sucessão')).toBeInTheDocument()
    expect(screen.getByText('eficiência financeira')).toBeInTheDocument()
  })

  it('renders the M · V · V transition eyebrow', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByText(/M\s*·\s*V\s*·\s*V/)).toBeInTheDocument()
  })

  it('renders all three MVV titles as h3 headings', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByRole('heading', { level: 3, name: 'Missão' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Visão' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Valores' })).toBeInTheDocument()
  })

  it('renders each MVV body text', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByText(/Ajudar pessoas e empresas a tomar melhores decisões/i)).toBeInTheDocument()
    expect(screen.getByText(/Ser referência para pessoas e empresas/i)).toBeInTheDocument()
    expect(screen.getByText(/Agimos com integridade/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Rodar testes — esperado FAIL (componente ainda v3)**

```bash
cd E:/Projetos/hold && npx vitest run components/sections/EstrategiaManifesto.test.tsx 2>&1 | tail -30
```

Esperado: vários testes falham porque o componente atual ainda é v3. A maioria dos testes vão falhar buscando textos que não existem (eyebrow "Estratégia" pode passar porque já existe; "Mais do que produtos." pode passar; mas headline serif tri-color, M·V·V eyebrow, image src `quem-somos`, e h3 hierarchy nos MVV vão falhar).

Importante: **NÃO** prosseguir se TODOS os testes passarem — isso indicaria que o componente já está implementado e o plano não tem trabalho a fazer.

- [ ] **Step 3: Commit dos testes failing**

```bash
git add components/sections/EstrategiaManifesto.test.tsx
git commit -m "$(cat <<'EOF'
test(manifesto): rewrite tests for v4 editorial spread navy redesign

Substitui os testes stale (que referenciavam "Manifesto" eyebrow,
"Sua estratégia começa com... resultado", heritage signature "Hold
Corretora · Desde 2006", imagem office-hero) por testes alinhados
ao spec v4: headline serif tri-color, M·V·V transition, image
quem-somos.jpg, MVV como h3, etc.

Failing por design — implementação na próxima task.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Implementar EstrategiaManifesto v4 — slab navy editorial

**Files:**
- Modify: `components/sections/EstrategiaManifesto.tsx` (substituir conteúdo inteiro)

### Contexto

Reescrita completa do componente seguindo o spec. Single component file, todas as 3 partes (Movement 1 + Régua + Movement 2) ficam num único `<section>`. Imports mantidos do componente atual (não há novos).

Pontos chave da implementação:
- Section shell com `var(--surface-base)`, dot-grid, radial glow gold, hairline top
- Movement 1: 12-col grid LG, single col mobile. Imagem com Tailwind arbitrary `[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]` aplicado APENAS em `lg:` (desktop)
- SVG inline traçando a diagonal gold (escondido em mobile via `hidden lg:block`)
- Glass quote bar com `backdrop-filter: blur(14px)` + texto Cormorant italic
- Movement 2: 3-col MD+, hairlines verticais entre cols, badges com cores alternadas via prop `badge` no array PRINCIPLES
- Motion com staggered delays conforme tabela do spec

- [ ] **Step 1: Substituir o conteúdo completo de `EstrategiaManifesto.tsx`**

Conteúdo novo (substituir o file todo):

```tsx
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Target, Eye, Gem } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Principle = {
  Icon: typeof Target
  title: string
  body: string
  badge: string
}

const PRINCIPLES: Principle[] = [
  {
    Icon: Target,
    title: 'Missão',
    body:
      'Ajudar pessoas e empresas a tomar melhores decisões, conectando saúde, seguros, consórcios e finanças de forma simples e estratégica.',
    badge: '#e8463a',
  },
  {
    Icon: Eye,
    title: 'Visão',
    body:
      'Ser referência para pessoas e empresas que buscam segurança para decidir e consistência para crescer.',
    badge: '#5a86c0',
  },
  {
    Icon: Gem,
    title: 'Valores',
    body:
      'Agimos com integridade, falamos com transparência, cuidamos com responsabilidade, respeitamos cada história, pensamos no longo prazo e nunca negociamos a confiança.',
    badge: '#c9a84c',
  },
]

export default function EstrategiaManifesto() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })

  return (
    <section
      ref={ref}
      id="estrategia"
      className="relative section-pad overflow-hidden"
      style={{
        background: 'var(--surface-base)',
        fontFamily: 'var(--font-outfit)',
      }}
    >
      {/* Top edge gold hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'var(--hairline-gold)' }}
      />

      {/* Backdrop dot-grid */}
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 opacity-[0.35]"
      />

      {/* Backdrop radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.06), transparent 60%)',
          mixBlendMode: 'soft-light',
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-6 lg:px-10">
        {/* ── Movement 1 — Manifesto editorial ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left column — text */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-center gap-3 mb-7 lg:mb-8"
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
              <span
                className="text-[11px] font-semibold uppercase"
                style={{
                  letterSpacing: '0.32em',
                  color: 'rgba(201,168,76,0.78)',
                }}
              >
                Estratégia
              </span>
            </motion.div>

            {/* Headline serif tri-color */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
              className="leading-[1.12] tracking-[-0.015em]"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 500,
              }}
            >
              <span className="block" style={{ color: 'rgba(201,168,76,0.55)' }}>
                Mais do que produtos.
              </span>
              <span className="block text-white">Uma estratégia completa</span>
              <span className="block italic" style={{ color: '#c9a84c' }}>
                para o seu patrimônio.
              </span>
            </motion.h2>

            {/* Gold short rule */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="mt-7 mb-7 h-px w-16 origin-left"
              style={{ background: 'var(--hairline-gold)' }}
            />

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.4, ease: EASE }}
              className="text-[14px] leading-[1.78] max-w-[44ch]"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              Com mais de{' '}
              <span className="text-white/95 font-medium">19 anos de experiência</span>{' '}
              e acesso a mais de{' '}
              <span className="text-white/95 font-medium">60 parceiros</span>, a Hold
              Corretora atua como parceira estratégica na proteção, no planejamento e
              no crescimento patrimonial de pessoas e empresas, estruturando soluções
              completas e personalizadas em saúde, seguros, consórcios e finanças.
            </motion.p>
          </div>

          {/* Right column — cinematic image */}
          <motion.article
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
            className="lg:col-span-7 order-1 lg:order-2 relative overflow-hidden aspect-[16/9] lg:aspect-[4/5] lg:max-h-[680px] lg:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]"
            style={{
              boxShadow:
                '0 30px 80px -30px rgba(0,0,0,0.7), 0 12px 32px -16px rgba(0,0,0,0.5)',
              background: '#050f1f',
            }}
          >
            <Image
              src="/images/hero/quem-somos.jpg"
              alt="Hold Corretora — escritório institucional, gestão estratégica patrimonial"
              fill
              sizes="(max-width: 1024px) 100vw, 760px"
              className="object-cover"
              style={{ objectPosition: 'center 30%' }}
            />

            {/* Diagonal gold hairline (desktop only) */}
            <svg
              aria-hidden
              className="absolute inset-0 hidden lg:block pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1={8}
                y1={0}
                x2={0}
                y2={100}
                stroke="#c9a84c"
                strokeOpacity={0.32}
                strokeWidth={0.18}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Inner border highlight */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            />

            {/* Bottom dark gradient for quote bar legibility */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(5,15,31,0.85) 65%, rgba(5,15,31,0.95) 100%)',
              }}
            />

            {/* Glass quote bar overlay */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-12 lg:right-12 px-5 py-5 lg:px-7 lg:py-6 rounded-xl"
              style={{
                background: 'rgba(11,31,58,0.78)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <p
                className="italic"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 500,
                  fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)',
                  lineHeight: 1.45,
                  color: 'rgba(255,255,255,0.92)',
                }}
              >
                Integramos saúde, seguros, consórcios e finanças em uma gestão
                estratégica voltada à{' '}
                <span className="not-italic font-bold" style={{ color: '#e8463a' }}>
                  proteção patrimonial
                </span>
                ,{' '}
                <span className="not-italic font-bold" style={{ color: '#e8463a' }}>
                  sucessão
                </span>{' '}
                e{' '}
                <span className="not-italic font-bold" style={{ color: '#e8463a' }}>
                  eficiência financeira
                </span>
                .
              </p>
            </motion.div>
          </motion.article>
        </div>

        {/* ── Régua de transição ── */}
        <div className="text-center mt-20 lg:mt-24 mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className="text-[10px] font-semibold uppercase mb-3"
            style={{
              letterSpacing: '0.4em',
              color: 'rgba(201,168,76,0.6)',
            }}
          >
            M · V · V
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
            className="h-px max-w-[240px] mx-auto"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, var(--hairline-gold) 50%, transparent 100%)',
            }}
          />
        </div>

        {/* ── Movement 2 — MVV badges ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 max-w-[1080px] mx-auto">
          {PRINCIPLES.map(({ Icon, title, body, badge }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.95 + i * 0.1, ease: EASE }}
              className={[
                'relative flex flex-col gap-5',
                i > 0 ? 'pt-8 md:pt-0 border-t md:border-t-0 md:border-l md:pl-10' : '',
                i < PRINCIPLES.length - 1 ? 'md:pr-10' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={
                i > 0 ? { borderColor: 'rgba(201,168,76,0.16)' } : undefined
              }
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `${badge}1f`,
                  border: `1px solid ${badge}6b`,
                  boxShadow: `inset 0 0 12px ${badge}1a`,
                }}
              >
                <Icon size={22} strokeWidth={1.6} style={{ color: badge }} />
              </div>

              <h3
                className="italic text-white"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.55rem, 2.3vw, 1.95rem)',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  letterSpacing: '-0.005em',
                }}
              >
                {title}
              </h3>

              <p
                className="text-[13.5px] leading-[1.72]"
                style={{ color: 'rgba(255,255,255,0.62)' }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Rodar testes — esperado PASS (todos verdes)**

```bash
cd E:/Projetos/hold && npx vitest run components/sections/EstrategiaManifesto.test.tsx 2>&1 | tail -30
```

Esperado: 11 testes verdes. Se algum falhar:
- "renders an h2": confirmar que `motion.h2` renderiza como `<h2>` no DOM (mock do framer-motion deve passthrough).
- "renders the cinematic image": confirmar `getAttribute('src')` contém literalmente `quem-somos`.
- "M · V · V": o regex `/M\s*·\s*V\s*·\s*V/` deve casar — o componente usa exatamente "M · V · V" com espaços.
- Texto do quote spread em spans: o teste usa `container.textContent` para a parte longa (não `getByText`) — deve passar.

- [ ] **Step 3: Verificar TypeScript não tem erros**

```bash
cd E:/Projetos/hold && npx tsc --noEmit 2>&1 | head -20
```

Esperado: sem erros.

- [ ] **Step 4: Verificar lint não tem erros novos**

```bash
cd E:/Projetos/hold && npx next lint --file components/sections/EstrategiaManifesto.tsx 2>&1 | tail -15
```

Esperado: sem erros novos. Warnings de imagens (`@next/next/no-img-element`) podem aparecer mas não bloqueiam — apenas no test file, não no component.

- [ ] **Step 5: Commit**

```bash
git add components/sections/EstrategiaManifesto.tsx
git commit -m "$(cat <<'EOF'
feat(manifesto): redesign EstrategiaManifesto v4 — editorial spread navy

Reescrita completa para slab navy unificado em estilo editorial-magazine,
alinhado com a DNA da SolucoesGrid premium:

- Background var(--surface-base) com dot-grid + radial glow gold
- Movement 1: 12-col grid editorial. Coluna esquerda com eyebrow gold,
  headline serif Cormorant tri-color (gold dim → white → italic gold),
  régua dourada e body com destaques. Coluna direita com imagem
  quem-somos.jpg em portrait 4:5, clip-path diagonal arquitetonico,
  hairline SVG tracejando a diagonal, glass quote bar com texto
  italic + 3 acentos red.
- Régua de transição centralizada com eyebrow "M · V · V".
- Movement 2: 3-col MVV com badges circulares 48px alternando
  red/blue/gold, títulos em Cormorant italic, hairlines verticais
  entre colunas.
- Mobile: Movement 1 colapsa em <lg sem clip-path, imagem 16:9.
  Movement 2 colapsa em <md com hairlines horizontais.
- Motion staggered com framer-motion useInView once.

Imagem corrigida de /images/manifesto/vista-estrategica.webp (path
fantasma) para /images/hero/quem-somos.jpg.

Spec: docs/superpowers/specs/2026-05-08-estrategia-manifesto-redesign.md
Checkpoint pré-redesign: 7f45f61d

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Verificação visual no navegador

**Files:** Nenhum.

### Contexto

Type-check e testes garantem corretude de código. Esta task verifica o resultado VISUAL — desktop layout, mobile collapse, motion ao scroll, image rendering. **Sem commits nesta task** — apenas validação visual antes de fechar.

- [ ] **Step 1: Iniciar dev server**

```bash
cd E:/Projetos/hold && npm run dev
```

Esperado: servidor sobe em http://localhost:3000 (ou outra porta se 3000 ocupada). Anotar a URL exata do output.

- [ ] **Step 2: Validação desktop (≥1024px)**

Abrir `http://localhost:3000` em browser. Scroll até a seção "Estratégia / Mais do que produtos".

Verificar checklist visual:
- [ ] Background navy escuro (`#0b1f3a`), não claro
- [ ] Hairline dourado fininho no topo da seção (edge-to-edge)
- [ ] Dot-grid sutil de fundo perceptível
- [ ] Eyebrow "ESTRATÉGIA" em dourado letterspaced à esquerda
- [ ] Headline serif tri-color: "Mais do que produtos." (dourado claro), "Uma estratégia completa" (branco), "para o seu patrimônio." (italic dourado)
- [ ] Imagem `quem-somos.jpg` à direita, ocupando ~58% da largura
- [ ] **Recorte diagonal** visível na borda esquerda da imagem
- [ ] Linha gold fininha tracejando essa diagonal
- [ ] Glass quote bar sobreposto no canto inferior da imagem com texto italic e 3 acentos vermelhos em "proteção patrimonial", "sucessão", "eficiência financeira"
- [ ] Régua "M · V · V" centralizada entre os 2 movimentos
- [ ] 3 cards MVV embaixo, cada um com badge circular colorido (vermelho / azul / dourado)
- [ ] Hairlines verticais dourados entre as colunas MVV
- [ ] Títulos "Missão / Visão / Valores" em italic serif, branco

- [ ] **Step 3: Validação mobile (DevTools 375px)**

Abrir DevTools, alternar para responsive mode, definir 375×667 (iPhone SE).

Verificar checklist visual:
- [ ] Imagem aparece no TOPO da seção (`order-1`), texto abaixo
- [ ] Imagem **SEM** clip-path diagonal (deve ser retângulo simples)
- [ ] Imagem em proporção 16:9 (não portrait)
- [ ] Quote bar sobreposto na imagem ocupa toda largura interna com padding
- [ ] Texto da coluna esquerda desce abaixo: eyebrow → headline serif → régua → body
- [ ] Headline ainda legível (clamp deve reduzir para ~1.65rem)
- [ ] MVV vira coluna única, com hairlines HORIZONTAIS entre cards (border-t)
- [ ] Badges + títulos italic + body legíveis
- [ ] Sem overflow horizontal

- [ ] **Step 4: Validar motion no scroll**

Recarregar a página (com a seção fora do viewport inicialmente). Scrollar lentamente até a seção:
- [ ] Eyebrow desliza fade x:-8 → 0
- [ ] Headline desliza fade y:18 → 0 (after eyebrow)
- [ ] Imagem fade scale 0.98 → 1
- [ ] Body desliza fade y:12 → 0
- [ ] Quote bar desliza fade y:14 → 0
- [ ] Régua expande scaleX 0 → 1
- [ ] 3 MVV cards aparecem em cascata (stagger 0.1s)

Cada elemento aparece UMA VEZ (`useInView once: true`).

- [ ] **Step 5: Parar o dev server**

`Ctrl+C` no terminal onde `npm run dev` está rodando.

**Sem commit.** Esta task é apenas validação visual — não muda código.

---

## Task 5: Atualizar memória de checkpoint pós-implementação

**Files:**
- Modify: `C:/Users/guiro/.claude/projects/E--Projetos-hold/memory/project_checkpoint_pre_manifesto_v4.md` (adicionar nota de status)

### Contexto

A memória `project_checkpoint_pre_manifesto_v4.md` foi criada antes da implementação. Após implementação aprovada, anotar nela que o redesign foi entregue, qual o commit do resultado, e como reverter se necessário.

- [ ] **Step 1: Editar a memória de checkpoint para anotar conclusão**

Adicionar ao final do file `project_checkpoint_pre_manifesto_v4.md` o seguinte bloco:

```markdown

---

## Status pós-implementação

**Implementado em:** [data atual da execução]
**Commits do redesign:**
- `[hash da Task 1]` — chore(fonts): Cormorant Garamond style 'normal'
- `[hash da Task 2]` — test(manifesto): rewrite for v4
- `[hash da Task 3]` — feat(manifesto): editorial spread navy

**Status atual:** Aprovado pelo usuário / Em revisão / Rejeitado (escolher um)

**Como reverter para o checkpoint pré-redesign (commit 7f45f61d):**
- Apenas o componente: `git checkout 7f45f61d -- components/sections/EstrategiaManifesto.tsx components/sections/EstrategiaManifesto.test.tsx`
- Tudo (incluindo font config): `git reset --hard 7f45f61d` (apenas local)
```

Substituir os placeholders:
- `[data atual da execução]` por a data ISO de hoje (ex: `2026-05-08`)
- `[hash da Task N]` pelos primeiros 8 chars do commit hash de cada task (use `git log -3 --format=%h`)
- Escolher o status atual baseado no feedback do usuário

- [ ] **Step 2: Apresentar status ao usuário**

Mensagem para o usuário:

> Redesign do EstrategiaManifesto v4 implementado e testado. Commits criados:
> - chore(fonts): Cormorant Garamond style 'normal'
> - test(manifesto): testes v4
> - feat(manifesto): editorial spread navy
>
> Checkpoint pré-redesign salvo em `7f45f61d`. Se quiser reverter:
> ```
> git checkout 7f45f61d -- components/sections/EstrategiaManifesto.tsx
> ```
>
> O que achou?

Sem commit nesta task — a memória é local ao Claude, não vai pro git.

---

## Critérios de aceite final

Verificar antes de fechar a task:

- [ ] `npx vitest run components/sections/EstrategiaManifesto.test.tsx` → 11/11 PASS
- [ ] `npx tsc --noEmit` → sem erros
- [ ] Visual check desktop ≥1024px: layout 12-col, image com clip-path diagonal, quote bar glass, MVV 3-col com badges
- [ ] Visual check mobile <1024px: stack vertical, image 16:9 sem clip-path, MVV 1-col com hairlines horizontais
- [ ] Motion stagger funciona uma vez ao entrar no viewport
- [ ] Cormorant Garamond carregando em `style: ['normal', 'italic']`
- [ ] Imagem `quem-somos.jpg` carrega corretamente (sem 404)
- [ ] Sem regressões visuais em HomeHero (acima) ou SolucoesGrid (abaixo)
- [ ] Memória de checkpoint atualizada com status pós-implementação

---

## Risks & rollback

**Riscos identificados:**

1. **Cormorant Garamond peso 500 normal pode ficar fino demais** — se o usuário achar que falta peso, mudar para 600 em Task 3 step 1 (já tá no array de weights). Para alterar: trocar `fontWeight: 500` por `fontWeight: 600` na headline.

2. **Imagem `quem-somos.jpg` em portrait 4:5 pode cortar mal** — se o corredor central ou objetos ficarem mal posicionados, ajustar `objectPosition: 'center 30%'` para outro valor (ex: `'center top'`, `'40% center'`).

3. **Glass quote bar com backdrop-blur quebra em browsers antigos** — degradação aceitável (vira opaque rgba). Sem rollback necessário.

4. **clip-path diagonal pode parecer estranho em telas tablet (768-1023px)** — cobertura `lg:` aplica a partir de 1024px. Em tablets fica retangular. Aceitável.

**Rollback completo:** `git reset --hard 7f45f61d` traz de volta o estado pré-redesign (manifesto v3 light + dark card + MVV white).

**Rollback parcial:** `git checkout 7f45f61d -- components/sections/EstrategiaManifesto.tsx components/sections/EstrategiaManifesto.test.tsx` traz só o componente antigo.
