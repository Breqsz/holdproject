import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CardNav from './CardNav'

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt' as const,
    setLocale: vi.fn(),
    t: (key: string) =>
      ({
        'navbar.logo.aria':           'Hold Corretora — Página inicial',
        'navbar.home':                'Home',
        'navbar.solucoes':            'Soluções',
        'navbar.sobre':               'Sobre',
        'navbar.contato':             'Contato',
        'navbar.cta':                 'Fale com um especialista',
        'navbar.menu.open':           'Abrir menu',
        'navbar.menu.close':          'Fechar menu',
        'navbar.dd.title':            'Nossas Soluções',
        'navbar.dd.partners':         '60+ parceiros estratégicos',
        'navbar.dd.saude':            'Planos de Saúde',
        'navbar.dd.saude.desc':       'Individual, familiar e empresarial',
        'navbar.dd.seguros':          'Seguros',
        'navbar.dd.seguros.desc':     'Vida, residencial, auto e empresarial',
        'navbar.dd.consorcios':       'Consórcios',
        'navbar.dd.consorcios.desc':  'Imóvel, veículo e serviços',
        'navbar.dd.financeiro':       'Soluções Financeiras',
        'navbar.dd.financeiro.desc':  'Estratégia e planejamento patrimonial',
        'navbar.dd.footer':           'Atuação independente e integrada',
        'navbar.dd.ver_todas':        'Ver todas',
      }[key] ?? key),
  }),
}))

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: { href: string; children: React.ReactNode } & Record<string, unknown>) => {
    const React = require('react')
    return React.createElement('a', { href, ...rest }, children)
  },
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...p }: React.ComponentProps<'div'>) => {
      const React = require('react')
      return React.createElement('div', p, children)
    },
    a: ({ children, ...p }: React.ComponentProps<'a'>) => {
      const React = require('react')
      return React.createElement('a', p, children)
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

describe('CardNav', () => {
  it('renders logo link with correct aria-label', () => {
    render(<CardNav />)
    expect(
      screen.getByRole('link', { name: 'Hold Corretora — Página inicial' }),
    ).toBeInTheDocument()
  })

  it('logo links to /', () => {
    render(<CardNav />)
    expect(
      screen.getByRole('link', { name: 'Hold Corretora — Página inicial' }),
    ).toHaveAttribute('href', '/')
  })

  it('renders desktop nav links', () => {
    render(<CardNav />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Soluções' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Sobre' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contato' })).toBeInTheDocument()
  })

  it('CTA links to /#contato', () => {
    render(<CardNav />)
    const ctas = screen.getAllByRole('link', { name: 'Fale com um especialista' })
    expect(ctas[0]).toHaveAttribute('href', '/#contato')
  })

  it('hamburger button is initially closed', () => {
    render(<CardNav />)
    expect(
      screen.getByRole('button', { name: 'Abrir menu' }),
    ).toHaveAttribute('aria-expanded', 'false')
  })

  it('Soluções dropdown is closed by default', () => {
    render(<CardNav />)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('clicking Soluções opens dropdown with 4 products', () => {
    render(<CardNav />)
    fireEvent.click(screen.getByRole('button', { name: 'Soluções' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /Planos de Saúde/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /Seguros/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /Consórcios/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /Soluções Financeiras/i })).toBeInTheDocument()
  })

  it('Soluções button has aria-expanded=true when open', () => {
    render(<CardNav />)
    fireEvent.click(screen.getByRole('button', { name: 'Soluções' }))
    expect(
      screen.getByRole('button', { name: 'Soluções' }),
    ).toHaveAttribute('aria-expanded', 'true')
  })

  it('dropdown product links have correct hrefs', () => {
    render(<CardNav />)
    fireEvent.click(screen.getByRole('button', { name: 'Soluções' }))
    expect(
      screen.getByRole('menuitem', { name: /Planos de Saúde/i }),
    ).toHaveAttribute('href', '/saude/')
    expect(
      screen.getByRole('menuitem', { name: /Seguros/i }),
    ).toHaveAttribute('href', '/seguros/')
    expect(
      screen.getByRole('menuitem', { name: /Consórcios/i }),
    ).toHaveAttribute('href', '/consorcios/')
    expect(
      screen.getByRole('menuitem', { name: /Soluções Financeiras/i }),
    ).toHaveAttribute('href', '/investimentos/')
  })

  it('hamburger opens mobile menu', () => {
    render(<CardNav />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }))
    expect(
      screen.getByRole('button', { name: 'Fechar menu' }),
    ).toHaveAttribute('aria-expanded', 'true')
  })

  it('mobile menu contains all nav link texts', () => {
    render(<CardNav />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }))
    const dialog = screen.getByRole('dialog')
    expect(dialog.textContent).toContain('Home')
    expect(dialog.textContent).toContain('Soluções')
    expect(dialog.textContent).toContain('Sobre')
    expect(dialog.textContent).toContain('Contato')
  })
})
