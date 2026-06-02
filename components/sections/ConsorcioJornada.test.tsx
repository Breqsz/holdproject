import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ConsorcioJornada from './ConsorcioJornada'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const { initial, animate, whileInView, viewport, transition, layoutId, exit, whileHover, whileTap, variants, ...d } = rest
          void initial; void animate; void whileInView; void viewport; void transition; void layoutId
          void exit; void whileHover; void whileTap; void variants
          return React.createElement(tag, d, children)
        },
    }
  )
  return { motion, useReducedMotion: () => false }
})

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'process.title':              'Como Funciona o Processo',
        'process.step1.title':        'Diagnóstico e planejamento',
        'process.step1.desc':         'Step 1 desc',
        'process.step2.title':        'Estratégia de contemplação',
        'process.step2.desc':         'Step 2 desc',
        'process.step3.title':        'Utilização do crédito',
        'process.step3.desc':         'Step 3 desc',
        'process.step4.title':        'Acompanhamento completo',
        'process.step4.desc':         'Step 4 desc',
        'comoFunciona.diff.title':    'O que você ganha com a Hold',
        'comoFunciona.gain.1':        'Sem juros, só taxa de administração',
        'comoFunciona.gain.2':        'Atendimento consultivo e personalizado',
        'comoFunciona.gain.3':        'Estratégia de contemplação sob medida',
        'comoFunciona.gain.4':        'Acompanhamento contínuo em todas as etapas',
        'comoFunciona.gain.5':        'Transparência total no contrato e na operação',
        'comoFunciona.gain.6':        'Parcerias com administradoras autorizadas pelo Banco Central',
        'comoFunciona.gain.7':        'Adequação ao seu objetivo, momento e perfil',
        'comoFunciona.gain.8':        'Suporte pós-venda contínuo',
        'comoFunciona.badge':         'Operação regulamentada pelo Banco Central do Brasil',
        'comoFunciona.cta':           'Falar com um especialista',
        'comoFunciona.wa':            'Olá! Quero conversar com um especialista da Hold.',
      }
      return map[key] ?? key
    },
  }),
}))

describe('ConsorcioJornada', () => {
  it('renders the section heading', () => {
    render(<ConsorcioJornada />)
    expect(screen.getByRole('heading', { level: 3, name: /Como Funciona o Processo/i })).toBeInTheDocument()
  })

  it('renders the ganhos eyebrow and all 8 gains', () => {
    render(<ConsorcioJornada />)
    expect(screen.getByRole('heading', { level: 4, name: /O que você ganha com a Hold/i })).toBeInTheDocument()
    expect(screen.getByText(/Sem juros/)).toBeInTheDocument()
    expect(screen.getByText(/Suporte pós-venda contínuo/)).toBeInTheDocument()
  })

  it('renders all 4 step titles', () => {
    render(<ConsorcioJornada />)
    expect(screen.getByText('Diagnóstico e planejamento')).toBeInTheDocument()
    expect(screen.getByText('Estratégia de contemplação')).toBeInTheDocument()
    expect(screen.getByText('Utilização do crédito')).toBeInTheDocument()
    expect(screen.getByText('Acompanhamento completo')).toBeInTheDocument()
  })

  it('renders the regulatory badge', () => {
    render(<ConsorcioJornada />)
    expect(screen.getByText(/Banco Central do Brasil/)).toBeInTheDocument()
  })

  it('renders the WhatsApp CTA pointing to wa.me', () => {
    render(<ConsorcioJornada />)
    const cta = screen.getByRole('link', { name: /Falar com um especialista/ })
    expect(cta).toBeInTheDocument()
    expect(cta.getAttribute('href') ?? '').toMatch(/^https?:\/\//)
  })
})
