import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SegurosFAQ from './SegurosFAQ'
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
              exit: _e,
              whileHover: _wh,
              whileTap: _wt,
              layoutId: _l,
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
    useReducedMotion: () => false,
  }
})

describe('SegurosFAQ', () => {
  it('renders the section heading', () => {
    render(<SegurosFAQ />)
    expect(
      screen.getByRole('heading', { level: 2, name: /Perguntas frequentes sobre seguros/i })
    ).toBeInTheDocument()
  })

  it('renders all 10 question buttons', () => {
    render(<SegurosFAQ />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(10)
    expect(screen.getByText(/Por que contratar um seguro por meio de uma corretora/i)).toBeInTheDocument()
    expect(screen.getByText(/O que é franquia\?/i)).toBeInTheDocument()
    expect(screen.getByText(/Como escolher a cobertura ideal/i)).toBeInTheDocument()
  })

  it('starts with all items collapsed (aria-expanded=false)', () => {
    render(<SegurosFAQ />)
    const firstQ = screen.getByRole('button', {
      name: /Por que contratar um seguro por meio de uma corretora/i,
    })
    expect(firstQ).toHaveAttribute('aria-expanded', 'false')
  })

  it('expands an item on click', () => {
    render(<SegurosFAQ />)
    fireEvent.click(
      screen.getByRole('button', { name: /Por que contratar um seguro por meio de uma corretora/i })
    )
    expect(
      screen.getByRole('button', { name: /Por que contratar um seguro por meio de uma corretora/i })
    ).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses an open item on second click', () => {
    render(<SegurosFAQ />)
    fireEvent.click(
      screen.getByRole('button', { name: /O que devo fazer em caso de sinistro/i })
    )
    expect(
      screen.getByRole('button', { name: /O que devo fazer em caso de sinistro/i })
    ).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(
      screen.getByRole('button', { name: /O que devo fazer em caso de sinistro/i })
    )
    expect(
      screen.getByRole('button', { name: /O que devo fazer em caso de sinistro/i })
    ).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders answer text for Q1 when expanded', () => {
    render(<SegurosFAQ />)
    fireEvent.click(
      screen.getByRole('button', {
        name: /Por que contratar um seguro por meio de uma corretora/i,
      })
    )
    expect(screen.getByText(/A corretora atua na defesa dos seus interesses/i)).toBeInTheDocument()
  })
})
