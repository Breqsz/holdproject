import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import SegurosClient from '@/app/seguros/SegurosClient'
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
    <div data-testid="service-lead-form">
      <input placeholder="Seu nome" aria-label="Nome" />
      <span>{service}</span>
    </div>
  ),
}))

vi.mock('@/components/motion/LogoLoop', () => ({
  __esModule: true,
  default: () => <div data-testid="logo-loop" />,
}))

vi.mock('@/components/seguros/SegurosLinhaDetailModal', () => ({
  SegurosLinhaDetailModal: () => null,
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
        <SegurosClient />
      </AudienceProvider>
    </LocaleProvider>
  )
}

describe('SegurosClient', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the H1 about proteção', () => {
    renderClient()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /proteção que acompanha|protection that follows/i,
      })
    ).toBeInTheDocument()
  })

  it('renders all 4 protection lines', () => {
    renderClient()
    ;[/vida|life/i, /auto/i, /residencial|home/i, /empresarial|commercial/i].forEach((re) => {
      expect(screen.getAllByText(re).length).toBeGreaterThan(0)
    })
  })

  it('renders the hero CTA "Pedir cotação"', () => {
    renderClient()
    // Hero has href="#seguros-form"; CTA section has "#seguros-form-card" — both are valid CTAs
    const links = screen.getAllByRole('link', { name: /pedir cotação|request a quote/i })
    expect(links.length).toBeGreaterThan(0)
    // At least one link should point to the seguros form
    const heroLink = links.find(
      (a) => a.getAttribute('href') === '#seguros-form' || a.getAttribute('href') === '#seguros-form-card'
    )
    expect(heroLink).toBeDefined()
  })

  it('renders the lead form with the name field', () => {
    renderClient()
    expect(screen.getByPlaceholderText(/seu nome|your name/i)).toBeInTheDocument()
  })

  it('renders the FAQ section heading', () => {
    renderClient()
    expect(
      screen.getByRole('heading', {
        name: /perguntas frequentes sobre seguros|frequently asked questions about insurance/i,
      })
    ).toBeInTheDocument()
  })
})
