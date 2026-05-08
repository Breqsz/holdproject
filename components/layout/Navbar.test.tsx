import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from './Navbar'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy({}, {
    get: (_t, tag: string) =>
      React.forwardRef(({ children, initial, animate, exit, transition, ...rest }: any, ref: unknown) => {
        void initial; void animate; void exit; void transition
        return React.createElement(tag, { ...rest, ref }, children)
      }),
  })
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'nav.home':     'Home',
        'nav.about':    'Sobre Nós',
        'nav.clients':  'Para Clientes',
        'nav.partners': 'Para Escritórios',
        'nav.faq':      'FAQ',
        'nav.contact':  'Contato',
      }
      return map[key] ?? key
    },
  }),
}))

describe('Navbar', () => {
  beforeEach(() => {
    render(<Navbar />)
  })

  it('renders the Hold Corretora logo SVG', () => {
    expect(screen.getByRole('img', { name: 'Hold Corretora' })).toBeInTheDocument()
  })

  it('logo links back to #home', () => {
    const logoLink = screen.getByRole('link', { name: 'Hold Corretora' })
    expect(logoLink).toHaveAttribute('href', '#home')
  })

  it('renders all 6 nav links', () => {
    const labels = ['Home', 'Sobre Nós', 'Para Clientes', 'Para Escritórios', 'FAQ', 'Contato']
    labels.forEach((label) => {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0)
    })
  })

  it('renders PT/EN language toggles', () => {
    expect(screen.getAllByRole('button', { name: 'PT' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'EN' }).length).toBeGreaterThan(0)
  })

  it('renders a mobile menu toggle button', () => {
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument()
  })
})
