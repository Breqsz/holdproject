import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomeHero from './HomeHero'
import { AudienceProvider } from '@/lib/audience'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        React.forwardRef(
          (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { children, initial, animate, whileInView, viewport, transition, layoutId, exit, whileHover, whileTap, style, layout, ...rest }: any,
            ref: unknown,
          ) => {
            void initial; void animate; void whileInView; void viewport; void transition; void layoutId
            void exit; void whileHover; void whileTap; void layout
            return React.createElement(tag, { ...rest, style, ref }, children)
          },
        ),
    },
  )
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

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'hero.eyebrow':       'Consultoria Estratégica em Patrimônio',
        'hero.middle':        'com',
        'hero.subtitle':      'Do diagnóstico à conquista, a Hold conduz cada decisão com você e por você.',
        'hero.character.alt': 'Especialista Hold Corretora',
      }
      return map[key] ?? key
    },
  }),
}))

function renderHero() {
  return render(<AudienceProvider><HomeHero /></AudienceProvider>)
}

describe('HomeHero', () => {
  beforeEach(() => { window.localStorage.clear() })

  it('renders the section with id="home"', () => {
    renderHero()
    expect(document.querySelector('#home')).not.toBeNull()
  })

  it('renders the static "com" middle line', () => {
    renderHero()
    expect(screen.getAllByText('com').length).toBeGreaterThan(0)
  })

  it('renders the first frente "Consórcio" via RotatingText (initial index)', () => {
    renderHero()
    expect(screen.getAllByText('Consórcio').length).toBeGreaterThan(0)
  })

  it('renders the first valor "inteligência" via RotatingText (initial index)', () => {
    renderHero()
    expect(screen.getAllByText('inteligência').length).toBeGreaterThan(0)
  })

  it('renders the broader subtitle', () => {
    renderHero()
    expect(screen.getByText(/Do diagnóstico à conquista/i)).toBeInTheDocument()
  })

  it('renders the audience toggle', () => {
    renderHero()
    expect(screen.getByRole('button', { name: 'Para você' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Para sua empresa' })).toBeInTheDocument()
  })

  it('renders the WhatsApp CTA and the secondary "Conhecer soluções" CTA', () => {
    renderHero()
    expect(screen.getByRole('link', { name: /Falar no WhatsApp/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Conhecer soluções/i })).toHaveAttribute('href', '#solucoes')
  })

  it('does not render the Jacimar 3D avatar', () => {
    renderHero()
    expect(screen.queryByRole('img', { name: 'Especialista Hold Corretora' })).toBeNull()
  })
})
