import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ServicoPillars from './ServicoPillars'

// ─── Mock framer-motion ───────────────────────────────────────────────────────
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        // Return a plain element that forwards all props
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const Tag = tag as keyof JSX.IntrinsicElements
          // Strip framer-specific props so React doesn't warn
          const {
            initial, animate, exit, whileHover, whileTap, whileInView,
            viewport, transition, layoutId, style, ...domProps
          } = rest
          void initial; void animate; void exit; void whileHover; void whileTap
          void whileInView; void viewport; void transition; void layoutId
          return <Tag style={style} {...domProps}>{children}</Tag>
        },
    },
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// ─── Mock i18n ────────────────────────────────────────────────────────────────
const TRANSLATIONS: Record<string, string> = {
  'services.eyebrow':        'Nossas Soluções',
  'services.title':          'Um portfólio completo para cada fase da sua vida.',
  'services.consortium.title': 'Consórcio',
  'services.consortium.desc':  'Planejamento patrimonial estratégico sem juros.',
  'services.consortium.cta':   'Conhecer soluções',
  'services.insurance.title':  'Seguros',
  'services.insurance.desc':   'Proteção e segurança para você.',
  'services.insurance.soon':   'Em breve — conteúdo a confirmar',
  'services.health.title':     'Saúde',
  'services.health.desc':      'Planos personalizados.',
  'services.health.soon':      'Em breve — conteúdo a confirmar',
  'services.invest.title':     'Investimentos',
  'services.invest.desc':      'Crescimento e gestão patrimonial.',
  'services.invest.soon':      'Em breve — conteúdo a confirmar',
}

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => TRANSLATIONS[key] ?? key,
  }),
}))

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ServicoPillars', () => {
  beforeEach(() => {
    render(<ServicoPillars />)
  })

  it('renders the section with id="servicos"', () => {
    expect(document.querySelector('#servicos')).not.toBeNull()
  })

  it('renders the eyebrow pill with services.eyebrow text', () => {
    expect(screen.getByText('Nossas Soluções')).toBeInTheDocument()
  })

  it('renders the section H2 title', () => {
    expect(
      screen.getByText('Um portfólio completo para cada fase da sua vida.'),
    ).toBeInTheDocument()
  })

  describe('Consórcio featured card', () => {
    it('renders the Consórcio description', () => {
      expect(
        screen.getByText('Planejamento patrimonial estratégico sem juros.'),
      ).toBeInTheDocument()
    })

    it('renders the CTA link pointing to #para-clientes', () => {
      const cta = screen.getByRole('link', { name: /Conhecer soluções/i })
      expect(cta).toHaveAttribute('href', '#para-clientes')
    })
  })

  describe('Seguros card', () => {
    it('renders the Seguros description', () => {
      expect(screen.getByText('Proteção e segurança para você.')).toBeInTheDocument()
    })

    it('renders "Em breve" badge for Seguros', () => {
      // soon label is the part before "—"
      const badges = screen.getAllByText('Em breve')
      expect(badges.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Saúde card', () => {
    it('renders the Saúde description', () => {
      expect(screen.getByText('Planos personalizados.')).toBeInTheDocument()
    })
  })

  describe('Investimentos card', () => {
    it('renders the Investimentos description', () => {
      expect(screen.getByText('Crescimento e gestão patrimonial.')).toBeInTheDocument()
    })

    it('renders outer ring with gold colour class', () => {
      // The outer div of the Investimentos card carries ring-[#c9a84c]/20
      const section = document.querySelector('#servicos')!
      expect(section.querySelector('.ring-\\[\\#c9a84c\\]\\/20')).not.toBeNull()
    })
  })
})
