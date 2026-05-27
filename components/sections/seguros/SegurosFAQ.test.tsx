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

  it('renders all 6 question buttons', () => {
    render(<SegurosFAQ />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(6)
    expect(screen.getByText(/Como vocês escolhem a melhor seguradora para o meu perfil/i)).toBeInTheDocument()
    expect(screen.getByText(/O que é franquia e como ela afeta o valor do seguro/i)).toBeInTheDocument()
    expect(screen.getByText(/Vocês atendem PJ \(empresarial\)/i)).toBeInTheDocument()
  })

  it('starts with all items collapsed (aria-expanded=false)', () => {
    render(<SegurosFAQ />)
    const firstQ = screen.getByRole('button', {
      name: /Como vocês escolhem a melhor seguradora para o meu perfil/i,
    })
    expect(firstQ).toHaveAttribute('aria-expanded', 'false')
  })

  it('expands an item on click', () => {
    render(<SegurosFAQ />)
    fireEvent.click(
      screen.getByRole('button', { name: /Como vocês escolhem a melhor seguradora para o meu perfil/i })
    )
    expect(
      screen.getByRole('button', { name: /Como vocês escolhem a melhor seguradora para o meu perfil/i })
    ).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses an open item on second click', () => {
    render(<SegurosFAQ />)
    fireEvent.click(
      screen.getByRole('button', { name: /Em caso de sinistro, vocês acompanham o processo/i })
    )
    expect(
      screen.getByRole('button', { name: /Em caso de sinistro, vocês acompanham o processo/i })
    ).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(
      screen.getByRole('button', { name: /Em caso de sinistro, vocês acompanham o processo/i })
    )
    expect(
      screen.getByRole('button', { name: /Em caso de sinistro, vocês acompanham o processo/i })
    ).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders sub-heading and bullet items inside Q2 (franquia) when expanded', () => {
    render(<SegurosFAQ />)
    const q2 = screen.getByRole('button', {
      name: /O que é franquia e como ela afeta o valor do seguro/i,
    })
    fireEvent.click(q2)
    expect(screen.getByText(/Tipos comuns:/i)).toBeInTheDocument()
    expect(screen.getByText(/Franquia obrigatória \(auto\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Franquia facultativa \(mais barata, menos cobertura\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Sem franquia em coberturas adicionais/i)).toBeInTheDocument()
  })

  it('renders answer text for Q1 when expanded', () => {
    render(<SegurosFAQ />)
    fireEvent.click(
      screen.getByRole('button', {
        name: /Como vocês escolhem a melhor seguradora para o meu perfil/i,
      })
    )
    expect(screen.getByText(/Fazemos um diagnóstico do seu perfil/i)).toBeInTheDocument()
  })
})
