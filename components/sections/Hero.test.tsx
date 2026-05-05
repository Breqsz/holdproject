import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        React.forwardRef(
          (
            {
              children,
              initial: _i,
              animate: _a,
              whileInView: _wiv,
              variants: _v,
              viewport: _vp,
              transition: _t,
              whileHover: _wh,
              whileTap: _wt,
              ...rest
            }: Record<string, unknown>,
            ref: unknown
          ) =>
            React.createElement(tag, { ...rest, ref }, children)
        ),
    }
  )
  // Minimal motion-value stub: get/set/onChange just enough for components to mount.
  const makeMotionValue = (initial = 0) => {
    let v = initial
    return {
      get: () => v,
      set: (next: number) => { v = next },
      onChange: () => () => {},
      destroy: () => {},
    }
  }
  return {
    motion,
    AnimatePresence: ({ children }: { children: unknown }) => children,
    useMotionValue: (initial = 0) => makeMotionValue(initial),
    useSpring:      (input: unknown) => input ?? makeMotionValue(0),
    useTransform:   (input: unknown) => input ?? makeMotionValue(0),
  }
})

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'hero.eyebrow':        'Consultoria Especializada em Consórcios',
        'hero.title.line1':    'Consórcio com',
        'hero.title.line2':    'inteligência,',
        'hero.title.line3':    'confiança e estratégia.',
        'hero.subtitle':       'Da escolha à contemplação, a Hold Corretora cuida de tudo com você e por você.',
        'hero.cta.clients':    'Para Clientes',
        'hero.cta.partners':   'Para Escritórios de Investimentos',
        'hero.badge.security': 'Segurança',
        'hero.badge.planning': 'Planejamento',
        'hero.badge.monitoring': 'Acompanhamento',
        'hero.badge.results':  'Resultados',
        'hero.character.alt':  'Especialista Hold Corretora',
        'about.stat.years':    'Anos de Experiência',
        'about.stat.partners': 'Parceiros Comerciais',
      }
      return map[key] ?? key
    },
  }),
}))

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Hero', () => {
  it('renders the section with correct id', () => {
    render(<Hero />)
    expect(document.querySelector('#home')).not.toBeNull()
  })

  it('renders the eyebrow pill', () => {
    render(<Hero />)
    expect(screen.getByText('Consultoria Especializada em Consórcios')).toBeInTheDocument()
  })

  it('renders all three H1 lines', () => {
    render(<Hero />)
    expect(screen.getByText('Consórcio com')).toBeInTheDocument()
    expect(screen.getByText('inteligência,')).toBeInTheDocument()
    expect(screen.getByText('confiança e estratégia.')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Hero />)
    expect(
      screen.getByText(/Da escolha à contemplação/)
    ).toBeInTheDocument()
  })

  it('renders "Para Clientes" CTA linking to #para-clientes', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /Para Clientes/ })
    expect(link).toHaveAttribute('href', '#para-clientes')
  })

  it('renders "Para Escritórios de Investimentos" CTA linking to #para-escritorios', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /Para Escritórios de Investimentos/ })
    expect(link).toHaveAttribute('href', '#para-escritorios')
  })

  it('renders all four badge pills', () => {
    render(<Hero />)
    expect(screen.getByText('Segurança')).toBeInTheDocument()
    expect(screen.getByText('Planejamento')).toBeInTheDocument()
    expect(screen.getByText('Acompanhamento')).toBeInTheDocument()
    expect(screen.getByText('Resultados')).toBeInTheDocument()
  })

  it('renders the character image with correct alt text', () => {
    render(<Hero />)
    expect(
      screen.getByRole('img', { name: 'Especialista Hold Corretora' })
    ).toBeInTheDocument()
  })

  it('renders +19 stat card with label', () => {
    render(<Hero />)
    expect(screen.getByText('+19')).toBeInTheDocument()
    expect(screen.getByText('Anos de Experiência')).toBeInTheDocument()
  })

  it('renders +60 stat card with label', () => {
    render(<Hero />)
    expect(screen.getByText('+60')).toBeInTheDocument()
    expect(screen.getByText('Parceiros Comerciais')).toBeInTheDocument()
  })
})
