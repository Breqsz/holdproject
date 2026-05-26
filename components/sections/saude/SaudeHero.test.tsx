import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SaudeHero from './SaudeHero'
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
            { children, ...rest }: Record<string, unknown>,
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

describe('SaudeHero', () => {
  it('renders the hero h1 with the rotating headline prefix', () => {
    render(<SaudeHero />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Soluções em saúde estruturadas com/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the red primary CTA pointing to the form anchor', () => {
    render(<SaudeHero />)
    const primary = screen.getByRole('link', { name: /Falar com especialista/i })
    expect(primary).toBeInTheDocument()
    expect(primary).toHaveAttribute('href', '#saude-form')
    expect(primary.className).toMatch(/bg-\[#ae251c\]/)
  })

  it('does NOT render a green WhatsApp satellite button (only the floating one in the corner)', () => {
    render(<SaudeHero />)
    expect(screen.queryByRole('link', { name: /Falar no WhatsApp/i })).not.toBeInTheDocument()
  })

  it('renders the assurance microcopy below the CTAs', () => {
    render(<SaudeHero />)
    expect(
      screen.getByText(/Atendimento para famílias, MEI e empresas/i)
    ).toBeInTheDocument()
  })

  it('does NOT include the diagonal split background gradient from the old hero', () => {
    const { container } = render(<SaudeHero />)
    const html = container.innerHTML
    // The old hero rendered `linear-gradient(115deg, ...)` in 2 layers (DIAGONAL_SLICE_BG and DIAGONAL_LINE_BG).
    // The new hero uses 110deg for the overlay only, so absence of 115deg confirms diagonal was removed.
    expect(html).not.toMatch(/115deg/)
  })
})
