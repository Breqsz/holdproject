import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FAQ from './FAQ'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        React.forwardRef(
          (
            {
              children,
              initial: _i,
              animate: _a,
              whileInView: _wiv,
              variants: _v,
              viewport: _vp,
              transition: _t,
              ...rest
            }: Record<string, unknown>,
            ref: unknown
          ) =>
            React.createElement(tag, { ...rest, ref }, children)
        ),
    }
  )
  return {
    motion,
    AnimatePresence: ({ children }: { children: unknown }) => children,
  }
})

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'faq.eyebrow': 'Perguntas Frequentes',
        'faq.title': 'Dúvidas sobre nossos serviços? A gente responde.',
      }
      return map[key] ?? key
    },
  }),
}))

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FIRST_Q = 'O que é a Hold Corretora?'
const FIRST_A =
  'A Hold é uma corretora especializada em consultoria estratégica de patrimônio. Atuamos nas frentes de consórcio, seguros, saúde e investimentos, estruturando soluções personalizadas ao perfil e objetivo de cada cliente.'

const SECOND_Q = 'Quais serviços a Hold oferece?'
const SECOND_A =
  'Trabalhamos com quatro frentes integradas: Consórcio (planejamento patrimonial sem juros), Seguros (proteção individual e empresarial), Saúde (planos personalizados para PF e PJ) e Investimentos (crescimento e gestão patrimonial com visão de longo prazo).'

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('FAQ', () => {
  beforeEach(() => {
    render(<FAQ />)
  })

  it('renders the section with correct id', () => {
    expect(document.querySelector('#faq')).not.toBeNull()
  })

  it('renders the H2 title', () => {
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Dúvidas sobre nossos serviços? A gente responde.',
      })
    ).toBeInTheDocument()
  })

  it('renders all 12 accordion trigger buttons', () => {
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(12)
  })

  it('renders all 12 question texts', () => {
    const questions = [
      'O que é a Hold Corretora?',
      'Quais serviços a Hold oferece?',
      'Como funciona o atendimento da Hold?',
      'O que é consórcio e como funciona?',
      'O consórcio tem juros?',
      'Consórcio ou financiamento: qual a diferença?',
      'Como posso ser contemplado no consórcio?',
      'Posso usar o FGTS no consórcio?',
      'A Hold trabalha com seguros para empresas?',
      'Posso contratar plano de saúde pela Hold?',
      'Como funciona a parceria para escritórios de investimentos?',
      'A Hold é regulamentada?',
    ]
    questions.forEach((q) => {
      expect(screen.getByText(q)).toBeInTheDocument()
    })
  })

  it('answers are not visible before any item is opened', () => {
    expect(screen.queryByText(FIRST_A)).not.toBeInTheDocument()
  })

  it('shows the answer when a question is clicked', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText(FIRST_Q))
    expect(screen.getByText(FIRST_A)).toBeInTheDocument()
  })

  it('button has aria-expanded=true after opening', async () => {
    const user = userEvent.setup()
    expect(screen.getByRole('button', { name: FIRST_Q })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
    await user.click(screen.getByRole('button', { name: FIRST_Q }))
    // Re-query after React re-render to get fresh DOM reference
    expect(screen.getByRole('button', { name: FIRST_Q })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
  })

  it('hides the answer when the same question is clicked again (toggle close)', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText(FIRST_Q))
    expect(screen.getByText(FIRST_A)).toBeInTheDocument()
    await user.click(screen.getByText(FIRST_Q))
    expect(screen.queryByText(FIRST_A)).not.toBeInTheDocument()
  })

  it('allows multiple items to be open simultaneously', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText(FIRST_Q))
    await user.click(screen.getByText(SECOND_Q))
    expect(screen.getByText(FIRST_A)).toBeInTheDocument()
    expect(screen.getByText(SECOND_A)).toBeInTheDocument()
  })

  it('closing one item does not affect other open items', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText(FIRST_Q))
    await user.click(screen.getByText(SECOND_Q))
    // Close the first
    await user.click(screen.getByText(FIRST_Q))
    expect(screen.queryByText(FIRST_A)).not.toBeInTheDocument()
    expect(screen.getByText(SECOND_A)).toBeInTheDocument()
  })

  it('renders the last FAQ item about Hold being regulated', () => {
    expect(screen.getByText('A Hold é regulamentada?')).toBeInTheDocument()
  })

  it('last item answer is shown after clicking', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText('A Hold é regulamentada?'))
    expect(
      screen.getByText(/administradoras autorizadas pelo Banco Central do Brasil/)
    ).toBeInTheDocument()
  })
})
