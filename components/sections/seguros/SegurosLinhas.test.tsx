import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SegurosLinhas from './SegurosLinhas'
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
          ) => React.createElement(tag, { ...rest, ref }, children)
        ),
    }
  )
  return {
    motion,
    AnimatePresence: ({ children }: { children: unknown }) => children,
    useReducedMotion: () => false,
  }
})

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ alt, src }: any) => <img alt={alt} src={typeof src === 'string' ? src : ''} />,
}))

vi.mock('@/components/shared/WhatsAppRedirectModal', () => ({
  WhatsAppRedirectModal: () => null,
}))

describe('SegurosLinhas', () => {
  it('renders the four protection groups', () => {
    render(<SegurosLinhas />)
    ;[
      'Proteção Pessoal',
      'Patrimônio',
      'Empresas e Responsabilidades',
      'Operações e Grandes Riscos',
    ].forEach((title) => {
      expect(screen.getAllByText(title).length).toBeGreaterThan(0)
    })
  })

  it('opens the detail modal with sub-coverages when a group is clicked', () => {
    render(<SegurosLinhas />)
    fireEvent.click(screen.getByRole('button', { name: /Conhecer Proteção Pessoal/i }))
    // Modal lists the sub-coverages of the group (name + description)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getAllByText(/Previdência/i).length).toBeGreaterThan(0)
    expect(
      screen.getByText(/Construa uma reserva financeira para o futuro/i)
    ).toBeInTheDocument()
  })
})
