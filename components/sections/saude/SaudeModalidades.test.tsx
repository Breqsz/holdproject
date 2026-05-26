import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SaudeModalidades from './SaudeModalidades'
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

vi.mock('react-dom', async () => {
  const actual = await vi.importActual<typeof import('react-dom')>('react-dom')
  return {
    ...actual,
    createPortal: (node: unknown) => node as React.ReactNode,
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

  it('renders all 4 modality cards with dialog popup semantics', () => {
    render(<SaudeModalidades />)
    const cards = screen
      .getAllByRole('button')
      .filter((b) => b.getAttribute('aria-haspopup') === 'dialog')
    expect(cards).toHaveLength(4)
    expect(cards[0]).toHaveAccessibleName(/Individual e Familiar/i)
    expect(cards[1]).toHaveAccessibleName(/Coletivo por Adesão/i)
    expect(cards[2]).toHaveAccessibleName(/Empresarial/i)
    expect(cards[3]).toHaveAccessibleName(/Odontológico/i)
  })

  it('opens the detail modal with long text when a card is clicked', () => {
    render(<SaudeModalidades />)
    const card = screen
      .getAllByRole('button')
      .find((b) =>
        /Conhecer planos Individual e Familiar/i.test(b.getAttribute('aria-label') ?? '')
      )!
    fireEvent.click(card)
    expect(
      screen.getByText(/Escolher um plano de saúde envolve mais do que comparar preços/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Falar no WhatsApp/i })
    ).toBeInTheDocument()
  })

  it('hands off to the WhatsApp countdown modal when CTA is clicked', () => {
    render(<SaudeModalidades />)
    const card = screen
      .getAllByRole('button')
      .find((b) =>
        /Conhecer plano Empresarial/i.test(b.getAttribute('aria-label') ?? '')
      )!
    fireEvent.click(card)
    fireEvent.click(screen.getByRole('button', { name: /Falar no WhatsApp/i }))
    expect(screen.getByText(/5s/)).toBeInTheDocument()
  })

  it('closes the detail modal on Escape', () => {
    render(<SaudeModalidades />)
    const card = screen
      .getAllByRole('button')
      .find((b) =>
        /Conhecer plano Odontológico/i.test(b.getAttribute('aria-label') ?? '')
      )!
    fireEvent.click(card)
    expect(screen.getByText(/O cuidado com a saúde também passa pela prevenção/i))
      .toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(
      screen.queryByText(/O cuidado com a saúde também passa pela prevenção/i)
    ).not.toBeInTheDocument()
  })
})
