import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SaudeClient from '@/app/saude/SaudeClient'

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

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ alt, src }: any) => <img alt={alt} src={typeof src === 'string' ? src : ''} />,
}))

vi.mock('@/components/forms/ServiceLeadForm', () => ({
  ServiceLeadForm: ({ service }: { service: string }) => (
    <div data-testid="service-lead-form">Form: {service}</div>
  ),
}))

vi.mock('@/components/motion/LogoLoop', () => ({
  __esModule: true,
  default: () => <div data-testid="logo-loop" />,
}))

describe('SaudeClient', () => {
  it('renders the hero H1 (institutional copy)', () => {
    render(<SaudeClient />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Soluções em saúde estruturadas com/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the "Sobre Nós" section with 3 chips', () => {
    render(<SaudeClient />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /O jeito HOLD de estruturar soluções em saúde/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByText('Atendimento consultivo')).toBeInTheDocument()
    expect(screen.getByText('Soluções personalizadas')).toBeInTheDocument()
    // "Acompanhamento próximo" aparece como chip AND como título do diferencial
    const acomp = screen.getAllByText('Acompanhamento próximo')
    expect(acomp.length).toBeGreaterThanOrEqual(2)
  })

  it('renders the Diferenciais headline and the other 2 distinct titles', () => {
    render(<SaudeClient />)
    expect(
      screen.getByText(/O diferencial não está apenas na solução/i)
    ).toBeInTheDocument()
    expect(screen.getByText('Análise estratégica')).toBeInTheDocument()
    expect(screen.getByText('Estrutura multissoluções')).toBeInTheDocument()
  })

  it('renders the Modalidades section component', () => {
    render(<SaudeClient />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Soluções em saúde para diferentes perfis e formatos de contratação/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the Operadoras section component', () => {
    render(<SaudeClient />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Trabalhamos com as principais seguradoras e operadoras do mercado/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the FAQ section component', () => {
    render(<SaudeClient />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Perguntas frequentes sobre planos de saúde/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the CTA Final with form and link to #saude-form', () => {
    render(<SaudeClient />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Conte com a HOLD para estruturar sua solução em saúde/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByTestId('service-lead-form')).toBeInTheDocument()
  })

  it('renders a hero CTA linking to #saude-form', () => {
    render(<SaudeClient />)
    const cta = screen.getAllByRole('link').find((a) => a.getAttribute('href') === '#saude-form')
    expect(cta).toBeDefined()
  })
})
