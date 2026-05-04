import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LogoLoop from './LogoLoop'

describe('LogoLoop', () => {
  it('renders all image logos at least once (sequence + copies)', () => {
    render(
      <LogoLoop
        logos={[
          { src: '/a.png', alt: 'Alpha' },
          { src: '/b.png', alt: 'Beta' },
        ]}
        ariaLabel="Test"
      />,
    )
    expect(screen.getAllByAltText('Alpha').length).toBeGreaterThan(0)
    expect(screen.getAllByAltText('Beta').length).toBeGreaterThan(0)
  })

  it('uses the provided ariaLabel on the region', () => {
    render(<LogoLoop logos={[{ src: '/x.png', alt: 'X' }]} ariaLabel="Parceiros" />)
    expect(screen.getByRole('region', { name: 'Parceiros' })).toBeInTheDocument()
  })

  it('renders node logos when item has `node` instead of `src`', () => {
    render(
      <LogoLoop
        logos={[{ node: <span>NodeLogo</span>, ariaLabel: 'Node' }]}
        ariaLabel="Nodes"
      />,
    )
    expect(screen.getAllByText('NodeLogo').length).toBeGreaterThan(0)
  })
})
