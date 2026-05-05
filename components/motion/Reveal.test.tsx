import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Reveal } from './Reveal'

vi.mock('framer-motion', () => {
  const React = require('react')
  return {
    motion: {
      div: ({ children, ...rest }: { children?: React.ReactNode }) =>
        React.createElement('div', rest, children),
    },
    useReducedMotion: () => false,
  }
})

describe('Reveal', () => {
  it('renders its children', () => {
    render(<Reveal><span>visible content</span></Reveal>)
    expect(screen.getByText('visible content')).toBeInTheDocument()
  })

  it('forwards className to the wrapper', () => {
    const { container } = render(
      <Reveal className="custom-cls"><span>x</span></Reveal>
    )
    expect(container.firstChild).toHaveClass('custom-cls')
  })
})
