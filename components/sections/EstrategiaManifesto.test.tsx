import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import EstrategiaManifesto from './EstrategiaManifesto'
import { LocaleProvider } from '@/lib/i18n'

function renderWithLocale(ui: React.ReactElement) {
  return render(<LocaleProvider>{ui}</LocaleProvider>)
}

beforeAll(() => {
  try { window.localStorage.setItem('hold:locale', 'pt') } catch {}
  if (!('IntersectionObserver' in window)) {
    class IO {
      observe() {}
      disconnect() {}
      unobserve() {}
      takeRecords() { return [] }
      root = null
      rootMargin = ''
      thresholds = []
    }
    // @ts-expect-error - jsdom shim
    window.IntersectionObserver = IO
  }
})

vi.mock('next/image', () => ({
  default: ({ alt, ...rest }: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={String(alt ?? '')} {...(rest as object)} />
  ),
}))

vi.mock('framer-motion', async () => {
  const React = await import('react')
  const passthrough = (tag: string) =>
    React.forwardRef<HTMLElement, Record<string, unknown>>(({ children, ...rest }, ref) =>
      React.createElement(tag, { ref, ...stripMotion(rest) }, children as React.ReactNode),
    )

  function stripMotion(props: Record<string, unknown>) {
    const { initial, animate, exit, transition, variants, whileHover, whileTap,
      whileInView, viewport, ...rest } = props
    void initial; void animate; void exit; void transition; void variants
    void whileHover; void whileTap; void whileInView; void viewport
    return rest
  }

  return {
    motion: new Proxy({}, {
      get: (_t, key: string) => passthrough(key),
    }),
    useInView: () => true,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('EstrategiaManifesto — Bracket card + estrategia.jpg', () => {
  it('exposes id="estrategia" on the section', () => {
    const { container } = renderWithLocale(<EstrategiaManifesto />)
    expect(container.querySelector('#estrategia')).toBeInTheDocument()
  })

  it('renders the manifesto headline with the italic accent clause', () => {
    const { container } = renderWithLocale(<EstrategiaManifesto />)
    expect(container.textContent).toContain('Integramos saúde, seguros, consórcios e finanças')
    expect(container.textContent).toContain('proteção patrimonial')
    expect(container.textContent).toContain('sucessão')
    expect(container.textContent).toContain('eficiência financeira')
  })

  it('renders an h2 heading element', () => {
    renderWithLocale(<EstrategiaManifesto />)
    const h2s = screen.getAllByRole('heading', { level: 2 })
    expect(h2s.length).toBeGreaterThanOrEqual(1)
  })

  it('renders body paragraph highlights "19 anos de experiência" and "60 parceiros"', () => {
    renderWithLocale(<EstrategiaManifesto />)
    expect(screen.getByText('19 anos de experiência')).toBeInTheDocument()
    expect(screen.getByText('60 parceiros')).toBeInTheDocument()
  })

  it('body paragraph contains positioning copy', () => {
    const { container } = renderWithLocale(<EstrategiaManifesto />)
    expect(container.textContent).toContain('Hold Corretora atua como parceira estratégica')
    expect(container.textContent).toContain('estruturando soluções completas')
  })

  it('renders the cinematic image with estrategia.jpg src', () => {
    renderWithLocale(<EstrategiaManifesto />)
    const img = screen.getByAltText(/Hold Corretora.*equipe.*reuni/i) as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.getAttribute('src')).toContain('estrategia')
  })

  it('renders the Princípios Hold eyebrow', () => {
    renderWithLocale(<EstrategiaManifesto />)
    expect(screen.getByText(/Princípios Hold/i)).toBeInTheDocument()
  })

  it('renders all three MVV titles as h3 headings', () => {
    renderWithLocale(<EstrategiaManifesto />)
    expect(screen.getByRole('heading', { level: 3, name: 'Missão' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Visão' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Valores' })).toBeInTheDocument()
  })

  it('renders each MVV body text', () => {
    renderWithLocale(<EstrategiaManifesto />)
    expect(screen.getByText(/Ajudar pessoas e empresas a tomar melhores decisões/i)).toBeInTheDocument()
    expect(screen.getByText(/Ser referência para pessoas e empresas/i)).toBeInTheDocument()
    expect(screen.getByText(/Agimos com integridade/i)).toBeInTheDocument()
  })
})
