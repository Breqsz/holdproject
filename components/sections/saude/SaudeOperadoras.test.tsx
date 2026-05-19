import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SaudeOperadoras from './SaudeOperadoras'
import pt from '@/messages/pt.json'

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => (pt as Record<string, string>)[key] ?? key,
  }),
}))

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const { initial, animate, whileInView, viewport, transition, layoutId, exit, whileHover, whileTap, variants, ...d } = rest
          void initial; void animate; void whileInView; void viewport; void transition; void layoutId
          void exit; void whileHover; void whileTap; void variants
          return React.createElement(tag, d, children)
        },
    }
  )
  return { motion, useReducedMotion: () => false }
})

vi.mock('@/components/motion/LogoLoop', () => ({
  __esModule: true,
  default: ({ logos, ariaLabel }: { logos: Array<{ alt?: string }>; ariaLabel?: string }) => (
    <div data-testid="logo-loop" aria-label={ariaLabel}>
      {logos.map((l, i) => (
        <span key={i}>{l.alt}</span>
      ))}
    </div>
  ),
}))

describe('SaudeOperadoras', () => {
  it('renders the section heading', () => {
    render(<SaudeOperadoras />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Trabalhamos com as principais seguradoras e operadoras do mercado/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the eyebrow', () => {
    render(<SaudeOperadoras />)
    expect(screen.getByText(/PARCEIROS/)).toBeInTheDocument()
  })

  it('renders the disclaimer subtitle', () => {
    render(<SaudeOperadoras />)
    expect(
      screen.getByText(/Disponibilidade varia conforme região, modalidade e perfil/i)
    ).toBeInTheDocument()
  })

  it('renders LogoLoop with all 7 operadoras', () => {
    render(<SaudeOperadoras />)
    const loop = screen.getByTestId('logo-loop')
    expect(loop).toBeInTheDocument()
    expect(loop).toHaveAttribute('aria-label', 'Operadoras de saúde parceiras')

    const expected = [
      'Amil',
      'Bradesco Saúde',
      'Hapvida',
      'Omint',
      'Porto Seguro',
      'Seguros Unimed',
      'SulAmérica',
    ]
    for (const name of expected) {
      expect(screen.getByText(name)).toBeInTheDocument()
    }
  })
})
