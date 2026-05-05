import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConsorciosClient from '@/app/consorcios/ConsorciosClient'
import { AudienceProvider } from '@/lib/audience'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const {
            initial, animate, exit, whileHover, whileTap, whileInView,
            viewport, transition, layoutId, ...domProps
          } = rest
          void initial; void animate; void exit; void whileHover; void whileTap
          void whileInView; void viewport; void transition; void layoutId
          return React.createElement(tag, domProps, children)
        },
    }
  )
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => false,
  }
})

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => {
    const React = require('react')
    return React.createElement('img', { alt, src })
  },
}))

vi.mock('@/lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
  formatWhatsAppLink: (number: string, msg: string) =>
    `https://wa.me/${number}?text=${encodeURIComponent(msg)}`,
}))

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'clients.eyebrow':         'Para Clientes',
        'clients.title':           'Consórcio para cada objetivo, cada fase da sua vida.',
        'clients.cta.whatsapp':    'Falar com especialista',
        'clients.applications':    'Aplicações',
        'clients.strategic':       'Visão estratégica',
        'clients.imoveis.title':   'Imóveis',
        'clients.imoveis.desc':    'Planejamento inteligente.',
        'clients.imoveis.strategic': 'Pilar sólido.',
        'clients.imoveis.apps':    'Aquisição|Construção',
        'clients.veiculos.title':  'Veículos',
        'clients.veiculos.desc':   'Mobilidade planejada.',
        'clients.veiculos.strategic': 'Eficiência.',
        'clients.veiculos.apps':   'Carros|Motos',
        'clients.pesados.title':   'Pesados & Agro',
        'clients.pesados.desc':    'Estruture sua operação.',
        'clients.pesados.strategic': 'Capacidade.',
        'clients.pesados.apps':    'Caminhões|Tratores',
        'clients.servicos.title':  'Serviços',
        'clients.servicos.desc':   'Planeje grandes momentos.',
        'clients.servicos.strategic': 'Planejamento.',
        'clients.servicos.apps':   'Cirurgias|Educação',
        'clients.condominios.title': 'Condomínios',
        'clients.condominios.desc':  'Modernize.',
        'clients.condominios.strategic': 'Valorização.',
        'clients.condominios.apps':  'Reformas|Elevadores',
        'clients.igrejas.title':   'Igrejas e Templos',
        'clients.igrejas.desc':    'Estruture projetos.',
        'clients.igrejas.strategic': 'Fortalece.',
        'clients.igrejas.apps':    'Construção|Imóveis',
        'clients.alavancagem.title': 'Alavancagem',
        'clients.alavancagem.desc':  'Crescimento.',
        'clients.alavancagem.strategic': 'Sofisticada.',
        'clients.alavancagem.apps':  'Renda|Patrimônio',
        'clients.cotas.title':     'Cotas Contempladas',
        'clients.cotas.desc':      'Acesso imediato.',
        'clients.cotas.strategic': 'Estratégica.',
        'clients.cotas.apps':      'Crédito|Aquisição',
        'process.title':           'Como Funciona',
        'process.step1.title':     'Diagnóstico',
        'process.step1.desc':      'Escolhemos o plano.',
        'process.step2.title':     'Estratégia',
        'process.step2.desc':      'Aceleramos contemplação.',
        'process.step3.title':     'Utilização',
        'process.step3.desc':      'Você adquire o bem.',
        'process.step4.title':     'Acompanhamento',
        'process.step4.desc':      'Suporte completo.',
        'partners.eyebrow':        'Para Escritórios',
        'partners.title':          'Mesa de Consórcios para Parceiros',
        'partners.body':           'A HOLD atua como extensão.',
        'partners.diff.title':     'Diferenciais',
        'partners.cta':            'Quero ser parceiro',
      }
      return map[key] ?? key
    },
  }),
}))

function renderClient() {
  return render(
    <AudienceProvider>
      <ConsorciosClient />
    </AudienceProvider>
  )
}

describe('ConsorciosClient', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the PF headline by default', () => {
    renderClient()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Consórcio com inteligência, confiança e estratégia/,
      })
    ).toBeInTheDocument()
  })

  it('renders both audience toggle buttons', () => {
    renderClient()
    expect(screen.getByRole('button', { name: 'Para você' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Para sua empresa' })).toBeInTheDocument()
  })

  it('renders all 8 category buttons (PF default)', () => {
    renderClient()
    const labels = [
      'Imóveis', 'Veículos', 'Pesados & Agro', 'Serviços',
      'Condomínios', 'Igrejas e Templos', 'Alavancagem', 'Cotas Contempladas',
    ]
    labels.forEach((label) => {
      expect(screen.getByRole('button', { name: new RegExp(label, 'i') })).toBeInTheDocument()
    })
  })

  it('renders a WhatsApp lead CTA in the hero', () => {
    renderClient()
    expect(screen.getByRole('link', { name: /Falar no WhatsApp/i })).toBeInTheDocument()
  })

  it('switches to PJ headline after toggling "Para sua empresa"', async () => {
    const user = userEvent.setup()
    renderClient()
    await user.click(screen.getByRole('button', { name: 'Para sua empresa' }))
    expect(
      screen.getByRole('heading', { level: 1, name: /Mesa de consórcios para escritórios/i })
    ).toBeInTheDocument()
  })

  it('shows the "Mesa de Consórcios para Parceiros" section when PJ is selected', async () => {
    const user = userEvent.setup()
    renderClient()
    await user.click(screen.getByRole('button', { name: 'Para sua empresa' }))
    expect(screen.getByText('Mesa de Consórcios para Parceiros')).toBeInTheDocument()
  })

  it('renders the process steps when PF is selected', () => {
    renderClient()
    expect(screen.getByText('Como Funciona')).toBeInTheDocument()
    expect(screen.getByText('Diagnóstico')).toBeInTheDocument()
    expect(screen.getByText('Acompanhamento')).toBeInTheDocument()
  })
})
