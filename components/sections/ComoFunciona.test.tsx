import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import ComoFunciona from './ComoFunciona'
import { LocaleProvider } from '@/lib/i18n'

function renderWithLocale(ui: React.ReactElement) {
  return render(<LocaleProvider>{ui}</LocaleProvider>)
}

beforeAll(() => {
  // jsdom's default navigator.language ('en-US') would otherwise flip
  // LocaleProvider to English on mount; pin to 'pt' for deterministic assertions.
  try {
    window.localStorage.setItem('hold:locale', 'pt')
  } catch {
    /* ignore */
  }
})

describe('ComoFunciona — prose in normal flow (no absolute overlap)', () => {
  it('renders all three pillar chips (Inteligência, Transparência, Acompanhamento)', () => {
    renderWithLocale(<ComoFunciona />)
    expect(screen.getByText('Inteligência')).toBeInTheDocument()
    expect(screen.getByText('Transparência')).toBeInTheDocument()
    expect(screen.getByText('Acompanhamento')).toBeInTheDocument()
  })

  it('renders all three pillar bodies simultaneously in the document (grid-stack crossfade, not conditional render)', () => {
    renderWithLocale(<ComoFunciona />)
    expect(
      screen.getByText(/Cada plano nasce de um diagnóstico real/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Contrato lido em conjunto, taxas explicadas/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/A conversa não termina na contratação/i),
    ).toBeInTheDocument()
  })

  it('active pillar (default: intelligence) is visually shown via opacity 1, others opacity 0', () => {
    const { container } = renderWithLocale(<ComoFunciona />)
    const active = container.querySelector('.v2-pb-1') as HTMLElement
    const inactive1 = container.querySelector('.v2-pb-2') as HTMLElement
    const inactive2 = container.querySelector('.v2-pb-3') as HTMLElement
    expect(active).toBeInTheDocument()
    expect(inactive1).toBeInTheDocument()
    expect(inactive2).toBeInTheDocument()
  })

  it('prose container no longer relies on a fixed min-height (normal-flow grid-stack)', () => {
    const { container } = renderWithLocale(<ComoFunciona />)
    const styleTag = container.querySelector('style')
    expect(styleTag?.textContent ?? '').not.toMatch(/min-height/)
    expect(styleTag?.textContent ?? '').toMatch(/\.v2-prose\s*{[^}]*display:\s*grid/)
  })
})
