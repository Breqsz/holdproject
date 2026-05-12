import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ComoFunciona from './ComoFunciona'

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...rest }: any) => {
          const { initial, animate, whileInView, viewport, transition, exit, whileHover, whileTap, variants, style, ...d } = rest
          void initial; void animate; void whileInView; void viewport; void transition
          void exit; void whileHover; void whileTap; void variants
          return React.createElement(tag, { ...d, style }, children)
        },
    },
  )
  const make = () => ({ get: () => 0, set: () => {}, onChange: () => () => {} })
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useScroll: () => ({ scrollYProgress: make() }),
    useTransform: () => make(),
  }
})

vi.mock('@/lib/i18n', () => ({
  useLocale: () => ({
    locale: 'pt',
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        'comoFunciona.title':         'O jeito HOLD de ser',
        'comoFunciona.subtitle':      'Mais do que intermediar soluções, estruturamos decisões.',
        'comoFunciona.body':          'Na Hold, cada cliente recebe uma estratégia personalizada.',
      }
      return map[key] ?? key
    },
  }),
}))

describe('ComoFunciona (home manifesto header)', () => {
  it('renders the section with id="como-funciona"', () => {
    render(<ComoFunciona />)
    expect(document.querySelector('#como-funciona')).not.toBeNull()
  })

  it('renders title, subtitle and body', () => {
    render(<ComoFunciona />)
    expect(screen.getByRole('heading', { level: 2, name: /O jeito HOLD de ser/i })).toBeInTheDocument()
    expect(screen.getByText(/Mais do que intermediar soluções/)).toBeInTheDocument()
    expect(screen.getByText(/cada cliente recebe uma estratégia/)).toBeInTheDocument()
  })
})
