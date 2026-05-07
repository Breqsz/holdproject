# Home Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `HomeHero.tsx` with a premium editorial-split hero — no AudienceToggle, no rotating text, no stats; left-aligned copy with 4 service indicators and double-bezel photo frame on the right.

**Architecture:** Single `HomeHero.tsx` rewrite (self-contained). New i18n keys added to both locale files. Test file fully replaced to match new structure. No other files touched.

**Tech Stack:** Next.js 14+ · Tailwind CSS · Framer Motion · TypeScript · Vitest + React Testing Library

---

### Task 1: Add new i18n keys

**Files:**
- Modify: `messages/pt.json`
- Modify: `messages/en.json`

- [ ] **Step 1: Add/update keys in pt.json**

Open `messages/pt.json`. Update or add the following (all other existing keys remain untouched):

```json
"hero.eyebrow": "Ecossistema HOLD",
"hero.title.line1": "Um ecossistema.",
"hero.title.line2": "Quatro frentes.",
"hero.title.line3": "Uma estratégia para proteger, planejar e expandir patrimônios.",
"hero.subtitle": "Soluções em saúde, seguros, consórcios e finanças integradas para proteger e evoluir o patrimônio de pessoas e empresas com visão estratégica.",
"hero.cta.specialist": "Fale com um especialista",
"hero.cta.solutions": "Conheça nossas soluções",
"hero.service.saude": "Saúde",
"hero.service.seguros": "Seguros",
"hero.service.consorcios": "Consórcios",
"hero.service.financas": "Soluções Financeiras",
"hero.photo.alt": "Família atendida pela Hold Corretora"
```

Notes:
- `hero.eyebrow` currently `"Consultoria Estratégica em Patrimônio"` — update it.
- `hero.cta.solutions` currently `"Conhecer soluções"` — update it.
- All other hero keys (`hero.frentes`, `hero.valores`, `hero.middle`, etc.) stay — they are used by other components.

- [ ] **Step 2: Add/update keys in en.json**

```json
"hero.eyebrow": "HOLD Ecosystem",
"hero.title.line1": "One ecosystem.",
"hero.title.line2": "Four pillars.",
"hero.title.line3": "A strategy to protect, plan and expand wealth.",
"hero.subtitle": "Integrated health, insurance, consortium and financial solutions to protect and evolve the wealth of individuals and businesses.",
"hero.cta.specialist": "Talk to a specialist",
"hero.cta.solutions": "Explore our solutions",
"hero.service.saude": "Health Plans",
"hero.service.seguros": "Insurance",
"hero.service.consorcios": "Consortiums",
"hero.service.financas": "Financial Solutions",
"hero.photo.alt": "Family served by Hold Corretora"
```

- [ ] **Step 3: Verify JSON is valid**

```bash
node -e "require('./messages/pt.json'); require('./messages/en.json'); console.log('JSON valid')"
```

Expected output: `JSON valid`

- [ ] **Step 4: Commit**

```bash
git add messages/pt.json messages/en.json
git commit -m "feat(i18n): add hero keys for ecosystem redesign"
```

---

### Task 2: Write failing tests for new HomeHero

**Files:**
- Modify: `components/sections/HomeHero.test.tsx`

The existing tests cover the old design (AudienceToggle, rotating text, image opacity swap). Replace the entire file with tests for the new structure.

- [ ] **Step 1: Replace HomeHero.test.tsx with the following**

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomeHero from './HomeHero'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy({}, {
    get: (_t, tag: string) =>
      React.forwardRef(({ children, initial, animate, transition, style, ...rest }: any, ref: unknown) => {
        void initial; void animate; void transition
        return React.createElement(tag, { ...rest, style, ref }, children)
      }),
  })
  const make = () => ({ get: () => 0, set: () => {}, onChange: () => () => {} })
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useMotionValue: make,
    useSpring: make,
  }
})

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: any) => {
    const React = require('react')
    return React.createElement('a', { href, ...rest }, children)
  },
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, ...rest }: any) => {
    const React = require('react')
    return React.createElement('img', { src, alt, ...rest })
  },
}))

vi.mock('@/lib/utils', () => ({
  formatWhatsAppLink: (number: string, message: string) =>
    `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
}))

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => ({
      'hero.eyebrow':            'Ecossistema HOLD',
      'hero.title.line1':        'Um ecossistema.',
      'hero.title.line2':        'Quatro frentes.',
      'hero.title.line3':        'Uma estratégia para proteger, planejar e expandir patrimônios.',
      'hero.subtitle':           'Soluções em saúde, seguros, consórcios e finanças integradas.',
      'hero.cta.specialist':     'Fale com um especialista',
      'hero.cta.solutions':      'Conheça nossas soluções',
      'hero.service.saude':      'Saúde',
      'hero.service.seguros':    'Seguros',
      'hero.service.consorcios': 'Consórcios',
      'hero.service.financas':   'Soluções Financeiras',
      'hero.photo.alt':          'Família atendida pela Hold Corretora',
      'hero.wa.pf':              'Olá! Quero conversar com um especialista da Hold.',
    } as Record<string, string>)[key] ?? key,
  }),
}))

describe('HomeHero', () => {
  it('renders section with id="home"', () => {
    render(<HomeHero />)
    expect(document.querySelector('#home')).not.toBeNull()
  })

  it('renders all three headline lines', () => {
    render(<HomeHero />)
    expect(screen.getByText('Um ecossistema.')).toBeInTheDocument()
    expect(screen.getByText('Quatro frentes.')).toBeInTheDocument()
    expect(screen.getByText('Uma estratégia para proteger, planejar e expandir patrimônios.')).toBeInTheDocument()
  })

  it('renders all four service indicators', () => {
    render(<HomeHero />)
    expect(screen.getByText('Saúde')).toBeInTheDocument()
    expect(screen.getByText('Seguros')).toBeInTheDocument()
    expect(screen.getByText('Consórcios')).toBeInTheDocument()
    expect(screen.getByText('Soluções Financeiras')).toBeInTheDocument()
  })

  it('renders primary CTA linking to WhatsApp', () => {
    render(<HomeHero />)
    const link = screen.getByRole('link', { name: /Fale com um especialista/i })
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toMatch(/wa\.me/)
  })

  it('renders secondary CTA linking to #solucoes', () => {
    render(<HomeHero />)
    const link = screen.getByRole('link', { name: /Conheça nossas soluções/i })
    expect(link).toHaveAttribute('href', '#solucoes')
  })

  it('renders the family hero photo', () => {
    render(<HomeHero />)
    const imgs = Array.from(document.querySelectorAll('img'))
    expect(imgs.some(img => img.getAttribute('src')?.includes('family-hero'))).toBe(true)
  })

  it('does not render AudienceToggle', () => {
    render(<HomeHero />)
    expect(screen.queryByRole('button', { name: /Para você/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /Para sua empresa/i })).toBeNull()
  })

  it('renders eyebrow text', () => {
    render(<HomeHero />)
    expect(screen.getByText('Ecossistema HOLD')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
npx vitest run components/sections/HomeHero.test.tsx
```

Expected: most tests FAIL because the component still has the old implementation. If they all pass something is wrong — the old component must have been changed already.

---

### Task 3: Rewrite HomeHero.tsx

**Files:**
- Modify: `components/sections/HomeHero.tsx`

- [ ] **Step 1: Replace the entire file with the new implementation**

```tsx
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { formatWhatsAppLink } from '@/lib/utils'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT_EXPO } },
}

const SERVICES = [
  { key: 'hero.service.saude',       color: '#22c55e' },
  { key: 'hero.service.seguros',     color: '#3b82f6' },
  { key: 'hero.service.consorcios',  color: '#a855f7' },
  { key: 'hero.service.financas',    color: '#c9a84c' },
] as const

function MagneticCTA({ href, label }: { href: string; label: string }) {
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

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ x: sx, y: sy }}
      className="group inline-flex items-center rounded-full bg-[#ae251c] pl-5 pr-1.5 h-10 text-sm font-bold text-white shadow-[0_4px_18px_rgba(174,37,28,0.35)] transition-colors duration-300 hover:bg-[#c42d23]"
    >
      {label}
      <span className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
        <ArrowRight size={13} />
      </span>
    </motion.a>
  )
}

export default function HomeHero() {
  const { t } = useLocale()
  const wa = formatWhatsAppLink(WHATSAPP, t('hero.wa.pf'))

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ background: 'linear-gradient(125deg,#040d1a 0%,#071528 45%,#0a1c36 100%)' }}
    >
      {/* Atmosphere orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-16 h-[480px] w-[480px] rounded-full bg-[#1a3f7a] opacity-[.20] blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-12 h-[240px] w-[240px] rounded-full bg-[#ae251c] opacity-[.07] blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute right-[12%] top-[40%] h-[280px] w-[280px] rounded-full bg-[#2a5ca0] opacity-[.12] blur-[80px]" />

      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,.055) 1px,transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="relative z-10 grid min-h-[100dvh] grid-cols-1 lg:grid-cols-[1.1fr_1fr]">

        {/* ── Left — copy ── */}
        <div className="flex flex-col justify-center px-6 pb-10 pt-32 sm:px-10 lg:pl-16 lg:pr-10 xl:pl-20">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col">

            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
              <div className="h-px w-4" style={{ background: 'linear-gradient(to right,rgba(174,37,28,.8),transparent)' }} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'rgba(174,37,28,.9)' }}>
                {t('hero.eyebrow')}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              className="font-extrabold leading-[1.08] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(2.4rem,5.2vw,3.8rem)' }}
            >
              <span className="block text-[#e8eef5]">{t('hero.title.line1')}</span>
              <span className="block text-[#e8eef5]">{t('hero.title.line2')}</span>
              <span
                className="mt-1.5 block font-medium tracking-[-0.02em] text-[#e8eef5]/42"
                style={{ fontSize: 'clamp(1.1rem,2.2vw,1.45rem)' }}
              >
                {t('hero.title.line3')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-[46ch] text-pretty text-[0.9rem] leading-[1.75] text-[#e8eef5]/38"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Services */}
            <motion.div variants={itemVariants} className="mt-5 flex flex-wrap items-center gap-y-2">
              {SERVICES.map(({ key, color }, i) => (
                <span
                  key={key}
                  className="flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.04em] text-[#e8eef5]/50"
                  style={
                    i < SERVICES.length - 1
                      ? { paddingRight: '12px', marginRight: '12px', borderRight: '1px solid rgba(255,255,255,.07)' }
                      : undefined
                  }
                >
                  <span className="h-[4px] w-[4px] shrink-0 rounded-full" style={{ background: color }} />
                  {t(key)}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="mt-6 flex flex-wrap items-center gap-3">
              <MagneticCTA href={wa} label={t('hero.cta.specialist')} />
              <Link
                href="#solucoes"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 text-sm font-semibold text-white/60 transition-colors duration-300 hover:border-white/[0.22] hover:text-white/85"
              >
                {t('hero.cta.solutions')}
                <ArrowRight size={14} />
              </Link>
            </motion.div>

          </motion.div>
        </div>

        {/* ── Right — photo double-bezel (desktop) ── */}
        <div className="hidden lg:flex items-center p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: EASE_OUT_EXPO }}
            className="relative h-[calc(100dvh-8rem)] w-full max-h-[680px]"
          >
            {/* Outer bezel shell */}
            <div
              className="absolute inset-0 rounded-[18px] border border-white/[0.08] bg-white/[0.025] p-[5px]"
              style={{ boxShadow: '0 0 40px rgba(174,37,28,.06)' }}
            >
              {/* Red corner glow — not a stripe */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-5 -right-5 h-20 w-20 rounded-full"
                style={{ background: 'radial-gradient(circle,rgba(174,37,28,.22),transparent 70%)' }}
              />
              {/* Inner bezel core */}
              <div
                className="relative h-full w-full overflow-hidden rounded-[14px]"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.07)' }}
              >
                <Image
                  src="/images/hero/family-hero.webp"
                  alt={t('hero.photo.alt')}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                {/* Dark overlay */}
                <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(160deg,rgba(6,15,30,.42),rgba(10,24,48,.15) 50%,rgba(6,15,30,.50))' }} />
                {/* Left fade — dissolves photo into bg */}
                <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(to right,#060f1e 0%,rgba(6,15,30,.55) 28%,transparent 58%)' }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Mobile photo ── */}
        <div className="lg:hidden mx-6 mb-10 aspect-[4/3]">
          <div
            className="relative h-full w-full rounded-[14px] border border-white/[0.08] bg-white/[0.025] p-[4px]"
            style={{ boxShadow: '0 0 30px rgba(174,37,28,.05)' }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-[11px]"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06)' }}
            >
              <Image
                src="/images/hero/family-hero.webp"
                alt={t('hero.photo.alt')}
                fill
                quality={85}
                sizes="100vw"
                className="object-cover object-center"
              />
              <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(160deg,rgba(6,15,30,.35),rgba(10,24,48,.1) 50%,rgba(6,15,30,.45))' }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
```

---

### Task 4: Run tests — verify all pass

**Files:** none modified

- [ ] **Step 1: Run HomeHero tests**

```bash
npx vitest run components/sections/HomeHero.test.tsx
```

Expected: **8 tests pass.**

Common failures and fixes:
- `Cannot find 'hero.cta.specialist'` — verify Task 1 was committed and the key exists in pt.json
- `getByRole link "Fale com um especialista" not found` — the `MagneticCTA` renders a `motion.a`; the framer-motion mock renders it as an `<a>` tag, so `getByRole('link')` should work
- `family-hero img not found` — check the `next/image` mock returns an `<img>` with the `src` prop

- [ ] **Step 2: Run full test suite for regressions**

```bash
npx vitest run
```

Expected: all tests pass. Any failures in `Hero.test.tsx` are pre-existing and unrelated to this work.

---

### Task 5: Final commit

- [ ] **Step 1: Stage and commit the component and tests**

```bash
git add components/sections/HomeHero.tsx components/sections/HomeHero.test.tsx
git commit -m "feat(hero): rewrite HomeHero as premium editorial split

- editorial split layout: copy left, double-bezel photo right
- ecosystem messaging: no AudienceToggle, no rotating text
- 4 service indicators with colour-coded dots
- magnetic primary CTA (WhatsApp) + ghost secondary (#solucoes)
- double-bezel photo frame with red corner glow
- mobile: full-width stack, photo below copy in aspect-[4/3]"
```
