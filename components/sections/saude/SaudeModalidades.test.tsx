import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SaudeModalidades from './SaudeModalidades'

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

describe('SaudeModalidades', () => {
  it('renders the section heading', () => {
    render(<SaudeModalidades />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Soluções em saúde para diferentes perfis e formatos de contratação/i,
      })
    ).toBeInTheDocument()
  })

  it('renders all 4 modality cards by title', () => {
    render(<SaudeModalidades />)
    expect(screen.getByText('Individual e Familiar')).toBeInTheDocument()
    expect(screen.getByText('Coletivo por Adesão')).toBeInTheDocument()
    expect(screen.getByText('Empresarial')).toBeInTheDocument()
    expect(screen.getByText('Odontológico')).toBeInTheDocument()
  })

  it('starts with no expanded panel', () => {
    render(<SaudeModalidades />)
    expect(
      screen.queryByText(/Escolher um plano de saúde envolve mais do que/i)
    ).not.toBeInTheDocument()
  })

  it('expands a modality on click and shows its long text', () => {
    render(<SaudeModalidades />)
    const card = screen.getByRole('button', { name: /Individual e Familiar/i })
    fireEvent.click(card)
    expect(screen.getByRole('button', { name: /Individual e Familiar/i })).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByText(/Escolher um plano de saúde envolve mais do que comparar preços/i)
    ).toBeInTheDocument()
  })

  it('clicking the same card again collapses the panel', () => {
    render(<SaudeModalidades />)
    const card = screen.getByRole('button', { name: /Empresarial/i })
    fireEvent.click(card)
    expect(
      screen.getByText(/A estruturação de benefícios em saúde vai além/i)
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Empresarial/i }))
    expect(
      screen.queryByText(/A estruturação de benefícios em saúde vai além/i)
    ).not.toBeInTheDocument()
  })

  it('clicking a different card swaps the panel content', () => {
    render(<SaudeModalidades />)
    fireEvent.click(screen.getByRole('button', { name: /Coletivo por Adesão/i }))
    expect(screen.getByText(/O plano coletivo por adesão é uma alternativa voltada/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Odontológico/i }))
    expect(screen.queryByText(/O plano coletivo por adesão é uma alternativa voltada/i)).not.toBeInTheDocument()
    expect(screen.getByText(/O cuidado com a saúde também passa pela prevenção/i)).toBeInTheDocument()
  })

  it('expanded panel renders a WhatsApp CTA link', () => {
    render(<SaudeModalidades />)
    fireEvent.click(screen.getByRole('button', { name: /Individual e Familiar/i }))
    const cta = screen.getAllByRole('link').find((a) => /wa\.me|whatsapp/i.test(a.getAttribute('href') ?? ''))
    expect(cta).toBeDefined()
  })
})
