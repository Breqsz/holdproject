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
        'faq.title': 'Tem dúvidas sobre consórcio? A gente responde.',
      }
      return map[key] ?? key
    },
  }),
}))

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FIRST_Q = 'O que é consórcio?'
const FIRST_A =
  'O consórcio é uma modalidade de compra baseada na formação de grupos de pessoas com objetivos em comum, regulamentado pela Lei nº 11.795/2008 e fiscalizado pelo Banco Central do Brasil.'

const SECOND_Q = 'Como funciona o consórcio?'
const SECOND_A =
  'Os participantes pagam parcelas mensais que formam um fundo comum. Mensalmente ocorrem assembleias onde consorciados são contemplados por sorteio ou lance.'

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

  it('renders the eyebrow pill', () => {
    expect(screen.getByText('Perguntas Frequentes')).toBeInTheDocument()
  })

  it('renders the H2 title', () => {
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Tem dúvidas sobre consórcio? A gente responde.',
      })
    ).toBeInTheDocument()
  })

  it('renders all 18 accordion trigger buttons', () => {
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(18)
  })

  it('renders all 18 question texts', () => {
    const questions = [
      'O que é consórcio?',
      'Como funciona o consórcio?',
      'O consórcio tem juros?',
      'Posso escolher o valor da carta de crédito?',
      'O que é carta de crédito?',
      'Como posso ser contemplado?',
      'O que é lance embutido?',
      'Qual a diferença entre meia parcela, parcela reduzida e upgrade?',
      'O que acontece após a contemplação?',
      'Quanto tempo tenho para usar a carta de crédito?',
      'Posso usar o FGTS no consórcio?',
      'As parcelas podem mudar?',
      'O que acontece se eu atrasar parcelas?',
      'Posso desistir do consórcio?',
      'Posso vender ou transferir minha cota?',
      'Consórcio ou financiamento: qual a diferença?',
      'O consórcio é seguro?',
      'O consórcio é investimento?',
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

  it('renders the last FAQ item about consórcio as investment', () => {
    expect(screen.getByText('O consórcio é investimento?')).toBeInTheDocument()
  })

  it('last item answer is shown after clicking', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText('O consórcio é investimento?'))
    expect(
      screen.getByText(
        /Pode ser estruturado como ferramenta de alavancagem patrimonial/
      )
    ).toBeInTheDocument()
  })
})
