import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SaudeFAQ from './SaudeFAQ'
import pt from '@/messages/pt.json'

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => (pt as Record<string, string>)[key] ?? key,
  }),
}))

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
              exit: _e,
              whileHover: _wh,
              whileTap: _wt,
              layoutId: _l,
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
    useReducedMotion: () => false,
  }
})

describe('SaudeFAQ', () => {
  it('renders the section heading', () => {
    render(<SaudeFAQ />)
    expect(
      screen.getByRole('heading', { level: 2, name: /Perguntas frequentes sobre planos de saúde/i })
    ).toBeInTheDocument()
  })

  it('renders all 10 question buttons', () => {
    render(<SaudeFAQ />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(10)
    expect(screen.getByText(/Qual a diferença entre plano individual, coletivo por adesão e empresarial/i)).toBeInTheDocument()
    expect(screen.getByText(/MEI pode contratar plano empresarial/i)).toBeInTheDocument()
    expect(screen.getByText(/A HOLD acompanha após a contratação/i)).toBeInTheDocument()
  })

  it('starts with all items collapsed (aria-expanded=false)', () => {
    render(<SaudeFAQ />)
    const firstQ = screen.getByRole('button', {
      name: /Qual a diferença entre plano individual/i,
    })
    expect(firstQ).toHaveAttribute('aria-expanded', 'false')
  })

  it('expands an item on click', () => {
    render(<SaudeFAQ />)
    fireEvent.click(
      screen.getByRole('button', { name: /Qual a diferença entre plano individual/i })
    )
    expect(
      screen.getByRole('button', { name: /Qual a diferença entre plano individual/i })
    ).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders sub-headings inside Q8 (urgência/emergência) when expanded', () => {
    render(<SaudeFAQ />)
    const q8 = screen.getByRole('button', {
      name: /Como funcionam os atendimentos de urgência e emergência/i,
    })
    fireEvent.click(q8)
    expect(screen.getByText(/O que é considerado emergência\?/i)).toBeInTheDocument()
    expect(screen.getByText(/O que é considerado urgência\?/i)).toBeInTheDocument()
    expect(screen.getByText(/Qual o prazo de cobertura\?/i)).toBeInTheDocument()
    expect(screen.getByText(/Como funciona a cobertura nos planos hospitalares\?/i)).toBeInTheDocument()
    expect(screen.getByText(/Como funciona nos planos exclusivamente ambulatoriais\?/i)).toBeInTheDocument()
    expect(screen.getByText(/Por que é importante analisar o contrato\?/i)).toBeInTheDocument()
  })

  it('renders bullet items inside expanded answer', () => {
    render(<SaudeFAQ />)
    const q5 = screen.getByRole('button', {
      name: /O que é carência no plano de saúde/i,
    })
    fireEvent.click(q5)
    expect(screen.getByText(/24 horas para urgência e emergência/i)).toBeInTheDocument()
    expect(screen.getByText(/300 dias para parto a termo/i)).toBeInTheDocument()
  })
})
