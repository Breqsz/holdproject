import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SobreNos from './SobreNos'

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
              ...rest
            }: Record<string, unknown>,
            ref: unknown
          ) =>
            React.createElement(tag, { ...rest, ref }, children)
        ),
    }
  )
  return {
    motion,
    AnimatePresence: ({ children }: { children: unknown }) => children,
    // useInView returns true so the count-up triggers immediately in the test
    useInView: () => true,
  }
})

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'about.eyebrow':       'Quem somos',
        'about.title':         'Mais do que viabilizar crédito.',
        'about.subtitle':      'Estruturamos decisões com estratégia e propósito.',
        'about.body':          'A Hold opera há quase duas décadas em Uberlândia.',
        'about.stat.years':    'Anos de Experiência',
        'about.stat.partners': 'Parceiros Comerciais',
        'about.mission.title': 'Missão',
        'about.mission.body':  'Estruturar decisões patrimoniais.',
        'about.vision.title':  'Visão',
        'about.vision.body':   'Ser referência em consultoria de consórcios.',
        'about.values.title':  'Valores',
        'about.values.body':   'Transparência, estratégia, acompanhamento.',
      }
      return map[key] ?? key
    },
  }),
}))

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('SobreNos', () => {
  it('renders the section with id="sobre-nos"', () => {
    render(<SobreNos />)
    expect(document.querySelector('#sobre-nos')).not.toBeNull()
  })

  it('renders the eyebrow', () => {
    render(<SobreNos />)
    expect(screen.getByText('Quem somos')).toBeInTheDocument()
  })

  it('renders the H2 title and body copy', () => {
    render(<SobreNos />)
    expect(screen.getByText('Mais do que viabilizar crédito.')).toBeInTheDocument()
    expect(screen.getByText(/Estruturamos decisões/)).toBeInTheDocument()
    expect(screen.getByText(/A Hold opera/)).toBeInTheDocument()
  })

  it('renders both stat labels (count-up values are animated)', () => {
    render(<SobreNos />)
    // The numeric values are RAF-driven count-ups and aren't deterministic
    // in jsdom; assert the labels and the leading "+" prefix instead.
    expect(screen.getByText('Anos de Experiência')).toBeInTheDocument()
    expect(screen.getByText('Parceiros Comerciais')).toBeInTheDocument()
    expect(screen.getAllByText(/^\+\d+$/).length).toBeGreaterThanOrEqual(2)
  })

  it('renders the three manifesto blocks (mission/vision/values)', () => {
    render(<SobreNos />)
    expect(screen.getByText('Missão')).toBeInTheDocument()
    expect(screen.getByText('Visão')).toBeInTheDocument()
    expect(screen.getByText('Valores')).toBeInTheDocument()
    expect(screen.getByText('Estruturar decisões patrimoniais.')).toBeInTheDocument()
    expect(screen.getByText('Ser referência em consultoria de consórcios.')).toBeInTheDocument()
    expect(screen.getByText('Transparência, estratégia, acompanhamento.')).toBeInTheDocument()
  })
})
