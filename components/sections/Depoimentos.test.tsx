import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Depoimentos from './Depoimentos'
import { googleReviews, googleSummary } from '@/lib/reviews-google'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        React.forwardRef(
          (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { children, initial, animate, whileInView, variants, viewport, transition, exit, whileHover, whileTap, ...rest }: any,
            ref: unknown,
          ) => {
            void initial; void animate; void whileInView; void variants; void viewport
            void transition; void exit; void whileHover; void whileTap
            return React.createElement(tag, { ...rest, ref }, children)
          },
        ),
    },
  )
  return { motion, AnimatePresence: ({ children }: { children: unknown }) => children }
})

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'testimonials.eyebrow':     'Pessoas que confiaram em nós',
        'testimonials.title':       'O que nossos clientes dizem',
        'testimonials.googleBadge': '4,9 ★ · 39 avaliações no Google',
        'testimonials.role':        'Google review',
      }
      return map[key] ?? key
    },
  }),
}))

const mockScrollPrev = vi.fn()
const mockScrollNext = vi.fn()
vi.mock('embla-carousel-react', () => ({
  default: () => {
    const ref = (node: HTMLElement | null) => void node
    const api = { scrollPrev: mockScrollPrev, scrollNext: mockScrollNext }
    return [ref, api]
  },
}))

describe('Depoimentos (real Google reviews)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    render(<Depoimentos />)
  })

  it('renders the section with correct id', () => {
    expect(document.querySelector('#depoimentos')).not.toBeNull()
  })

  it('renders the new eyebrow "Pessoas que confiaram em nós"', () => {
    expect(screen.getByText('Pessoas que confiaram em nós')).toBeInTheDocument()
  })

  it('renders the H2 title', () => {
    expect(screen.getByRole('heading', { level: 2, name: 'O que nossos clientes dizem' })).toBeInTheDocument()
  })

  it('renders the Google badge linking to the Google profile', () => {
    const link = screen.getByRole('link', { name: /4,9 ★ · 39 avaliações no Google/i })
    expect(link).toHaveAttribute('href', googleSummary.href)
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders all curated review author names', () => {
    for (const r of googleReviews) {
      expect(screen.getByText(r.name)).toBeInTheDocument()
    }
  })

  it('renders the "Google review" role label per card (one per review)', () => {
    const labels = screen.getAllByText('Google review')
    expect(labels.length).toBe(googleReviews.length)
  })

  it('renders prev and next navigation buttons', () => {
    expect(screen.getByRole('button', { name: /depoimento anterior/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /próximo depoimento/i })).toBeInTheDocument()
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
})
