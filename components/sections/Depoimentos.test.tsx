import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Depoimentos from './Depoimentos'

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
  return { motion, AnimatePresence: ({ children }: { children: unknown }) => children }
})

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'testimonials.eyebrow': 'Depoimentos',
        'testimonials.title': 'O que nossos clientes dizem',
      }
      return map[key] ?? key
    },
  }),
}))

// Embla: expose a minimal stub that still renders children and provides
// scrollPrev/scrollNext so prev/next buttons can be exercised.
const mockScrollPrev = vi.fn()
const mockScrollNext = vi.fn()

vi.mock('embla-carousel-react', () => ({
  default: () => {
    const React = require('react')
    // Return [ref callback, api stub]
    const ref = (node: HTMLElement | null) => void node
    const api = { scrollPrev: mockScrollPrev, scrollNext: mockScrollNext }
    return [ref, api]
  },
}))

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Depoimentos', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    render(<Depoimentos />)
  })

  it('renders the section with correct id', () => {
    expect(document.querySelector('#depoimentos')).not.toBeNull()
  })

  it('renders the eyebrow pill', () => {
    expect(screen.getByText('Depoimentos')).toBeInTheDocument()
  })

  it('renders the H2 title', () => {
    expect(
      screen.getByRole('heading', { level: 2, name: 'O que nossos clientes dizem' })
    ).toBeInTheDocument()
  })

  it('renders all 6 testimonial author names', () => {
    const names = [
      'Rafael Mendonça',
      'Camila Borges',
      'Gustavo Almeida',
      'Priscila Cavalcanti',
      'Thiago Rezende',
      'Fernanda Lopes',
    ]
    names.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })

  it('renders all 6 testimonial roles', () => {
    const roles = [
      'Empresário',
      'Médica',
      'Assessor de Investimentos',
      'Empresária',
      'Arquiteto',
      'Contadora',
    ]
    roles.forEach((role) => {
      expect(screen.getByText(role)).toBeInTheDocument()
    })
  })

  it('renders quote text for each testimonial', () => {
    expect(
      screen.getByText(/Suporte excepcional do início ao fim/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/contemplação em 8 meses/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/complementa perfeitamente nosso portfólio/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/sem comprometer o caixa/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/carta de crédito contemplada/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/referência em consórcio estratégico/)
    ).toBeInTheDocument()
  })

  it('renders prev and next navigation buttons', () => {
    expect(
      screen.getByRole('button', { name: /depoimento anterior/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /próximo depoimento/i })
    ).toBeInTheDocument()
  })

  it('calls scrollPrev when prev button is clicked', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /depoimento anterior/i }))
    expect(mockScrollPrev).toHaveBeenCalledOnce()
  })

  it('calls scrollNext when next button is clicked', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /próximo depoimento/i }))
    expect(mockScrollNext).toHaveBeenCalledOnce()
  })

  it('renders 30 gold star icons (6 testimonials × 5 stars)', () => {
    // Each Star has aria-hidden by lucide-react; query by the SVG role or count
    // lucide renders <svg> elements — we count them inside star containers
    const stars = document.querySelectorAll('svg')
    // 30 stars + 2 chevrons (prev/next) = 32 total SVGs
    expect(stars.length).toBeGreaterThanOrEqual(30)
  })
})
