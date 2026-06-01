import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ConsorciosClient from '@/app/consorcios/ConsorciosClient'
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

vi.mock('@/components/shared/LinhaDetailModal', () => ({
  LinhaDetailModal: () => null,
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
        <ConsorciosClient />
      </AudienceProvider>
    </LocaleProvider>
  )
}

describe('ConsorciosClient', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the H1 about consórcio', () => {
    renderClient()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /consórcio com inteligência|consortium with intelligence/i,
      })
    ).toBeInTheDocument()
  })

  it('renders all 8 category cards (each opens a dialog)', () => {
    const { container } = renderClient()
    const cards = container.querySelectorAll('button[aria-haspopup="dialog"]')
    expect(cards.length).toBe(8)
  })

  it('renders the hero CTA pointing to the form', () => {
    renderClient()
    const links = screen.getAllByRole('link', { name: /simular cota|simulate a quota/i })
    const heroLink = links.find((a) => a.getAttribute('href') === '#consorcios-form')
    expect(heroLink).toBeDefined()
  })

  it('renders the lead form with the name field', () => {
    renderClient()
    expect(screen.getByPlaceholderText(/seu nome|your name/i)).toBeInTheDocument()
  })

  it('renders the Sobre section heading', () => {
    renderClient()
    expect(
      screen.getAllByRole('heading', {
        name: /o jeito hold de conduzir|the hold way of running/i,
      }).length
    ).toBeGreaterThan(0)
  })

  it('does not render the legacy audience toggle', () => {
    renderClient()
    expect(
      screen.queryByRole('button', {
        name: /para você|para escritórios|for you|for offices/i,
      })
    ).toBeNull()
  })
})
