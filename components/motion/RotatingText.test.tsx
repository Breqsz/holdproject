import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import RotatingText from './RotatingText'

vi.mock('motion/react', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        React.forwardRef(
          (
            {
              children,
              initial: _i,
              animate: _a,
              exit: _e,
              transition: _t,
              layout: _l,
              ...rest
            }: Record<string, unknown>,
            ref: unknown,
          ) => React.createElement(tag, { ...rest, ref }, children),
        ),
    },
  )
  return {
    motion,
    AnimatePresence: ({ children }: { children: unknown }) => children,
  }
})

describe('RotatingText', () => {
  it('renders the current text from `texts` array', () => {
    render(<RotatingText texts={['Consórcio', 'Seguros']} auto={false} />)
    expect(screen.getAllByText('Consórcio').length).toBeGreaterThan(0)
  })

  it('renders the first text by default', () => {
    render(<RotatingText texts={['A', 'B']} auto={false} />)
    expect(screen.getAllByText('A').length).toBeGreaterThan(0)
  })
})
