import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SolucoesGrid from './SolucoesGrid'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const { initial, animate, whileInView, viewport, transition, layoutId, exit, whileHover, whileTap, ...d } = rest
          void initial; void animate; void whileInView; void viewport; void transition; void layoutId
          void exit; void whileHover; void whileTap
          return React.createElement(tag, d, children)
        },
    }
  )
  return { motion, useReducedMotion: () => false }
})

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode } & Record<string, unknown>) => {
    const React = require('react')
    return React.createElement('a', { href, ...rest }, children)
  },
}))

describe('SolucoesGrid', () => {
  it('renders the section with id="solucoes"', () => {
    render(<SolucoesGrid />)
    expect(document.querySelector('#solucoes')).not.toBeNull()
  })

  it('renders the section heading', () => {
    render(<SolucoesGrid />)
    expect(screen.getByText('Nossas soluções')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /Quatro frentes, uma visão integrada/i })
    ).toBeInTheDocument()
  })

  it('does NOT render the Jacimar character image (moved to Hero)', () => {
    render(<SolucoesGrid />)
    expect(screen.queryByAltText(/Jacimar/i)).toBeNull()
  })

  it('renders 4 service cards linking to dedicated routes', () => {
    render(<SolucoesGrid />)
    expect(screen.getByRole('link', { name: /Consórcios/ })).toHaveAttribute('href', '/consorcios/')
    expect(screen.getByRole('link', { name: /Seguros/ })).toHaveAttribute('href', '/seguros/')
    expect(screen.getByRole('link', { name: /Saúde/ })).toHaveAttribute('href', '/saude/')
    expect(screen.getByRole('link', { name: /Investimentos/ })).toHaveAttribute('href', '/investimentos/')
  })
})
