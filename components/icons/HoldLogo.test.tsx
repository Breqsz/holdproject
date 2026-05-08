import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { HoldLogo } from './HoldLogo'

describe('HoldLogo', () => {
  it('renders an SVG element', () => {
    const { container } = render(<HoldLogo />)
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('has accessible label', () => {
    const { container } = render(<HoldLogo />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-label', 'Hold Corretora')
  })

  it('forwards className', () => {
    const { container } = render(<HoldLogo className="h-8 w-auto" />)
    expect(container.querySelector('svg')).toHaveClass('h-8')
  })

  it('uses white wordmark fill on dark variant (default)', () => {
    const { container } = render(<HoldLogo variant="dark" />)
    const whitePaths = Array.from(container.querySelectorAll('path')).filter(
      (p) => p.getAttribute('fill') === '#ffffff'
    )
    expect(whitePaths.length).toBeGreaterThan(0)
  })

  it('uses navy wordmark fill on light variant', () => {
    const { container } = render(<HoldLogo variant="light" />)
    const navyPaths = Array.from(container.querySelectorAll('path')).filter(
      (p) => p.getAttribute('fill') === '#07162a'
    )
    expect(navyPaths.length).toBeGreaterThan(0)
  })

  it('always uses red for the emblem', () => {
    const { container } = render(<HoldLogo />)
    const redPaths = Array.from(container.querySelectorAll('path')).filter(
      (p) => p.getAttribute('fill') === '#ae251c'
    )
    expect(redPaths.length).toBeGreaterThan(0)
  })
})
