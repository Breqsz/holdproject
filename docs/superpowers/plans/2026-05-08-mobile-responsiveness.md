# Mobile Responsiveness — Hero + TrustBar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir a hero e a TrustBar para mobile — overlay gradiente na hero e carrossel horizontal com dots na TrustBar.

**Architecture:** Dois componentes independentes, cada um com suas próprias mudanças. Hero recebe um div overlay e ajuste de objectPosition via Tailwind. TrustBar vira `'use client'` com useState + useRef para controlar dots do carrossel.

**Tech Stack:** Next.js 14, Tailwind CSS, Vitest, @testing-library/react, lucide-react

---

## Arquivos

| Arquivo | Ação |
|---------|------|
| `components/sections/HomeHero.tsx` | Modificar — overlay div + className objectPosition responsivo + max-w do container |
| `components/sections/TrustBar.tsx` | Modificar — converter para `'use client'`, adicionar useRef/useState, scroll horizontal, dots |

---

## Task 1: HomeHero — overlay gradiente mobile

**Files:**
- Modify: `components/sections/HomeHero.tsx`

### Contexto

A imagem de fundo usa `style={{ objectPosition: '100% 0%' }}` que a fixa no canto direito. Em mobile o texto fica sobre a imagem sem cobertura. A solução é:
1. Trocar `objectPosition` inline por classes Tailwind responsivas
2. Adicionar um `<div>` overlay visível apenas no mobile com gradiente branco da esquerda
3. Limitar `max-w-[640px]` para `max-w-[85%] sm:max-w-[640px]` evitando vazamento em telas muito pequenas

- [ ] **Step 1: Escrever o teste que falha**

Arquivo: `components/sections/HomeHero.test.tsx` (criar se não existir — verifique se já há um)

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomeHero from './HomeHero'

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { alt, ...rest } = props
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={String(alt ?? '')} {...(rest as object)} />
  },
}))

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({ t: (k: string) => k, locale: 'pt', setLocale: vi.fn() }),
}))

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy({}, {
    get: (_t, tag: string) =>
      React.forwardRef(({ children, initial, animate, exit, transition, ...rest }: Record<string, unknown>, ref: unknown) => {
        void initial; void animate; void exit; void transition
        return React.createElement(String(tag), { ...rest, ref }, children)
      }),
  })
  return { motion, AnimatePresence: ({ children }: { children: React.ReactNode }) => children }
})

describe('HomeHero mobile overlay', () => {
  it('renders the mobile gradient overlay div', () => {
    render(<HomeHero />)
    const overlay = document.querySelector('[data-testid="mobile-overlay"]')
    expect(overlay).toBeTruthy()
  })

  it('overlay has gradient-to-right classes', () => {
    render(<HomeHero />)
    const overlay = document.querySelector('[data-testid="mobile-overlay"]')
    expect(overlay?.className).toContain('from-white')
    expect(overlay?.className).toContain('to-transparent')
  })
})
```

- [ ] **Step 2: Rodar o teste — verificar que falha**

```bash
npx vitest run components/sections/HomeHero.test.tsx
```

Esperado: FAIL — `mobile-overlay` não encontrado.

- [ ] **Step 3: Implementar as mudanças no HomeHero**

Em `components/sections/HomeHero.tsx`, fazer três edições:

**3a — trocar objectPosition inline por classe Tailwind:**
```tsx
// ANTES (linha ~78)
className="object-cover"
style={{ zIndex: 0, objectPosition: '100% 0%' }}

// DEPOIS
className="object-cover object-center md:object-[100%_0%]"
style={{ zIndex: 0 }}
```

**3b — adicionar overlay mobile logo após o `<Image>` (antes do dot grid, linha ~80):**
```tsx
{/* Mobile gradient overlay — garante legibilidade do texto */}
<div
  data-testid="mobile-overlay"
  aria-hidden
  className="md:hidden absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"
  style={{ zIndex: 1 }}
/>
```

**3c — limitar container de texto (linha ~94):**
```tsx
// ANTES
<div className="max-w-[640px]">

// DEPOIS
<div className="max-w-[85%] sm:max-w-[640px]">
```

- [ ] **Step 4: Rodar o teste — verificar que passa**

```bash
npx vitest run components/sections/HomeHero.test.tsx
```

Esperado: PASS (2 testes verdes).

- [ ] **Step 5: Commit**

```bash
git add components/sections/HomeHero.tsx components/sections/HomeHero.test.tsx
git commit -m "fix(hero): overlay gradiente mobile + objectPosition responsivo"
```

---

## Task 2: TrustBar — carrossel horizontal mobile com dots

**Files:**
- Modify: `components/sections/TrustBar.tsx`

### Contexto

TrustBar hoje é um componente server-side sem estado. Os 5 itens ficam em `flex` horizontal sem qualquer breakpoint. Em mobile todos se espremem. A solução é:
1. Converter para `'use client'`
2. Adicionar `useRef` no container de scroll e `useState` para o índice ativo dos dots
3. No mobile (`md` breakpoint), o wrapper vira scroll horizontal com snap
4. Cada item recebe `flex-shrink-0 w-[72vw] snap-start` no mobile e `flex-1` no desktop
5. Sombra fade à direita indica mais conteúdo
6. Dots abaixo sincronizam com a posição do scroll

- [ ] **Step 1: Escrever o teste que falha**

Arquivo: `components/sections/TrustBar.test.tsx` (criar)

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TrustBar from './TrustBar'

vi.mock('@/components/icons/HoldLogo', () => ({
  HoldLogo: ({ className }: { className?: string }) => <svg className={className} data-testid="hold-logo" />,
}))

describe('TrustBar', () => {
  it('renders 5 items', () => {
    render(<TrustBar />)
    const items = document.querySelectorAll('[data-testid="trustbar-item"]')
    expect(items).toHaveLength(5)
  })

  it('renders 5 dots', () => {
    render(<TrustBar />)
    const dots = document.querySelectorAll('[data-testid="trustbar-dot"]')
    expect(dots).toHaveLength(5)
  })

  it('first dot is active by default', () => {
    render(<TrustBar />)
    const dots = document.querySelectorAll('[data-testid="trustbar-dot"]')
    expect(dots[0].className).toContain('bg-[#c9a84c]')
    expect(dots[1].className).not.toContain('bg-[#c9a84c]')
  })
})
```

- [ ] **Step 2: Rodar o teste — verificar que falha**

```bash
npx vitest run components/sections/TrustBar.test.tsx
```

Esperado: FAIL — atributos `data-testid` não existem.

- [ ] **Step 3: Reescrever TrustBar.tsx**

Substituir o conteúdo completo de `components/sections/TrustBar.tsx` por:

```tsx
'use client'

import { useRef, useState, useCallback } from 'react'
import { Target, Landmark, Users, Handshake, TrendingUp } from 'lucide-react'
import { HoldLogo } from '@/components/icons/HoldLogo'

const ITEMS = [
  { Icon: Target,     line1: 'Atuação independente',        line2: 'e estratégica' },
  { Icon: Landmark,   line1: 'Instituições regulamentadas', line2: 'e consolidadas' },
  { Icon: Users,      line1: 'Especialistas em',            line2: 'diferentes áreas' },
  { Icon: Handshake,  line1: 'Relacionamento próximo,',     line2: 'transparente e contínuo' },
  { Icon: TrendingUp, line1: 'Soluções completas para',     line2: 'proteger e fazer seu patrimônio crescer' },
]

export default function TrustBar() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeDot, setActiveDot] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const itemWidth = el.scrollWidth / ITEMS.length
    const index = Math.round(el.scrollLeft / itemWidth)
    setActiveDot(Math.min(index, ITEMS.length - 1))
  }, [])

  return (
    <div className="bg-[#040d1a] border-t border-white/[0.07]">
      {/* Desktop layout */}
      <div className="hidden md:flex mx-auto max-w-[1280px] px-6 lg:px-10 xl:px-14 py-[18px] items-center gap-0">
        {ITEMS.map(({ Icon, line1, line2 }, i) => (
          <div
            key={i}
            className="flex flex-1 items-center gap-3 border-r border-white/[0.08] pr-6 mr-6 last:border-r-0 last:pr-0 last:mr-0"
          >
            <Icon size={17} className="shrink-0 text-[#ae251c]" strokeWidth={1.6} />
            <span className="text-[11.5px] leading-[1.38] text-white/50 font-light">
              {line1}<br />{line2}
            </span>
          </div>
        ))}
        <div className="shrink-0 ml-6 pl-6 border-l border-white/[0.08]">
          <HoldLogo className="h-[22px] w-auto" variant="dark" />
        </div>
      </div>

      {/* Mobile layout — carrossel horizontal */}
      <div className="md:hidden relative">
        {/* Sombra fade à direita */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#040d1a] to-transparent z-10"
        />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 py-4 gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ITEMS.map(({ Icon, line1, line2 }, i) => (
            <div
              key={i}
              data-testid="trustbar-item"
              className="flex-shrink-0 w-[72vw] snap-start flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3"
            >
              <Icon size={18} className="shrink-0 text-[#ae251c] mt-0.5" strokeWidth={1.6} />
              <span className="text-[12px] leading-[1.45] text-white/55 font-light">
                {line1}<br />{line2}
              </span>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 pb-3">
          {ITEMS.map((_, i) => (
            <div
              key={i}
              data-testid="trustbar-dot"
              className={[
                'h-[3px] rounded-full transition-all duration-300',
                i === activeDot
                  ? 'w-6 bg-[#c9a84c]'
                  : 'w-3 bg-white/20',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Rodar os testes — verificar que passam**

```bash
npx vitest run components/sections/TrustBar.test.tsx
```

Esperado: PASS (3 testes verdes).

- [ ] **Step 5: Commit**

```bash
git add components/sections/TrustBar.tsx components/sections/TrustBar.test.tsx
git commit -m "fix(trustbar): carrossel horizontal mobile com dots + snap scroll"
```

---

## Task 3: Verificação visual + deploy

- [ ] **Step 1: Rodar todos os testes do projeto**

```bash
npx vitest run
```

Esperado: todos os testes passando.

- [ ] **Step 2: Verificar no dev server**

```bash
npm run dev
```

Abrir DevTools → Toggle device toolbar → iPhone SE (375px):
- Hero: texto legível, imagem visível à direita com gradiente suave cobrindo o texto
- TrustBar: itens deslizáveis, sombra à direita visível, dots sincronizando com scroll

Testar também em 390px (iPhone 14) e 768px (tablet — deve mostrar layout desktop normal).

- [ ] **Step 3: Push e deploy**

```bash
git push origin main
vercel deploy --prod
```
