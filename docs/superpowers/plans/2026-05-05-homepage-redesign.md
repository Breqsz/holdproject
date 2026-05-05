# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adapt the Hold homepage to Dark Refinado style — hero becomes a rounded image card with audience-driven crossfade, sections below switch to `#F5F5F5`.

**Architecture:** `HomeHero` is fully rewritten with a `next/image` card replacing the gradient-only layout. `AudienceToggle` gains a `hero` variant. Six section components have their `bg-*` and text color classes surgically replaced — all internal logic, animations, and copy are unchanged.

**Tech Stack:** Next.js 14 (App Router), React 18, Framer Motion, Tailwind CSS, Vitest + Testing Library

---

## File Map

| File | Change |
|---|---|
| `components/AudienceToggle.tsx` | Add `hero` variant |
| `components/AudienceToggle.test.tsx` | Add test for `hero` variant |
| `components/sections/HomeHero.tsx` | Full rework — card + images + toggle inside |
| `components/sections/HomeHero.test.tsx` | Add image swap tests, update secondary CTA test |
| `components/sections/SolucoesGrid.tsx` | bg + heading text colors → light |
| `components/sections/Parceiros.tsx` | bg + heading + fadeOutColor → light |
| `components/sections/ComoFunciona.tsx` | bg + text colors → light |
| `components/sections/ParaEscritorios.tsx` | bg + text colors → light |
| `components/sections/Depoimentos.tsx` | bg + card colors → light |
| `components/sections/FAQ.tsx` | bg + text colors → light |

---

## Task 1: AudienceToggle — add `hero` variant

**Files:**
- Modify: `components/AudienceToggle.tsx`
- Test: `components/AudienceToggle.test.tsx`

- [ ] **Step 1: Write the failing test**

Add at the bottom of `describe('AudienceToggle', ...)` in `AudienceToggle.test.tsx`:

```tsx
it('applies backdrop-blur wrapper when variant="hero"', () => {
  render(
    <AudienceProvider>
      <AudienceToggle variant="hero" />
    </AudienceProvider>
  )
  const group = screen.getByRole('group', { name: 'Selecionar audiência' })
  expect(group.className).toMatch(/backdrop-blur/)
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx vitest run components/AudienceToggle.test.tsx
```

Expected: FAIL — `backdrop-blur` not in className (variant not yet implemented).

- [ ] **Step 3: Implement `hero` variant in `AudienceToggle.tsx`**

Change the `AudienceToggleProps` interface and the `wrapper`/`inactive` derivation:

```tsx
interface AudienceToggleProps {
  variant?: 'dark' | 'light' | 'hero'
  className?: string
}
```

Replace the `wrapper` and `inactive` assignments:

```tsx
const wrapper =
  variant === 'dark'
    ? 'bg-[#142f54] ring-1 ring-white/10'
    : variant === 'hero'
    ? 'bg-[rgba(255,255,255,0.07)] ring-1 ring-white/10 backdrop-blur-sm'
    : 'bg-white/10 ring-1 ring-white/15 backdrop-blur-sm'

const inactive =
  variant === 'dark'
    ? 'text-[#7a9ab8] hover:text-white'
    : variant === 'hero'
    ? 'text-white/40 hover:text-white/70'
    : 'text-white/70 hover:text-white'
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npx vitest run components/AudienceToggle.test.tsx
```

Expected: all 6 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add components/AudienceToggle.tsx components/AudienceToggle.test.tsx
git commit -m "feat(toggle): add hero variant with frosted glass wrapper"
```

---

## Task 2: HomeHero — rework to card layout

**Files:**
- Modify: `components/sections/HomeHero.tsx`
- Modify: `components/sections/HomeHero.test.tsx`

- [ ] **Step 1: Write failing tests — add to `HomeHero.test.tsx`**

Replace the entire file content with the version below. Key changes: add `next/image` mock, add image-swap tests, update secondary CTA test, remove obsolete avatar test.

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomeHero from './HomeHero'
import { AudienceProvider } from '@/lib/audience'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy({}, {
    get: (_t, tag: string) =>
      React.forwardRef(({ children, initial, animate, whileInView, viewport,
        transition, layoutId, exit, whileHover, whileTap, style, layout, ...rest }: any, ref: unknown) => {
        void initial; void animate; void whileInView; void viewport; void transition
        void layoutId; void exit; void whileHover; void whileTap; void layout
        return React.createElement(tag, { ...rest, style, ref }, children)
      }),
  })
  const make = () => ({ get: () => 0, set: () => {}, onChange: () => () => {} })
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => false,
    useMotionValue: make,
    useSpring: make,
    useTransform: make,
  }
})

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode } & Record<string, unknown>) => {
    const React = require('react')
    return React.createElement('a', { href, ...rest }, children)
  },
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, style, ...rest }: { src: string; alt: string; style?: React.CSSProperties } & Record<string, unknown>) => {
    const React = require('react')
    return React.createElement('img', { src, alt, style, ...rest })
  },
}))

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => ({ 'hero.middle': 'com' } as Record<string,string>)[key] ?? key,
  }),
}))

function renderHero() {
  return render(<AudienceProvider><HomeHero /></AudienceProvider>)
}

describe('HomeHero', () => {
  beforeEach(() => { window.localStorage.clear() })

  it('renders section with id="home"', () => {
    renderHero()
    expect(document.querySelector('#home')).not.toBeNull()
  })

  it('renders the static "com" middle line', () => {
    renderHero()
    expect(screen.getAllByText('com').length).toBeGreaterThan(0)
  })

  it('renders "Consórcio" as initial frente', () => {
    renderHero()
    expect(screen.getAllByText('Consórcio').length).toBeGreaterThan(0)
  })

  it('renders "inteligência" as initial valor', () => {
    renderHero()
    expect(screen.getAllByText('inteligência').length).toBeGreaterThan(0)
  })

  it('shows persona_hero with opacity 1 for PF (default)', () => {
    renderHero()
    const imgs = Array.from(document.querySelectorAll('img'))
    const pfImg = imgs.find(img => img.getAttribute('src')?.includes('persona_hero'))
    expect(pfImg).not.toBeNull()
    expect(pfImg!.style.opacity).toBe('1')
  })

  it('shows office_hero with opacity 0 for PF (default)', () => {
    renderHero()
    const imgs = Array.from(document.querySelectorAll('img'))
    const pjImg = imgs.find(img => img.getAttribute('src')?.includes('office_hero'))
    expect(pjImg).not.toBeNull()
    expect(pjImg!.style.opacity).toBe('0')
  })

  it('swaps image opacity when switching to PJ', async () => {
    const user = userEvent.setup()
    renderHero()
    await user.click(screen.getByRole('button', { name: 'Para sua empresa' }))
    const imgs = Array.from(document.querySelectorAll('img'))
    const pfImg = imgs.find(img => img.getAttribute('src')?.includes('persona_hero'))
    const pjImg = imgs.find(img => img.getAttribute('src')?.includes('office_hero'))
    expect(pfImg!.style.opacity).toBe('0')
    expect(pjImg!.style.opacity).toBe('1')
  })

  it('renders the audience toggle inside the card', () => {
    renderHero()
    expect(screen.getByRole('button', { name: 'Para você' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Para sua empresa' })).toBeInTheDocument()
  })

  it('renders WhatsApp CTA and "Conhecer soluções" for PF', () => {
    renderHero()
    expect(screen.getByRole('link', { name: /Falar no WhatsApp/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Conhecer soluções/i })).toHaveAttribute('href', '#solucoes')
  })

  it('renders "Para escritórios" secondary CTA when PJ', async () => {
    const user = userEvent.setup()
    renderHero()
    await user.click(screen.getByRole('button', { name: 'Para sua empresa' }))
    expect(screen.getByRole('link', { name: /Para escritórios/i })).toHaveAttribute('href', '#para-escritorios')
  })
})
```

- [ ] **Step 2: Run tests — expect image-swap tests to FAIL**

```bash
npx vitest run components/sections/HomeHero.test.tsx
```

Expected: 6 existing tests PASS, new image/opacity tests FAIL (component not yet reworked).

- [ ] **Step 3: Rewrite `HomeHero.tsx`**

Replace the entire file:

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { useAudience } from '@/lib/audience'
import { AudienceToggle } from '@/components/AudienceToggle'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { formatWhatsAppLink } from '@/lib/utils'
import RotatingText from '@/components/motion/RotatingText'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
const ROTATION_INTERVAL_MS = 3800

const FRENTES = ['Consórcio', 'Seguros', 'Saúde', 'Investimentos']
const VALORES = ['inteligência', 'confiança', 'estratégia', 'clareza', 'método', 'visão', 'propósito']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT_EXPO } },
}

function MagneticCTA({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 })

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="magnetic group inline-flex items-center gap-2 rounded-full bg-[#ae251c] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_18px_rgba(174,37,28,0.4)] transition-colors duration-200 hover:bg-[#c42d23]"
    >
      {icon}
      {label}
    </motion.a>
  )
}

export default function HomeHero() {
  const { t } = useLocale()
  const { audience } = useAudience()
  const [rotationIndex, setRotationIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setRotationIndex((prev) => (prev + 1) % Math.max(FRENTES.length, VALORES.length)),
      ROTATION_INTERVAL_MS,
    )
    return () => clearInterval(id)
  }, [])

  const isPF = audience === 'pf'

  const wa = formatWhatsAppLink(
    WHATSAPP,
    isPF
      ? 'Olá! Quero conversar com um especialista da Hold.'
      : 'Olá! Sou de uma empresa/escritório e quero conversar com a Hold.',
  )

  const subtitle = isPF
    ? 'Proteção inteligente para o que mais importa na sua vida e família.'
    : 'Soluções corporativas de proteção e crescimento patrimonial para o seu negócio.'

  return (
    <section id="home" className="relative bg-[#07162a] overflow-hidden">
      {/* Atmosphere orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-[480px] w-[480px] rounded-full bg-[#1a4b8a] opacity-[.18] blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-12 h-[280px] w-[280px] rounded-full bg-[#ae251c] opacity-[.10] blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute -left-8 top-32 h-[220px] w-[220px] rounded-full bg-[#3b6cb5] opacity-[.16] blur-[80px]" />

      {/* Hero card */}
      <div
        className="relative mx-[10px] rounded-2xl overflow-hidden"
        style={{ height: 'calc(100dvh - 90px)' }}
      >
        <Image
          src="/images/hero/persona_hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
          style={{ opacity: isPF ? 1 : 0, transition: 'opacity 650ms ease' }}
        />
        <Image
          src="/images/hero/office_hero.avif"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
          style={{ opacity: isPF ? 0 : 1, transition: 'opacity 650ms ease' }}
        />

        {/* Gradient overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(to top, rgba(7,22,42,.95) 0%, rgba(7,22,42,.55) 38%, rgba(7,22,42,.18) 100%)' }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-[2] p-6 md:p-[22px_24px]">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="mb-3">
              <AudienceToggle variant="hero" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-display text-pretty leading-[1.05] font-gellix"
              style={{ fontSize: 'clamp(2.5rem, 6.4vw, 4.75rem)' }}
            >
              <span className="block text-[#ae251c] overflow-hidden">
                <RotatingText
                  texts={FRENTES}
                  controlledIndex={rotationIndex % FRENTES.length}
                  staggerFrom="last"
                  staggerDuration={0.04}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  transition={{ type: 'spring', damping: 45, stiffness: 150 }}
                  splitLevelClassName="overflow-hidden pb-0.5"
                />
              </span>
              <span className="block text-white">{t('hero.middle')}</span>
              <span className="block text-[#ae251c] overflow-hidden">
                <RotatingText
                  texts={VALORES}
                  controlledIndex={rotationIndex % VALORES.length}
                  staggerFrom="last"
                  staggerDuration={0.04}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  transition={{ type: 'spring', damping: 45, stiffness: 150 }}
                  splitLevelClassName="overflow-hidden pb-0.5"
                />
                <span className="text-white">.</span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-[52ch] text-pretty text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              {subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-3">
              <MagneticCTA href={wa} label="Falar no WhatsApp" icon={<WhatsAppIcon size={16} />} />
              <Link
                href={isPF ? '#solucoes' : '#para-escritorios'}
                className="group inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                {isPF ? 'Conhecer soluções' : 'Para escritórios'}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run all HomeHero tests — expect all PASS**

```bash
npx vitest run components/sections/HomeHero.test.tsx
```

Expected: all 10 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/HomeHero.tsx components/sections/HomeHero.test.tsx
git commit -m "feat(hero): card layout with persona/office image crossfade by audience"
```

---

## Task 3: SolucoesGrid — light background

**Files:** `components/sections/SolucoesGrid.tsx`

No test changes needed — existing tests check semantic content, not bg classes.

- [ ] **Step 1: Apply changes**

In `SolucoesGrid.tsx` make these three replacements:

```
Line 137: bg-[#07162a]  →  bg-[#F5F5F5]
Line 149: text-white    →  text-[#07162a]
Line 153: text-[#7a9ab8] → text-[#07162a]/60
```

Exact replacements:

```tsx
// line 137
<section id="solucoes" className="section-pad bg-[#F5F5F5]" style={{ fontFamily: 'var(--font-outfit)' }}>

// line 149
className="text-display text-[#07162a]"

// line 153
className="mt-5 max-w-[56ch] text-pretty text-[#07162a]/60 leading-relaxed mx-auto">
```

- [ ] **Step 2: Run tests + typecheck**

```bash
npx vitest run components/sections/SolucoesGrid.test.tsx && npx tsc --noEmit
```

Expected: all PASS, no type errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/SolucoesGrid.tsx
git commit -m "feat(solucoes): light #F5F5F5 background with dark headings"
```

---

## Task 4: Parceiros — light background

**Files:** `components/sections/Parceiros.tsx`

- [ ] **Step 1: Apply changes**

```tsx
// line 22 — section bg
<section id="parceiros" className="section-pad bg-[#F5F5F5]" style={{ fontFamily: 'var(--font-outfit)' }}>

// line 34 — heading
className="mt-5 text-display text-[#07162a]"

// line 37 — subtitle
className="mt-4 max-w-[60ch] text-[#07162a]/60 leading-relaxed text-sm">

// line 51 — LogoLoop fadeOutColor (edge fade must match new bg)
fadeOutColor="#F5F5F5"
```

- [ ] **Step 2: Run tests + typecheck**

```bash
npx vitest run components/sections/Parceiros.test.tsx && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Parceiros.tsx
git commit -m "feat(parceiros): light background, update logo fade color"
```

---

## Task 5: ComoFunciona — light background

**Files:** `components/sections/ComoFunciona.tsx`

- [ ] **Step 1: Apply changes**

```tsx
// line 55 — section bg
className="section-pad bg-[#F5F5F5]"

// line 71 — h2
className="mt-5 text-display text-[#07162a]"

// line 79 — subtitle
className="mt-6 max-w-[60ch] text-pretty text-lg leading-relaxed text-[#07162a]/60"

// line 86 — body
className="mt-4 max-w-[60ch] leading-relaxed text-[#07162a]/70"

// line 116 — ganhos list items
<span className="text-[#07162a]/80 text-sm leading-relaxed">{item}</span>

// line 132 — timeline rail
className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-[#07162a]/10"

// line 157 — step title
<p className="text-[#07162a] font-semibold text-sm leading-snug">

// line 160 — step desc
<p className="text-[#07162a]/55 text-xs leading-relaxed">
```

- [ ] **Step 2: Run tests + typecheck**

```bash
npx vitest run components/sections/ComoFunciona.test.tsx && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/ComoFunciona.tsx
git commit -m "feat(como-funciona): light background with dark text"
```

---

## Task 6: ParaEscritorios — light background

**Files:** `components/sections/ParaEscritorios.tsx`

- [ ] **Step 1: Apply changes** (same pattern as Task 5, different line numbers)

```tsx
// line 54 — section bg
className="section-pad bg-[#F5F5F5]"

// line 69 — h2
className="mt-5 text-display text-[#07162a]"

// line 76 — subtitle
className="mt-6 max-w-[60ch] text-pretty text-lg leading-relaxed text-[#07162a]/60"

// line 84 — body
className="mt-4 max-w-[60ch] leading-relaxed text-[#07162a]/70"

// line 118 — diferenciais list items
<span className="text-[#07162a]/80 text-sm leading-relaxed">{item}</span>

// line 134 — timeline rail
className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-[#07162a]/10"

// line 156 — step title
<p className="text-[#07162a] font-semibold text-sm leading-snug">

// line 159 — step desc
<p className="text-[#07162a]/55 text-xs leading-relaxed">
```

- [ ] **Step 2: Run tests + typecheck**

```bash
npx vitest run components/sections/ParaEscritorios.test.tsx && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/ParaEscritorios.tsx
git commit -m "feat(para-escritorios): light background with dark text"
```

---

## Task 7: Depoimentos — light background

**Files:** `components/sections/Depoimentos.tsx`

- [ ] **Step 1: Apply changes**

```tsx
// line 29 — section bg
className="section-pad bg-[#F5F5F5]"

// line 46 — heading
className="mt-5 text-display text-[#07162a]"

// line 58 — Google badge wrapper
className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#07162a]/[0.04] ring-1 ring-[#07162a]/10 px-4 py-2 hover:ring-[#07162a]/25 transition-colors"

// line 66 — review count text
<span className="text-[#07162a]/55 text-xs">

// lines 76 & 81 — carousel nav buttons
className="w-11 h-11 rounded-full bg-[#07162a]/[0.08] hover:bg-[#07162a]/[0.14] transition-colors flex items-center justify-center text-[#07162a]"

// line 104 — review card
className="rounded-2xl bg-white ring-1 ring-[#07162a]/08 p-7 md:p-9 h-full flex flex-col gap-5"

// line 113 — review body text
className="text-pretty text-[#07162a] leading-snug flex-1"

// line 124 — reviewer name
<p className="text-[#07162a] font-semibold text-sm">{item.name}</p>

// line 125 — reviewer role
<p className="text-[#07162a]/50 text-xs mt-0.5 inline-flex items-center gap-1.5">
```

- [ ] **Step 2: Run tests + typecheck**

```bash
npx vitest run components/sections/Depoimentos.test.tsx && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Depoimentos.tsx
git commit -m "feat(depoimentos): light background, white review cards"
```

---

## Task 8: FAQ — light background

**Files:** `components/sections/FAQ.tsx`

- [ ] **Step 1: Apply changes**

```tsx
// line 56 — section bg
className="section-pad bg-[#F5F5F5]"

// line 71 — heading
className="mt-5 text-display text-[#07162a]"

// line 99 — question text
className="text-[#07162a] font-medium text-sm md:text-base leading-snug group-hover:text-[#ae251c] transition-colors"

// line 121 — answer text
<p className="pb-5 pr-8 text-[#07162a]/55 text-sm leading-relaxed">
```

- [ ] **Step 2: Run tests + typecheck**

```bash
npx vitest run components/sections/FAQ.test.tsx && npx tsc --noEmit
```

- [ ] **Step 3: Run full test suite**

```bash
npx vitest run
```

Expected: all tests PASS.

- [ ] **Step 4: Commit**

```bash
git add components/sections/FAQ.tsx
git commit -m "feat(faq): light background with dark text and red hover"
```

---

## Final Verification

- [ ] Run full test suite: `npx vitest run` — all PASS
- [ ] Run typecheck: `npx tsc --noEmit` — no errors
- [ ] Start dev server: `npm run dev` — visually verify each section scrolling from top to bottom
- [ ] Toggle audience → hero image crossfades between `persona_hero.jpg` and `office_hero.avif`
- [ ] Rotating text (Consórcio/Seguros... + inteligência/confiança...) animates in hero card
- [ ] CardNav pill unchanged
- [ ] CurvedLoop marquee divider unchanged (still dark)
- [ ] SobreNos and Contato still dark (no changes made)
