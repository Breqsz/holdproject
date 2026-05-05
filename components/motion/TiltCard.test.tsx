import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TiltCard } from './TiltCard'

// Mock framer-motion: render plain div, supply motion-value stubs.
vi.mock('framer-motion', () => {
  const React = require('react')
  const make = () => ({ get: () => 0, set: () => {}, onChange: () => () => {} })
  return {
    motion: {
      div: React.forwardRef(
        (
          { children, style: _s, onMouseMove: _mm, onMouseEnter: _me, onMouseLeave: _ml, ...rest }: Record<string, unknown> & { children?: React.ReactNode },
          ref: React.Ref<HTMLDivElement>
        ) => React.createElement('div', { ...rest, ref }, children)
      ),
    },
    useMotionValue: make,
    useSpring: make,
    useReducedMotion: () => false,
  }
})

describe('TiltCard', () => {
  it('renders its children', () => {
    render(<TiltCard><span>tilt-content</span></TiltCard>)
    expect(screen.getByText('tilt-content')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<TiltCard className="my-card"><span>x</span></TiltCard>)
    expect(container.firstChild).toHaveClass('my-card')
  })

  it('does not throw when default rotateAmplitude/scaleOnHover are used', () => {
    expect(() => render(<TiltCard><span>x</span></TiltCard>)).not.toThrow()
  })
})

// Separate suite to verify reduced-motion path returns plain wrapper
describe('TiltCard with prefers-reduced-motion', () => {
  it('returns a plain div without 3D transforms', async () => {
    vi.resetModules()
    vi.doMock('framer-motion', () => {
      const React = require('react')
      const make = () => ({ get: () => 0, set: () => {}, onChange: () => () => {} })
      return {
        motion: { div: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children) },
        useMotionValue: make,
        useSpring: make,
        useReducedMotion: () => true,
      }
    })
    const { TiltCard: ReducedTilt } = await import('./TiltCard')
    const { container } = render(<ReducedTilt className="reduced"><span>r</span></ReducedTilt>)
    expect(container.firstChild).toHaveClass('reduced')
    vi.doUnmock('framer-motion')
  })
})
