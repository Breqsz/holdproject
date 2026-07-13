import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SegurosLinhaDetailModal } from './SegurosLinhaDetailModal'
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
              exit: _e,
              transition: _t,
              ...rest
            }: Record<string, unknown>,
            ref: unknown
          ) => React.createElement(tag, { ...rest, ref }, children)
        ),
    }
  )
  return { motion, AnimatePresence: ({ children }: { children: unknown }) => children }
})

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ alt, src }: any) => <img alt={alt} src={typeof src === 'string' ? src : ''} />,
}))

const data = {
  seq: '01',
  image: '/x.jpg',
  title: 'Proteção Pessoal',
  short: 'Teaser do grupo.',
  coberturas: [
    { name: 'Vida', desc: 'Descrição da cobertura de vida.' },
    { name: 'Viagem', desc: 'Descrição da cobertura de viagem.' },
  ],
}

describe('SegurosLinhaDetailModal', () => {
  it('renders each sub-coverage name and description when open', () => {
    render(
      <SegurosLinhaDetailModal open data={data} onClose={vi.fn()} onConfirm={vi.fn()} />
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Vida')).toBeInTheDocument()
    expect(screen.getByText('Descrição da cobertura de vida.')).toBeInTheDocument()
    expect(screen.getByText('Viagem')).toBeInTheDocument()
  })

  it('calls onConfirm when the WhatsApp CTA is clicked', () => {
    const onConfirm = vi.fn()
    render(
      <SegurosLinhaDetailModal open data={data} onClose={vi.fn()} onConfirm={onConfirm} />
    )
    fireEvent.click(screen.getByRole('button', { name: /Falar no WhatsApp/i }))
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it('renders nothing when closed', () => {
    render(
      <SegurosLinhaDetailModal open={false} data={data} onClose={vi.fn()} onConfirm={vi.fn()} />
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
