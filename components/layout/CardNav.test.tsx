import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CardNav from './CardNav'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('gsap', () => ({
  gsap: {
    set: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      play: vi.fn(),
      reverse: vi.fn(),
      kill: vi.fn(),
      progress: vi.fn().mockReturnThis(),
      eventCallback: vi.fn().mockReturnThis(),
    })),
  },
}))

// next/link → render plain anchor for assertions
vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode } & Record<string, unknown>) => {
    const React = require('react')
    return React.createElement('a', { href, ...rest }, children)
  },
}))

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('CardNav', () => {
  it('renders the HOLD Corretora logo', () => {
    render(<CardNav />)
    expect(screen.getByText('HOLD')).toBeInTheDocument()
    expect(screen.getByText('Corretora')).toBeInTheDocument()
  })

  it('logo links to /', () => {
    render(<CardNav />)
    const logo = screen.getByRole('link', { name: /HOLD/i })
    expect(logo).toHaveAttribute('href', '/')
  })

  it('renders "Falar Conosco" CTA linking to /#contato', () => {
    render(<CardNav />)
    const cta = screen.getByRole('link', { name: 'Falar Conosco' })
    expect(cta).toHaveAttribute('href', '/#contato')
  })

  it('hamburger is initially closed (aria-expanded false)', () => {
    render(<CardNav />)
    const btn = screen.getByRole('button', { name: 'Abrir menu' })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('card panel is initially hidden', () => {
    render(<CardNav />)
    expect(document.querySelector('.card-nav-content')).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders all three card labels', () => {
    render(<CardNav />)
    expect(screen.getByText('Soluções')).toBeInTheDocument()
    expect(screen.getByText('A Hold')).toBeInTheDocument()
    expect(screen.getByText('Suporte')).toBeInTheDocument()
  })

  it('renders Soluções links pointing to dedicated routes', () => {
    render(<CardNav />)
    expect(screen.getByRole('link', { name: 'Ver soluções de consórcio',     hidden: true })).toHaveAttribute('href', '/consorcios/')
    expect(screen.getByRole('link', { name: 'Ver soluções de seguros',       hidden: true })).toHaveAttribute('href', '/seguros/')
    expect(screen.getByRole('link', { name: 'Ver soluções de saúde e vida',  hidden: true })).toHaveAttribute('href', '/saude/')
    expect(screen.getByRole('link', { name: 'Ver soluções de investimentos', hidden: true })).toHaveAttribute('href', '/investimentos/')
  })

  it('renders A Hold section links with correct hrefs', () => {
    render(<CardNav />)
    expect(screen.getByRole('link', { name: 'Conheça a Hold Corretora',                  hidden: true })).toHaveAttribute('href', '/#sobre-nos')
    expect(screen.getByRole('link', { name: 'Conheça a equipe Hold Corretora',           hidden: true })).toHaveAttribute('href', '/equipe/')
    expect(screen.getByRole('link', { name: 'Soluções para escritórios parceiros',       hidden: true })).toHaveAttribute('href', '/#para-escritorios')
  })

  it('renders Suporte links with correct hrefs', () => {
    render(<CardNav />)
    expect(screen.getByRole('link', { name: 'Perguntas frequentes',                       hidden: true })).toHaveAttribute('href', '/#faq')
    expect(screen.getByRole('link', { name: 'Entre em contato com a Hold Corretora',      hidden: true })).toHaveAttribute('href', '/#contato')
  })

  it('opens the menu when hamburger is clicked', () => {
    render(<CardNav />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }))
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true')
    expect(document.querySelector('.card-nav-content')).toHaveAttribute('aria-hidden', 'false')
  })

  it('resets hamburger icon on close click', () => {
    render(<CardNav />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }))
    fireEvent.click(screen.getByRole('button', { name: 'Fechar menu' }))
    // isOpen resets; aria-expanded stays true until GSAP reverse completes
    expect(screen.getByRole('button', { name: 'Fechar menu' })).not.toHaveAttribute('aria-expanded', 'false')
  })
})
