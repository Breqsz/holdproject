import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import EstrategiaManifesto from './EstrategiaManifesto'

beforeAll(() => {
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
  const passthrough = (tag: keyof JSX.IntrinsicElements) =>
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
      get: (_t, key: string) => passthrough(key as keyof JSX.IntrinsicElements),
    }),
    useInView: () => true,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('EstrategiaManifesto', () => {
  it('renders the manifesto eyebrow label', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByText('Manifesto')).toBeInTheDocument()
  })

  it('renders the editorial tagline', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByText(/Mais do que produtos/i)).toBeInTheDocument()
    expect(screen.getByText(/Entregamos planejamento, segurança e resultado/i)).toBeInTheDocument()
  })

  it('renders the editorial headline in the dark card', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByText(/Sua estratégia/i)).toBeInTheDocument()
    expect(screen.getByText(/^começa com/)).toBeInTheDocument()
    expect(screen.getByText(/E termina com/i)).toBeInTheDocument()
    expect(screen.getByText(/^resultado\.$/)).toBeInTheDocument()
  })

  it('renders the body paragraphs with key positioning terms', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByText(/A Hold Corretora é especializada/i)).toBeInTheDocument()
    expect(screen.getByText(/proteção patrimonial/)).toBeInTheDocument()
    expect(screen.getByText(/sucessão/)).toBeInTheDocument()
    expect(screen.getByText(/eficiência financeira/)).toBeInTheDocument()
  })

  it('renders the consultancy photo with descriptive alt text', () => {
    render(<EstrategiaManifesto />)
    const img = screen.getByAltText(/Consultoria estratégica Hold Corretora/i) as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.getAttribute('src')).toContain('office-hero')
  })

  it('renders the heritage signature', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByText(/Hold Corretora · Desde 2006/i)).toBeInTheDocument()
  })

  it('renders the corner "Estratégia" label on the photo', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByText(/^Estratégia$/i)).toBeInTheDocument()
  })

  it('renders all three principles (Missão, Visão, Valores) as headings', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByRole('heading', { name: 'Missão' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Visão' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Valores' })).toBeInTheDocument()
  })

  it('renders each principle body text', () => {
    render(<EstrategiaManifesto />)
    expect(screen.getByText(/Ajudar pessoas e empresas a tomar melhores decisões/i)).toBeInTheDocument()
    expect(screen.getByText(/Ser referência para pessoas e empresas/i)).toBeInTheDocument()
    expect(screen.getByText(/Agimos com integridade/i)).toBeInTheDocument()
  })

  it('exposes id="estrategia" on the section', () => {
    const { container } = render(<EstrategiaManifesto />)
    expect(container.querySelector('#estrategia')).toBeInTheDocument()
  })
})
