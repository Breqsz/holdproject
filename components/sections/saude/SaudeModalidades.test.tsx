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
          ) => React.createElement(tag, { ...rest, ref }, children)
        ),
    }
  )
  return {
    motion,
    AnimatePresence: ({ children }: { children: unknown }) => children,
    useReducedMotion: () => true,
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

  it('renders all 4 modalities as tabs', () => {
    render(<SaudeModalidades />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(4)
    expect(tabs[0]).toHaveAccessibleName(/Individual e Familiar/i)
    expect(tabs[1]).toHaveAccessibleName(/Coletivo por Adesão/i)
    expect(tabs[2]).toHaveAccessibleName(/Empresarial/i)
    expect(tabs[3]).toHaveAccessibleName(/Odontológico/i)
  })

  it('starts with the first modality selected', () => {
    render(<SaudeModalidades />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
  })

  it('clicking a different tab updates aria-selected', () => {
    render(<SaudeModalidades />)
    const tabs = screen.getAllByRole('tab')
    fireEvent.click(tabs[2])
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
  })

  it('renders the active short description in the image stage', () => {
    render(<SaudeModalidades />)
    expect(
      screen.getByText(/Soluções em saúde para pessoas e famílias/i)
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: /Empresarial/i }))
    expect(
      screen.getByText(/Estruturação de benefícios para MEIs, PMEs/i)
    ).toBeInTheDocument()
  })

  it('renders a WhatsApp CTA inside the image stage with modality-specific link', () => {
    render(<SaudeModalidades />)
    const ctas = screen
      .getAllByRole('link')
      .filter((a) => /wa\.me|whatsapp/i.test(a.getAttribute('href') ?? ''))
    expect(ctas.length).toBeGreaterThan(0)
    expect(ctas[0].getAttribute('href')).toMatch(/Individual|Familiar/i)
  })

  it('opens the details modal with long text when "Ver detalhes" is clicked', () => {
    render(<SaudeModalidades />)
    fireEvent.click(screen.getByRole('button', { name: /Ver detalhes/i }))
    expect(
      screen.getByText(/Escolher um plano de saúde envolve mais do que comparar preços/i)
    ).toBeInTheDocument()
  })
})
