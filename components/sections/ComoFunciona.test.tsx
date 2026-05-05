import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ComoFunciona from './ComoFunciona'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const { initial, animate, whileInView, viewport, transition, exit, whileHover, whileTap, variants, style, ...d } = rest
          void initial; void animate; void whileInView; void viewport; void transition
          void exit; void whileHover; void whileTap; void variants
          return React.createElement(tag, { ...d, style }, children)
        },
    },
  )
  const make = () => ({ get: () => 0, set: () => {}, onChange: () => () => {} })
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useScroll: () => ({ scrollYProgress: make() }),
    useTransform: () => make(),
  }
})

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'comoFunciona.eyebrow':       'Para você',
        'comoFunciona.title':         'Como funciona seu plano com a Hold',
        'comoFunciona.subtitle':      'Planejamento estruturado, estratégia consultiva e acompanhamento próximo.',
        'comoFunciona.body':          'Na Hold, cada projeto começa com análise.',
        'comoFunciona.diff.title':    'O que você ganha com a Hold',
        'comoFunciona.badge':         'Operação regulamentada pelo Banco Central do Brasil',
        'comoFunciona.cta':           'Falar com um especialista',
        'comoFunciona.step1.title':   'Diagnóstico e planejamento',
        'comoFunciona.step1.desc':    'Step 1 desc',
        'comoFunciona.step2.title':   'Estratégia de contemplação',
        'comoFunciona.step2.desc':    'Step 2 desc',
        'comoFunciona.step3.title':   'Utilização do crédito',
        'comoFunciona.step3.desc':    'Step 3 desc',
        'comoFunciona.step4.title':   'Acompanhamento completo',
        'comoFunciona.step4.desc':    'Step 4 desc',
      }
      return map[key] ?? key
    },
  }),
}))

describe('ComoFunciona (PF mirror of ParaEscritorios)', () => {
  it('renders the section with id="como-funciona"', () => {
    render(<ComoFunciona />)
    expect(document.querySelector('#como-funciona')).not.toBeNull()
  })

  it('renders eyebrow, title and subtitle', () => {
    render(<ComoFunciona />)
    expect(screen.getByText('Para você')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /Como funciona seu plano com a Hold/i })).toBeInTheDocument()
    expect(screen.getByText(/Planejamento estruturado/)).toBeInTheDocument()
  })

  it('renders all 4 step titles', () => {
    render(<ComoFunciona />)
    expect(screen.getByText('Diagnóstico e planejamento')).toBeInTheDocument()
    expect(screen.getByText('Estratégia de contemplação')).toBeInTheDocument()
    expect(screen.getByText('Utilização do crédito')).toBeInTheDocument()
    expect(screen.getByText('Acompanhamento completo')).toBeInTheDocument()
  })

  it('renders the regulatory badge', () => {
    render(<ComoFunciona />)
    expect(screen.getByText(/Banco Central do Brasil/)).toBeInTheDocument()
  })

  it('renders the WhatsApp CTA pointing to wa.me', () => {
    render(<ComoFunciona />)
    const cta = screen.getByRole('link', { name: /Falar com um especialista/ })
    expect(cta).toBeInTheDocument()
    expect(cta.getAttribute('href') ?? '').toMatch(/^https?:\/\//)
  })
})
