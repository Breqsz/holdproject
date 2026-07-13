import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'cardnav.solutions':           'Soluções',
        'cardnav.hold':                'A Hold',
        'cardnav.link.saude':          'Planos de Saúde',
        'cardnav.link.seguros':        'Seguros',
        'cardnav.link.consorcios':     'Consórcios',
        'cardnav.link.investimentos':  'Investimentos',
        'cardnav.link.sobre':          'Sobre Nós',
        'cardnav.link.faq':            'Perguntas Frequentes',
        'cardnav.link.contato':        'Fale Conosco',
        'nav.contact':                 'Contato',
        'footer.social.title':         'Redes Sociais',
        'footer.rights':               'Todos os direitos reservados.',
        'footer.address':              'Av. Princesa Isabel nº 1006, Bairro Tabajaras, Uberlândia/MG - CEP 38400-192',
        'wa.label.alt':                'WhatsApp',
      }
      return map[key] ?? key
    },
  }),
}))

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  it('renders the Soluções column linking to the real service pages', () => {
    const expected = [
      ['Planos de Saúde', /^\/saude\/?$/],
      ['Seguros', /^\/seguros\/?$/],
      ['Consórcios', /^\/consorcios\/?$/],
      ['Investimentos', /^\/investimentos\/?$/],
    ] as const
    expected.forEach(([label, href]) => {
      const link = screen.getByRole('link', { name: label })
      expect(link.getAttribute('href')).toMatch(href)
    })
  })

  it('renders the A Hold column with institutional links', () => {
    const expected = [
      ['Sobre Nós', /^\/#sobre-nos$/],
      ['Perguntas Frequentes', /^\/#faq$/],
      ['Fale Conosco', /^\/#contato$/],
    ] as const
    expected.forEach(([label, href]) => {
      const link = screen.getByRole('link', { name: label })
      expect(link.getAttribute('href')).toMatch(href)
    })
  })

  it('renders the column headings from i18n', () => {
    expect(screen.getByText('Soluções')).toBeInTheDocument()
    expect(screen.getByText('A Hold')).toBeInTheDocument()
    expect(screen.getByText('Contato')).toBeInTheDocument()
    expect(screen.getByText('Redes Sociais')).toBeInTheDocument()
  })

  it('renders three social icon links with aria-labels', () => {
    expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Facebook' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()
  })

  it('renders the WhatsApp contact link and location', () => {
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toBeInTheDocument()
    expect(screen.getAllByText(/Uberlândia/).length).toBeGreaterThanOrEqual(1)
  })

  it('renders the full street address in the Contato column', () => {
    expect(
      screen.getByText(/Av\. Princesa Isabel nº 1006.*Tabajaras.*CEP 38400-192/),
    ).toBeInTheDocument()
  })

  it('renders the Lojacorr partnership seal', () => {
    const seal = screen.getByAltText('Lojacorr') as HTMLImageElement
    expect(seal.src).toContain('Lojacorr')
  })

  it('renders the current year in the rights line', () => {
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })
})
