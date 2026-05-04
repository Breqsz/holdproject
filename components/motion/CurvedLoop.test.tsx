import { describe, it, expect, beforeAll } from 'vitest'
import { render } from '@testing-library/react'
import CurvedLoop from './CurvedLoop'

// jsdom doesn't implement SVG text metrics — stub minimally so the effect doesn't throw.
beforeAll(() => {
  ;(SVGElement.prototype as unknown as { getComputedTextLength: () => number }).getComputedTextLength =
    () => 100
})

describe('CurvedLoop', () => {
  it('renders an svg element with the marquee text', () => {
    const { container } = render(<CurvedLoop marqueeText="VALORES ✦ " interactive={false} />)
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
    // hidden measuring text should be present even before spacing measures
    expect(container.textContent).toContain('VALORES')
  })

  it('renders without crashing when interactive=false (no drag handlers)', () => {
    const { container } = render(<CurvedLoop marqueeText="A ✦ B ✦ " interactive={false} />)
    expect(container.querySelector('svg')).not.toBeNull()
  })
})
