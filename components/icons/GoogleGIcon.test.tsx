import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import GoogleGIcon from './GoogleGIcon'

describe('GoogleGIcon', () => {
  it('renders an SVG with the canonical 48x48 viewBox', () => {
    const { container } = render(<GoogleGIcon />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('viewBox')).toBe('0 0 48 48')
  })

  it('honors the size prop', () => {
    const { container } = render(<GoogleGIcon size={20} />)
    expect(container.querySelector('svg')?.getAttribute('width')).toBe('20')
  })
})
