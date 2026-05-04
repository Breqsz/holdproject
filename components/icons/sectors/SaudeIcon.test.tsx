import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import SaudeIcon from './SaudeIcon'

describe('SaudeIcon', () => {
  it('renders an SVG with the canonical 24x24 viewBox', () => {
    const { container } = render(<SaudeIcon />)
    expect(container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 24 24')
  })
})
