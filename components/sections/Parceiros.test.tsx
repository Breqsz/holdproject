import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Parceiros from './Parceiros'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const { initial, animate, whileInView, viewport, transition, exit, whileHover, whileTap, variants, ...d } = rest
          void initial; void animate; void whileInView; void viewport; void transition
          void exit; void whileHover; void whileTap; void variants
          return React.createElement(tag, d, children)
        },
    },
  )
  return { motion, AnimatePresence: ({ children }: { children: React.ReactNode }) => children }
})

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    t: (key: string) => {
      const map: Record<string, string> = {
        'partnersLogos.eyebrow':  'Parceiros',
        'partnersLogos.title':    'Operamos com administradoras e seguradoras de referência',
        'partnersLogos.subtitle': 'Curadoria de instituições autorizadas pelo Banco Central.',
      }
      return map[key] ?? key
    },
  }),
}))

describe('Parceiros', () => {
  it('renders the section with id="parceiros"', () => {
    render(<Parceiros />)
    expect(document.querySelector('#parceiros')).not.toBeNull()
  })

  it('renders the title', () => {
    render(<Parceiros />)
    expect(screen.getByRole('heading', { level: 2, name: /Operamos com administradoras/i })).toBeInTheDocument()
  })

  it('renders all 7 partner logos as images', () => {
    render(<Parceiros />)
    const expected = ['HDI Seguros', 'MAG Seguros', 'MAPFRE', 'SulAmérica', 'Tokio Marine', 'Unimed', 'Bradesco Seguros']
    for (const alt of expected) {
      expect(screen.getAllByAltText(alt).length).toBeGreaterThan(0)
    }
  })

  it('exposes the LogoLoop region with the expected aria-label', () => {
    render(<Parceiros />)
    expect(screen.getByRole('region', { name: /Parceiros administradoras e seguradoras/i })).toBeInTheDocument()
  })
})
