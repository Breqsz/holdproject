import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'footer.tagline':   'Consultoria estratégica para seu patrimônio.',
        'footer.legal':     'Fiscalizado pelo Banco Central do Brasil.',
        'footer.rights':    'Todos os direitos reservados.',
        'footer.lojacorr':  'Membro Lojacorr — Maior rede de corretoras do Brasil',
        'nav.home':         'Home',
        'nav.about':        'Sobre Nós',
        'nav.clients':      'Para Clientes',
        'nav.partners':     'Para Escritórios',
        'nav.faq':          'FAQ',
        'nav.contact':      'Contato',
      }
      return map[key] ?? key
    },
  }),
}))

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  it('renders the HOLD wordmark', () => {
    expect(screen.getByText('HOLD')).toBeInTheDocument()
    expect(screen.getByText('Corretora')).toBeInTheDocument()
  })

  it('renders the tagline and legal text from i18n', () => {
    expect(screen.getByText('Consultoria estratégica para seu patrimônio.')).toBeInTheDocument()
    expect(screen.getByText('Fiscalizado pelo Banco Central do Brasil.')).toBeInTheDocument()
  })

  it('renders all 6 navigation links with correct hrefs', () => {
    const expected = [
      ['Home', '#home'],
      ['Sobre Nós', '#sobre-nos'],
      ['Para Clientes', '#para-clientes'],
      ['Para Escritórios', '#para-escritorios'],
      ['FAQ', '#faq'],
      ['Contato', '#contato'],
    ] as const
    expected.forEach(([label, href]) => {
      const link = screen.getByRole('link', { name: label })
      expect(link).toHaveAttribute('href', href)
    })
  })

  it('renders three social icon links with aria-labels', () => {
    expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toBeInTheDocument()
  })

  it('renders the current year in the rights line', () => {
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('renders the location/domain meta', () => {
    expect(screen.getByText(/Uberlândia, MG/)).toBeInTheDocument()
  })

  it('renders the Lojacorr membership block', () => {
    expect(screen.getByText('Filiada')).toBeInTheDocument()
    expect(screen.getByText('lojacorr')).toBeInTheDocument()
    expect(
      screen.getByText('Membro Lojacorr — Maior rede de corretoras do Brasil'),
    ).toBeInTheDocument()
  })
})
