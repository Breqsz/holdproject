import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ConsorcioIcon from './ConsorcioIcon'

describe('ConsorcioIcon', () => {
  it('renders an SVG with the canonical 24x24 viewBox', () => {
    const { container } = render(<ConsorcioIcon />)
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24')
  })

  it('honors the size prop', () => {
    const { container } = render(<ConsorcioIcon size={32} />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('32')
    expect(svg?.getAttribute('height')).toBe('32')
  })
})
