import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, act } from '@testing-library/react'
import Home from '@/app/page'
import { AudienceProvider, useAudience } from '@/lib/audience'

vi.mock('@/components/sections/HomeHero', () => ({
  default: () => <section data-testid="home-hero" />,
}))
vi.mock('@/components/sections/SolucoesGrid', () => ({
  default: () => <section data-testid="solucoes-grid" />,
}))
vi.mock('@/components/sections/Parceiros', () => ({
  default: () => <section data-testid="parceiros" />,
}))
vi.mock('@/components/sections/SobreNos', () => ({
  default: () => <section data-testid="sobre-nos" />,
}))
vi.mock('@/components/sections/ParaEscritorios', () => ({
  default: () => <section data-testid="para-escritorios" />,
}))
vi.mock('@/components/sections/ComoFunciona', () => ({
  default: () => <section data-testid="como-funciona" />,
}))
vi.mock('@/components/sections/Depoimentos', () => ({
  default: () => <section data-testid="depoimentos" />,
}))
vi.mock('@/components/sections/FAQ', () => ({
  default: () => <section data-testid="faq" />,
}))
vi.mock('@/components/sections/Contato', () => ({
  default: () => <section data-testid="contato" />,
}))
vi.mock('@/components/motion/CurvedLoop', () => ({
  default: () => <div data-testid="curved-divider" />,
}))

function renderHome() {
  return render(
    <AudienceProvider>
      <Home />
    </AudienceProvider>,
  )
}

/** Test helper to flip audience to PJ from inside the provider. */
function PJSwitcher() {
  const { setAudience } = useAudience()
  return <button data-testid="switch-pj" onClick={() => setAudience('pj')}>pj</button>
}

describe('Home page', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the Hero', () => {
    const { getByTestId } = renderHome()
    expect(getByTestId('home-hero')).toBeInTheDocument()
  })

  it('renders the curved divider after the hero', () => {
    const { getByTestId } = renderHome()
    expect(getByTestId('curved-divider')).toBeInTheDocument()
  })

  it('renders the SolucoesGrid', () => {
    const { getByTestId } = renderHome()
    expect(getByTestId('solucoes-grid')).toBeInTheDocument()
  })

  it('renders the Parceiros section', () => {
    const { getByTestId } = renderHome()
    expect(getByTestId('parceiros')).toBeInTheDocument()
  })

  it('renders ComoFunciona by default (PF audience)', () => {
    const { getByTestId, queryByTestId } = renderHome()
    expect(getByTestId('como-funciona')).toBeInTheDocument()
    expect(queryByTestId('para-escritorios')).toBeNull()
  })

  it('switches to ParaEscritorios when audience is PJ', async () => {
    const { getByTestId, queryByTestId } = render(
      <AudienceProvider>
        <PJSwitcher />
        <Home />
      </AudienceProvider>,
    )
    await act(async () => {
      getByTestId('switch-pj').click()
    })
    expect(getByTestId('para-escritorios')).toBeInTheDocument()
    expect(queryByTestId('como-funciona')).toBeNull()
  })

  it('renders Contato as the last section', () => {
    const { container } = renderHome()
    const sections = container.querySelectorAll('[data-testid]')
    const last = sections[sections.length - 1]
    expect(last).toHaveAttribute('data-testid', 'contato')
  })
})
