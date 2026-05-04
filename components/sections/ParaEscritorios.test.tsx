import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ParaEscritorios from './ParaEscritorios'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// framer-motion: render children directly, ignore animation props
vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        // eslint-disable-next-line react/display-name
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

// i18n: return the key's suffix as a readable label
vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'partners.eyebrow': 'Para Escritórios',
        'partners.title': 'Mesa de Consórcios para Parceiros',
        'partners.subtitle': 'Integre soluções em consórcio ao seu portfólio',
        'partners.body': 'A HOLD Consórcios atua como uma extensão estratégica',
        'partners.diff.title': 'Diferenciais da operação',
        'partners.badge': 'Parceiros autorizados pelo Banco Central do Brasil',
        'partners.cta': 'Quero ser parceiro',
        'partners.step1.title': 'Capacitação',
        'partners.step1.desc': 'Treinamento técnico e comercial para a equipe.',
        'partners.step2.title': 'Estruturação',
        'partners.step2.desc': 'Desenvolvimento e implementação do fluxo comercial.',
        'partners.step3.title': 'Suporte ao assessor',
        'partners.step3.desc': 'Apoio contínuo para esclarecimento de dúvidas.',
        'partners.step4.title': 'Atuação conjunta',
        'partners.step4.desc': 'Integração com o time comercial.',
        'partners.step5.title': 'Experiência do cliente',
        'partners.step5.desc': 'Acompanhamento completo com suporte especializado.',
      }
      return map[key] ?? key
    },
  }),
}))

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ParaEscritorios', () => {
  beforeEach(() => {
    render(<ParaEscritorios />)
  })

  it('renders the section with correct id', () => {
    expect(document.querySelector('#para-escritorios')).not.toBeNull()
  })

  it('renders the eyebrow pill', () => {
    expect(screen.getByText('Para Escritórios')).toBeInTheDocument()
  })

  it('renders the H2 title', () => {
    expect(
      screen.getByRole('heading', { level: 2, name: 'Mesa de Consórcios para Parceiros' })
    ).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    expect(
      screen.getByText(/Integre soluções em consórcio ao seu portfólio/)
    ).toBeInTheDocument()
  })

  it('renders the body paragraph', () => {
    expect(
      screen.getByText(/A HOLD Consórcios atua como uma extensão estratégica/)
    ).toBeInTheDocument()
  })

  it('renders the diferenciais section heading', () => {
    expect(screen.getByText('Diferenciais da operação')).toBeInTheDocument()
  })

  it('renders all 9 diferencial items', () => {
    const items = [
      'Estrutura especializada sem necessidade de equipe interna',
      'Time com experiência em consórcios e atendimento consultivo',
      'Propostas personalizadas para seu escritório',
      'Adequação à linguagem e ao perfil do seu público',
      'Integração ao modelo comercial do escritório',
      'Suporte contínuo ao assessor e ao cliente',
      'Parcerias com administradoras autorizadas pelo Banco Central',
      'Operação estruturada com transparência e acompanhamento',
      'Preservação do relacionamento com sua base de clientes',
    ]
    items.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  it('renders all 5 step titles', () => {
    expect(screen.getByText('Capacitação')).toBeInTheDocument()
    expect(screen.getByText('Estruturação')).toBeInTheDocument()
    expect(screen.getByText('Suporte ao assessor')).toBeInTheDocument()
    expect(screen.getByText('Atuação conjunta')).toBeInTheDocument()
    expect(screen.getByText('Experiência do cliente')).toBeInTheDocument()
  })

  it('renders step numbers 1–5', () => {
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument()
    }
  })

  it('renders the badge text', () => {
    expect(
      screen.getByText('Parceiros autorizados pelo Banco Central do Brasil')
    ).toBeInTheDocument()
  })

  it('renders the CTA button linking to #contato', () => {
    const cta = screen.getByRole('link', { name: /Quero ser parceiro/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '#contato')
  })
})
