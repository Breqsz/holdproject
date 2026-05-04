import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import SegurosIcon from './SegurosIcon'

describe('SegurosIcon', () => {
  it('renders an SVG with the canonical 24x24 viewBox', () => {
    const { container } = render(<SegurosIcon />)
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24')
  })

  it('honors the size prop', () => {
    const { container } = render(<SegurosIcon size={32} />)
    expect(container.querySelector('svg')?.getAttribute('width')).toBe('32')
  })
})
