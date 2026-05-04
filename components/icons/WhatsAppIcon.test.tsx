import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { WhatsAppIcon } from './WhatsAppIcon'

describe('WhatsAppIcon', () => {
  it('renders an SVG element', () => {
    const { container } = render(<WhatsAppIcon />)
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('uses the requested size for both width and height', () => {
    const { container } = render(<WhatsAppIcon size={32} />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('32')
    expect(svg.getAttribute('height')).toBe('32')
  })

  it('defaults to 20×20 when no size is given', () => {
    const { container } = render(<WhatsAppIcon />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('20')
    expect(svg.getAttribute('height')).toBe('20')
  })

  it('is hidden from accessibility tree', () => {
    const { container } = render(<WhatsAppIcon />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('forwards a className', () => {
    const { container } = render(<WhatsAppIcon className="text-green-500" />)
    expect(container.querySelector('svg')).toHaveClass('text-green-500')
  })
})
