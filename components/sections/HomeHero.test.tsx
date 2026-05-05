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
