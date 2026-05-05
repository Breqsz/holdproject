import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScrollUI from './ScrollUI'

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock('framer-motion', () => {
  const React = require('react')
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        React.forwardRef(
          (
            { children, style, initial: _i, animate: _a, exit: _e, transition: _t, ...rest }: Record<string, unknown>,
            ref: unknown
          ) => React.createElement(tag, { ...rest, style, ref }, children)
        ),
    }
  )
  return {
    motion,
    AnimatePresence: ({ children }: { children: unknown }) => children,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useSpring: (v: unknown) => v,
  }
})

// ── Helpers ───────────────────────────────────────────────────────────────────

function setScrollFraction(fraction: number) {
  const total = 2000
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    configurable: true, value: total,
  })
  Object.defineProperty(document.documentElement, 'clientHeight', {
    configurable: true, value: 800,
  })
  Object.defineProperty(document.documentElement, 'scrollTop', {
    configurable: true,
    value: Math.max(0, fraction * total - 800),
  })
  act(() => { window.dispatchEvent(new Event('scroll')) })
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('ScrollUI', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    setScrollFraction(0)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the progress bar', () => {
    render(<ScrollUI />)
    const bar = document.querySelector('[aria-hidden]')
    expect(bar).not.toBeNull()
  })

  it('does not show back-to-top button when scrolled less than 85%', () => {
    render(<ScrollUI />)
    setScrollFraction(0.5)
    expect(screen.queryByRole('button', { name: 'Voltar ao topo' })).not.toBeInTheDocument()
  })

  it('shows back-to-top button when scrolled 85% or more', () => {
    render(<ScrollUI />)
    setScrollFraction(0.9)
    expect(screen.getByRole('button', { name: 'Voltar ao topo' })).toBeInTheDocument()
  })

  it('hides back-to-top button when scrolling back above 85%', () => {
    render(<ScrollUI />)
    setScrollFraction(0.9)
    expect(screen.getByRole('button', { name: 'Voltar ao topo' })).toBeInTheDocument()
    setScrollFraction(0.5)
    expect(screen.queryByRole('button', { name: 'Voltar ao topo' })).not.toBeInTheDocument()
  })

  it('calls window.scrollTo({ top: 0 }) when back-to-top is clicked', async () => {
    render(<ScrollUI />)
    setScrollFraction(0.9)
    await userEvent.click(screen.getByRole('button', { name: 'Voltar ao topo' }))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
