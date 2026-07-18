import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import InvestimentosClient from '@/app/investimentos/InvestimentosClient'
import { AudienceProvider } from '@/lib/audience'
import { LocaleProvider } from '@/lib/i18n'

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
    <div data-testid="service-lead-form">
      <input placeholder="Seu nome" aria-label="Nome" />
      <span>{service}</span>
    </div>
  ),
}))

vi.mock('@/components/shared/WhatsAppRedirectModal', () => ({
  WhatsAppRedirectModal: () => null,
}))

vi.mock('@emailjs/browser', () => ({ default: { send: vi.fn() } }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

function renderClient() {
  return render(
    <LocaleProvider>
      <AudienceProvider>
        <InvestimentosClient />
      </AudienceProvider>
    </LocaleProvider>
  )
}

describe('InvestimentosClient', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the H1 about crédito empresarial', () => {
    renderClient()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /crédito inteligente|smart credit/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the 5-step methodology and the solution cards', () => {
    renderClient()
    expect(
      screen.getByText(/Entendemos o momento financeiro da empresa|We understand the company's financial moment/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Acompanhamos toda a operação|We follow the entire operation/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/Antecipação de Recebíveis|Receivables Advance/i)).toBeInTheDocument()
    expect(screen.getByText(/Crédito Empresarial|Corporate Credit/i)).toBeInTheDocument()
    expect(screen.getByText(/Estruturação Financeira|Financial Structuring/i)).toBeInTheDocument()
  })

  it('renders the "Para quem é" checklist', () => {
    renderClient()
    expect(screen.getByText(/Antecipar recebíveis|Advancing receivables/i)).toBeInTheDocument()
    expect(screen.getByText(/Reestruturar passivos|Restructuring liabilities/i)).toBeInTheDocument()
  })

  it('renders the primary CTA linking to WhatsApp', () => {
    renderClient()
    const links = screen.getAllByRole('link', { name: /fale com um especialista|talk to a specialist/i })
    expect(links.length).toBeGreaterThan(0)
    const waLink = links.find((a) => (a.getAttribute('href') ?? '').includes('wa.me'))
    expect(waLink).toBeDefined()
  })

  it('renders the lead form with the name field', () => {
    renderClient()
    expect(screen.getByPlaceholderText(/seu nome|your name/i)).toBeInTheDocument()
  })

  it('renders the Sobre section heading', () => {
    renderClient()
    expect(
      screen.getAllByRole('heading', {
        name: /estruturar soluções financeiras|structuring financial solutions/i,
      }).length
    ).toBeGreaterThan(0)
  })
})
