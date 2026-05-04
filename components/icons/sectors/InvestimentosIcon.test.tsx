import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import InvestimentosIcon from './InvestimentosIcon'

describe('InvestimentosIcon', () => {
  it('renders an SVG with the canonical 24x24 viewBox', () => {
    const { container } = render(<InvestimentosIcon />)
    expect(container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 24 24')
  })
})
