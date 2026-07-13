import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ParaClientes from './ParaClientes'

// ─── Mock framer-motion ───────────────────────────────────────────────────────
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const Tag = tag as keyof JSX.IntrinsicElements
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

// ─── Mock utils ───────────────────────────────────────────────────────────────
vi.mock('@/lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
  formatWhatsAppLink: (number: string, message: string) =>
    `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
}))

// ─── Mock i18n ────────────────────────────────────────────────────────────────
const TRANSLATIONS: Record<string, string> = {
  'clients.eyebrow':        'Para Clientes',
  'clients.title':          'Consórcio para cada objetivo, cada fase da sua vida.',
  'clients.toggle.you':     'Para Você',
  'clients.toggle.company': 'Para sua Empresa',
  'clients.cta.whatsapp':   'Fale com um especialista',
  'clients.applications':   'Aplicações',
  'clients.strategic':      'Visão estratégica',

  'clients.imoveis.title':    'Imóveis',
  'clients.imoveis.desc':     'Planejamento inteligente para adquirir patrimônio.',
  'clients.imoveis.strategic': 'Um dos pilares mais sólidos.',
  'clients.imoveis.apps':     'Aquisição de imóveis residenciais|Investimentos na planta',

  'clients.veiculos.title':    'Veículos',
  'clients.veiculos.desc':     'Mobilidade planejada.',
  'clients.veiculos.strategic': 'Eficiência em mobilidade.',
  'clients.veiculos.apps':     'Veículos leves|Motos e utilitários',

  'clients.pesados.title':    'Pesados & Agro',
  'clients.pesados.desc':     'Estruture sua operação.',
  'clients.pesados.strategic': 'Mais capacidade operacional.',
  'clients.pesados.apps':     'Caminhões|Tratores',

  'clients.servicos.title':    'Serviços',
  'clients.servicos.desc':     'Planeje grandes momentos.',
  'clients.servicos.strategic': 'Planejamento estruturado.',
  'clients.servicos.apps':     'Cirurgias|Educação',

  'clients.condominios.title':    'Condomínios',
  'clients.condominios.desc':     'Modernize seu condomínio.',
  'clients.condominios.strategic': 'Valorização do patrimônio.',
  'clients.condominios.apps':     'Reformas|Elevadores',

  'clients.igrejas.title':    'Igrejas e Templos',
  'clients.igrejas.desc':     'Estruture projetos.',
  'clients.igrejas.strategic': 'Fortalece a instituição.',
  'clients.igrejas.apps':     'Construção de templos|Aquisição de imóveis',

  'clients.alavancagem.title':    'Alavancagem',
  'clients.alavancagem.desc':     'Crescimento financeiro com estratégia.',
  'clients.alavancagem.strategic': 'Alternativa sofisticada.',
  'clients.alavancagem.apps':     'Geração de renda|Estruturação patrimonial',

  'clients.cotas.title':    'Cotas Contempladas',
  'clients.cotas.desc':     'Acesso imediato ao crédito.',
  'clients.cotas.strategic': 'Alternativa estratégica.',
  'clients.cotas.apps':     'Acesso imediato|Aquisição ágil',

  'process.title':        'Como Funciona o Processo',
  'process.step1.title':  'Diagnóstico e planejamento',
  'process.step1.desc':   'Ajudamos você a escolher o plano.',
  'process.step2.title':  'Estratégia de contemplação',
  'process.step2.desc':   'Indicamos as melhores estratégias.',
  'process.step3.title':  'Utilização do crédito',
  'process.step3.desc':   'Você adquire o bem desejado.',
  'process.step4.title':  'Acompanhamento completo',
  'process.step4.desc':   'Nosso time oferece suporte.',

  'partners.title':     'Mesa de Consórcios para Parceiros',
  'partners.body':      'A HOLD atua como extensão estratégica do seu escritório.',
  'partners.diff.title': 'Diferenciais da operação',
  'partners.cta':       'Quero ser parceiro',
}

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => TRANSLATIONS[key] ?? key,
  }),
}))

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ParaClientes', () => {
  it('renders the section with id="para-clientes"', () => {
    render(<ParaClientes />)
    expect(document.querySelector('#para-clientes')).not.toBeNull()
  })

  describe('Tab toggle', () => {
    it('renders both toggle buttons', () => {
      render(<ParaClientes />)
      expect(screen.getByRole('button', { name: 'Para Você' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Para sua Empresa' })).toBeInTheDocument()
    })

    it('defaults to "Para Você" tab — shows clients.title', () => {
      render(<ParaClientes />)
      expect(
        screen.getByText('Consórcio para cada objetivo, cada fase da sua vida.'),
      ).toBeInTheDocument()
    })

    it('switches to "Para sua Empresa" content on click', async () => {
      render(<ParaClientes />)
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Para sua Empresa' }))
      expect(screen.getByText('Mesa de Consórcios para Parceiros')).toBeInTheDocument()
    })

    it('switches back to "Para Você" content from empresa tab', async () => {
      render(<ParaClientes />)
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Para sua Empresa' }))
      await user.click(screen.getByRole('button', { name: 'Para Você' }))
      expect(
        screen.getByText('Consórcio para cada objetivo, cada fase da sua vida.'),
      ).toBeInTheDocument()
    })
  })

  describe('Para Você — category grid', () => {
    beforeEach(() => {
      render(<ParaClientes />)
    })

    it('renders all 8 category buttons', () => {
      const labels = [
        'Imóveis', 'Veículos', 'Pesados & Agro', 'Serviços',
        'Condomínios', 'Igrejas e Templos', 'Alavancagem', 'Cotas Contempladas',
      ]
      for (const label of labels) {
        expect(screen.getByRole('button', { name: new RegExp(label, 'i') })).toBeInTheDocument()
      }
    })

    it('defaults to Imóveis selected — shows its detail panel', () => {
      expect(screen.getByText('Planejamento inteligente para adquirir patrimônio.')).toBeInTheDocument()
    })

    it('shows Veículos detail panel after clicking Veículos button', async () => {
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: /Veículos/i }))
      expect(screen.getByText('Mobilidade planejada.')).toBeInTheDocument()
    })

    it('splits apps by pipe and renders each as a list item', () => {
      // Imóveis apps: "Aquisição de imóveis residenciais|Investimentos na planta"
      expect(screen.getByText('Aquisição de imóveis residenciais')).toBeInTheDocument()
      expect(screen.getByText('Investimentos na planta')).toBeInTheDocument()
    })

    it('renders strategic vision text', () => {
      expect(screen.getByText('Um dos pilares mais sólidos.')).toBeInTheDocument()
    })
  })

  describe('Para Você — detail panel WhatsApp CTA', () => {
    it('renders a WhatsApp CTA link with correct href', () => {
      render(<ParaClientes />)
      const link = screen.getByRole('link', { name: /Fale com um especialista/i })
      expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'))
    })

    it('WhatsApp link contains the category name in the message', () => {
      render(<ParaClientes />)
      const link = screen.getByRole('link', { name: /Fale com um especialista/i })
      const href = link.getAttribute('href') ?? ''
      expect(decodeURIComponent(href)).toContain('Imóveis')
    })
  })

  describe('Para Você — process steps', () => {
    beforeEach(() => {
      render(<ParaClientes />)
    })

    it('renders "Como Funciona o Processo" heading', () => {
      expect(screen.getByText('Como Funciona o Processo')).toBeInTheDocument()
    })

    it('renders all 4 numbered step circles', () => {
      // Step numbers 1-4 appear as text inside circles
      ;[1, 2, 3, 4].forEach((n) => {
        // There may be multiple elements; just confirm presence
        expect(screen.getAllByText(String(n)).length).toBeGreaterThanOrEqual(1)
      })
    })

    it('renders step titles', () => {
      expect(screen.getByText('Diagnóstico e planejamento')).toBeInTheDocument()
      expect(screen.getByText('Acompanhamento completo')).toBeInTheDocument()
    })
  })

  describe('Para sua Empresa content', () => {
    beforeEach(async () => {
      render(<ParaClientes />)
      await userEvent.setup().click(screen.getByRole('button', { name: 'Para sua Empresa' }))
    })

    it('renders partners body text', () => {
      expect(
        screen.getByText('A HOLD atua como extensão estratégica do seu escritório.'),
      ).toBeInTheDocument()
    })

    it('renders diferenciais section heading', () => {
      expect(screen.getByText('Diferenciais da operação')).toBeInTheDocument()
    })

    it('renders "Quero ser parceiro" CTA linking to #para-escritorios', () => {
      const cta = screen.getByRole('link', { name: /Quero ser parceiro/i })
      expect(cta).toHaveAttribute('href', '#para-escritorios')
    })
  })
})
